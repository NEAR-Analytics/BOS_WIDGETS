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

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormInputLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const FormInputRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin-top: 12px;
  border-radius: 12px;
  padding: 0 16px;
  align-items: center;
  .FormInput::placeholder {
    color: #ffffff44;
  }
`;

const FormInputTitle = styled.div`
  font-size: 18px;
  font-weight: ${titleNormal ? "500" : "bold"};

  @media (max-width: 768px) {
    font-size: 14px;
    white-space: nowrap;
  }
`;

const MaxContent = styled.div`
  font-size: 14px;
  color: white;
  font-size: 700;
  display: flex;
  .hide-in-pc {
    display: none;
  }
  .hide-in-mobile {
    display: inline-block;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    white-space: nowrap;
    display: inline-block;
    .hide-in-mobile {
      display: none;
    }
    .hide-in-pc {
      display: inline-block;
    }
  }
`;

const MaxValue = styled.button`
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: white;
  font-size: 700;
  margin-left: 4px;
  ${onClickMax
    ? `
      text-decoration: underline;
      text-underline-offset: 3px;
    `
    : ``}
`;

const UnitContent = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const FormInputError = styled.div`
  margin-top: 12px;
  color: rgb(252, 91, 91);
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



const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;

State.init({
  image: {},
  uploadError: undefined,
  dataUrl: undefined,
  tickerInput: undefined,
});

if (!state.hasFetchTokenInfos) {
  fetchOwnTokenInfosAsync(accountId).then((data) => {
    State.update({
      tokenInfos: data.tokenInfos,
    });
  });
  State.update({
    hasFetchTokenInfos: true,
  });
}

function checkImageUpload() {
  if (state.image.cid) {
    const imageUrl = `${ipfsPrefix}/${state.image.cid}`;
    const response = fetch(imageUrl);
    State.update({ uploadError: undefined, dataUrl: undefined });
    if (response) {
      const content = response.body;
      const contentType = response.contentType;
      if (contentType === "image/svg+xml") {
        const base64Content = btoa(content);
        const originalkb = new Blob([base64Content]).size / 1024;
        const dataUrl = `data:${contentType};base64,${base64Content}`;
        const conetntkb = new Blob([dataUrl]).size / 1024;
        if (originalkb > 16) {
          State.update({
            uploadError: "The SVG icon must be less than 16KB",
          });
          return;
        } else if (conetntkb > 32) {
          State.update({
            uploadError: "Transformed SVG data URL should be less than 32KB",
          });
          return;
        }
        State.update({ dataUrl });
      } else {
        State.update({ uploadError: "Icon must be in SVG format" });
      }
    }
  }
}

checkImageUpload();

function registerFtWrapper() {
  const registerFtWrapperOp = {
    contractName: config.contractName,
    methodName: config.methodName,
    args: {
      p: config.args.p,
      op: "register_ft_wrapper",
      tick: state.tickerInput,
      icon: state.dataUrl,
    },
  };
  const registerInFactory = {
    contractName: config.ftWrapperFactory,
    methodName: "register",
    args: {
      ticker: state.tickerInput,
    },
    deposit: "3000000000000000000000000", // 3 NEAR
  };

  Near.call([registerFtWrapperOp, registerInFactory]);

  State.update({
    tickerInput: undefined,
    image: {},
    registeredTokenContracts: undefined,
  });
}

if (!state.registeredTokenContracts) {
  getFtWrappers().then((subcontracts) => {
    State.update({
      registeredTokenContracts: subcontracts,
    });
  });
}

const tickData =
  state.tokenInfos && state.registeredTokenContracts
    ? state.tokenInfos
        .filter(
          (a) =>
            !state.registeredTokenContracts
              .map((r) => r.split(".")[0].toLowerCase())
              .includes(a.ticker.toLowerCase())
        )
        .sort((a, b) => {
          if (a.ticker.toUpperCase() === "NEAT") {
            return -1;
          }
          if (b.ticker.toUpperCase() === "NEAT") {
            return 1;
          }
          return a.ticker.localeCompare(b.ticker);
        })
    : [];

if (state.tokenInfos && state.registeredTokenContracts) {
  if ((!state.assetSelectError && !tickData) || tickData.length === 0) {
    State.update({
      assetSelectError:
        "No tokens available for registration. Please deploy your NRC-20 token first.",
    });
  } else if (state.assetSelectError && tickData && tickData.length > 0) {
    State.update({
      assetSelectError: undefined,
    });
  }
}

function updateSelectValue(ticker) {
  State.update({
    tickerInput: ticker,
  });
}

if (
  !state.tickerInput &&
  props.tick &&
  tickData &&
  tickData.find((a) => a.ticker.toLowerCase() === props.tick?.toLowerCase())
) {
  updateSelectValue(props.tick);
}

return (
  <>
    <div style={{ fontWeight: "bold", marginTop: "20px" }}>
      Only deployer of the ticker can register and deploy its NEP-141 wrapper
      token.
    </div>
    <div>
      <Widget
        src={`${config.ownerId}/widget/NRC-20.AssetSelect`}
        props={{
          title: "Tick",
          hideBalance: true,
          hideTitle: true,
          data: tickData,
          updateSelectValue,
          updateError: (error) => {
            State.update({
              assetSelectError: error,
            });
          },
          value: state.tickerInput
            ? state.tickerInput.toUpperCase()
            : undefined,
        }}
      />
      {state.assetSelectError && (
        <InputError>{state.assetSelectError}</InputError>
      )}
    </div>
    <div>
      <FormInputTitle style={{ marginBottom: "12px" }}>Icon</FormInputTitle>
      <IpfsImageUpload image={state.image} />
      {state.uploadError && <InputError>{state.uploadError}</InputError>}
      <div style={{ marginTop: "12px" }}>
        NEP-141 token icon must be in SVG format and less than 16KB.
      </div>
    </div>
    <FormButton
      disabled={!state.dataUrl || !state.tickerInput || state.formInputError}
      onClick={registerFtWrapper}
    >
      Register
    </FormButton>
  </>
);
