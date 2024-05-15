const getETHWithdrawalsFromOp = (account, type, hash, callback) => {
    const L2_L1_MESSAGE_PASSER_CONTRACT =
        "0x4200000000000000000000000000000000000016";
    const L1_CROSS_DOMAIN_MESSENGER_CONTRACT =
        "0x95bdca6c8edeb69c98bd5bd17660bacef1298a6f";

    const bridgeAbiWithdrawal = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "extraData",
                    "type": "bytes"
                }
            ],
            "name": "ETHBridgeInitiated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "localToken",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "remoteToken",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "extraData",
                    "type": "bytes"
                }
            ],
            "name": "ERC20BridgeInitiated",
            "type": "event"
        },
    ];

    const balstProvider = new ethers.providers.JsonRpcProvider(
        "https://mainnet.mode.network"
    );

    const bridgeContractWithdrawal = new ethers.Contract(
        '0x4200000000000000000000000000000000000010',
        bridgeAbiWithdrawal,
        balstProvider
    );

    const withdrawals = [];

    const filter = type === 1 ? bridgeContractWithdrawal.filters.ETHBridgeInitiated(
        account,
        undefined,
    ) : bridgeContractWithdrawal.filters.ERC20BridgeInitiated(
        undefined,
        undefined,
        account
    )

    bridgeContractWithdrawal
        .queryFilter(
            filter
        )
        .then((events) => {
            console.log('events:', events)

            events
                .sort((a, b) => b.blockNumber - a.blockNumber)
                .forEach((event) => {
                    const { args, blockNumber, transactionHash } = event;
                    console.log('blockNumber2:', blockNumber)

                    const messagePasserAbi = [
                        "event MessagePassed (uint256 indexed nonce, address indexed sender, address indexed target, uint256 value, uint256 gasLimit, bytes data, bytes32 withdrawalHash)",
                    ];

                    const messagePasserContract = new ethers.Contract(
                        L2_L1_MESSAGE_PASSER_CONTRACT,
                        messagePasserAbi,
                        balstProvider
                    );

                    messagePasserContract
                        .queryFilter(
                            messagePasserContract.filters.MessagePassed(
                                undefined,
                                undefined,
                                L1_CROSS_DOMAIN_MESSENGER_CONTRACT,
                                undefined,
                                undefined,
                                undefined,
                                undefined
                            ),
                            blockNumber - 150,
                            blockNumber
                        )
                        .then((events) => {
                            console.log('events2: ', events)

                            const event = events.filter(
                                ({ transactionHash }) => {
                                    return hash === transactionHash
                                }
                            )[0];

                            // console.log('event3: ', event)

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

                            console.log('withdrawal:', withdrawal)

                            balstProvider.getBlock(blockNumber).then((res) => {
                                const { timestamp } = res;
                                // withdrawals.push({
                                //     ...withdrawal,
                                //     timestamp: timestamp * 1000,
                                // });
                                callback && callback({
                                    ...withdrawal,
                                    timestamp: timestamp * 1000,
                                })
                            });
                        });
                });
        }).catch((e) => {
            console.log(e)
        });
};

const opProvider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.mode.network"
);
const opProviderOG = new ethers.providers.JsonRpcProvider(
    "https://mainnet.mode.network"
);
const mainnetProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth"
);

const HASH_ZERO =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
const L2_OUTPUT_ORACLE_CONTRACT = `0x4317ba146D4933D889518a3e5E11Fe7a53199b04`;
const L2_L1_MESSAGE_PASSER_CONTRACT = `0x4200000000000000000000000000000000000016`;
const L1_OPTIMISM_PORTAL_CONTRACT = `0x8B34b14c7c7123459Cf3076b8Cb929BE097d0C07`;

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
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            {
                name: "_tx",
                internalType: "struct Types.WithdrawalTransaction",
                type: "tuple",
                components: [
                    {
                        name: "nonce",
                        internalType: "uint256",
                        type: "uint256",
                    },
                    {
                        name: "sender",
                        internalType: "address",
                        type: "address",
                    },
                    {
                        name: "target",
                        internalType: "address",
                        type: "address",
                    },
                    {
                        name: "value",
                        internalType: "uint256",
                        type: "uint256",
                    },
                    {
                        name: "gasLimit",
                        internalType: "uint256",
                        type: "uint256",
                    },
                    {
                        name: "data",
                        internalType: "bytes",
                        type: "bytes",
                    },
                ],
            },
        ],
        name: "finalizeWithdrawalTransaction",
        outputs: [],
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_l2OutputIndex",
                "type": "uint256"
            }
        ],
        "name": "isOutputFinalized",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
];
const outputIface = new ethers.utils.Interface(outputAbi);

const getMessageBedrockOutput = (l2BlockNumber, callback, onError) => {
    const contract = new ethers.Contract(
        L2_OUTPUT_ORACLE_CONTRACT,
        outputAbi,
        mainnetProvider
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
                    onError();
                });
        })
        .catch((e) => {
            console.log("view error 1:", e);
            onError();
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
    opProviderOG
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

            opProvider
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
        })
        .catch(onError);
};

const handleWithdrawalProve = (withdrawal, onSuccess, onError) => {
    console.log("handleWithdrawalProve", withdrawal,onError);

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
                L1_OPTIMISM_PORTAL_CONTRACT,
                proofAbi,
                Ethers.provider().getSigner()
            );

            contract
                .proveWithdrawalTransaction(...args)
                .then((tx) => {
                    tx.wait().then(onSuccess).catch(onError);
                    console.log("tx output:", tx);
                })
                .catch((e) => {
                    onError();
                    console.log("error", e);
                });
        });
    }, onError);
};

function checkOutputFinalized(withdrawal, onSuccess, onError) {
    getMessageBedrockOutput(withdrawal.blockNumber, (output) => {
        const contract = new ethers.Contract(
            L1_OPTIMISM_PORTAL_CONTRACT,
            proofAbi,
            mainnetProvider
        );

        console.log('output:', output)    

        contract.isOutputFinalized(output.l2OutputIndex).then(isFinalized => {
            onSuccess(isFinalized)
        }).catch(onError)

    }, onError)
}

const handleWithdrawalClaim = (withdrawal, onSuccess, onError) => {
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
      L1_OPTIMISM_PORTAL_CONTRACT,
      proofAbi,
      Ethers.provider().getSigner()
    );
  
    contract
      .finalizeWithdrawalTransaction(args)
      .then((tx) => {
        console.log("tx output:", tx);
        tx.wait().then(onSuccess).catch(onError);
      })
      .catch((e) => {
        console.log("error", e);
        onError();
      });
  };


return {
    getETHWithdrawalsFromOp,
    handleWithdrawalProve,
    checkOutputFinalized,
    handleWithdrawalClaim,
}