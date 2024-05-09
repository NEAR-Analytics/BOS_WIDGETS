const { 
    bridge, 
    icon, 
    name,
    color,
    tool, 
    account,
    chainList, 
    toggleDocClickHandler, 
    getQuote, 
    getAllToken, 
    getChainScan,
    getStatus,
    prices,
    currentChainId,
    setChain,
    setToChain,
    toChainId,
    execute,
} = props

const BridgePanel = styled.div`
  width: 478px;
  margin: 80px auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BridgeIcon = styled.div`
    height: 28px;
    overflow: hidden;
    img {
        height: 100%;
    }
`

const BridgeName = styled.div`
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    margin-left: 10px;
`

const Content = styled.div`
    border: 1px solid #373A53;
    border-radius: 16px;
    background: #262836;
    margin-top: 30px;
    padding: 16px;
`

const MainTitle = styled.div`
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    color: #fff;
    padding-top: 10px;
`

const ChainPairs = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;
    gap: 10px;
`


const ChainArrow = styled.div`
    cursor: pointer;
`

const TokenSpace = styled.div`
    height: ${props => {
        return props.height ? props.height : '6px'
    }};
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TransformArrow = styled.div`
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: #2E3142;
    border: 4px solid rgba(38, 40, 54, 1);
    display: flex;
    justify-content: center;
    align-items: center;
