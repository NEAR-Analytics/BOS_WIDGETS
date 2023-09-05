// for goerli
const OP_BRIDGE_DEPOSIT_CONTRACT = "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8";
const OP_BRIDGE_WITHDRAW_CONTRACT =
  "0x4200000000000000000000000000000000000010";
const ETH_ADDR = "0x0000000000000000000000000000000000000000";
const ETH_ADDR_L1 = `0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000`;
const DEFAULT_AMOUNT_ETH = "0.01";
const DEFAULT_AMOUNT = ethers.utils.parseUnits(DEFAULT_AMOUNT_ETH, 18);
const L2_OUTPUT_ORACLE_CONTRACT = `0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0`;
const L1_OPTIMISM_PORTAL_CONTRACT = `0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383`;
const HASH_ZERO =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
// Withdrawal target TX info
// Call initiateWithdraw so the L2 message is passed
// Following TX example here: https://goerli-optimism.etherscan.io/tx/0xb59ff0af1db39be0cc03e7410621ed21ce60e5833f8c4bf97d8747bd8d033bc8
// Manually adjusted amount to 0.01
const ETH_WITHDRAWAL_MESSAGE = `0x32b7006d000000000000000000000000deaddeaddeaddeaddeaddeaddeaddeaddead0000000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000`;
const L2_L1_MESSAGE_PASSER_CONTRACT = `0x4200000000000000000000000000000000000016`;
const ETH_WITHDRAWAL_TARGET = `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`;

// Storage keys
const STORAGE_RESOLVED = "__STORAGE_RESOLVED";
const STORAGE_MESSAGE_SLOT = "__STORAGE_MESSAGE_SLOT";
const STORAGE_L2_INDEX = "__STORAGE_L2_INDEX";

const isMainnet = chainId === 1 || chainId === 10;
const isMantleGoerli = chainId === 5001;
const isGoerli = chainId === 5;

State.init({
  console: "Welcome!",
  transactionHash: `0x38082f56332ef0c5640487a47412aace70db81cdd0bb40e9a896a85953324ba0`,
  resolved: Storage.privateGet(STORAGE_RESOLVED),
  messageSlot: Storage.privateGet(STORAGE_MESSAGE_SLOT),
  l2OutputIndex: Storage.privateGet(STORAGE_L2_INDEX),
  withdrawals: [],
  gettingWithdrawals: false,
});

const opGoerliProvider = new ethers.providers.JsonRpcProvider(
  "https://optimism-goerli.gateway.tenderly.co/"
);
const opGoerliProviderOG = new ethers.providers.JsonRpcProvider(
  "https://goerli.optimism.io"
);
const goerliProvider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/eth_goerli"
);

const provider = Ethers.provider();
const sender = Ethers.send("eth_requestAccounts", [])[0];
const { chainId } = state;

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });

  function getETHWithdrawals() {
    if (state.gettingWithdrawals) return;
    State.update({ gettingWithdrawals: true });
    console.log("getETHWithdrawals");

    const bridgeAbiWithdrawal = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "l1Token",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "l2Token",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: false,
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
        name: "WithdrawalInitiated",
        type: "event",
      },
    ];

    const bridgeContractWithdrawal = new ethers.Contract(
      OP_BRIDGE_WITHDRAW_CONTRACT,
      bridgeAbiWithdrawal,
      opGoerliProvider
    );

    const withdrawals = [];

    bridgeContractWithdrawal
      .queryFilter(
        bridgeContractWithdrawal.filters.WithdrawalInitiated(
          undefined,
          undefined,
          sender
        )
      )
      .then((events) => {
        events
          .sort((a, b) => b.blockNumber - a.blockNumber)
          .forEach((event) => {
            const { args, blockNumber, transactionHash } = event;

            const messagePasserAbi = [
              "event MessagePassed (uint256 indexed nonce, address indexed sender, address indexed target, uint256 value, uint256 gasLimit, bytes data, bytes32 withdrawalHash)",
            ];

            const messagePasserContract = new ethers.Contract(
              L2_L1_MESSAGE_PASSER_CONTRACT,
              messagePasserAbi,
              opGoerliProvider
            );

            messagePasserContract
              .queryFilter(
                messagePasserContract.filters.MessagePassed(
                  undefined,
                  undefined,
                  "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294",
                  undefined,
                  undefined,
                  undefined,
                  undefined
                ),
                blockNumber - 150,
                blockNumber
              )
              .then((events) => {
                const event = events.filter(
                  ({ data }) => data.indexOf(sender.substring(2)) > -1
                )[0];

                const [
                  messageNonce,
                  sender,
                  target,
                  value,
                  minGasLimit,
                  message,
                  withdrawalHash,
                ] = event.args;

                let withdrawal = {
                  blockNumber,
                  transactionHash,
                  messageNonce,
                  sender,
                  target,
                  value,
                  minGasLimit,
                  message,
                  withdrawalHash,
                };

                withdrawals.push(withdrawal);

                State.update({
                  withdrawals,
                });
              });
          });
      });
  }

  getETHWithdrawals();
}

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

// end functional

if (!sender) {
  return (
    <div className="w3button">
      <Web3Connect connectLabel="Connect to a wallet" />
    </div>
  );
}

console.log("state.withdrawals", Object.values(state.withdrawals));

return (
  <div>
    <h3>Console:</h3>
    <p>{state.console}</p>
    {!isGoerli && !isMantleGoerli && (
      <p>Please switch to ETH Goerli or OP Goerli</p>
    )}
    {isGoerli && (
      <>
        <h3>Deposits & Withdrawals</h3>
        <Widget src={`ciocan.near/widget/op-bridge-list`} />

        <button onClick={handleDepositETH}>
          Deposit {DEFAULT_AMOUNT_ETH} ETH to L2
        </button>
        <br />
        <br />
        <p>To initiate a withdraw, switch to OP Goerli network</p>

        {state.withdrawals.length === 0 && <h3>Loading Withdrawals</h3>}
        {!isGoerli && <p>To prove withdrawals switch to ETH Goerli</p>}
        {state.withdrawals.map(({ blockNumber, transactionHash }, i) => {
          return (
            <>
              <br />
              <br />
              <p>TX hash: {transactionHash}</p>
              <button onClick={() => handleWithdrawalProve(i)}>
                Prove Withdrawal
              </button>
              <button onClick={() => handleWithdrawalClaim(i)}>
                Claim Withdrawal
              </button>
            </>
          );
        })}
      </>
    )}
    {isMantleGoerli && (
      <>
        <h3>Deposits & Withdrawals</h3>
        <Widget src={`ciocan.near/widget/op-bridge-list`} />

        <button onClick={handleWithdrawalInitiating}>
          Initiate Withdrawal of {DEFAULT_AMOUNT_ETH} ETH on L2
        </button>
        <br />
        <br />
        <p>
          To make a deposit, or prove a withdraw, switch to ETH Goerli network
        </p>
      </>
    )}
  </div>
);
