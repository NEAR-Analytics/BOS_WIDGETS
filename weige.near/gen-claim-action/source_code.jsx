const { config, txHash, onLoadExecute } = props;

const arb_sys_abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "destination",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "uniqueId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "batchNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "indexInBatch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "arbBlockNum",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethBlockNum",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "callvalue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "L2ToL1Transaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "destination",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "hash",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "position",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "arbBlockNum",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethBlockNum",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "callvalue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "L2ToL1Tx",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "reserved",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "position",
        type: "uint256",
      },
    ],
    name: "SendMerkleUpdate",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "arbBlockNum",
        type: "uint256",
      },
    ],
    name: "arbBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "arbBlockNumber",
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
    inputs: [],
    name: "arbChainID",
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
    inputs: [],
    name: "arbOSVersion",
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
    inputs: [],
    name: "getStorageGasAvailable",
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
    inputs: [],
    name: "isTopLevelCall",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "unused",
        type: "address",
      },
    ],
    name: "mapL1SenderContractAddressToL2Alias",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "myCallersAddressWithoutAliasing",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sendMerkleTreeState",
    outputs: [
      {
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
      {
        internalType: "bytes32[]",
        name: "partials",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destination",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "sendTxToL1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "wasMyCallersAddressAliased",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destination",
        type: "address",
      },
    ],
    name: "withdrawEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const outbox_executeTransaction_abi = [
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "l2Sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "executeTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

State.init({
  claimable: false,
});

const l2NodeUrl = "https://arb1.arbitrum.io/rpc";

const l1NodeUrl = "https://rpc.ankr.com/eth";

const l2Provider = new ethers.providers.JsonRpcProvider(l2NodeUrl);

const l1Provider = new ethers.providers.JsonRpcProvider(l1NodeUrl);

const loadL2toL1event = () => {
  l2Provider
    .getTransactionReceipt(txHash)
    .then((txReceipt) => {
      if (txReceipt && txReceipt.logs) {
        const contractInterface = new ethers.utils.Interface(arb_sys_abi);

        const tempEvent = contractInterface.getEvent("L2ToL1Tx");
        const topic = contractInterface.getEventTopic(tempEvent);

        txReceipt.logs.forEach((log, index) => {
          if (log.topics[0] === topic) {
          }
        });
        const events = [];

        const findTrueLog = txReceipt.logs.find(
          (log) => log.topics[0] === topic
        );
        const args = contractInterface.parseLog(findTrueLog).args;

        const l2tol1Event = {
          arbBlockNum: args.arbBlockNum.toString(),
          caller: args.caller,
          callvalue: args.callvalue.toString(),
          data: args.data,
          destination: args.destination,
          ethBlockNum: args.ethBlockNum.toString(),
          hash: args.hash.toString(),
          position: args.position.toString(),
          timestamp: args.timestamp.toString(),
          transactionHash: log.transactionHash,
        };

        events.push(l2tol1Event);

        State.update({
          l2tol1Event: events?.[0] || null,
        });
      }
    })
    .finally(() =>
      State.update({
        eventLoadDone: true,
      })
    );
};

const getSendProps = () => {
  const rollupAddress = config.ethBridges.rollup;

  const abi = [
    {
      inputs: [],
      name: "latestConfirmed",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "nodeNum",
          type: "uint64",
        },
      ],
      name: "getNode",
      outputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "stateHash",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "challengeHash",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "confirmData",
              type: "bytes32",
            },
            {
              internalType: "uint64",
              name: "prevNum",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "deadlineBlock",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "noChildConfirmedBeforeBlock",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "stakerCount",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "childStakerCount",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "firstChildBlock",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "latestChildNumber",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "createdAtBlock",
              type: "uint64",
            },
            {
              internalType: "bytes32",
              name: "nodeHash",
              type: "bytes32",
            },
          ],
          internalType: "struct Node",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "nodeNum",
          type: "uint64",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "parentNodeHash",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "nodeHash",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "executionHash",
          type: "bytes32",
        },
        {
          components: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: "bytes32[2]",
                      name: "bytes32Vals",
                      type: "bytes32[2]",
                    },
                    {
                      internalType: "uint64[2]",
                      name: "u64Vals",
                      type: "uint64[2]",
                    },
                  ],
                  internalType: "struct GlobalState",
                  name: "globalState",
                  type: "tuple",
                },
                {
                  internalType: "enum MachineStatus",
                  name: "machineStatus",
                  type: "uint8",
                },
              ],
              internalType: "struct RollupLib.ExecutionState",
              name: "beforeState",
              type: "tuple",
            },
            {
              components: [
                {
                  components: [
                    {
                      internalType: "bytes32[2]",
                      name: "bytes32Vals",
                      type: "bytes32[2]",
                    },
                    {
                      internalType: "uint64[2]",
                      name: "u64Vals",
                      type: "uint64[2]",
                    },
                  ],
                  internalType: "struct GlobalState",
                  name: "globalState",
                  type: "tuple",
                },
                {
                  internalType: "enum MachineStatus",
                  name: "machineStatus",
                  type: "uint8",
                },
              ],
              internalType: "struct RollupLib.ExecutionState",
              name: "afterState",
              type: "tuple",
            },
            {
              internalType: "uint64",
              name: "numBlocks",
              type: "uint64",
            },
          ],
          indexed: false,
          internalType: "struct RollupLib.Assertion",
          name: "assertion",
          type: "tuple",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "afterInboxBatchAcc",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "wasmModuleRoot",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "inboxMaxCount",
          type: "uint256",
        },
      ],
      name: "NodeCreated",
      type: "event",
    },
  ];

  const rollup = new ethers.Contract(rollupAddress, abi, l1Provider);

  rollup
    .latestConfirmed()
    .then((res) => {
      const latestConfirmedNodeNum = res.toString();
      return rollup.getNode(latestConfirmedNodeNum);
    })
    .then((res) => {
      const createdAtBlock = res[10].toString();

      const filter = {
        address: rollupAddress,
        fromBlock: Number(createdAtBlock),
        toBlock: Number(createdAtBlock),
      };

      return l1Provider.getLogs(filter);
    })
    .then((logs) => {
      if (logs.length !== 1) throw new Error();

      const log = logs[0];

      const rollupInterface = new ethers.utils.Interface(abi);

      const pLog = rollupInterface.parseLog(log);

      const nodeCreatedEvent = {
        event: pLog.args,
        topic: pLog.topic,
        name: pLog.name,
        blockNumber: log.blockNumber,
        blockHash: log.blockHash,
        transactionHash: log.transactionHash,

        address: log.address,
        topics: log.topics,
        data: log.data,
      };

      const afterState = {
        blockHash:
          nodeCreatedEvent.event.assertion.afterState.globalState
            .bytes32Vals[0],
        sendRoot:
          nodeCreatedEvent.event.assertion.afterState.globalState
            .bytes32Vals[1],
      };

      const l2Block = Ethers.send("eth_getBlockByHash", [
        afterState.blockHash,
        true,
      ]);

      State.update({
        sendProps: {
          senCount: Big(Number(l2Block?.sendCount || 0)).toFixed(),
          sendRootHash: l2Block.sendRoot,
        },
        sendPropsLoadDone: !!l2Block,
      });
    });
};

