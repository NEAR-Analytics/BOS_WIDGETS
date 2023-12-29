const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
const landingUrl = "https://neatprotocol.ai";
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

function fetchTokenInfosAsync() {
  return asyncFetchFromGraph(`
    query {
      tokenInfos {
        ticker
        maxSupply
        totalSupply
        limit
        createdBlockTimestamp
        decimals
      }
      holderCounts {
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
  tickInput: "",
  totalSupplyInput: "",
  limitPerMintInput: "1",
  decimalsInput: "8",
});

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
        if (!isLetterAndDigit(value) || value.length < 3 || value.length > 8) {
          State.update({
            tickInputError:
              "Ticker must be of length 3 to 8 and contains letters and numbers only",
          });
          return;
        }
        fetchTokenInfoAsync(value).then((response) => {
          if (response.tokenInfo) {
            State.update({
              tickInputError: "The ticker name already exists",
            });
            return;
          }
        });
      }
    }, 300),
  });
}

function updateTotalSupplyInput(value) {
  if (!isSignedIn) {
    State.update({
      totalSupplyInputError: "Sign in please",
    });
    return;
  }

  if (value === "" || isInteger(value)) {
    State.update({
      totalSupplyInputError: undefined,
      totalSupplyInput: removePrefix0(value),
    });
  }

  if (isDigit(value) && Big(value).eq(0)) {
    State.update({
      totalSupplyInputError: "The total supply should be greater than 0",
    });
  }
}

function updateLimitPerMintInput(value) {
  if (!isSignedIn) {
    State.update({
      limitPerMintInputError: "Sign in please",
    });
    return;
  }

  if (value === "" || isInteger(value)) {
    State.update({
      limitPerMintInputError: undefined,
      limitPerMintInput: removePrefix0(value),
    });
  }

  if (isDigit(value) && Big(value).eq(0)) {
    State.update({
      limitPerMintInputError: "The limit per mint should be greater than 0",
    });
  }
}

function updateDecimalsInput(value) {
  State.update({ decimalsInputError: undefined });
  if (!isSignedIn) {
    State.update({
      decimalsInputError: "Sign in please",
    });
    return;
  }

  if (value === "" || isInteger(value)) {
    State.update({ decimalsInput: removePrefix0(value) });
  }
}

const disabled =
  state.tickInput === "" ||
  !isDigit(state.totalSupplyInput) ||
  !isDigit(state.limitPerMintInput) ||
  !isDigit(state.decimalsInput) ||
  !!state.tickInputError ||
  !!state.totalSupplyInputError ||
  !!state.limitPerMintInputError ||
  !!state.decimalsInputError;

return (
  <FormContainer>
    <FormTitle>Deploy</FormTitle>
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Tick",
        value: state.tickInput,
        onChange: updateTickInput,
        error: state.tickInputError,
        placeholder: "ticker name is case insensitive",
      }}
    />
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Total Supply",
        value: state.totalSupplyInput,
        onChange: updateTotalSupplyInput,
        error: state.totalSupplyInputError,
      }}
    />
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Limit Per Mint",
        value: state.limitPerMintInput,
        onChange: updateLimitPerMintInput,
        error: state.limitPerMintInputError,
      }}
    />
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Decimals",
        value: state.decimalsInput,
        onChange: updateDecimalsInput,
        error: state.decimalsInputError,
      }}
    />
    <FormButton
      disabled={disabled}
      onClick={() => {
        Near.call({
          contractName: config.contractName,
          methodName: config.methodName,
          args: {
            p: config.args.p,
            op: "deploy",
            tick: state.tickInput.toLowerCase(),
            max: Big(state.totalSupplyInput)
              .times(Big(10).pow(Number(state.decimalsInput)))
              .toFixed(0),
            lim: Big(state.limitPerMintInput)
              .times(Big(10).pow(Number(state.decimalsInput)))
              .toFixed(0),
            dec: Number(state.decimalsInput),
          },
          gas: GasPerTransaction,
        });
      }}
    >
      Deploy
    </FormButton>
  </FormContainer>
);
