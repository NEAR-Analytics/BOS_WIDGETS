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
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/test",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: "inscription.near",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "test",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "test",
        },
        ftWrapper: "test.nrc-20.near",
        refFinance: "https://app.ref.finance/",
      };
    case "testnet":
      return {
        ownerId: "inscribe.testnet",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/test-test",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: "inscription.testnet",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "test",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "test",
        },
        ftWrapper: "test.nrc-20.testnet",
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

const Main = styled.div`
  width: 100%;
  min-height: 90vh;
  overflow: hidden;
  background: #101010;
  background-image: url(${ipfsPrefix}/bafkreiak6rio66kqjsobw25gtmy5a7fwwsa4hjn3d25a4tppfylbdepbjq);
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 16px;
  color: white;
  @media (min-width: 640px) {
    padding: 0 40px;
  }
`;

const Spacer = styled.div``;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin: 40px 0;
`;

const NeatLink = styled.a`
  color: rgb(0, 214, 175);
  font-size: 18px;
  font-weight: 600;
  display: inline-block;
  text-decoration: underline;
`;

const HeaderContainer = styled.div`
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 56px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const TabItem = styled("Link")`
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  ${(props) => !props.selected && "opacity: 0.4;"}
  &:hover {
    color: white;
    text-decoration: none;
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
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

function getTab() {
  const tab = props.tab;
  if (["transfer", "wrap", "indexer", "mint"].includes(tab)) {
    return tab;
  } else {
    return "transfer";
  }
}

const tab = getTab();

return (
  <Main>
    <HeaderContainer>
      <Logo
        src={`${ipfsPrefix}/bafkreic65adpnynb7dthyyfjkfxgteij3qq45dmtfcp3knlroyo4nyj4qq`}
        alt="Logo"
      />
      <TabContainer>
        <TabItem
          selected={tab === "transfer"}
          href={`/${config.ownerId}/widget/test?tab=transfer`}
        >
          Transfer
        </TabItem>
        <TabItem
          selected={tab === "wrap"}
          href={`/${config.ownerId}/widget/test?tab=wrap`}
        >
          Wrap
        </TabItem>
        <TabItem
          selected={tab === "indexer"}
          href={`/${config.ownerId}/widget/test?tab=indexer`}
        >
          Indexer
        </TabItem>
        <TabItem
          selected={tab === "mint"}
          href={`/${config.ownerId}/widget/test?tab=mint`}
        >
          Mint
        </TabItem>
      </TabContainer>
      <Spacer />
    </HeaderContainer>
    <BodyContainer>
      {tab === "mint" && <Widget src={`${config.ownerId}/widget/test.Mint`} />}
      {tab === "indexer" && (
        <Widget src={`${config.ownerId}/widget/test.Indexer`} />
      )}
      {tab === "transfer" && (
        <Widget src={`${config.ownerId}/widget/test.Transfer`} />
      )}
      {tab === "wrap" && <Widget src={`${config.ownerId}/widget/test.Wrap`} />}
    </BodyContainer>
  </Main>
);
