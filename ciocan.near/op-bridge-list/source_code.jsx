const provider = Ethers.provider();
const sender = Ethers.send("eth_requestAccounts", [])[0];

State.init({
  deposits: [],
  withdrawls: [],
});

const { chainId, withdrawls } = state;

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

const bridgeAbi = [
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

function getDeposits() {
  // console.log("getDeposits");
  const bridgeContract = new ethers.Contract(
    OP_BRIDGE_DEPOSIT_CONTRACT,
    bridgeAbi,
    Ethers.provider().getSigner()
  );

  const deposits = new Map();
  let completedOperations = 0;
  let totalOperations = 0;

  function checkAllOperationsComplete() {
    if (completedOperations === totalOperations) {
      console.log("done");
      State.update({ deposits: [...deposits] });
    }
  }

  bridgeContract
    .queryFilter(bridgeContract.filters.ETHDepositInitiated(sender))
    .then((events) => {
      // console.log(events);
      totalOperations = events.length * 3; // Three async operations for each event

      events.forEach((ev) => {
        const { blockNumber, transactionHash } = ev;
        deposits.set(transactionHash, { blockNumber });

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
          //   console.log(transactionHash, "block", block);
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

getDeposits();

function renderDeposit([key, value]) {
  //   console.log("key", key, value);
  const { timestamp, amount } = value;
  const date = new Date(timestamp * 1000);
  const href = `https://${isTestnet ? "goerli." : ""}etherscan.io/tx/${key}`;
  const hash = `${key.substr(0, 6)}...${key.substr(-4)}`;
  return (
    <tr>
      <td>{date.toUTCString()}</td>
      <td>{amount}</td>
      <td>
        <a href={href} target="_blank">
          {hash}
        </a>
      </td>
    </tr>
  );
}

console.log(state.deposits);

return (
  <div>
    <h6>Deposits</h6>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Amount</th>
          <th>Transaction</th>
        </tr>
      </thead>
      <tbody>{[...state.deposits].reverse().map(renderDeposit)}</tbody>
    </table>
  </div>
);
