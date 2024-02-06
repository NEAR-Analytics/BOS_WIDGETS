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

const WrapFee = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ArrowDown = () => (
  <img
    style={{
      display: "inline-block",
      margin: "0 auto",
      marginTop: "-20px",
      marginBottom: "-20px",
    }}
    src={`${ipfsPrefix}/bafkreic2xx3nuyxkqnfcjbkpoc334nqxo7r74jyij572qtvf2wgxwbfj7q`}
    width="40px"
  />
);

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

const InputError = styled.div`
  margin-top: 12px;
  color: rgb(252, 91, 91);
`;

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



const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;

function updateInputValue(value) {
  if (!isSignedIn) {
    State.update({
      unwrapAmountInputError: "Sign in please",
    });
    return;
  }

  if (
    value === "" ||
    (isInputDigit(value) && isMaxDecimals(value, state.decimals ?? 0))
  ) {
    State.update({
      unwrapAmount: removePrefix0(value),
      unwrapAmountInputError: undefined,
    });
  }

  if (
    isDigit(value) &&
    Big(value).gt(
      Big(state.nep141BalanceRaw ?? 0).div(Big(10).pow(state.decimals ?? 0))
    )
  ) {
    State.update({
      unwrapAmountInputError: "Insufficient balance",
    });
  }
}

if (!state.hasFetchTokenInfos) {
  fetchTokenInfosAsync().then((data) => {
    State.update({
      tokenInfos: data.tokenInfos,
      holderCounts: data.holderCounts,
    });
  });
  State.update({
    hasFetchTokenInfos: true,
  });
}

if (!state.registeredTokenContracts) {
  getFtWrappers().then((subcontracts) => {
    State.update({ subcontracts });
    for (let i = 0; i < subcontracts.length; i++) {
      const subcontract = subcontracts[i];
      getNep141Balance(subcontract).then((balance) => {
        State.update({
          ["nep141_balance_" + subcontract.split(".")[0]]: {
            ticker: subcontract.split(".")[0],
            amount: balance,
          },
        });
      });
    }
    State.update({
      registeredTokenContracts: subcontracts,
    });
  });
}

function syncNep141Balance() {
  const subcontracts = state.subcontracts;
  if (subcontracts) {
    const keys = Object.keys(state);
    const ftBalances = keys
      .filter((key) => key.startsWith("nep141_balance_"))
      .reduce((prev, key) => [...prev, state[key]], []);
    State.update({
      ftBalances,
    });
  }
}

syncNep141Balance();

function updateSelectValue(ticker) {
  updateInputValue("");
  const tickerBalance = state.balances.find(
    (row) => row.ticker.toUpperCase() === ticker.toUpperCase()
  ) ?? {
    ticker,
    amount: "0",
  };
  const tokenInfo = state.tokenInfos.find(
    (tokenInfo) => tokenInfo.ticker.toUpperCase() === ticker.toUpperCase()
  );

  const nep141Balance = state.ftBalances.find(
    (balance) => balance.ticker.toLowerCase() === ticker.toLowerCase()
  );

  getUnwrapFeeRate(ftWrapperAddress(ticker))
    .then((fee) => {
      State.update({
        unwrapFee: fee,
      });
    })
    .catch((error) => {
      State.update({
        wrapFee: undefined,
      });
      console.log(error.message);
    });
  if (tokenInfo?.decimals) {
    State.update({
      nep141BalanceRaw: nep141Balance.amount,
      nep141Balance: formatAmount(nep141Balance.amount, tokenInfo.decimals),
      nrc20Balance: formatAmount(tickerBalance.amount, tokenInfo.decimals),
      unit: tickerBalance.ticker,
      decimals: tokenInfo.decimals,
      tickerInput: ticker,
    });
  } else {
    State.update({
      nep141BalanceRaw: nep141Balance.amount,
      nep141Balance: toLocaleString(nep141Balance.amount),
      nrc20Balance: toLocaleString(tickerBalance.amount),
      unit: tickerBalance.ticker,
      decimals: 0,
      tickerInput: ticker,
    });
  }
}

