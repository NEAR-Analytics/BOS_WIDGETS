const sender = Ethers.send("eth_requestAccounts", [])[0];

const tokens = props.tokens ?? [];

State.init({
  ethwithdrawalss: [],
  ercwithdrawals: [],
});

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

const OP_BRIDGE_DEPOSIT_CONTRACT = isTestnet
  ? "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8"
  : "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1";

const OP_BRIDGE_WITHDRAW_CONTRACT = isTestnet
  ? "0x4200000000000000000000000000000000000010"
  : "0x4200000000000000000000000000000000000010";

const bridgeAbiDeposit = [
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
    name: "ERC20WithdrawalFinalized",
    type: "event",
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
    name: "ETHWithdrawalFinalized",
    type: "event",
  },
];

const bridgeAbiWithdrawl = [
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

const bridgeIfaceDeposit = new ethers.utils.Interface(bridgeAbiDeposit);
const bridgeContractDeposit = new ethers.Contract(
  OP_BRIDGE_DEPOSIT_CONTRACT,
  bridgeAbiDeposit,
  Ethers.provider().getSigner()
);

const bridgeContractWithdrawl = new ethers.Contract(
  OP_BRIDGE_WITHDRAW_CONTRACT,
  bridgeAbiWithdrawl,
  Ethers.provider().getSigner()
);

function getETHWithdrawals() {
  console.log("getETHWithdrawals");
  bridgeContractDeposit
    .queryFilter(bridgeContractDeposit.filters.ETHWithdrawalFinalized(sender))
    .then((events) => {
      console.log("finalized", events);
    });

  bridgeContractWithdrawl
    .queryFilter(
      bridgeContractWithdrawl.filters.WithdrawalInitiated(_, _, sender)
    )
    .then((events) => {
      //   console.log("initialized", events);
      events.forEach((ev) => {
        ev.getTransactionReceipt().then((tx) => {
          //   const { value, hash } = tx;
          console.log("tx", tx);
        });
      });
    });
}

getETHWithdrawals();

return <div>...</div>;
