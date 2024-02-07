/*
TODO
[x] store all abis in gist
[x] use a block range op sepolia RPC (blockpi) for subsequent calls after tenderly
[x] get balances for eth on all networks
[] add mainnet contract addresses
[x] clean up network contracts and remove const contract addresses and contract instances
[] clean up withdraw and deposits
[] only get withdraw message data when user clicks prove or claim
[] add erc20 deposit for usdc
[] add erc20 withdrawal for usdc

TODO bridge-ui
[x] update bridge UI to pass in explorer links mapped to network
[x] add buttons prove and claim withdrawals to bridge-ui
*/

const L2StandardBridge = "0x4200000000000000000000000000000000000010";
const L2_L1_MESSAGE_PASSER_CONTRACT = `0x4200000000000000000000000000000000000016`;
const ETH_WITHDRAWAL_TARGET = `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`;
const DEFAULT_AMOUNT_ETH = "0.01";
const DEFAULT_AMOUNT = ethers.utils.parseUnits(DEFAULT_AMOUNT_ETH, 18);
const HASH_ZERO =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const OP_SEPOLIA_CHAIN_ID = 11155420;
const SEPOLIA_CHAIN_ID = 11155111;
const ETH_CHAIN_ID = 1;
const OP_CHAIN_ID = 10;
const VALID_CHAIN_ID = [
  ETH_CHAIN_ID,
  OP_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  OP_SEPOLIA_CHAIN_ID,
];
const depositDisabledMsg =
  "For deposits, please switch to Ethereum mainnet or Sepolia testnet.";
const withdrawDisabledMsg =
  "For withdrawals, please switch to OP mainnet or OP Sepolia testnet.";

const tokens = {
  eth: {
    icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
    decimals: 18,
  },
  // usdc: {
  //   icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
  //   decimals: 6,
  // },
};

// state
const defaultDeposit = {
  network: {
    id: "l1",
    name: "Ethereum",
  },
  assets: [
    {
      id: "eth",
      name: "ETH",
      selected: true,
      balance: "0.00",
    },
  ],
};
const defaultWithdraw = {
  network: {
    id: "l2",
    name: "Optimism",
  },
  assets: [
    {
      id: "eth",
      name: "ETH",
      selected: true,
      balance: "0.00",
    },
  ],
};

if (!state.initialized) {
  console.log("INITIALIZED");
  initState({
    initLogs: false,
    initialized: true,
    deposit: defaultDeposit,
    withdraw: defaultWithdraw,
    amount: "0.0",
    deposits: [],
    withdrawals: [],
    ethDeposits: [],
    ethWithdrawals: [],
    tokens: [],
    tab: "deposit",
  });
  return "";
}

// get account and current provider chainId

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) {
  return (
    <div className="w3button">
      <Web3Connect connectLabel="Connect to a wallet" />
    </div>
  );
}

if (!state.chainId) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      let network = "incorrect",
        log;
      if (chainId === SEPOLIA_CHAIN_ID || chainId === OP_SEPOLIA_CHAIN_ID) {
        network = "testnet";
      }
      if (chainId === ETH_CHAIN_ID || chainId === OP_CHAIN_ID) {
        network = "mainnet";
      }
      if (chainId === OP_SEPOLIA_CHAIN_ID || chainId === OP_CHAIN_ID) {
        log = depositDisabledMsg;
      }
      console.log("chainId", chainId, network);

      const L1ExplorerLink = `https://${
        network === "testnet" ? "sepolia." : ""
      }etherscan.io/tx/`;
      const L2ExplorerLink = `https://${
        network === "testnet" ? "sepolia-optimism." : "optimistic"
      }etherscan.io/tx/`;

      State.update({ chainId, network, log, L1ExplorerLink, L2ExplorerLink });
    })
    .catch((e) => {
      console.log(e);
    });
  return "";
}
const { chainId, network } = state;

if (!network) {
  return "";
}

if (!VALID_CHAIN_ID.includes(chainId)) {
  return (
    <p>
      Please switch to Ethereum or Optimism mainnet; or Sepolia or OP Sepolia
    </p>
  );
}

