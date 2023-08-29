// for goerli
const OP_BRIDGE_DEPOSIT_CONTRACT = "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8";
const OP_BRIDGE_WITHDRAW_CONTRACT =
  "0x4200000000000000000000000000000000000010";
const ETH_ADDR = "0x0000000000000000000000000000000000000000";
const ETH_ADDR_L1 = `0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000`;
const DEFAULT_AMOUNT_ETH = "0.01";
const DEFAULT_AMOUNT = ethers.utils.parseUnits(DEFAULT_AMOUNT_ETH, 18);
const L2_OUTPUT_ORACLE_CONTRACT = `0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0`;
const L1_OPTIMISM_PORTAL_CONTRACT = `0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383`;
const HASH_ZERO =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
// Withdrawal target TX info
// Call initiateWithdraw so the L2 message is passed
// Following TX example here: https://goerli-optimism.etherscan.io/tx/0xb59ff0af1db39be0cc03e7410621ed21ce60e5833f8c4bf97d8747bd8d033bc8
// Manually adjusted amount to 0.01
const ETH_WITHDRAWAL_MESSAGE = `0x32b7006d000000000000000000000000deaddeaddeaddeaddeaddeaddeaddeaddead0000000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000`;
const L2_L1_MESSAGE_PASSER_CONTRACT = `0x4200000000000000000000000000000000000016`;
const ETH_WITHDRAWAL_TARGET = `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`;

// Storage keys
const STORAGE_RESOLVED = "__STORAGE_RESOLVED";
const STORAGE_MESSAGE_SLOT = "__STORAGE_MESSAGE_SLOT";
const STORAGE_L2_INDEX = "__STORAGE_L2_INDEX";

State.init({
  console: "Welcome!",
  transactionHash: `0x38082f56332ef0c5640487a47412aace70db81cdd0bb40e9a896a85953324ba0`,
  resolved: Storage.privateGet(STORAGE_RESOLVED),
  messageSlot: Storage.privateGet(STORAGE_MESSAGE_SLOT),
  l2OutputIndex: Storage.privateGet(STORAGE_L2_INDEX),
  withdrawals: [],
  gettingWithdrawals: false,
});

const opGoerliProvider = new ethers.providers.JsonRpcProvider(
  "https://optimism-goerli.gateway.tenderly.co/"
);
const opGoerliProviderOG = new ethers.providers.JsonRpcProvider(
  "https://goerli.optimism.io"
);
const goerliProvider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/eth_goerli"
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

  function getETHWithdrawals() {
    if (state.gettingWithdrawals) return;
    State.update({ gettingWithdrawals: true });
    console.log("getETHWithdrawals");

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

    const bridgeContractWithdrawal = new ethers.Contract(
      OP_BRIDGE_WITHDRAW_CONTRACT,
      bridgeAbiWithdrawal,
      opGoerliProvider
    );

    const withdrawals = [];

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

                withdrawals.push(withdrawal);

                State.update({
                  withdrawals,
                });
              });
          });
      });
  }

  getETHWithdrawals();
}

const isMainnet = chainId === 1 || chainId === 10;
const isOPGoerli = chainId === 420;
const isGoerli = chainId === 5;

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
  if (!isGoerli)
    return State.update({
      console: `switch to Goerli Testnet (not Optimism Goerli, ETH Goerli) to deposit ETH to OP Goerli`,
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

const getMessageBedrockOutput = (l2BlockNumber, callback) => {
  const contract = new ethers.Contract(
    L2_OUTPUT_ORACLE_CONTRACT,
    outputAbi,
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
    [ethers.utils.hexlify(messageHash), 0]
  );
  return ethers.utils.keccak256(data);
};

const getBedrockMessageProof = (l2BlockNumber, slot, callback) => {
  opGoerliProviderOG
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

      opGoerliProvider
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
  const withdrawal = state.withdrawals[which];
  console.log("handleWithdrawalProve", withdrawal);

  getMessageBedrockOutput(withdrawal.blockNumber, (output) => {
    console.log("getMessageBedrockOutput:", output);
    const hash = hashLowLevelMessage(withdrawal);
    console.log("hash", hash);
    const messageSlot = hashMessageHash(hash);
    console.log("messageSlot", messageSlot);

    const blockNumber = ethers.utils.hexlify(withdrawal.blockNumber);
    console.log("blockNumber", blockNumber);

    getBedrockMessageProof(blockNumber, messageSlot, (proof) => {
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
  });
};

// end functional

if (!sender) {
  return (
    <div className="w3button">
      <Web3Connect connectLabel="Connect to a wallet" />
    </div>
  );
}

console.log("state.withdrawals", Object.values(state.withdrawals));

return (
  <div>
    <h3>Console:</h3>
    <p>{state.console}</p>
    {!isGoerli && !isOPGoerli && (
      <p>Please switch to ETH Goerli or OP Goerli</p>
    )}
    {isGoerli && (
      <>
        <h3>Deposits & Withdrawals</h3>
        <Widget src={`ciocan.near/widget/op-bridge-list`} />

        <button onClick={handleDepositETH}>
          Deposit {DEFAULT_AMOUNT_ETH} ETH to L2
        </button>
        <br />
        <br />
        <p>To initiate a withdraw, switch to OP Goerli network</p>

        {state.withdrawals.length === 0 && <h3>Loading Withdrawals</h3>}
        {!isGoerli && <p>To prove withdrawals switch to ETH Goerli</p>}
        {state.withdrawals.map(({ blockNumber, transactionHash }, i) => {
          return (
            <>
              <p>{transactionHash}</p>
              <p>{blockNumber}</p>
              <button onClick={() => handleWithdrawalProve(i)}>
                Prove Withdrawal
              </button>
            </>
          );
        })}
      </>
    )}
    {isOPGoerli && (
      <>
        <h3>Deposits & Withdrawals</h3>
        <Widget src={`ciocan.near/widget/op-bridge-list`} />

        <button onClick={handleWithdrawalInitiating}>
          Initiate Withdrawal of {DEFAULT_AMOUNT_ETH} ETH on L2
        </button>
        <br />
        <br />
        <p>
          To make a deposit, or prove a withdraw, switch to ETH Goerli network
        </p>
      </>
    )}
  </div>
);
