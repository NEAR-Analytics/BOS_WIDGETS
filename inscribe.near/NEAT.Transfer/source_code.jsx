const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";

function toLocaleString(source, decimals, rm) {
  if (typeof source === "string") {
    return toLocaleString(Number(source), decimals);
  } else if (typeof source === "number") {
    return decimals !== undefined
      ? source.toLocaleString(undefined, {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        })
      : source.toLocaleString();
  } else {
    // Big type
    return toLocaleString(
      decimals !== undefined
        ? Number(source.toFixed(decimals, rm))
        : source.toNumber(),
      decimals
    );
  }
}

function formatAmount(balance, decimal) {
  if (!decimal) decimal = 8;
  return toLocaleString(
    Big(balance).div(Big(10).pow(decimal)).toFixed(),
    decimal
  );
}

// Config for Bos app
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "inscribe.near",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: "inscription.near",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "neat",
        },
        ftWrapper: "neat.nrc-20.near",
        refFinance: "https://app.ref.finance/",
      };
    case "testnet":
      return {
        ownerId: "inscribe.testnet",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat-test",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: "inscription.testnet",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "neat",
        },
        ftWrapper: "neat.nrc-20.testnet",
        refFinance: "https://testnet.ref-finance.com/",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);
const tx = {
  contractName: config.contractName,
  methodName: config.methodName,
  args: config.args,
  gas: GasPerTransaction,
};

const FormContainer = styled.div`
  max-width: 650px;
  width: 100%;
  background: #141414;
  border-radius: 4px;
  border: 1px solid #ffffff1a;
  display: flex;
  flex-direction: column;
  gap: 36px;

  padding: 16px;
  @media (min-width: 640px) {
    padding: 24px;
  }
`;

const FormTitle = styled.div`
  font-size: 22px;
  font-weight: 600px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FormButton = styled.button`
  height: 56px;
  width: 100%;
  display: grid;
  place-content: center;
  cursor: pointer;
  border: 1px solid #ffffff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  background: transparent;
  color: #ffffff;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
  }
