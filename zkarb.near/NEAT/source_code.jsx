const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
// Config for Bos app
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "inscribe.near",
        nodeUrl: "https://rpc.mainnet.near.org",
        indexerUrl: "https://inscription-indexer-a16497da251b.herokuapp.com/v1",
        contractName: "inscription.near",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
      };
    case "testnet":
      return {
        ownerId: "inscribe.testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        indexerUrl: "https://inscription-indexer-a16497da251b.herokuapp.com/v1",
        contractName: "inscription.testnet",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
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
  height: 100vh;
  background: #101010;
  background-image: url(${ipfsPrefix}/bafkreiak6rio66kqjsobw25gtmy5a7fwwsa4hjn3d25a4tppfylbdepbjq);
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
  margin-top: 80px;
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
`;

const TabItem = styled.div`
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  ${(props) => !props.selected && "opacity: 0.4;"}
`;

State.init({
  tab: "Mint", // Mint / Indexer
});

const { tab } = state;
return (
  <Main>
    <HeaderContainer>
      <Logo
        src={`${ipfsPrefix}/bafkreic65adpnynb7dthyyfjkfxgteij3qq45dmtfcp3knlroyo4nyj4qq`}
        alt="Logo"
      />
      <TabContainer>
        <TabItem
          selected={tab === "Mint"}
          onClick={() => State.update({ tab: "Mint" })}
        >
          Mint
        </TabItem>
        <TabItem
          style={{ cursor: "allowed" }}
          // selected={tab === "Indexer"}
          // onClick={() => State.update({ tab: "Indexer" })}
        >
          Indexer
        </TabItem>
      </TabContainer>
      <Spacer />
    </HeaderContainer>
    <BodyContainer>
      {tab === "Mint" && <Widget src={`${config.ownerId}/widget/NEAT.Mint`} />}
      {/* {tab === "Indexer" && (
        <Widget src={`${config.ownerId}/widget/NEAT.Indexer`} />
      )} */}
    </BodyContainer>
  </Main>
);