// fetch abis

const L2StandardBridgeAbi = fetch(
  "https://gist.githubusercontent.com/mattlockyer/4ecda9c3b707fe7e3328c9d2da9ce3a1/raw/1eae7c74e2d44df2067a1929bb8a3b2647926fde/L2StandardBridge.json"
);

const L1StandardBridgeProxyAbi = fetch(
  "https://gist.githubusercontent.com/mattlockyer/b5ddd8070db7479b527674b14b928c4d/raw/39c570a8c53c980482c44502680d0ed3c39e7848/L1StandardBridgeProxy.json"
);

const L2OutputOracleAbi = fetch(
  "https://gist.githubusercontent.com/mattlockyer/8f8d9bc4442150d425811ee15c7565de/raw/5ca76848e0febc52fe6d872926b8b3ad2c754664/L2OutputOracle.json"
);

const L1OptimismPortalAbi = fetch(
  "https://gist.githubusercontent.com/mattlockyer/186c53a813484225b0e0ed682c4673e4/raw/43be17194b0e4f4dc3611780c8a9a6c8cd12218b/OptimismPortal.json"
);

// wait for abi to load
if (
  !L2StandardBridgeAbi.ok ||
  !L1StandardBridgeProxyAbi.ok ||
  !L2OutputOracleAbi.ok ||
  !L1OptimismPortalAbi.ok
) {
  return "";
}

// TODO UPDATE contracts and mainnet providers
const contracts = {
  mainnet: {
    L1StandardBridgeProxy: `0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1`,
    L2OutputOracleProxy: `0xdfe97868233d1aa22e815a266982f2cf17685a27`,
    L1OptimismPortalProxy: `0xbEb5Fc579115071764c7423A4f12eDde41f106Ed`,
    eth: {
      decimals: 18,
      deposit: "0x32400084C286CF3E17e7B677ea9583e60a000324",
      withdraw: "0x000000000000000000000000000000000000800A",
    },
  },
  testnet: {
    L1StandardBridgeProxy: `0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1`,
    L2OutputOracleProxy: `0x90E9c4f8a994a250F6aEfd61CAFb4F2e895D458F`,
    L1OptimismPortalProxy: `0x16Fc5058F25648194471939df75CF27A2fdC48BC`,
    eth: {
      deposit: "0x1908e2BF4a88F91E4eF0DC72f02b8Ea36BEa2319",
      withdraw: "0x000000000000000000000000000000000000800A",
      decimals: 18,
    },
  },
};
if (network === "mainnet") {
  Object.assign(contracts.mainnet, {
    l1Provider: new ethers.providers.JsonRpcProvider(
      `https://ethereum.blockpi.network/v1/rpc/public`
    ),
    l1ProviderFilter: new ethers.providers.JsonRpcProvider(
      `https://mainnet.gateway.tenderly.co`
    ),
    l2Provider: new ethers.providers.JsonRpcProvider(
      `https://mainnet.optimism.io`
    ),
    l2ProviderFilter: new ethers.providers.JsonRpcProvider(
      `https://optimism.gateway.tenderly.co	`
    ),
    l2ProviderRange: new ethers.providers.JsonRpcProvider(
      `https://optimism.blockpi.network/v1/rpc/public`
    ),
  });
} else {
  Object.assign(contracts.testnet, {
    l1Provider: new ethers.providers.JsonRpcProvider(
      `https://ethereum-sepolia.publicnode.com`
    ),
    l1ProviderFilter: new ethers.providers.JsonRpcProvider(
      `https://sepolia.gateway.tenderly.co`
    ),
    l2Provider: new ethers.providers.JsonRpcProvider(
      `https://sepolia.optimism.io`
    ),
    l2ProviderFilter: new ethers.providers.JsonRpcProvider(
      `https://optimism-sepolia.gateway.tenderly.co`
    ),
    l2ProviderRange: new ethers.providers.JsonRpcProvider(
      `https://optimism-sepolia.blockpi.network/v1/rpc/public`
    ),
  });
}

// contract instances

