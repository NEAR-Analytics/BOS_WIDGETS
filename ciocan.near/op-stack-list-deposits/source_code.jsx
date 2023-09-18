const sender = Ethers.send("eth_requestAccounts", [])[0];

const { tokens, ethAbi, erc20Abi } = VM.require(
  "ciocan.near/widget/op-stack-module"
);

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

const {
  opTestnetChainId,
  opMainnetChainId,
  opTestnetBridgeAddress,
  opMainnetBridgeAddress,
} = props;

const isTestnet = chainId === 5 || chainId === opTestnetChainId;

if (![1, 5].includes(chainId)) {
  return <h6>Switch to Ethereum network to see the deposits list.</h6>;
}

const OP_BRIDGE_DEPOSIT_CONTRACT = isTestnet
  ? opTestnetBridgeAddress ?? "0xc92470D7Ffa21473611ab6c6e2FcFB8637c8f330"
  : opMainnetBridgeAddress ?? "0x95fC37A27a2f68e3A647CDc081F0A89bb47c3012";

const bridgeAbi = [...ethAbi, ...erc20Abi];

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
      <td>{date.toLocaleString()}</td>
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
        <th>Date</th>
        <th>Amount</th>
        <th>Token</th>
        <th>Transaction</th>
      </tr>
    </thead>
    <tbody>{deposits.map(renderDeposit)}</tbody>
  </table>
);
