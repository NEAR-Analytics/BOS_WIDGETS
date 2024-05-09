const { loading, amount, routerAddress, source, target, onLoad } = props;

const account = Ethers.send("eth_requestAccounts", [])[0];

const chainIds = {
    1: 101,
    534352: 214
}

useEffect(() => {
    if (!loading || !routerAddress) return;


    const QuoteRouterContract = new ethers.Contract(
        routerAddress,
        [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_oft",
                        "type": "address"
                    },
                    {
                        "internalType": "uint16",
                        "name": "_dstChainId",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "_toAddress",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "_useZro",
                        "type": "bool"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_adapterParams",
                        "type": "bytes"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "callerBps",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "caller",
                                "type": "address"
                            },
                            {
                                "internalType": "bytes2",
                                "name": "partnerId",
                                "type": "bytes2"
                            }
                        ],
                        "internalType": "struct IOFTWrapper.FeeObj",
                        "name": "_feeObj",
                        "type": "tuple"
                    }
                ],
                "name": "estimateSendFeeV2",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "nativeFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "zroFee",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
        ],
        Ethers.provider().getSigner()
    );

    console.log(222222)

    const toAddressBytes = ethers.utils.defaultAbiCoder.encode(['address'], [account])
    const adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 99])

    console.log('source: ', source)

    QuoteRouterContract.estimateSendFeeV2(
        source.address,
        chainIds[target.dstId],
        toAddressBytes,
        new Big(amount).times(Math.pow(10, source.decimals)).toString(),
        false,
        adapterParams,
        {
            caller: "0x0000000000000000000000000000000000000000",
            callerBps: 0,
            partnerId: "0x0000",
        }).then((res) => {
            const gasCost = ethers.utils.formatUnits(res[0]._hex, source.decimals);
            console.log(gasCost, props)
            onLoad({
                received: Big(amount || 0)
                    .mul(0.995)
                    .toString(),
                gasCost,
            });
        });
}, [loading]);

return "";
