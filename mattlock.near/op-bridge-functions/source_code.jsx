const ABI = {
  DEPOSIT: [
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
  ],
  WITHDRAWAL: [
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
  ],
};

const NETWORKS = {
  // eth
  1: {
    DEPOSIT_CONTRACT: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1",
  },
  // goerli
  5: {
    DEPOSIT_CONTRACT: "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8",
    provider:
      props.depositProvider ||
      new ethers.providers.JsonRpcProvider(
        "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      ),
  },
  // optimism mainnet
  10: {
    WITHDRAWAL_CONTRACT: "0x4200000000000000000000000000000000000010",
  },
  // optimism goerli
  420: {
    WITHDRAWAL_CONTRACT: "0x4200000000000000000000000000000000000010",
    provider:
      props.withdrawalProvider ||
      new ethers.providers.JsonRpcProvider(
        // "https://goerli.optimism.io"
        // "https://optimism-goerli.publicnode.com"
        "https://optimism-goerli.gateway.tenderly.co/"
      ),
    archivalProvider:
      props.withdrawalArchivalProvider ||
      new ethers.providers.JsonRpcProvider("https://goerli.optimism.io"),
  },
};

// props override defaults (ETH & OP Goerli)
// parent should handle connecting to ETH wallet, for convenience request the active account
const sender = props.sender || Ethers.send("eth_requestAccounts", [])[0];
const tokens = props.tokens ?? [];

// init state
State.init({
  ethDeposits: [],
  ercDeposits: [],
  ethWithdrawals: [],
  chainId: null,
});

// without chainId can't proceed
const chainId = props.chainId || state.chainId;
if (sender && !chainId) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });
}
if (!chainId) return;

const isMainnet = chainId === 1 || chainId === 10;
const isTestnet = chainId === 5 || chainId === 420;
const depositChainId = isTestnet ? 5 : 1;
const withdrawalChainId = isTestnet ? 420 : 10;

const bridgeIface = new ethers.utils.Interface(ABI.DEPOSIT);
const bridgeContract = new ethers.Contract(
  NETWORKS[depositChainId].DEPOSIT_CONTRACT,
  ABI.DEPOSIT,
  //   Ethers.provider().getSigner()
  NETWORKS[depositChainId].provider
);

const bridgeContractWithdrawal = new ethers.Contract(
  NETWORKS[withdrawalChainId].WITHDRAWAL_CONTRACT,
  ABI.WITHDRAWAL,
  //   Ethers.provider().getSigner()
  NETWORKS[withdrawalChainId].provider
);

// deposits

function getETHDeposits() {
  const deposits = new Map();
  let completedOperations = 0;
  let totalOperations = 0;

  function checkAllOperationsComplete() {
    if (completedOperations === totalOperations) {
      console.log("done");
      State.update({
        ethDeposits: [...deposits].map(([transactionHash, data]) => ({
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
        ercDeposits: [...deposits].map(([transactionHash, data]) => ({
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

if (props.ethDeposits) {
  getETHDeposits();
}

if (props.ercDeposits) {
  getERC20Deposits();
}

// withdrawals

function getETHWithdrawals() {
  if (state.gettingWithdrawals) return;
  State.update({ gettingWithdrawals: true });
  console.log("getETHWithdrawals");

  const ethWithdrawals = [];

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

              ethWithdrawals.push(withdrawal);

              console.log(ethWithdrawals);

              State.update({
                ethWithdrawals,
              });
            });
        });
    });
}

getETHWithdrawals();

// debug rendering

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

const { ethDeposits, ercDeposits } = state;
const deposits = [...ethDeposits, ...ercDeposits].sort(
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