if (
  !state.hasSetInitialTick &&
  props.tick &&
  state.balances &&
  state.tokenInfos &&
  state.registeredTokenContracts
) {
  State.update({ hasSetInitialTick: true });
  updateSelectValue(props.tick);
}
return (
  <>
    <div>
      <Widget
        src={`${config.ownerId}/widget/NRC-20.AssetSelect`}
        props={{
          title: "Tick",
          data:
            state.ftBalances && state.tokenInfos
              ? state.ftBalances
                  .map((a) => {
                    const tokenInfo = state.tokenInfos.find(
                      (tokenInfo) =>
                        tokenInfo.ticker.toUpperCase() ===
                        a.ticker.toUpperCase()
                    );
                    if (tokenInfo?.decimals) {
                      return {
                        ticker: a.ticker,
                        amount: Big(a.amount)
                          .div(Big(10).pow(tokenInfo.decimals))
                          .toFixed(),
                      };
                    } else {
                      return {
                        ticker: a.ticker,
                        amount: a.amount,
                      };
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
          updateSelectValue,
          updateError: (error) => {
            State.update({
              assetSelectError: error,
            });
          },
          value: state.tickerInput
            ? state.tickerInput.toUpperCase()
            : undefined,
          disabled: !state.ftBalances || !state.tokenInfos,
        }}
      />
      {state.assetSelectError && (
        <InputError>{state.assetSelectError}</InputError>
      )}
    </div>
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "NEP-141",
        value: state.unwrapAmount,
        maxTitle: "Balance: ",
        maxValue: state.nep141Balance ? state.nep141Balance : "-",
        unit: state.unit ? `$${state.unit.toUpperCase()}` : "",
        disabled: !state.tickerInput,
        variant: !state.tickerInput ? "grey" : undefined,
        onChange: updateInputValue,
        onClickMax: () =>
          updateInputValue(
            Big(state.nep141BalanceRaw ?? 0)
              .div(Big(10).pow(state.decimals ?? 0))
              .toFixed()
          ),
        error: state.unwrapAmountInputError,
      }}
    />
    <ArrowDown />
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "NRC-20",
        maxTitle: "Balance: ",
        maxValue: state.nrc20Balance ? state.nrc20Balance : "-",
        unit: state.unit ? `$${state.unit.toUpperCase()}` : "",
        onChange: updateInputValue,
        variant: "grey",
        disabled: true,
        value:
          state.unwrapFee && isDigit(state.unwrapAmount)
            ? Big(state.unwrapAmount)
                .minus(
                  Big(state.unwrapFee)
                    .div(10000)
                    .times(state.unwrapAmount)
                    .toFixed(state.decimals, 0)
                )
                .toFixed()
            : state.unwrapAmount,
      }}
    />
    <WrapFee>
      Unwrap Fee:{" "}
      {state.unwrapFee
        ? Big(state.unwrapFee ?? 0)
            .div(100)
            .toFixed(2)
        : "0.00"}
      % (
      {state.unwrapFee && isDigit(state.unwrapAmount)
        ? Big(state.unwrapFee ?? 0)
            .div(10000)
            .times(state.unwrapAmount)
            .toFixed(state.decimals, 0)
        : Big(0).toFixed(state.decimals)}
      )
    </WrapFee>
    <FormButton
      disabled={
        !!state.unwrapAmountInputError ||
        !isDigit(state.unwrapAmount) ||
        Big(state.unwrapAmount).lte(0)
      }
      onClick={() => {
        Near.call({
          contractName: ftWrapperAddress(state.tickerInput),
          methodName: "ft_unwrap",
          args: {
            amount: Big(state.unwrapAmount)
              .times(Big(10).pow(state.decimals))
              .toFixed(0),
          },
        });
      }}
    >
      Unwrap
    </FormButton>
  </>
);
