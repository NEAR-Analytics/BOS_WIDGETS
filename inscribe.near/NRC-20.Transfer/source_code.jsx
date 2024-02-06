const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
const landingUrl = "https://neatprotocol.ai";
const partnerProgramUrl = "https://forms.gle/4M3fvw3LPiJSyffcA";
const nrc20DocHost = "https://docs.nrc-20.io/";
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

function formatAmount(_balance, _decimal) {
  const balance = _balance ?? 0;
  const decimal = _decimal ?? 8;
  return toLocaleString(
    Big(balance).div(Big(10).pow(decimal)).toFixed(),
    decimal
  );
}

function formatDeployTime(blockTime) {
  const milliseconds = blockTime / 1000000;
  const date = new Date(milliseconds);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
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
        ftWrapperFactory: "nrc-20.near",
        ftWrapper: "neat.nrc-20.near",
        refFinance: "https://app.ref.finance/",
        minMintEvents: 1_000_000,
        minHolders: 1_000,
        neatDecimals: 8,
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
        ftWrapperFactory: "nrc-20.testnet",
        ftWrapper: "neat.nrc-20.testnet",
        refFinance: "https://testnet.ref-finance.com/",
        minMintEvents: 10,
        minHolders: 5,
        neatDecimals: 8,
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

function ftWrapperAddress(tick) {
  return tick.toLowerCase() + "." + config.ftWrapperFactory;
}

const WarningStyle = styled.div`
  color: rgb(252, 91, 91);
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const WarningImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

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

function fetchEventCounts(_tick) {
  const tick = _tick || "NEAT";
  return asyncFetchFromGraph(`
    query {
      eventCounts(where: {id:"${tick}"}) {
        id
        ticker
        mintEventCount
        transferEventCount
      }
    }
  `).then((response) => {
    if (response.body?.data?.eventCounts) {
      return response.body.data.eventCounts;
    }
    return undefined;
  });
}

function fetchTokenInfosAsync() {
  return asyncFetchFromGraph(`
    query {
      tokenInfos(first: 1000) {
        ticker
        maxSupply
        totalSupply
        limit
        createdBlockTimestamp
        decimals
      }
      holderCounts(first: 1000) {
        ticker
        count
      }
    }
  `).then((tokensInfoResponse) => {
    if (tokensInfoResponse.body?.data) {
      return tokensInfoResponse.body?.data;
    }
    return undefined;
  });
}

function fetchTokenInfoAsync(token) {
  return asyncFetchFromGraph(`
    query {
      tokenInfo (
        id: "${token.toUpperCase()}",
      ) {
        ticker
        limit
        decimals
        maxSupply
        totalSupply
        creatorId
        createdBlockHeight
        createdBlockTimestamp
      }
      holderCount (
        id: "${token.toUpperCase()}",
      ) {
        ticker
        count
      }
    }
  `).then((tokenInfoResponse) => {
    if (tokenInfoResponse.body?.data) {
      return tokenInfoResponse.body.data;
    }
    return undefined;
  });
}

function fetchOwnTokenInfosAsync(creatorId) {
  return asyncFetchFromGraph(`
    query {
      tokenInfos(where:{creatorId:"${creatorId}"}) {
        ticker
        decimals
        limit
      }
    }
  `).then((tokenInfoResponse) => {
    if (tokenInfoResponse.body?.data) {
      return tokenInfoResponse.body.data;
    }
    return undefined;
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

function getBalances() {
  const accountId = props.accountId || context.accountId;
  return asyncFetchFromGraph(`
    query {
      holderInfos(
        where: {
          accountId: "${accountId}"
        }
      ) {
        ticker
        amount
      }
    }
  `).then((balanceResponse) => {
    if (balanceResponse.body?.data) {
      return balanceResponse.body.data.holderInfos;
    }
    return undefined;
  });
}

function getFtWrappers(n, _data) {
  const i = n ?? 0;
  const data = _data ?? [];
  const amount = 500;
  return Near.asyncView(config.ftWrapperFactory, "get_ft_wrappers", {
    offset: i * amount,
    limit: amount,
  })
    .then((subcontracts) => {
      if (subcontracts.length < amount) {
        return [...subcontracts, ...data];
      } else {
        return getFtWrappers(i + 1, subcontracts).then((response) => {
          return [...response, ...data];
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return data;
    });
}

function getNep141Balance(contractName) {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(contractName, "ft_balance_of", {
    account_id: accountId,
  });
}

function getWrapFeeRate(contractName) {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(contractName, "get_wrap_fee_rate", {
    account_id: accountId,
  });
}

function getUnwrapFeeRate(contractName) {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(contractName, "get_unwrap_fee_rate", {
    account_id: accountId,
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
  tickInput: props.tick ?? "",
  transferAmount: "",
  transferTo: "",
  balances: undefined,
  // wrap, unwrap component
  wrapTab: "wrap",
});

function fetchAllData() {
  asyncFetchFromGraph(`
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
  `).then((response) => {
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
  });

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

  getBalances().then((balances) => {
    State.update({
      balances,
    });
  });
}

if (!state.hasFetchGlobalData) {
  fetchAllData();
  State.update({ hasFetchGlobalData: true });
}

const isInputDigit = (value) => /^(\d*(\.\d*)?|\.\d+)$/.test(value);
const isDigit = (value) => /^\d+(\.\d+)?$/.test(value);
const isInteger = (value) => /^\d+$/.test(value);
const isLetterAndDigit = (value) => /^[a-zA-Z0-9]+$/.test(value);
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

const isMaxDecimals = (_value, _decimals) => {
  const value = String(_value);
  const decimals = Number(_decimals ?? 0);
  if (!value.includes(".")) {
    return true;
  }
  const splits = value.split(".");
  if (decimals === 0) {
    return false;
  }
  const num = splits[1].length;
  return decimals >= num;
};



const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
function getVariantByAccount() {
  if (state.validAccount === false) return "red";
  if (state.validAccount === true) return "green";
  return undefined;
}
const variant = getVariantByAccount();

function updateTickInput(value) {
  if (!isSignedIn) {
    State.update({
      tickInputError: "Sign in please",
    });
    return;
  }
  State.update({ tickInput: value, tickInputError: undefined });
  // debounce
  clearTimeout(state.timer);
  State.update({
    timer: setTimeout(() => {
      if (value !== "") {
        fetchTokenInfoAsync(value).then((response) => {
          if (!response.tokenInfo) {
            State.update({
              tickInputError: "The tick does not exist",
            });
            return;
          }
        });
      }
    }, 300),
  });
}

const balance =
  (state.balances
    ? state.balances.find(
        (balance) =>
          balance.ticker.toLowerCase() === (state.tickInput ?? "").toLowerCase()
      )?.amount
    : undefined) ?? "0";
const tokenInfo = state.tokenInfos
  ? state.tokenInfos.find(
      (tokenInfo) =>
        tokenInfo.ticker.toUpperCase() ===
        (state.tickInput ? state.tickInput.toUpperCase() : undefined)
    )
  : undefined;
const decimals = tokenInfo?.decimals;

function updateBalances() {
  const interval = setInterval(() => {
    getBalances().then((balances) => {
      if (
        balances.find(
          (balance) =>
            balance.ticker.toLowerCase() ===
            (state.tickInput ?? "").toLowerCase()
        )?.amount !== balance
      ) {
        State.update({ balances });
        clearInterval(interval);
      }
    });
  }, 500);
}

function updateInputValue(value) {
  if (!isSignedIn) {
    State.update({
      transferAmountInputError: "Sign in please",
    });
    return;
  }
  if (value === "" || (isInputDigit(value) && isMaxDecimals(value, decimals))) {
    State.update({
      transferAmount: removePrefix0(value),
      transferAmountInputError: undefined,
    });
  }

  if (
    isDigit(value) &&
    Big(value).gt(Big(balance ?? 0).div(Big(10).pow(decimals)))
  ) {
    State.update({
      transferAmountInputError: "Insufficient balance",
    });
  }
}

fetchTokenInfosAsync().then((data) => {
  State.update({
    tokenInfos: data.tokenInfos,
    holderCounts: data.holderCounts,
  });
});

return (
  <FormContainer>
    <FormTitle>Transfer</FormTitle>
    <WarningStyle>
      <WarningImage
        src={`${ipfsPrefix}/bafkreidaidhyfsjb3bqvm7gyyse47hvyjmj6oqhukcbez7z5k3ntc2qtn4`}
      />
      <div>Don't transfer NRC-20 tokens to CEXs' addresses!!!</div>
    </WarningStyle>
    <div>
      <Widget
        src={`${config.ownerId}/widget/NRC-20.AssetSelect`}
        props={{
          title: "Tick",
          data:
            state.balances && state.tokenInfos
              ? state.balances
                  .map((balance) => {
                    const tokenInfo = state.tokenInfos.find(
                      (tokenInfo) =>
                        tokenInfo.ticker.toLowerCase() === balance.ticker
                    );
                    if (tokenInfo?.decimals) {
                      return {
                        ticker: balance.ticker,
                        amount: Big(balance.amount)
                          .div(Big(10).pow(tokenInfo.decimals))
                          .toFixed(),
                      };
                    } else {
                      return balance;
                    }
                  })
                  .sort((a, b) => {
                    if (!Big(a.amount).eq(b.amount)) {
                      return Big(a.amount).gt(Big(b.amount)) ? -1 : 1;
                    } else {
                      return a.ticker.localeCompare(b.ticker);
                    }
                  })
                  .map((a) => {
                    const tokenInfo = state.tokenInfos.find(
                      (tokenInfo) => tokenInfo.ticker.toLowerCase() === a.ticker
                    );
                    return {
                      ...a,
                      amount: toLocaleString(
                        a.amount,
                        Big(a.amount).eq(0) ? 0 : tokenInfo.decimals
                      ),
                    };
                  })
              : [],
          updateSelectValue: updateTickInput,
          updateError: (error) => {
            State.update({
              tickInputError: error,
            });
          },
          value: state.tickInput ? state.tickInput.toUpperCase() : undefined,
          disabled: !state.balances || !state.tokenInfos || !accountId,
        }}
      />
      {state.assetSelectError && (
        <InputError>{state.assetSelectError}</InputError>
      )}
    </div>
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Transfer Amount",
        maxTitle: "Balance: ",
        maxValue: balance ? formatAmount(balance, decimals ?? 0) : "-",
        value: state.transferAmount,
        onChange: updateInputValue,
        onClickMax: () =>
          updateInputValue(
            Big(balance ?? 0)
              .div(Big(10).pow(decimals))
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
          tick: state.tickInput.toLowerCase(),
          to: state.transferTo,
          amt: Big(state.transferAmount)
            .times(Big(10).pow(decimals))
            .toFixed(0),
        });
        updateBalances();
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
);
