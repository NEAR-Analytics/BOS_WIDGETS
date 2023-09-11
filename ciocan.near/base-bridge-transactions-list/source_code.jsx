const tokens = [
  // eth testnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 5,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    chainId: 5,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
  // eth mainnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainId: 1,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
];

const Container = styled.div`
    --op-primary-600: #EB0822;

    td, th {
        padding: 2px 5px;
        font-size: 12px;
    }
    button,
    fieldset,
    input {
        all: unset;
    }

    .TabsRoot {
        display: flex;
        flex-direction: column;
        max-width: 640px;
    }

    .TabsList {
        flex-shrink: 0;
        display: flex;
        border-bottom: 1px solid var(--mauve-6);
    }

    .TabsTrigger {
        font-family: inherit;
        background-color: white;
        padding: 0 20px;
        height: 45px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        line-height: 1;
        user-select: none;
    }
    .TabsTrigger:first-child {
        border-top-left-radius: 6px;
    }
    .TabsTrigger:last-child {
        border-top-right-radius: 6px;
    }
    .TabsTrigger[data-state='active'] {
        box-shadow: inset 0 -1px 0 0 var(--op-primary-600), 0 1px 0 0 var(--op-primary-600);
    }

    .TabsContent {
        flex-grow: 1;
        padding: 20px;
        background-color: white;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        outline: none;
    }
`;

const sender = Ethers.send("eth_requestAccounts", [])[0];

State.init({
  ethdeposits: [],
  ercdeposits: [],
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

const isMainnet = chainId === 1 || chainId === 8453;
const isTestnet = chainId === 5 || chainId === 84531;
const isCorrectNetwork = isMainnet || isTestnet;
const isEthNetwork = [1, 5].includes(chainId);
const isBaseNetwork = [8453, 84531].includes(chainId);

const BASE_BRIDGE_DEPOSIT_CONTRACT = isTestnet
  ? //
    "0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a"
  : // "0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA"
    "0x3154Cf16ccdb4C6d922629664174b904d80F2C35";

const BASE_BRIDGE_WITHDRAW_CONTRACT = isTestnet
  ? "0x4200000000000000000000000000000000000010"
  : "0x4200000000000000000000000000000000000010";

const bridgeAbiDeposit = [
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

const bridgeIface = new ethers.utils.Interface(bridgeAbiDeposit);
const bridgeContract = new ethers.Contract(
  BASE_BRIDGE_DEPOSIT_CONTRACT,
  bridgeAbiDeposit,
  Ethers.provider().getSigner()
);

function getETHDeposits() {
  console.log("getETHDeposits");
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

const bridgeContractWithdrawal = new ethers.Contract(
  BASE_BRIDGE_WITHDRAW_CONTRACT,
  bridgeAbiWithdrawal,
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

  bridgeContractWithdrawal
    .queryFilter(
      bridgeContractWithdrawal.filters.WithdrawalInitiated(
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

function renderWithdrawal([_, withdrawal]) {
  // console.log("withdraw", withdrawal);
  const { timestamp, amount, transactionHash, symbol } = withdrawal;
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
  <Container>
    <Tabs.Root className="TabsRoot" defaultValue="deposits">
      <Tabs.List className="TabsList" aria-label="Transactions List">
        <Tabs.Trigger className="TabsTrigger" value="deposits">
          Deposits
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="withdrawals">
          Withdrawals
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="deposits">
        {!isEthNetwork ? (
          <h6>Switch to Ethereum network to see the deposits list.</h6>
        ) : (
          <>
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
          </>
        )}
      </Tabs.Content>
      <Tabs.Content className="TabsContent" value="withdrawals">
        {!isBaseNetwork ? (
          <h6>Switch to BASE network to see the withdrawal list.</h6>
        ) : (
          <>
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
              <tbody>{[...state.withdrawals].map(renderWithdrawal)}</tbody>
            </table>
          </>
        )}
      </Tabs.Content>
    </Tabs.Root>
  </Container>
);
