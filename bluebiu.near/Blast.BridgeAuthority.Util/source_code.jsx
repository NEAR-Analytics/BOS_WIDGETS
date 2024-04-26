const getETHWithdrawalsFromOp = (account) => {
    const L2_L1_MESSAGE_PASSER_CONTRACT =
        "0x4200000000000000000000000000000000000016";
    const L1_CROSS_DOMAIN_MESSENGER_CONTRACT =
        "0x5D4472f31Bd9385709ec61305AFc749F0fA8e9d0";

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
    ];
    const balstProvider = new ethers.providers.JsonRpcProvider(
        "https://rpc.blast.io"
    );

    const bridgeContractWithdrawal = new ethers.Contract(
        '0x4300000000000000000000000000000000000005',
        bridgeAbiWithdrawal,
        balstProvider
    );

    const withdrawals = [];

    bridgeContractWithdrawal
        .queryFilter(
            bridgeContractWithdrawal.filters.ETHBridgeInitiated(
                account,
                account,
                undefined
            )
        )
        .then((events) => {
            console.log('events: ', events)

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
                            const event = events.filter(
                                ({ data }) => data.indexOf(account.substring(2)) > -1
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
                            balstProvider.getBlock(blockNumber).then((res) => {
                                const { timestamp } = res;
                                withdrawals.push({
                                    ...withdrawal,
                                    timestamp: timestamp * 1000,
                                });
                                //   State.update({
                                //     withdrawals: withdrawals.sort(
                                //       (a, b) => b.blockNumber - a.blockNumber
                                //     ),
                                //   });
                            });
                        });
                });
        });
};

const getWithdrawalStatus = (hash, account) => {
    return asyncFetch(`/api/blast?hash=${hash}&walletAddress=${account}`, {
        headers: {
            // 'Connection': 'keep-alive',
            // 'Keep-Alive' : 'timeout=5'
        }
    })
        .then(res => {
            if (!res.ok) {
                if (res.status === 429) {
                    return 
                }
                return getWithdrawalStatus(hash, account)
            }
            
            return res.body
        })
}


const getProveData = (hash, account) => {
    return asyncFetch(`/blast/bridge/v1/withdrawal/prove`, {
        body: JSON.stringify({
            userAddress: account,
            withdrawalHash: hash
        }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    })
        .then(res => {
            console.log('res: ', res)
            if (!res.ok) {
                return getProveData(hash, account)
            }
            return res.body
        })
}

const getWithdrawData = (hash, account) => {
    return asyncFetch(`/blast/bridge/v1/withdrawal/finalize`, {
        body: JSON.stringify({
            userAddress: account,
            withdrawalHash: hash
        }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    })
        .then(res => {
            console.log('res: ', res)
            if (!res.ok) {
                return getWithdrawData(hash, account)
            }
            return res.body
        })
}

const getCliamUSDBData = (hash, account) => {
    return asyncFetch(`/blast/bridge/v1/withdrawal/claim-usdb`, {
        body: JSON.stringify({
            userAddress: account,
            withdrawalHash: hash
        }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    })
        .then(res => {
            console.log('res: ', res)
            if (!res.ok) {
                return getCliamUSDBData(hash, account)
            }
            return res.body
        })
}

function getExtraData(etherAmount) {
    const weiAmount = ethers.utils.parseEther(etherAmount);
    const hexWei = weiAmount.toHexString();
    let shortHex = hexWei.slice(2);
    const targetLength = 64;
    const zerosNeeded = targetLength - shortHex.length;
    const zeros = "0".repeat(zerosNeeded);
    const extendedHex = "0x" + zeros + shortHex;

    return extendedHex
}

return {
    getETHWithdrawalsFromOp,
    getWithdrawalStatus,
    getProveData,
    getWithdrawData,
    getCliamUSDBData,
    getExtraData,
}