`

const {
    getAllPossibleConnections,
    getBalance,
    getRoute,
    computeDuration,
    addressFormated,
    balanceFormated,
    checkAndSetAllowance,
    getTransaction,
    saveTransaction,
} = VM.require('dapdapbos.near/widget/Bridge.Utils');



State.init({
    chainFrom: chainList[0],
    chainTo: chainList[1],
    allTokens: {},
    otherAddressChecked: false,
    inputTokens: [],
    _inputTokens: [],
    outputTokens: [],
    _outputTokens: [],
    selectInputToken: null,
    selectOutputToken: null,
    sendAmount: '',
    receiveAmount: '',
    inputBalance: '',
    inputBalanceLoading: false,
    outputBalance: '',
    outputBalanceLoading: false,
    duration: '',
    gasCostUSD: '',
    fromUSD: '',
    toUSD: '',
    toAddress: '',
    isValidAddress: false,
    showWarning: false,
    loading: false,
    showConfirm: false,
    route: null,
    canRoute: false,
    isSending: false,
    sendingDisabeld: false,
    btnText: 'Send',
    transactionList: [],
    signer: null,
    transitionUpdate: Date.now(),
    timeOut: null
})

function refreshTransactionList() {
    const transactionObj = getTransaction(`bridge-${account}-${tool}`)

    State.update({
        transactionList: transactionObj.transactionList,
    })
}

function validateInput() {
    const { sendAmount, selectInputToken, selectOutputToken, toAddress, otherAddressChecked, isValidAddress } = state
    const canRoute = sendAmount && Number(sendAmount) > 0 && selectInputToken && selectOutputToken
        && ((otherAddressChecked && toAddress && isValidAddress) || !otherAddressChecked)

    return canRoute
}

function getTokenBalance(chain, token) {
    const address = chain.nativeCurrency.symbol === token.symbol ? 'native' : token.address
    return getBalance(address, account, chain.rpcUrls[0], token.decimals)
}

function debounce(fn, wait) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, wait);
    };
}

function getTrade() {
    const { sendAmount, selectInputToken, selectOutputToken, toAddress, otherAddressChecked, isValidAddress } = state

    const canRoute = validateInput()

    if (canRoute) {
        State.update({
            loading: true,
            duration: '',
            gasCostUSD: '',
            receiveAmount: '',
            toUSD: '',
            route: null
        })

        getQuote({
            fromChainId: state.chainFrom.chainId,
            toChainId: state.chainTo.chainId,
            fromToken: {
                address: selectInputToken.address,
                symbol: selectInputToken.symbol,
                decimals: selectInputToken.decimals,
            },
            toToken: {
                address: selectOutputToken.address,
                symbol: selectOutputToken.symbol,
                decimals: selectOutputToken.decimals,
            },
            fromAddress: account,
            destAddress: otherAddressChecked ? toAddress : account,
            amount: new Big(sendAmount).times(Math.pow(10, selectInputToken.decimals)),
            engine: [tool]
        }, Ethers.provider().getSigner()).then(res => {
            console.log('route: ', res)
            if (res && res.length) {
                let maxReceiveAmount = 0
                let maxRoute
                res.forEach(route => {
                    if (Number(route.receiveAmount) > maxReceiveAmount) {
                        maxReceiveAmount = Number(route.receiveAmount)
                        maxRoute = route
                    }
                })

                console.log('maxRoute: ', maxRoute)

                State.update({
                    duration: maxRoute.duration,
                    gasCostUSD: maxRoute.feeType === 1 ? prices['ETH'] * maxRoute.gas : maxRoute.gas,
                    receiveAmount: new Big(maxRoute.receiveAmount).div(Math.pow(10, selectOutputToken.decimals)).toString(),
                    route: maxRoute,
                    loading: false,
                })

            } else {
                State.update({
                    loading: false,
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }
}

useEffect(() => {
    const chainFrom = chainList.filter(chain => chain.chainId === parseInt(currentChainId))[0]
    const chainTo = chainList.filter(chain => chain.chainId === parseInt(toChainId))[0]
    
    
    State.update({
        chainFrom,
        chainTo,
        // signer: provider.getSigner(),
    })
}, [])

useEffect(() => {
    getAllToken().then(res => {
        State.update({
            allTokens: res
        })
    })
}, [])

useEffect(() => {
    if (state.allTokens[1]) {
        State.update({
            inputTokens: state.allTokens[state.chainFrom.chainId],
            selectInputToken: null,
            inputBalance: '0.0',
        })
        setToChain(state.chainTo.chainId)
        setChain({ chainId: `0x${state.chainFrom.chainId.toString(16)}` })
    }
}, [state.chainFrom, state.allTokens])

useEffect(() => {
    if (state.allTokens[1]) {
        State.update({
            outputTokens: state.allTokens[state.chainTo.chainId],
            selectOutputToken: null,
            outputBalance: '0.0',
        })
    }
}, [state.chainTo, state.allTokens])


useEffect(() => {
    const inter = setInterval(() => {
        State.update({
            transitionUpdate: Date.now()
        })
    }, 10000)
    
    return () => {
        clearInterval(inter)
    }
}, [])



useEffect(() => {
    if (state.timeOut) {
        clearTimeout(state.timeOut)
    }
    const timeOut = setTimeout(() => {
        getTrade(sendAmount, selectInputToken, selectOutputToken, toAddress, otherAddressChecked)
    }, 500)

    State.update({
        timeOut
    })
    return () => {
        clearTimeout(timeOut)
    }
}, [state.sendAmount, state.selectInputToken, state.selectOutputToken, state.toAddress])

useEffect(() => {
    if (state.sendAmount && state.inputBalance) {
        const canRoute = validateInput()
        if (!canRoute) {
            State.update({
                btnText: 'Send',
            })
            return
        }

        if (Number(state.sendAmount) > Number(state.inputBalance)) {
            State.update({
                btnText: 'Insufficient balance',
                canRoute: false,
            })
            return
        }

        if (!state.route && !state.loading) {
            State.update({
                btnText: 'No Route',
                canRoute: false,
            })
            return
        }

        if (currentChainId !== state.chainFrom.chainId) {
            State.update({
                btnText: 'Switch Chain',
                canRoute: true,
            })
            return
        }

        State.update({
            btnText: 'Send',
            canRoute: true,
        })
    }
}, [state.sendAmount, state.inputBalance, state.route])


return <BridgePanel>
    <Header>
        <BridgeIcon>
            <img src={icon} />
        </BridgeIcon>
        <BridgeName>{name}</BridgeName>
    </Header>
    <Content>
        <MainTitle>Bridge</MainTitle>
        <ChainPairs>
            <Widget props={{
                chain: state.chainFrom,
                chainList,
                toggleDocClickHandler,
                onChainChange: (chain) => {
                    State.update({
                        chainFrom: chain
                    })
                },
            }} src="dapdapbos.near/widget/Bridge.ChainSelector" />

            <ChainArrow onClick={() => {
                const chainTo = state.chainFrom
                const chainFrom = state.chainTo
                State.update({
                    chainFrom,
                    chainTo,
                })
            }}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6L13.7273 6M13.7273 6L8.87869 11.0002M13.7273 6L8.87869 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
                </svg>
            </ChainArrow>
            <Widget props={{
                chain: state.chainTo,
                chainList,
                toggleDocClickHandler,
                onChainChange: (chain) => {
                    State.update({
                        chainTo: chain
                    })
                },
            }} src="dapdapbos.near/widget/Bridge.ChainSelector" />
        </ChainPairs>

        <Widget
            src="dapdapbos.near/widget/Bridge.Token"
            props={{
                title: 'Send',
                selectToken: state.selectInputToken,
                tokens: state.inputTokens,
                amount: state.sendAmount,
                balance: state.inputBalance,
                loadingBalance: state.inputBalanceLoading,
                disabled: false,
                prices,
                amountUSD: state.fromUSD,
                onTokenChange: (token) => {
                    State.update({
                        selectInputToken: token,
                        sendAmount: '',
                        receiveAmount: '',
                        inputBalance: '0',
                        outputBalance: '0',
                        inputBalanceLoading: true,
                    })

                    getTokenBalance(state.chainFrom, token).then(balance => {
                        State.update({
                            inputBalance: balance,
                            inputBalanceLoading: false,
                        })
                    })
                },
                onInputChange: (val) => {
                    State.update({
                        sendAmount: val
                    })
                }
            }}
        />

        <TokenSpace>
            <TransformArrow>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.49992 1V11.5M6.49992 11.5L1 6M6.49992 11.5L12 6" stroke="white" stroke-width="2" stroke-linecap="round" />
                </svg>
            </TransformArrow>
        </TokenSpace>

        <Widget
            src="dapdapbos.near/widget/Bridge.Token"
            props={{
                title: 'Receive',
                selectToken: null,
                disabled: true,
                balance: state.outputBalance,
                loadingBalance: state.outputBalanceLoading,
                selectToken: state.selectOutputToken,
                tokens: state.outputTokens,
                amount: state.receiveAmount,
                amountUSD: state.toUSD,
                prices,
                onTokenChange: (token) => {
                    State.update({
                        selectOutputToken: token,
                        outputBalanceLoading: true,
                    })
                    getTokenBalance(state.chainTo, token).then(balance => {
                        State.update({
                            outputBalance: balance,
                            outputBalanceLoading: false,
                        })
                    })
                },
            }}
        />

        {/* <Widget
            src="dapdapbos.near/widget/Bridge.AddressInput"
            props={{
                checked: state.otherAddressChecked,
                address: state.toAddress,
                isValidAddress: state.isValidAddress,
                onCheck: () => {
                    State.update({
                        otherAddressChecked: !state.otherAddressChecked
                    })
                },
                onChange: (value) => {
                    State.update({
                        toAddress: value,
                    })

                    const isValidAddress = ethers.utils.isAddress(value)

                    State.update({
                        isValidAddress
                    })

                }
            }}
        /> */}

        <Widget
            src="dapdapbos.near/widget/Bridge.FeeMsg"
            props={{
                duration: state.duration,
                gasCostUSD: state.gasCostUSD ? balanceFormated(state.gasCostUSD) : '',
            }}
        />

        {
            state.showWarning ? <Widget
                src="dapdapbos.near/widget/Bridge.Alert"
                props={{

                }}
            /> : null
        }

        <TokenSpace height={'12px'} />

        <Widget
            src="dapdapbos.near/widget/UI.Button"
            props={{
                text: state.btnText,
                type: 'primary',
                block: true,
                className: 'pink',
                disabled: !state.canRoute,
                loading: state.loading,
                style: { backgroundColor: color },
                onClick: () => {
                    if (state.btnText === 'Switch Chain') {
                        setChain({ chainId: `0x${state.chainFrom.chainId.toString(16)}` })
                        return
                    }
                    State.update({
                        showConfirm: true
                    })
                }
            }}
        />
    </Content>

    <TokenSpace height={'16px'} />

    {
        state.showConfirm ? <Widget
            src="dapdapbos.near/widget/Bridge.Confirm"
            props={{
                color: color,
                chainFrom: state.chainFrom,
                chainTo: state.chainTo,
                loading: state.isSending,
                disabled: state.isSendingDisabled,
                toAddress: addressFormated(state.otherAddressChecked ? state.toAddress : account),
                duration: state.duration,
                gasCostUSD: state.gasCostUSD,
                sendAmount: balanceFormated(state.sendAmount) + state.selectInputToken.symbol,
                receiveAmount: balanceFormated(state.receiveAmount) + state.selectOutputToken.symbol,
                onClose: () => {
                    if (!state.isSending) {
                        State.update({
                            showConfirm: false,
                        })
                    }
                },
                onSend: () => {
                    const { route } = state

                    State.update({
                        isSending: true,
                        isSendingDisabled: true,
                    })

                    console.log('route: ', route, props)

                    execute(route, Ethers.provider().getSigner()).then(txHash => {
                        console.log('txHash: ', txHash)
                        if (!txHash) {
                            return
                        }

                        getTokenBalance(state.chainFrom, state.selectInputToken)
                            .then(balance => {
                                State.update({
                                    inputBalance: balance,
                                })
                            })

                        getTokenBalance(state.chainTo, state.selectOutputToken)
                            .then(balance => {
                                State.update({
                                    outputBalance: balance,
                                })
                            })

                        State.update({
                            showConfirm: false,
                            isSending: false,
                            isSendingDisabled: false,
                        })

                        saveTransaction(`bridge-${account}-${tool}`, {
                            hash: txHash, 
                            link: getChainScan(state.chainFrom.chainId), 
                            duration: route.duration,
                            fromChainId: state.chainFrom.chainId,
                            fromChainLogo: state.chainFrom.icon,
                            fromTokenLogo: state.selectInputToken.logoURI,
                            fromAmount: state.sendAmount,
                            fromTokenSymbol: state.selectInputToken.symbol,
                            toChainId: state.chainTo.chainId,
                            toChainLogo: state.chainTo.icon,
                            toTokenLogo: state.selectOutputToken.logoURI,
                            toAmout: state.receiveAmount,
                            toToenSymbol: state.selectOutputToken.symbol,
                            time: Date.now(),
                        })

                        props.toast.success({
                            title: 'Transaction success',
                            text: '',
                        })

                        refreshTransactionList()

                    }).catch(err => {
                        console.log(err)

                        props.toast.fail({
                            title: 'Transaction failed',
                            text: err.message ? err.message : '',
                        })
   
                        State.update({
                            // showConfirm: false,
                            isSending: false,
                            isSendingDisabled: false,
                        })
                    })
                }
            }}
        /> : null
    }

    <Widget
        src="dapdapbos.near/widget/Bridge.Transaction"
        props={{
            transactionList: state.transactionList,
            updater: state.transitionUpdate,
            storageKey: `bridge-${account}-${tool}`,
            getStatus,
            tool,
            account,
            onRefresh: () => {
                refreshTransactionList()
            }
        }}
    />

    <div style={{ display: 'none' }}>
        <Widget
            src="dapdapbos.near/widget/Bridge.Utils" />
    </div>



</BridgePanel>