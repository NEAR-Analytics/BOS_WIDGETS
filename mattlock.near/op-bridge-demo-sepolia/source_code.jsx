// for Sepolia
const OP_BRIDGE_DEPOSIT_CONTRACT = "0x16Fc5058F25648194471939df75CF27A2fdC48BC";
const OP_BRIDGE_WITHDRAW_CONTRACT =
  "0x4200000000000000000000000000000000000010";
const ETH_ADDR = "0x0000000000000000000000000000000000000000";
const ETH_ADDR_L1 = `0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000`;
const DEFAULT_AMOUNT_ETH = "0.01";
const DEFAULT_AMOUNT = ethers.utils.parseUnits(DEFAULT_AMOUNT_ETH, 18);
const L2_OUTPUT_ORACLE_CONTRACT = `0x90E9c4f8a994a250F6aEfd61CAFb4F2e895D458F`;
const L1_OPTIMISM_PORTAL_CONTRACT = `0x16Fc5058F25648194471939df75CF27A2fdC48BC`;
const HASH_ZERO =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
// Withdrawal target TX info
// Call initiateWithdraw so the L2 message is passed
// Following TX example here: https://goerli-optimism.etherscan.io/tx/0xb59ff0af1db39be0cc03e7410621ed21ce60e5833f8c4bf97d8747bd8d033bc8
// Manually adjusted amount to 0.01
const ETH_WITHDRAWAL_MESSAGE = `0x32b7006d000000000000000000000000deaddeaddeaddeaddeaddeaddeaddeaddead0000000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000`;
const ETH_WITHDRAWAL_TARGET = `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`;

// Storage keys
const STORAGE_RECEIPT_HASH = "__STORAGE_RECEIPT_HASH";
const STORAGE_RESOLVED = "__STORAGE_RESOLVED";
const STORAGE_MESSAGE_SLOT = "__STORAGE_MESSAGE_SLOT";
const STORAGE_L2_INDEX = "__STORAGE_L2_INDEX";

State.init({
  console: "Welcome!",
  transactionHash: Storage.privateGet(STORAGE_RECEIPT_HASH),
  resolved: Storage.privateGet(STORAGE_RESOLVED),
  messageSlot: Storage.privateGet(STORAGE_MESSAGE_SLOT),
  l2OutputIndex: Storage.privateGet(STORAGE_L2_INDEX),
});

const opSepoliaProvider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.optimism.io"
);
const goerliProvider = new ethers.providers.JsonRpcProvider(
  "https://gateway.tenderly.co/public/sepolia"
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
  Ethers.provider()
    .getBalance(sender)
    .then((rawBalance) => {
      const balance = ethers.utils.formatEther(rawBalance);
      State.update({ balance });
    });
}

const isMainnet = chainId === 1 || chainId === 10;
const isOPSepolia = chainId === 11155420;
const isSepolia = chainId === 11155111;

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

const withdrawAbi = [
  {
    inputs: [
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
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
const withdrawIface = new ethers.utils.Interface(withdrawAbi);

const outputAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_l2BlockNumber",
        type: "uint256",
      },
    ],
    name: "getL2OutputIndexAfter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "_l2OutputIndex",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "getL2Output",
    outputs: [
      {
        name: "",
        internalType: "struct Types.OutputProposal",
        type: "tuple",
        components: [
          {
            name: "outputRoot",
            internalType: "bytes32",
            type: "bytes32",
          },
          {
            name: "timestamp",
            internalType: "uint128",
            type: "uint128",
          },
          {
            name: "l2BlockNumber",
            internalType: "uint128",
            type: "uint128",
          },
        ],
      },
    ],
  },
];
const outputIface = new ethers.utils.Interface(outputAbi);

