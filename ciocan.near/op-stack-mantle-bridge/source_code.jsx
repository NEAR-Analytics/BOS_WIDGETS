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
  .link {
    margin-top: 1rem;
    a {
        color: black;
    }
  }
`;

const { tokens, ethAbi, erc20Abi } = VM.require(
  "ciocan.near/widget/op-stack-module"
);

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

const { chainId, variant, title, description, isToastOpen, gasLimit } = state;
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

function showToast({ variant, title, description }) {
  State.update({
    isToastOpen: true,
    variant: variant ?? "error",
    title: title ?? "Transaction rejected",
    description: description ?? "The transaction was rejected",
  });
}

function handleDepositETH(props) {
  console.log("handleDepositETH", props);
  const { amount, token } = props;
  const amountBig = ethers.utils.parseUnits(`${amount}`, 18);

  const bridgeEthIface = new ethers.utils.Interface(ethAbi);
  const encodedData = bridgeEthIface.encodeFunctionData(
    "depositETH(uint32, bytes)",
    [200000, 0]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: token.extensions.optimismBridgeAddress,
      data: encodedData,
      value: amountBig,
      gasLimit,
    })
    .then((tx) => {
      consle.log("depositETH ok:", tx);
    })
    .catch((e) => {
      console.log("depositETH error:", e);
      if (e.reason) {
        showToast({ description: e.reason });
      } else {
        showToast({
          variant: "success",
          title: "SUCCESS",
          description: "ETH deposit ok",
        });
      }
    });
}

function handleDepositERC20(props) {
  console.log("handleDepositERC20", props);
  const MNT_MIN_GAS = `200000`;
  const ERC20_APPROVE_GAS = `81942`;
  const ERC20_TRANSFER_GAS = `192460`;
  const { amount, token } = props;

  const l2ChainId = isMainnet ? l2MainnetId : l2TestnetId;
  const tokenL2 = tokens
    .filter((t) => t.symbol === token.symbol)
    .find((t) => t.chainId === l2ChainId);

  const bridgeErc20Iface = new ethers.utils.Interface(erc20Abi);
  const erc20Contract = new ethers.Contract(
    token.address,
    bridgeErc20Iface,
    provider.getSigner()
  );
  const bridgeContract = new ethers.Contract(
    token.extensions.optimismBridgeAddress,
    bridgeErc20Iface,
    provider.getSigner()
  );

  const amountBig = ethers.utils.parseUnits(`${amount}`, token.decimals);

  erc20Contract
    .approve(token.extensions.optimismBridgeAddress, amountBig, {
      gasLimit: ERC20_APPROVE_GAS,
    })
    .then((approveData) => {
      console.log("approve", approveData);

      bridgeContract
        .depositERC20(
          token.address,
          tokenL2.address,
          amountBig,
          MNT_MIN_GAS,
          [],
          {
            gasLimit: ERC20_TRANSFER_GAS,
          }
        )
        .then((tx) => {
          console.log("depositERC20 ok", tx);
          showToast({
            variant: "success",
            title: "SUCCESS",
            description: "ERC20 deposit ok",
          });
        })
        .catch((e) => {
          console.log("depositERC20 error:", e);
          showToast({ description: e.reason });
        });
    })
    .catch((e) => {
      console.log("approve error:", e);
      showToast({ description: e.reason });
    });
}

const onConfirm = (props) => {
  console.log("onConfirm", props);
  const { network, token } = props;
  if (network !== "ethereum") {
    showToast({
      title: "Please switch to Ethereum",
      description: "withdrawals are not yet supported",
    });
    return;
  }
  if (token.symbol === "ETH") {
    handleDepositETH(props);
  } else {
    handleDepositERC20(props);
  }
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

const depositsUrl = `https://bridge${
  isMainnet ? "" : ".testnet"
}.mantle.xyz/account/deposit`;

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
          disableNetworkChange: true,
        }}
      />
      <Widget
        src="ciocan.near/widget/toast"
        props={{ open: isToastOpen, variant, title, description, onOpenChange }}
      />
    </Container>
    <div class="link">
      To check the deposit status{" "}
      <a href={depositsUrl} target="_blank">
        click here
      </a>
    </div>
  </Layout>
);
