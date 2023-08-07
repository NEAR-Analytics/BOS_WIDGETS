// for goerli
const OP_BRIDGE_DEPOSIT_CONTRACT = "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8";
const OP_BRIDGE_WITHDRAW_CONTRACT =
  "0x4200000000000000000000000000000000000010";
const ETH_ADDR = "0x0000000000000000000000000000000000000000";

const provider = Ethers.provider();
const sender = Ethers.send("eth_requestAccounts", [])[0];

const { chainId } = state;

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });
}

const isMainnet = chainId === 1 || chainId === 10;
const isTestnet = chainId === 5 || chainId === 420;
const isCorrectNetwork = isMainnet || isTestnet;

console.log("isCorrectNetwork", isCorrectNetwork);

const bridgeAbi = [
  {
    inputs: [
      { internalType: "uint32", name: "_l2Gas", type: "uint32" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "depositETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const bridgeIface = new ethers.utils.Interface(bridgeAbi);

function handleDepositETH() {
  console.log("deposit", isTestnet);
  if (!isCorrectNetwork) return;
  if (!isTestnet) return;

  const amountBig = ethers.utils.parseUnits("0.05", 18);

  const encodedData = bridgeIface.encodeFunctionData(
    "depositETH(uint32, bytes)",
    [200000, 0]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: OP_BRIDGE_DEPOSIT_CONTRACT,
      data: encodedData,
      value: amountBig,
      gasLimit,
    })
    .then((tx) => {
      consle.log("tx:", tx);
    })
    .catch((e) => {
      console.log("bridge error:", e);
    });
}

function handleWithdraw() {
  console.log("withdraw");
  if (!isCorrectNetwork) return;
  if (!isTestnet) return;
}

if (!sender) {
  return (
    <div className="w3button">
      <Web3Connect connectLabel="Connect to a wallet" />
    </div>
  );
}

return (
  <div>
    <button onClick={handleDepositETH}>Deposit 0.05 ETH to L2</button>
    <button onClick={handleWithdraw}>Withdraw 0.05 ETH</button>
  </div>
);
