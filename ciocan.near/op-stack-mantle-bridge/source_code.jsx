const Container = styled.div`
  display: flex;
  gap: 8px;

  .side {
    margin-top: 20px;
  }

  .w3button button {
    background-color: #854ce6;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 12px 15px;
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    margin-left: 20px;
    color: #666;
  }
`;

const { tokens } = VM.require("ciocan.near/widget/op-stack-module");

const l2Network = "mantle";
const l2TestnetId = 5001;
const l2MainnetId = 5000;
const l2Networks = {
  [l2MainnetId]: "Mantle",
  [l2TestnetId]: "Mantle Testnet",
};
const l2IconUrl = "https://token-list.mantle.xyz/data/Mantle/logo.svg";

State.init({
  gasLimit: ethers.BigNumber.from("300000"),
  isToastOpen: false,
});

const { chainId, variant, title, description, isToastOpen } = state;
const isMainnet = chainId === 1 || chainId === l2MainnetId;

const onOpenChange = (v) => {
  State.update({
    isToastOpen: false,
  });
};

const provider = Ethers.provider();
const sender = Ethers.send("eth_requestAccounts", [])[0];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });
}

const handleBridge = (props) => {
  console.log("handleBridge", props);
};

const onConfirm = (props) => {
  console.log("onConfirm", props);
};

const onChangeAmount = (props) => {
  console.log("onChangeAmount", props);
};

const onUpdateToken = (props) => {
  console.log("onUpdateToken", props);
};

if (!sender) {
  return (
    <Container>
      <div className="w3button">
        <Web3Connect connectLabel="Connect to a wallet" />
      </div>
    </Container>
  );
}

return (
  <Layout>
    <div class="title">
      <h5>Mantle Bridge</h5>
    </div>
    <Container>
      <Widget
        src="ciocan.near/widget/op-stack-bridge-ui"
        props={{
          onConfirm,
          onUpdateToken,
          onChangeAmount,
          tokens,
          l2Network,
          l2TestnetId,
          l2MainnetId,
          l2Networks,
          l2IconUrl,
        }}
      />
      <Widget
        src="ciocan.near/widget/toast"
        props={{ open: isToastOpen, variant, title, description, onOpenChange }}
      />
    </Container>
  </Layout>
);