const L2StandardBridgeContract = new ethers.Contract(
  L2StandardBridge,
  L2StandardBridgeAbi.body,
  contracts[network].l2ProviderFilter
);
const L2StandardBridgeAbiIface = new ethers.utils.Interface(
  L2StandardBridgeAbi.body
);

const L1StandardBridgeProxyContract = new ethers.Contract(
  contracts[network].L1StandardBridgeProxy,
  L1StandardBridgeProxyAbi.body,
  contracts[network].l1ProviderFilter
);
const L1StandardBridgeProxyIface = new ethers.utils.Interface(
  L1StandardBridgeProxyAbi.body
);

// get logs

if (sender && chainId && !state.initLogs) {
  State.update({ initLogs: true });

  function getEthWithdrawals() {
    const ethWithdrawals = [];

    L2StandardBridgeContract.queryFilter(
      L2StandardBridgeContract.filters.WithdrawalInitiated(
        undefined,
        undefined,
        sender
      )
    ).then((events) => {
      console.log("withdrawal events", events);

      let withdrawalMessages = 0;
      const withdrawalMessagesTarget = events.length;

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
            contracts[network].l2ProviderRange
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

              withdrawalMessages++;
              console.log(
                "withdrawal message",
                withdrawalMessages,
                blockNumber,
                event
              );

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
                proven: false,
                claimed: false,
                isEth: true,
              };

              ethWithdrawals.push(withdrawal);

              if (withdrawalMessages === withdrawalMessagesTarget) {
                State.update({
                  ethWithdrawals,
                });
              }

              // Testing if Withdrawal is Proven

              // const opPortalAbi = [
              //   "event WithdrawalProven (bytes32 indexed, withdrawalHash, address indexed from, address indexed to)",
              // ];

              // const l1Contract = new ethers.Contract(
              //   contracts[network].L1OptimismPortalProxy,
              //   opPortalAbi,
              //   contracts[network].L2Provider
              // );

              // l1Contract
              //   .queryFilter(
              //     l1Contract.filters.WithdrawalProven(
              //       undefined,
              //       undefined,
              //       sender
              //     ),
              //     blockNumber - 150,
              //     blockNumber
              //   )
              //   .then((events) => {
              //     console.log("proving withdrawal", events);
              //   });
            });
        });
    });
  }

  function getEthDeposits() {
    L1StandardBridgeProxyContract.queryFilter(
      L1StandardBridgeProxyContract.filters.ETHDepositInitiated(
        sender,
        sender,
        undefined,
        undefined
      )
    ).then((events) => {
      console.log("deposit events", events);
      State.update({
        ethDeposits: events.map((e) => ({ ...e, isEth: true })),
      });
    });
  }

  getEthWithdrawals();
  getEthDeposits();
  return "";
}

const isMainnet = chainId === 1 || chainId === 10;
const isOPGoerli = chainId === 420;
const isGoerli = chainId === 5;

// user actions

