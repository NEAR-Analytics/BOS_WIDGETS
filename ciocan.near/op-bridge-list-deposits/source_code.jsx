const sender = Ethers.send("eth_requestAccounts", [])[0];

const tokens = props.tokens ?? [];

State.init({
  ethdeposits: [],
  ercdeposits: [],
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

if (![1, 10].includes(chainId)) {
  return <h6>Switch to Ethereum network to see the deposits list.</h6>;
}

const OP_BRIDGE_DEPOSIT_CONTRACT = isTestnet
  ? "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8"
  : "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1";

const bridgeAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_minGasLimit",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "depositERC20",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "ERC20DepositInitiated",
    type: "event",
  },
];

const bridgeIface = new ethers.utils.Interface(bridgeAbi);
const bridgeContract = new ethers.Contract(
  OP_BRIDGE_DEPOSIT_CONTRACT,
  bridgeAbi,
  Ethers.provider().getSigner()
);

function getETHDeposits() {
  // console.log("getETHDeposits");
  const deposits = new Map();
  let completedOperations = 0;
  let totalOperations = 0;

  function checkAllOperationsComplete() {
    if (completedOperations === totalOperations) {
      console.log("done");
      State.update({
        ethdeposits: [...deposits].map(([transactionHash, data]) => ({
          ...data,
          transactionHash,
        })),
      });
    }
  }

  bridgeContract
    .queryFilter(bridgeContract.filters.ETHDepositInitiated(sender))
    .then((events) => {
      // console.log(events);
      totalOperations = events.length * 3; // Three async operations for each event

      events.forEach((ev) => {
        const { blockNumber, transactionHash } = ev;
        deposits.set(transactionHash, { blockNumber, symbol: "ETH" });

        ev.getTransaction().then((tx) => {
          const { value, hash } = tx;
          // console.log("tx", tx);
          const amount = ethers.utils.formatUnits(value, 18);
          deposits.set(hash, {
            ...deposits.get(hash),
            amount,
          });
          completedOperations++;
          checkAllOperationsComplete();
        });
        ev.getTransactionReceipt().then((tx) => {
          // console.log("txr", tx);
          const { status, type, transactionHash } = tx;
          deposits.set(transactionHash, {
            ...deposits.get(transactionHash),
            status,
            type,
          });
          completedOperations++;
          checkAllOperationsComplete();
        });
        ev.getBlock().then((block) => {
          // console.log(transactionHash, "block", block);
          const { timestamp } = block;
          deposits.set(transactionHash, {
            ...deposits.get(transactionHash),
            timestamp,
          });
          completedOperations++;
          checkAllOperationsComplete();
        });
      });
    });
}

function getERC20Deposits() {
  console.log("getERC20Deposits");
  const deposits = new Map();
  let completedOperations = 0;
  let totalOperations = 0;

  function checkAllOperationsComplete() {
    if (completedOperations === totalOperations) {
      console.log("done");
      State.update({
        ercdeposits: [...deposits].map(([transactionHash, data]) => ({
          ...data,
          transactionHash,
        })),
      });
    }
  }

  bridgeContract
    .queryFilter(bridgeContract.filters.ERC20DepositInitiated(_, _, sender))
    .then((events) => {
      // console.log(events);
      totalOperations = events.length * 3; // Three async operations for each event

      events.forEach((ev) => {
        const { blockNumber, transactionHash } = ev;
        deposits.set(transactionHash, { blockNumber });

        ev.getTransaction().then((tx) => {
          // console.log("tx", tx);
          const { hash, data } = tx;
          const decodedData = bridgeIface.parseTransaction({ data });
          const [l1Token, l2Token, value] = decodedData.args;
          const token = tokens.find((t) => t.address === l1Token);
          const amount = ethers.utils.formatUnits(value, token?.decimals || 6);
          deposits.set(hash, {
            ...deposits.get(hash),
            amount,
            symbol: token?.symbol || "???",
          });
          completedOperations++;
          checkAllOperationsComplete();
        });
        ev.getTransactionReceipt().then((tx) => {
          // console.log("txr", tx);
          const { status, type, transactionHash } = tx;
          deposits.set(transactionHash, {
            ...deposits.get(transactionHash),
            status,
            type,
          });
          completedOperations++;
          checkAllOperationsComplete();
        });
        ev.getBlock().then((block) => {
          // console.log(transactionHash, "block", block);
          const { timestamp } = block;
          deposits.set(transactionHash, {
            ...deposits.get(transactionHash),
            timestamp,
          });
          completedOperations++;
          checkAllOperationsComplete();
        });
      });
    });
}

getETHDeposits();
getERC20Deposits();

function renderDeposit(deposit) {
  //   console.log("deposit", deposit);
  const { timestamp, amount, transactionHash, symbol } = deposit;
  const date = new Date(timestamp * 1000);
  const href = `https://${
    isTestnet ? "goerli." : ""
  }etherscan.io/tx/${transactionHash}`;
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
    </tr>
  );
}

const { ethdeposits, ercdeposits } = state;
const deposits = [...ethdeposits, ...ercdeposits].sort(
  (a, b) => b.timestamp - a.timestamp
);

return (
  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th>Amount</th>
        <th>Token</th>
        <th>Transaction</th>
      </tr>
    </thead>
    <tbody>{deposits.map(renderDeposit)}</tbody>
  </table>
);