`;

State.init({
  balance: undefined,
  wrappedFtBalance: undefined,
  tickerRawData: {},
  holders: [],
  ticker: [
    {
      title: "Token:",
      value: "-",
    },
    {
      title: "Protocol:",
      value: "-",
    },
    {
      title: "Total Supply:",
      value: "-",
    },
    {
      title: "Total Minted:",
      value: "-",
    },
    {
      title: "Minted%:",
      value: "-",
    },
    {
      title: "Mint Limit:",
      value: "-",
    },
    {
      title: "Holders:",
      value: "-",
    },
  ],
  // transfer component
  transferAmount: "",
  transferTo: "",
});

function fetchFromGraph(query) {
  return fetch(config.graphUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
}

function asyncFetchFromGraph(query) {
  return asyncFetch(config.graphUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
}

function getBalance() {
  const accountId = props.accountId || context.accountId;
  return asyncFetchFromGraph(`
    query {
      holderInfos(
        where: {
          accountId: "${accountId}"
          ticker: "neat"
        }
      ) {
        accountId
        amount
      }
    }
  `).then((balanceResponse) => {
    const holder = balanceResponse.body.data.holderInfos[0];
    if (holder) {
      return holder.amount;
    }
    return "0";
  });
}

function getWrappedFtBalance() {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(config.ftWrapper, "ft_balance_of", {
    account_id: accountId,
  });
}

function getNrc20TotalSupply() {
  if (!state.nep141TotalSupply || !state.tokenInfo?.maxSupply) return undefined;
  return Big(state.tokenInfo.maxSupply)
    .minus(state.nep141TotalSupply)
    .toFixed();
}

function getNep141TotalSupply() {
  return Near.asyncView(config.ftWrapper, "ft_total_supply");
}

function fetchAllData() {
  const response = fetchFromGraph(`
    query {
      tokenInfo (id: "NEAT") {
        ticker
        maxSupply
        totalSupply
        limit
      }
      holderCount (id: "NEAT") {
        count
      }
    }
  `);

  if (response) {
    const tokenInfo = response.body.data.tokenInfo;
    const holderCount = response.body.data.holderCount.count;
    State.update({
      tokenInfo,
      tickerRawData: {
        display_name: tokenInfo.ticker,
        holderCount,
      },
      ticker: [
        {
          title: "Token:",
          value: tokenInfo.ticker,
        },
        {
          title: "Protocol:",
          value: "NRC-20",
        },
        {
          title: "Total Supply:",
          value: formatAmount(tokenInfo.maxSupply ?? 0),
        },
        {
          title: "Total Minted:",
          value: formatAmount(tokenInfo.totalSupply ?? 0),
        },
        {
          title: "Minted%:",
          value:
            Big(tokenInfo.totalSupply ?? 0)
              .div(tokenInfo.maxSupply ?? 1)
              .times(100)
              .toFixed(2) + "%",
        },
        {
          title: "Mint Limit:",
          value: formatAmount(tokenInfo.limit ?? 0),
        },
        {
          title: "Holders:",
          value: toLocaleString(holderCount, 0),
        },
      ],
    });
  }

  getBalance().then((balance) =>
    State.update({
      balance,
    })
  );

  getWrappedFtBalance().then((balance) =>
    State.update({
      wrappedFtBalance: balance,
    })
  );

  getNep141TotalSupply().then((nep141TotalSupply) => {
    State.update({
      nep141TotalSupply,
    });
  });

  const nrc20TotalSupply = getNrc20TotalSupply();
  if (nrc20TotalSupply) {
    State.update({
      nrc20TotalSupply,
    });
  }
}

fetchAllData();

const isInputDigit = (value) => /^(\d*(\.\d*)?|\.\d+)$/.test(value);
const isDigit = (value) => /^\d+(\.\d+)?$/.test(value);
const removePrefix0 = (value) => {
  if (!isDigit(value)) return value;
  if (Number(value) === 0 && !value.includes(".")) return "0";
  else {
    if (value.includes(".")) {
      if (!value.startsWith(".")) {
        return value;
      }
      return value.replace(/^0+/, "0");
    } // 00. transform to 0.
    else return value.replace(/^0+/, ""); // 01 transform to 1
  }
};
const isMax8Decimals = (value) => /^\d*(\.\d{0,8})?$/.test(value);



const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
function getVariantByAccount() {
  if (state.validAccount === false) return "red";
  if (state.validAccount === true) return "green";
  return undefined;
}
const variant = getVariantByAccount();

function updateBalance() {
  const interval = setInterval(() => {
    getBalance().then((balance) => {
      if (balance && state.balance !== balance) {
        State.update({ balance });
        clearInterval(interval);
      }
    });
  }, 500);
}

function updateInputValue(value) {
  State.update({ transferAmountInputError: undefined });
  if (!isSignedIn) {
    State.update({
      transferAmountInputError: "Sign in please",
    });
    return;
  }
  if (value === "" || (isInputDigit(value) && isMax8Decimals(value))) {
    State.update({ transferAmount: removePrefix0(value) });
  }

  if (
    isDigit(value) &&
    Big(value).gt(Big(state.balance ?? 0).div(Big(10).pow(8)))
  ) {
    State.update({
      transferAmountInputError: "Insufficient balance",
    });
  }
}
return (
  <>
    <FormContainer style={{ fontWeight: "bold" }}>
      NEAT is now transferrable with 8 decimals 💥
      <br />
      The minimum amount that you can transfer is 0.00000001 NEAT
    </FormContainer>
    <FormContainer>
      <FormTitle>Transfer</FormTitle>
      <Widget
        src={`${config.ownerId}/widget/NEAT.FormInput`}
        props={{
          title: "Transfer Amount",
          maxTitle: "Your $NEAT Balance: ",
          maxMobileTitle: "Balance: ",
          maxValue: state.balance ? formatAmount(state.balance) : "-",
          value: state.transferAmount,
          unit: "$NEAT",
          onChange: updateInputValue,
          onClickMax: () =>
            updateInputValue(
              Big(state.balance ?? 0)
                .div(Big(10).pow(8))
                .toFixed()
            ),
          error: state.transferAmountInputError,
        }}
      />
      <Widget
        src={`${config.ownerId}/widget/NEAT.FormInput`}
        props={{
          title: "Transfer To",
          value: state.transferTo,
          variant,
          onChange: (value) => {
            State.update({ transferTo: value, validAccount: undefined });

            // debounce
            clearTimeout(state.timer);
            State.update({
              timer: setTimeout(() => {
                if (value !== "") {
                  asyncFetch(config.nodeUrl, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      jsonrpc: "2.0",
                      id: "dontcare",
                      method: "query",
                      params: {
                        request_type: "view_account",
                        finality: "final",
                        account_id: value,
                      },
                    }),
                  }).then((response) => {
                    if (response.body.error) {
                      State.update({ validAccount: false });
                    } else {
                      State.update({ validAccount: true });
                    }
                  });
                } else {
                  State.update({
                    validAccount: undefined,
                  });
                }
              }, 300),
            });
          },
          error:
            state.validAccount === false ? "Account does not exist" : undefined,
        }}
      />
      <FormButton
        disabled={
          !!state.transferAmountInputError ||
          !isDigit(state.transferAmount) ||
          Big(state.transferAmount).lte(0) ||
          !state.validAccount
        }
        onClick={() => {
          Near.call(config.contractName, config.methodName, {
            ...config.transferArgs,
            to: state.transferTo,
            amt: Big(state.transferAmount).times(Big(10).pow(8)).toFixed(0),
          });
          updateBalance();
          State.update({
            transferAmount: "",
            transferTo: "",
            validAccount: undefined,
          });
        }}
      >
        Transfer
      </FormButton>
    </FormContainer>
  </>
);
