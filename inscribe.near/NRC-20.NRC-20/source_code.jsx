const FormFragment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  justify-content: center;
  align-items: center;
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

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormRowTitle = styled.div``;

const FormRowValue = styled.div``;

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
        ftWrapper: "neat.nrc-20.near",
        refFinance: "https://app.ref.finance/",
        minMintEvents: 1_000_000,
        minHolders: 1_000,
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
        minMintEvents: 10,
        minHolders: 5,
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

const TopButton = styled("Link")`
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  border-radius: 12px;
  padding: 8px 20px;
  border: 0;
  background: #101010;
  color: white;
  border: 1px solid #ffffff11;
  transition: all 0.3s ease-in-out;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
    background: #333333;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TopButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const NRC20Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 650px;
  padding: 24px 0;
  @media (min-width: 640px) {
    padding: 0px;
  }
`;



if (props.tick) {
  return (
    <Widget
      src={`${config.ownerId}/widget/NRC-20.TokenDescription`}
      props={{
        tick: props.tick,
      }}
    />
  );
}

const currentTab = state.currentTab ?? "all";

const FormTabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -20px;
`;

const TabOuter = styled.div`
  background: #333333;
  display: flex;
  gap: 2px;
  border-radius: 8px;
  padding: 2px;
`;

const FormTab = styled.div`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 12px;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  &:hover {
    background: #101010;
    opacity: 1;
  }
  ${(props) =>
    props.selected
      ? `
      background: #101010;
    `
      : `
    opacity: 0.6;
  `}
`;

return (
  <FormFragment>
    <NRC20Header>
      <FormTitle style={{ fontWeight: "bold" }}>Search NRC-20</FormTitle>
      <TopButton href={`/${config.ownerId}/widget/NRC-20?tab=deploy`}>
        Deploy
      </TopButton>
    </NRC20Header>
    <FormContainer>
      <FormTabContainer>
        <TabOuter>
          <FormTab
            selected={currentTab === "all"}
            onClick={() => State.update({ currentTab: "all" })}
          >
            All
          </FormTab>
          <FormTab
            selected={currentTab === "in-progress"}
            onClick={() => State.update({ currentTab: "in-progress" })}
          >
            In-Progress
          </FormTab>
          <FormTab
            selected={currentTab === "completed"}
            onClick={() => State.update({ currentTab: "completed" })}
          >
            Completed
          </FormTab>
        </TabOuter>
      </FormTabContainer>
      <FormBody>
        <Widget
          src={`${config.ownerId}/widget/NEAT.SearchInput`}
          props={{
            value: state.searchValue,
            setValue: (value) => State.update({ searchValue: value }),
            placeholder: "Search Inscription",
          }}
        />
        <Widget
          src={`${config.ownerId}/widget/NRC-20.TokensTable`}
          props={{
            searchValue: state.searchValue,
            currentTab: state.currentTab,
          }}
        />
      </FormBody>
    </FormContainer>
  </FormFragment>
);
