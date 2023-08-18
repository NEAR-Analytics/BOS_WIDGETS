const sender = Ethers.send("eth_requestAccounts", [])[0];

const tokens = props.tokens ?? [];

State.init({
  withdrawals: [],
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
  // console.log("getETHWithdrawals");
  const withdrawals = new Map();
  let completedOperations = 0;
  let totalOperations = 0;

  function checkAllOperationsComplete() {
    if (completedOperations === totalOperations) {
      // console.log("done");
      State.update({
        withdrawals,
      });
    }
  }

  // bridgeContractDeposit
  //   .queryFilter(bridgeContractDeposit.filters.ETHWithdrawalFinalized(sender))
  //   .then((events) => {
  //     console.log("finalized", events);
  //   });

  bridgeContractWithdrawl
    .queryFilter(
      bridgeContractWithdrawl.filters.WithdrawalInitiated(
        undefined,
        undefined,
        sender
      )
    )
    .then((events) => {
      console.log("WithdrawalInitiated", events);
      totalOperations = events.length * 1; // Three async operations for each event

      events
        .sort((a, b) => b.blockNumber - a.blockNumber)
        .forEach((event) => {
          const { args, logIndex, blockNumber, transactionHash } = event;
          const [l1token, l2token, from, to, amount, extraData] = args;
          // console.log(transactionHash, event);
          const token = tokens.find((t) => t.address === l1token);

          withdrawals.set(transactionHash, {
            l1token,
            l2token,
            // from,
            // to,
            symbol: token?.symbol ?? "????",
            amount: ethers.utils.formatUnits(amount, token?.decimals || 18),
            extraData,
            logIndex,
            blockNumber,
            transactionHash,
          });

          event.getBlock().then((block) => {
            // console.log(transactionHash, "block", block);
            const { timestamp } = block;
            withdrawals.set(transactionHash, {
              ...withdrawals.get(transactionHash),
              timestamp,
            });
            completedOperations++;
            checkAllOperationsComplete();
          });
        });
    });
}

getETHWithdrawals();

function renderWithdrawl([_, withdrawl]) {
  // console.log("withdraw", withdrawl);
  const { timestamp, amount, transactionHash, symbol } = withdrawl;
  const date = new Date(timestamp * 1000);
  const href = `https://${
    isTestnet ? "goerli-optimism.etherscan.io" : "optimistic.etherscan.io"
  }/tx/${transactionHash}`;
  const hash = `${transactionHash.substr(0, 6)}...${transactionHash.substr(
    -4
  )}`;
  return (
    <tr>
      <td>{date.toUTCString()}</td>
      <td>{amount}</td>
      <td>{symbol}</td>
      <td>
        <a href={href} target="_blank">
          {hash}
        </a>
      </td>
      <td>status</td>
      <td>
        <button>action</button>
      </td>
    </tr>
  );
}

return (
  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th>Amount</th>
        <th>Token</th>
        <th>Transaction</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>{[...state.withdrawals].map(renderWithdrawl)}</tbody>
  </table>
);