const proofAbi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gasLimit",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Types.WithdrawalTransaction",
        name: "_tx",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_l2OutputIndex",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "version",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "stateRoot",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "messagePasserStorageRoot",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "latestBlockhash",
            type: "bytes32",
          },
        ],
        internalType: "struct Types.OutputRootProof",
        name: "_outputRootProof",
        type: "tuple",
      },
      {
        internalType: "bytes[]",
        name: "_withdrawalProof",
        type: "bytes[]",
      },
    ],
    name: "proveWithdrawalTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const proofIface = new ethers.utils.Interface(proofAbi);

function handleDepositETH() {
  if (!isSepolia)
    return State.update({
      console: `switch to Sepolia Testnet (not Optimism Sepolia, ETH Sepolia) to deposit ETH to OP Sepolia`,
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

function handleWithdrawalInitiating() {
  console.log("withdraw");

  const encodedData = withdrawIface.encodeFunctionData(
    "withdraw(address, uint256, uint32, bytes)",
    [ETH_WITHDRAWAL_TARGET, DEFAULT_AMOUNT, 0, []]
  );

  console.log("encoded", encodedData);

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: OP_BRIDGE_WITHDRAW_CONTRACT,
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

const handleWithdrawalReceipt = () => {
  if (!isOPSepolia) {
    return State.update({ console: `please switch to OP Sepolia` });
  }

  const { transactionHash } = state;

  const receiptError =
    "error getting receipt for txHash, check hash and try again";

  provider
    .getTransaction(transactionHash)
    .then((receipt) => {
      if (!receipt) {
        return State.update({ console: receiptError });
      }

      const {
        nonce: messageNonce,
        from: sender,
        to: target,
        value,
        data: message,
        blockNumber,
      } = receipt;

      const resolved = {
        messageNonce,
        sender,
        target,
        value: value.toString(),
        minGasLimit: 0,
        message,
        direction: 1,
        logIndex: 0,
        blockNumber,
        transactionHash,
      };

      Storage.privateSet(STORAGE_RESOLVED, resolved);
      State.update({ console: "Receipt Updated ✅" });
      console.log(resolved);
    })
    .catch((e) => {
      console.log(e);
      State.update({
        console: receiptError,
      });
    });
};

const getMessageBedrockOutput = (l2BlockNumber, callback) => {
  const contract = new ethers.Contract(
    L2_OUTPUT_ORACLE_CONTRACT,
    outputAbi,
    goerliProvider
  );

  console.log("L2_OUTPUT_ORACLE_CONTRACT", contract);

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
    [ethers.utils.hexlify(messageHash), 0]
  );
  return ethers.utils.keccak256(data);
};

const handleWithdrawalProof = () => {
  console.log("handleWithdrawalProof");

  const { resolved } = state;
  // TODO translate resolved back to Big instead of replacing here
  resolved.value = DEFAULT_AMOUNT;

  getMessageBedrockOutput(resolved.blockNumber, (output) => {
    console.log("getMessageBedrockOutput:", output);
    const hash = hashLowLevelMessage(resolved);
    console.log("hash", hash);
    const messageSlot = hashMessageHash(hash);
    console.log("messageSlot", messageSlot);

    Storage.privateSet(STORAGE_MESSAGE_SLOT, messageSlot);
    Storage.privateSet(STORAGE_L2_INDEX, output.l2OutputIndex);

    State.update({ console: `Proof data updated ✅` });
  });
};

const getBedrockMessageProof = (l2BlockNumber, slot, callback) => {
  l2BlockNumber = l2BlockNumber.replace("0x0", "0x");
  console.log(`getBedrockMessageProof`, l2BlockNumber, slot);

  opSepoliaProvider
    .send("eth_getProof", [
      OP_BRIDGE_WITHDRAW_CONTRACT,
      [slot],
      l2BlockNumber.replace("0x0", "0x"),
    ])
    .then((proof) => {
      const stateTrieProof = {
        accountProof: proof.accountProof,
        storageProof: proof.storageProof[0].proof,
        storageValue: Big(parseInt(proof.storageProof[0].value)),
        storageRoot: proof.storageHash,
      };
      console.log("stateTrieProof", stateTrieProof);

      opSepoliaProvider
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
            l2OutputIndex: state.l2OutputIndex,
          });
        });
    });
};

