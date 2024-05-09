/*
TODO
[x] store all abis in gist
[x] use a block range op sepolia RPC (blockpi) for subsequent calls after tenderly
[x] get balances for eth on all networks
[x] add mainnet contract addresses
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
const HASH_ZERO =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const WITHDRAW_INIT_GAS_LIMIT = 150000;
const FRAXTAL_HOLESKY_CHAIN_ID = 2522;
const HOLESKY_CHAIN_ID = 17000;
const ETH_CHAIN_ID = 1;
const FRAXTAL_CHAIN_ID = 252;
const VALID_CHAIN_ID = [
  ETH_CHAIN_ID,
  FRAXTAL_CHAIN_ID,
  HOLESKY_CHAIN_ID,
  FRAXTAL_HOLESKY_CHAIN_ID,
];
const depositDisabledMsg =
  "For deposits, please switch to Ethereum mainnet or Holesky testnet.";
const withdrawDisabledMsg =
  "For withdrawals, please switch to Fraxtal mainnet or Fraxtal Holesky testnet.";
const abiCoder = new ethers.utils.AbiCoder();
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
    name: "Fraxtal",
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
      if (
        chainId === HOLESKY_CHAIN_ID ||
        chainId === FRAXTAL_HOLESKY_CHAIN_ID
      ) {
        network = "testnet";
      }
      if (chainId === ETH_CHAIN_ID || chainId === FRAXTAL_CHAIN_ID) {
        network = "mainnet";
      }
      if (
        chainId === FRAXTAL_HOLESKY_CHAIN_ID ||
        chainId === FRAXTAL_CHAIN_ID
      ) {
        log = depositDisabledMsg;
      }
      console.log("chainId", chainId, network);

      const L1ExplorerLink = `https://${
        network === "testnet" ? "holesky." : ""
      }etherscan.io/tx/`;
      const L2ExplorerLink = `https://${
        network === "testnet" ? "holesky." : ""
      }fraxscan.com/tx/`;

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
      Please switch to Ethereum or Fraxtal mainnet; or Holesky or Fraxtal
      Holesky
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
    L1StandardBridgeProxy: `0x0BaafC217162f64930909aD9f2B27125121d6332`,
    L2OutputOracleProxy: `0x715EA64DA13F4d0831ece4Ad3E8c1aa013167F32`,
    L1OptimismPortalProxy: `0xB9c64BfA498d5b9a8398Ed6f46eb76d90dE5505d`,
    L2toL1MessagePasser: `0x45A98115D5722C6cfC48D711e0053758E7C0b8ad`,
    eth: {
      deposit: "0x0BaafC217162f64930909aD9f2B27125121d6332",
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
    l1ProviderRange: new ethers.providers.JsonRpcProvider(
      `https://ethereum-holesky-rpc.publicnode.com`
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
      `https://ethereum-holesky.publicnode.com`
    ),
    l1ProviderFilter: new ethers.providers.JsonRpcProvider(
      `https://holesky.gateway.tenderly.co`
    ),
    l2Provider: new ethers.providers.JsonRpcProvider(
      `https://rpc.testnet.frax.com`
    ),
    l2ProviderFilter: new ethers.providers.JsonRpcProvider(
      `https://rpc.testnet.frax.com`
    ),
    l2ProviderRange: new ethers.providers.JsonRpcProvider(
      `https://rpc.testnet.frax.com`
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
    L2StandardBridgeContract.queryFilter(
      L2StandardBridgeContract.filters.WithdrawalInitiated(
        undefined,
        ETH_WITHDRAWAL_TARGET,
        sender
      )
    ).then((events) => {
      console.log("withdrawal events", events);

      return State.update({
        ethWithdrawals: events.map((e) => ({
          ...e,
          isEth: true,
          gotStatus: false,
        })),
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

// user actions

function getWithdrawalStatus(event) {
  const { blockNumber, transactionHash } = event;

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
        contracts[network].L2toL1MessagePasser
      ),
      blockNumber - 150,
      blockNumber
    )
    .then((events) => {
      console.log("messagePasserContract events".events);

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
        proven: !!event ? false : undefined,
        claimed: false,
        isEth: true,
        gotStatus: true,
      };

      const portalContract = new ethers.Contract(
        contracts[network].L1OptimismPortalProxy,
        L1OptimismPortalAbi.body,
        contracts[network].l1ProviderFilter
      );

      const update = () => {
        const ethWithdrawals = [...state.ethWithdrawals];
        ethWithdrawals[
          ethWithdrawals.findIndex(
            (w) => w.transactionHash === withdrawal.transactionHash
          )
        ] = withdrawal;
        State.update({
          ethWithdrawals,
        });
      };

      portalContract
        .queryFilter(
          portalContract.filters.WithdrawalProven(withdrawal.withdrawalHash)
        )
        .then((res) => {
          if (res) {
            withdrawal.proven = true;
          }
          update();
          portalContract
            .queryFilter(
              portalContract.filters.WithdrawalProven(withdrawal.withdrawalHash)
            )
            .then((res2) => {
              if (res2) {
                withdrawal.claimed = true;
              }
              update();
            })
            .catch(update);
        })
        .catch(update);
    });
}

function handleDepositEth(data) {
  const encodedData = L1StandardBridgeProxyIface.encodeFunctionData(
    "depositETH(uint32, bytes)",
    [200000, []]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: contracts[network].L1StandardBridgeProxy,
      data: encodedData,
      value: ethers.utils.parseUnits(data.amount),
      gasLimit,
    })
    .then((tx) => {
      console.log("tx:", tx);
      State.update({
        log: "Deposit " + state.L1ExplorerLink + tx.hash,
      });
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

function handleWithdrawalInitiatingEth(data) {
  const value = ethers.utils.parseUnits(data.amount);
  const encodedData = L2StandardBridgeAbiIface.encodeFunctionData(
    "withdraw(address, uint256, uint32, bytes)",
    [ETH_WITHDRAWAL_TARGET, value, 0, []]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: L2StandardBridge,
      data: encodedData,
      value,
      gasLimit: WITHDRAW_INIT_GAS_LIMIT,
    })
    .then((tx) => {
      console.log("tx:", tx);
      // todo turn into rendered link
      State.update({
        log: "Withdrawal " + state.L2ExplorerLink + tx.hash,
      });
    })
    .catch((e) => {
      console.log("bridge error:", e);
    });
}

function handleWithdrawalInitiating(data) {
  console.log("handleWithdrawalInitiating", data);
  if (data.assetId === "eth") {
    return handleWithdrawalInitiatingEth(data);
  }
}

const getMessageBedrockOutput = (l2BlockNumber, callback) => {
  const contract = new ethers.Contract(
    contracts[network].L2OutputOracleProxy,
    L2OutputOracleAbi.body,
    contracts[network].l1Provider
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
  console.log("hashLowLevelMessage", withdrawal);
  const types = [
    "uint256",
    "address",
    "address",
    "uint256",
    "uint256",
    "bytes",
  ];
  const encoded = abiCoder.encode(types, [
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
  const data = abiCoder.encode(
    ["bytes32", "uint256"],
    [ethers.utils.hexlify(messageHash), HASH_ZERO]
  );
  return ethers.utils.keccak256(data);
};

const getBedrockMessageProof = (l2BlockNumber, slot, callback) => {
  console.log("getBedrockMessageProof", l2BlockNumber);
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

const handleWithdrawalProve = (withdrawal) => {
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

      const contract = new ethers.Contract(
        contracts[network].L1OptimismPortalProxy,
        L1OptimismPortalAbi.body,
        Ethers.provider().getSigner()
      );

      contract
        .proveWithdrawalTransaction(...args)
        .then((tx) => {
          console.log("tx output:", tx);
          State.update({
            log:
              "Withdrawal Proving Transaction " +
              state.L1ExplorerLink +
              tx.hash,
          });
        })
        .catch((e) => {
          console.log("error", e);
        });
    });
  });
};

const handleWithdrawalClaim = (withdrawal) => {
  console.log("handleWithdrawalClaim", withdrawal);

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
    L1OptimismPortalAbi.body,
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
    labelComplete: "",
    completeKey: "gotStatus",
    actionLabel: "Get Status",
    action: getWithdrawalStatus,
  },
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
  if (data.action === "withdraw") handleWithdrawalInitiating(data);
};

const onTabChange = (tab) => {
  let log = null;

  const depositDisabled =
    tab === "deposit" &&
    (chainId === FRAXTAL_CHAIN_ID || chainId === FRAXTAL_HOLESKY_CHAIN_ID);
  const withdrawDisabled =
    tab === "withdraw" &&
    (chainId === ETH_CHAIN_ID || chainId === HOLESKY_CHAIN_ID);

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
        title: "Fraxtal Bridge",
        tokens,
        allDeposits,
        allWithdrawals,
        withdrawalActions,
      }}
    />
  </>
);