function handleDepositEth() {
  const encodedData = L1StandardBridgeProxyIface.encodeFunctionData(
    "depositETH(uint32, bytes)",
    [200000, []]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: contracts[network].L1StandardBridgeProxy,
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

function handleDeposit(data) {
  console.log("handleDeposit", data);
  State.update({ isLoading: true, log: undefined, explorerLink: undefined });

  if (data.assetId === "eth") {
    return handleDepositEth(data);
  }
}

function handleWithdrawalInitiating() {
  console.log("withdraw");

  const encodedData = L2StandardBridgeAbiIface.encodeFunctionData(
    "withdraw(address, uint256, uint32, bytes)",
    [ETH_WITHDRAWAL_TARGET, DEFAULT_AMOUNT, 0, []]
  );

  console.log("encoded", encodedData);

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: L2StandardBridge,
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

const getMessageBedrockOutput = (l2BlockNumber, callback) => {
  const contract = new ethers.Contract(
    contracts[network].L2OutputOracleProxy,
    L2OutputOracleAbi.body,
    goerliProvider
  );

  contract
    .getL2OutputIndexAfter(l2BlockNumber)
    .then((l2OutputIndex) => {
      console.log("l2OutputIndex:", l2OutputIndex.toString());

      contract
        .getL2Output(l2OutputIndex.toString())
        .then((proposal) => {
          console.log("proposal data:", proposal);

          callback({
            outputRoot: proposal[0],
            l1Timestamp: proposal[1].toNumber(),
            l2BlockNumber: proposal[2].toNumber(),
            l2OutputIndex: l2OutputIndex.toNumber(),
          });
        })
        .catch((e) => {
          console.log("view error 2:", e);
        });
    })
    .catch((e) => {
      console.log("view error 1:", e);
    });
};

const hashLowLevelMessage = (withdrawal) => {
  const types = [
    "uint256",
    "address",
    "address",
    "uint256",
    "uint256",
    "bytes",
  ];
  const encoded = ethers.utils.defaultAbiCoder.encode(types, [
    withdrawal.messageNonce,
    withdrawal.sender,
    withdrawal.target,
    withdrawal.value,
    withdrawal.minGasLimit,
    withdrawal.message,
  ]);
  return ethers.utils.keccak256(encoded);
};

const hashMessageHash = (messageHash) => {
  const data = ethers.utils.defaultAbiCoder.encode(
    ["bytes32", "uint256"],
    [ethers.utils.hexlify(messageHash), HASH_ZERO]
  );
  return ethers.utils.keccak256(data);
};

const getBedrockMessageProof = (l2BlockNumber, slot, callback) => {
  contracts[network].l2Provider
    .send("eth_getProof", [
      L2_L1_MESSAGE_PASSER_CONTRACT,
      [slot],
      l2BlockNumber,
    ])
    .then((proof) => {
      const stateTrieProof = {
        accountProof: proof.accountProof,
        storageProof: proof.storageProof[0].proof,
        storageValue: Big(parseInt(proof.storageProof[0].value)),
        storageRoot: proof.storageHash,
      };
      console.log("stateTrieProof", stateTrieProof);

      contracts[network].l2Provider
        .send("eth_getBlockByNumber", [l2BlockNumber, false])
        .then((block) => {
          console.log("block", block);

          callback({
            outputRootProof: {
              version: HASH_ZERO,
              stateRoot: block.stateRoot,
              messagePasserStorageRoot: stateTrieProof.storageRoot,
              latestBlockhash: block.hash,
            },
            withdrawalProof: stateTrieProof.storageProof,
          });
        });
    });
};

const handleWithdrawalProve = (which) => {
  const withdrawal = state.ethWithdrawals[which];
  console.log("handleWithdrawalProve", withdrawal);

  getMessageBedrockOutput(withdrawal.blockNumber, (output) => {
    console.log("getMessageBedrockOutput:", output);
    const hash = hashLowLevelMessage(withdrawal);
    console.log("hash", hash);
    const messageSlot = hashMessageHash(hash);
    console.log("messageSlot", messageSlot);
    const l2BlockNumber = ethers.utils.hexlify(output.l2BlockNumber);
    console.log("l2BlockNumber", l2BlockNumber);

    getBedrockMessageProof(l2BlockNumber, messageSlot, (proof) => {
      const args = [
        [
          withdrawal.messageNonce,
          withdrawal.sender,
          withdrawal.target,
          withdrawal.value,
          withdrawal.minGasLimit,
          withdrawal.message,
        ],
        output.l2OutputIndex,
        [
          proof.outputRootProof.version,
          proof.outputRootProof.stateRoot,
          proof.outputRootProof.messagePasserStorageRoot,
          proof.outputRootProof.latestBlockhash,
        ],
        proof.withdrawalProof,
      ];

      console.log("proof args:", args);

      if (!isGoerli) {
        return State.update({
          console: "switch to Goerli to sign the proof",
        });
      }

      const contract = new ethers.Contract(
        contracts[network].L1OptimismPortalProxy,
        L1OptimismPortalAbi.body,
        Ethers.provider().getSigner()
      );

      contract
        .proveWithdrawalTransaction(...args)
        .then((tx) => {
          console.log("tx output:", tx);
        })
        .catch((e) => {
          console.log("error", e);
        });
    });
  });
};

const handleWithdrawalClaim = (which) => {
  const withdrawal = state.ethWithdrawals[which];
  console.log("handleWithdrawalProve", withdrawal);

  const args = [
    withdrawal.messageNonce,
    withdrawal.sender,
    withdrawal.target,
    withdrawal.value,
    withdrawal.minGasLimit,
    withdrawal.message,
  ];

  const contract = new ethers.Contract(
    contracts[network].L1OptimismPortalProxy,
    proofAbi,
    Ethers.provider().getSigner()
  );

  contract
    .finalizeWithdrawalTransaction(args)
    .then((tx) => {
      console.log("tx output:", tx);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

const tab = !state.tab || state.tab === "deposit" ? "deposit" : "withdraw";
const clone = (o) => JSON.parse(JSON.stringify(o));
const { deposit, withdraw } = state;

// balances

const getTokenBalance = (sender, isL1, tokenAddress, decimals, callback) => {
  if (!sender) return;
  const encodedData = erc20IFace.encodeFunctionData("balanceOf", [sender]);
  const provider = isL1
    ? contracts[network].l1Provider
    : contracts[network].l2Provider;

  provider
    .call({
      to: tokenAddress,
      data: encodedData,
    })
    .then((rawBalance) => {
      if (rawBalance === "0x") {
        return callback(0);
      }
      const receiverBalanceHex = erc20IFace.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );
      const balance = Big(receiverBalanceHex.toString())
        .div(Big(10).pow(decimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");

      callback(balance);
    });
};

const withdrawalActions = [
  {
    labelComplete: "(proven)",
    completeKey: "proven",
    actionLabel: "Prove",
    action: handleWithdrawalProve,
  },
  {
    labelComplete: "(claimed)",
    completeKey: "claimed",
    actionLabel: "claim",
    action: handleWithdrawalClaim,
  },
];

if (sender && !state.balancesUpdated) {
  // l1
  contracts[network].l1Provider.getBalance(sender).then((balance) => {
    const cloned = clone(deposit || defaultDeposit);
    const formatted = ethers.utils.formatUnits(balance);
    cloned.assets[0].balance = formatted.substring(
      0,
      formatted.indexOf(".") + 5
    );
    State.update({ deposit: cloned });
  });

  //l2;
  contracts[network].l2Provider.getBalance(sender).then((balance) => {
    const cloned = clone(withdraw || defaultWithdraw);
    const formatted = ethers.utils.formatUnits(balance);
    cloned.assets[0].balance = formatted.substring(
      0,
      formatted.indexOf(".") + 5
    );
    State.update({ withdraw: cloned });
  });

  State.update({ balancesUpdated: true });
  return "";
}

// bridge-ui functions

const onAction = (data) => {
  if (!data.amount) return;
  if (data.action === "deposit") handleDeposit(data);
  if (data.action === "withdraw") handleWithdraw(data);
};

const onTabChange = (tab) => {
  let log = null;

  const depositDisabled =
    tab === "deposit" &&
    (chainId === OP_CHAIN_ID || chainId === OP_SEPOLIA_CHAIN_ID);
  const withdrawDisabled =
    tab === "withdraw" &&
    (chainId === ETH_CHAIN_ID || chainId === SEPOLIA_CHAIN_ID);

  if (depositDisabled) {
    log = depositDisabledMsg;
  }
  if (withdrawDisabled) {
    log = withdrawDisabledMsg;
  }

  State.update({
    deposit: clone(withdraw),
    withdraw: clone(deposit),
    depositDisabled,
    withdrawDisabled,
    tab,
    log,
  });
};

const allWithdrawals = [...state.ethWithdrawals];
const allDeposits = [...state.ethDeposits];

return (
  <>
    <Widget
      src="mattlock.near/widget/bridge-ui"
      props={{
        ...state,
        onTabChange,
        onAction,
        title: "opBridge",
        tokens,
        allDeposits,
        allWithdrawals,
        withdrawalActions,
      }}
    />
  </>
);