const handleWithdrawalProve = () => {
  const { resolved, messageSlot } = state;
  const blockNumber = ethers.utils.hexlify(resolved.blockNumber);
  console.log("blockNumber", blockNumber);

  getBedrockMessageProof(blockNumber, messageSlot, (proof) => {
    const { resolved: withdrawal, l2OutputIndex } = state;

    const args = [
      [
        withdrawal.messageNonce,
        withdrawal.sender,
        withdrawal.target,
        withdrawal.value,
        withdrawal.minGasLimit,
        withdrawal.message,
      ],
      proof.l2OutputIndex,
      [
        proof.outputRootProof.version,
        proof.outputRootProof.stateRoot,
        proof.outputRootProof.messagePasserStorageRoot,
        proof.outputRootProof.latestBlockhash,
      ],
      proof.withdrawalProof,
    ];

    console.log("proof args:", args);

    if (!isSepolia) {
      const error = "switch to Sepolia to sign the proof";
      console.log(error);
      return State.update({
        console: error,
      });
    }

    const contract = new ethers.Contract(
      L1_OPTIMISM_PORTAL_CONTRACT,
      proofAbi,
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
};

if (!sender) {
  return (
    <div className="w3button">
      <Web3Connect connectLabel="Connect to a wallet" />
    </div>
  );
}

return (
  <div>
    <h3>Console:</h3>
    <p>{state.console}</p>
    {!isSepolia && !isOPSepolia && (
      <p>Please switch to ETH Sepolia or OP Sepolia</p>
    )}
    {isSepolia && (
      <>
        <h3>Network: ETH Sepolia</h3>
        <p>Balance: {state.balance} ETH</p>

        {/*<h3>Deposits & Withdrawals</h3>
        <Widget src={`ciocan.near/widget/op-bridge-list`} />*/}

        <button onClick={handleDepositETH}>
          Deposit {DEFAULT_AMOUNT_ETH} ETH to L2
        </button>
        <br />
        <br />
        <p>To initiate a withdraw, switch to OP Sepolia network</p>

        {state.messageSlot && (
          <>
            <br />
            <br />
            <button onClick={handleWithdrawalProve}>
              Step3. Prove Withdrawal
            </button>
          </>
        )}
      </>
    )}
    {isOPSepolia && (
      <>
        <h3>Network: OP Sepolia</h3>
        <p>Balance: {state.balance} ETH</p>
        {/*<h3>Deposits & Withdrawals</h3>
        <Widget src={`ciocan.near/widget/op-bridge-list`} />*/}

        <button onClick={handleWithdrawalInitiating}>
          Initiate Withdrawal of {DEFAULT_AMOUNT_ETH} ETH on L2
        </button>
        <br />
        <br />
        <p>
          To make a deposit, or prove a withdraw, switch to ETH Sepolia network
        </p>

        <h3>Get Withdrawal Receipt from L2 TX Hash:</h3>
        <input
          placeholder="withdrawal tx hash"
          value={state.transactionHash}
          onChange={({ target: { value } }) => {
            State.update({ transactionHash: value });
            Storage.privateSet(STORAGE_RECEIPT_HASH, value);
          }}
          type="text"
        />
        <br />
        <button onClick={handleWithdrawalReceipt}>
          Step 1. Get Withdrawal Receipt
        </button>

        {state.transactionHash && (
          <>
            <br />
            <br />
            <button onClick={handleWithdrawalProof}>
              Step 2. Get Withdrawal Proof Data
            </button>
          </>
        )}
        {state.messageSlot && (
          <>
            <br />
            <br />
            <button onClick={handleWithdrawalProve}>
              Step3. Prove Withdrawal
            </button>
          </>
        )}
      </>
    )}
  </div>
);
