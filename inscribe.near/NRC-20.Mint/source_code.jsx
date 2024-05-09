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

function formatProgress(tokenInfo) {
  return Big(tokenInfo.totalSupply).div(tokenInfo.maxSupply).toNumber();
}



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

State.init({
  tickInput: props.tick ?? "",
  amountInput: "",
  repeatInput: "1",
});

const nrc20Transaction = {
  contractName: config.contractName,
  methodName: config.methodName,
  args: {
    ...config.args,
    tick: state.tickInput.toLowerCase(),
    amt: isDigit(state.amountInput)
      ? Big(state.amountInput).times(
          Big(10).pow(Number(state.tokenInfo?.decimals ?? 0))
        )
      : "0",
  },
  gas: GasPerTransaction,
};

function updateTickInput(value) {
  State.update({ tickInputError: undefined });
  if (!isSignedIn) {
    State.update({
      tickInputError: "Sign in please",
    });
    return;
  }
  State.update({ tickInput: value });

  // debounce
  clearTimeout(state.timer);
  State.update({
    timer: setTimeout(() => {
      if (value !== "") {
        fetchTokenInfoAsync(value).then((response) => {
          if (!response.tokenInfo) {
            State.update({
              amountInput: "",
              tickInputError: "The tick does not exist",
              tokenInfo: undefined,
            });
            return;
          }
          State.update({
            tokenInfo: response.tokenInfo,
          });
          const limit = response.tokenInfo?.limit ?? -1;
          const decimals = Number(response.tokenInfo?.decimals ?? 0);
          /// update amount
          if (limit !== -1) {
            updateAmountInput(Big(limit).div(Big(10).pow(decimals)).toFixed(0));
          } else {
            updateAmountInput("");
          }
          if (
            isDigit(state.amountInput) &&
            limit !== -1 &&
            Big(state.amountInput).gt(Big(limit).div(Big(10).pow(decimals)))
          ) {
            State.update({
              amountInputError: `The amount should be no more than ${Big(limit)
                .div(Big(10).pow(decimals))
                .toFixed()}`,
            });
          } else {
            State.update({
              amountInputError: undefined,
            });
          }
        });
      } else {
        State.update({
          tokenInfo: undefined,
        });
      }
    }, 300),
  });
}

function updateAmountInput(value) {
  if (!isSignedIn) {
    State.update({
      amountInputError: "Sign in please",
    });
    return;
  }

  if (value === "" || isInteger(value)) {
    State.update({
      amountInputError: undefined,
      amountInput: removePrefix0(value),
    });
  }

  const limit = state.tokenInfo?.limit ?? -1;
  const decimals = Number(state.tokenInfo?.decimals ?? 0);
  if (isDigit(value)) {
    if (Big(value).eq(0)) {
      State.update({
        amountInputError: "The amount should be greater than 0",
      });
    } else if (
      limit !== -1 &&
      Big(value).gt(Big(limit).div(Big(10).pow(decimals)))
    ) {
      State.update({
        amountInputError: `The amount should be no more than ${Big(limit)
          .div(Big(10).pow(decimals))
          .toFixed()}`,
      });
    }
  }
}

function updateRepeatInput(value) {
  if (!isSignedIn) {
    State.update({
      repeatInputError: "Sign in please",
    });
    return;
  }

  if (value === "" || isInteger(value)) {
    State.update({
      repeatInputError: undefined,
      repeatInput: removePrefix0(value),
    });
  }

  if (isDigit(value) && Big(value).eq(0)) {
    State.update({
      repeatInputError: "The repeat number should be greater than 0",
    });
  }
}

const disabled =
  state.tickInput === "" ||
  !isDigit(state.amountInput) ||
  !isDigit(state.repeatInput) ||
  !!state.tickInputError ||
  !!state.amountInputError ||
  !!state.repeatInputError;

if (props.tick && !state.hasInitTickInput) {
  State.update({
    hasInitTickInput: true,
  });
  updateTickInput(props.tick);
}

return (
  <FormContainer>
    <FormTitle>Mint</FormTitle>
    {state.tokenInfo && (
      <Widget
        src={`${config.ownerId}/widget/NRC-20.Progress`}
        props={{
          progress: formatProgress(state.tokenInfo),
        }}
      />
    )}
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Tick",
        value: state.tickInput,
        onChange: updateTickInput,
        error: state.tickInputError,
      }}
    />
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Amount",
        value: state.amountInput,
        onChange: updateAmountInput,
        error: state.amountInputError,
      }}
    />
    <Widget
      src={`${config.ownerId}/widget/NRC-20.RepeatInput`}
      props={{
        title: "Repeat",
        value: state.repeatInput,
        onChange: updateRepeatInput,
        error: state.repeatInputError,
      }}
    />
    <FormButton
      disabled={disabled}
      onClick={() => {
        Near.call(Array(Number(state.repeatInput)).fill(nrc20Transaction));
      }}
    >
      Mint
    </FormButton>
  </FormContainer>
);