const checkIfConfirmedAndExecuted = () => {
  const outboxAddress = config.ethBridges.outbox;
  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "isSpent",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const isPending = !Big(Number(state.l2tol1Event.position || 0)).lt(
    state.sendProps.senCount
  );

  if (isPending) {
    State.update({
      claimable: false,
      isPending: true,
      checkDone: true,
    });

    return;
  }

  const outboxContract = new ethers.Contract(outboxAddress, abi, l1Provider);

  outboxContract.isSpent(state.l2tol1Event.position).then((isSpent) => {
    State.update({
      claimable: !isSpent,
      checkDone: true,
      isPending: false,
    });
  });
};

const getProof = () => {
  const sendRootSize = state.l2tol1Event.senCount;

  const nodeInterfaceAddress = config.ethBridges.nodeInterface;

  const abi = [
    {
      inputs: [
        {
          internalType: "uint64",
          name: "size",
          type: "uint64",
        },
        {
          internalType: "uint64",
          name: "leaf",
          type: "uint64",
        },
      ],
      name: "constructOutboxProof",
      outputs: [
        {
          internalType: "bytes32",
          name: "send",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "root",
          type: "bytes32",
        },
        {
          internalType: "bytes32[]",
          name: "proof",
          type: "bytes32[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const nodeInterfaceContract = new ethers.Contract(
    nodeInterfaceAddress,
    abi,
    l2Provider
  );

  return nodeInterfaceContract
    .constructOutboxProof(
      Number(sendRootSize),
      Number(state.l2tol1Event.position)
    )
    .then((outboxProof) => {
      State.update({
        proof: outboxProof.proof,
        proofLoadDone: true,
      });
    });
};

const execute = () => {
  const outboxAddress = config.ethBridges.outbox;

  const abi = outbox_executeTransaction_abi;

  const signer = Ethers.provider().getSigner();

  const outboxContract = new ethers.Contract(outboxAddress, abi, signer);

  outboxContract
    .executeTransaction(
      state.proof,
      state.l2tol1Event.position,
      state.l2tol1Event.caller,
      state.l2tol1Event.destination,
      state.l2tol1Event.arbBlockNum,
      state.l2tol1Event.ethBlockNum,
      state.l2tol1Event.timestamp,
      state.l2tol1Event.callvalue,
      state.l2tol1Event.data
    )
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      if (receipt.status === 1) {
        props?.successCallback?.();
      } else {
        props.failCallback?.();
      }
    })
    .catch((e) => {
      props.failCallback?.();
    });
};

if (txHash && !state.eventLoadDone) {
  loadL2toL1event();
}

if (txHash && !state.sendPropsLoadDone && state.eventLoadDone) {
  getSendProps();
}

if (txHash && state.sendPropsLoadDone && state.eventLoadDone) {
  checkIfConfirmedAndExecuted();
}

if (txHash && state.eventLoadDone && state.checkDone && state.claimable) {
  getProof();
}

if (state.sendPropsLoadDone && !state.loadExecuteDone) {
  State.update({
    loadExecuteDone: true,
  });

  onLoadExecute({
    ...state,
    claimable: state.claimable,
    isPending: state.isPending,
    checkDone: state.checkDone,
    execute,
  });
}

return "";
