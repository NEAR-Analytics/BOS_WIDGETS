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



const {
  title,
  variant,
  data,
  updateSelectValue,
  hideBalance,
  hideTitle,
  updateError,
  disabled,
} = props;

const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;

State.init({
  showSelectDropdown: false,
});

function getVariantColor() {
  if (variant === "red") return "rgb(252, 91, 91)";
  else if (variant === "green") return "rgb(0, 141, 106)";
  else if (variant === "grey") return "rgb(105, 105, 105)";
  return "#fff";
}
const variantColor = getVariantColor();

const SelectContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 200px;
  background: #ffffff11;
  backdrop-filter: blur(20px);
  z-index: 10;
  border: 1px solid #ffffffbb;
  border-radius: 12px;
  overflow-y: auto;
`;

const SelectTiteRow = styled.div`
  height: 50px;
  width: 100%;
  display: grid;
  ${hideBalance
    ? "grid-template-columns: 1fr;"
    : "grid-template-columns: 1fr 1fr;"}
  place-items: center;
  font-weight: bold;
`;
const SelectRow = styled.div`
  height: 40px;
  width: 100%;
  display: grid;
  ${hideBalance
    ? "grid-template-columns: 1fr;"
    : "grid-template-columns: 1fr 1fr;"}
  place-items: center;
  font-weight: 500;
  border-top: 1px solid #fff;
  cursor: pointer;
  &:hover {
    color: #ffffff88;
  }
`;

const SelectValue = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const UpButton = () => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        display: "grid",
        placeContent: "center",
        marginLeft: "8px",
        cursor: "pointer",
      }}
      onClick={(event) => {
        event.stopPropagation();
        State.update({
          showSelectDropdown: false,
        });
      }}
    >
      <img
        src={`${ipfsPrefix}/bafkreihv355b3qy3orz7ghcyqrbej2hghutbp36qt7u4l44xb644tijyly`}
        alt="Up"
        width={40}
        height={40}
      />
    </div>
  );
};
return (
  <FormInputContainer>
    <FormInputLabel>
      <FormInputTitle>{title}</FormInputTitle>
    </FormInputLabel>
    <FormInputRow
      onClick={() => {
        if (!isSignedIn) {
          updateError && updateError("Sign in please");
          return;
        }
        if (disabled) {
          return;
        }
        if (!state.showSelectDropdown) {
          State.update({
            showSelectDropdown: true,
          });
        }
      }}
      style={{
        border: `1px solid ${
          disabled ? "rgb(105, 105, 105, 0.5)" : variantColor
        }`,
        cursor: "pointer",
      }}
    >
      {!state.showSelectDropdown && props.value && (
        <SelectValue>{props.value}</SelectValue>
      )}
      {state.showSelectDropdown && (
        <SelectContainer style={{ cursor: "default" }}>
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              padding: "8px",
              display: "flex",
            }}
          >
            <div style={{ flex: "1" }}>
              <Widget
                src={`${config.ownerId}/widget/NEAT.SearchInput`}
                props={{
                  value: state.searchValue,
                  setValue: (value) => State.update({ searchValue: value }),
                  placeholder: "Search Ticker",
                }}
              />
            </div>
            <UpButton />
          </div>
          {!hideTitle && (
            <SelectTiteRow>
              <SelectValue>Ticker</SelectValue>
              {!hideBalance && <SelectValue>Balance</SelectValue>}
            </SelectTiteRow>
          )}
          {data &&
            data
              .filter((row) => {
                if (!state.searchValue || state.searchValue === "") {
                  return true;
                } else {
                  return row.ticker
                    .toUpperCase()
                    .includes(state.searchValue.toUpperCase());
                }
              })
              .map((row, idx) => (
                <SelectRow
                  onClick={(event) => {
                    event.stopPropagation();
                    updateSelectValue && updateSelectValue(row.ticker);
                    State.update({
                      showSelectDropdown: false,
                    });
                  }}
                  key={idx}
                >
                  <SelectValue>{row.ticker.toUpperCase()}</SelectValue>
                  {!hideBalance && <SelectValue>{row.amount}</SelectValue>}
                </SelectRow>
              ))}
        </SelectContainer>
      )}
    </FormInputRow>
    {error && (
      <FormInputLabel>
        <FormInputError>{error}</FormInputError>
      </FormInputLabel>
    )}
  </FormInputContainer>
);
