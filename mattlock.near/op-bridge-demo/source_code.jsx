State.init({ console: "Welcome!" });
// for goerli
const OP_BRIDGE_DEPOSIT_CONTRACT = "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8";
const OP_BRIDGE_WITHDRAW_CONTRACT =
  "0x4200000000000000000000000000000000000010";
const L2_TO_L1_MESSAGE_PASSER = `0x4200000000000000000000000000000000000016`;
const ETH_ADDR = "0x0000000000000000000000000000000000000000";
const WITHDRAW_MESSAGE = `0x32b7006d000000000000000000000000deaddeaddeaddeaddeaddeaddeaddeaddead000000000000000000000000000000000000000000000000000000b1a2bc2ec50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000`;
const WITHDRAW_TARGET = `0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000`;
const DEFAULT_AMOUNT = ethers.utils.parseUnits("0.05", 18);

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
const isOPGoerli = chainId === 420;
const isGoerli = chainId === 5;

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
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "extraData",
        type: "bytes",
      },
    ],
    name: "ETHDepositInitiated",
    type: "event",
  },
];
const bridgeIface = new ethers.utils.Interface(bridgeAbi);

const L2MessageAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_gasLimit",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "initiateWithdrawal",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
const L2MessageIface = new ethers.utils.Interface(L2MessageAbi);

function getDeposits() {
  console.log("getDeposits");
  if (!isGoerli)
    return State.update({
      console: `Switch to ETH Goerli to see your deposits`,
    });
  const bridgeContract = new ethers.Contract(
    OP_BRIDGE_DEPOSIT_CONTRACT,
    bridgeAbi,
    Ethers.provider().getSigner()
  );

  bridgeContract
    .queryFilter(bridgeContract.filters.ETHDepositInitiated(sender))
    .then((events) => {
      console.log(events);
      State.update({
        deposits: JSON.stringify(
          events.map(({ transactionHash }) => transactionHash)
        ),
      });
      events.forEach((ev) => {
        ev.getTransaction().then((tx) => console.log("tx", tx));
        ev.getTransactionReceipt().then((tx) => console.log("txr", tx));
      });
    });
}

function handleDepositETH() {
  if (!isGoerli)
    return State.update({
      console: `switch to Goerli Testnet (not Optimism Goerli, ETH Goerli) to deposit ETH to OP Goerli`,
    });

  const encodedData = bridgeIface.encodeFunctionData(
    "depositETH(uint32, bytes)",
    [200000, 0]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: OP_BRIDGE_DEPOSIT_CONTRACT,
      data: encodedData,
      value: DEFAULT_AMOUNT,
      gasLimit,
    })
    .then((tx) => {
      consle.log("tx:", tx);
    })
    .catch((e) => {
      console.log("bridge error:", e);
    });
}

function handleWithdrawInitiating() {
  if (!isOPGoerli)
    return State.update({
      console: `switch to OP Goerli testnet to initiate a withdrawal transaction`,
    });

  console.log("withdraw");

  console.log(ethers.utils.isHexString(WITHDRAW_MESSAGE));

  const encodedData = L2MessageIface.encodeFunctionData(
    "initiateWithdrawal(address, uint256, bytes)",
    [WITHDRAW_TARGET, 0, ethers.utils.arrayify(WITHDRAW_MESSAGE)]
  );

  console.log("encoded");

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: L2_TO_L1_MESSAGE_PASSER,
      data: encodedData,
      value: DEFAULT_AMOUNT,
      gasLimit,
    })
    .then((tx) => {
      consle.log("tx:", tx);
    })
    .catch((e) => {
      console.log("bridge error:", e);
    });
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
    <h3>Console:</h3>
    <p>{state.console}</p>
    <button onClick={getDeposits}>Show Deposits</button>
    <br />
    <br />
    <button onClick={handleDepositETH}>Deposit 0.05 ETH to L2</button>
    <br />
    <br />
    <button onClick={handleWithdrawInitiating}>Withdraw 0.05 ETH on L2</button>
    <br />
    <br />
    {state.deposits && state.deposits.length > 0 && (
      <>
        <h3>Deposit Hashes:</h3>
        <div>{state.deposits}</div>
      </>
    )}
  </div>
);
