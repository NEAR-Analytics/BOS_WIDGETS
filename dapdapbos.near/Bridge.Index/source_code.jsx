const { bridge, chainFrom, chainTo, getLifi } = props

const BridgePanel = styled.div`
  width: 478px;
  margin: 80px auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BridgeIcon = styled.img`
    width: 28px;
    height: 28px;
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
`

const ChainItem = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    &.right {
        padding-left: 30px;
    }
`
const ChainIcon = styled.img`
    width: 28px;
    height: 28px;
    border-radius: 8px;
    &.ml30 {
        margin-left: 30px;
    }
`
const ChainName = styled.div`
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    color: #fff;
    margin-left: 7px;
`
const ChainArrow = styled.div`
    /* margin-right: 30px; */
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
} = VM.require('dapdapbos.near/widget/Bridge.Utils');

const account = Ethers.send("eth_requestAccounts", [])[0];

State.init({
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
    outputBalance: '',
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
})

function refreshTransactionList() {
    const transactionList = getTransaction()
    State.update({
        transactionList,
    })
}

function validateInput() {
    const { sendAmount, selectInputToken, selectOutputToken, toAddress, otherAddressChecked, isValidAddress } = state
    const canRoute = sendAmount && selectInputToken && selectOutputToken
        && ((otherAddressChecked && toAddress && isValidAddress) || !otherAddressChecked)

    return canRoute
}

function getTokenBalance(chain, token) {
    const address = chain.nativeToken.address === token.address ? 'native' : token.address
    return getBalance(address, account, chain.metamask.rpcUrls[0], token.decimals)
    //                 .then(balance => {
    //                     console.log('balance: ', balance)
    //                     State.update({
    //                         inputBalance: balance,
    //                     })
    //                 })
}

useEffect(() => {
    const tokensP = asyncFetch("https://li.quest/v1/tokens")

    tokensP.then(res => {
        const { tokens } = res.body
        const inputTokens = tokens[chainFrom.id].filter(item => !!item.logoURI)
        // const outputTokens = tokens[chainTo.id].filter(item => !!item.logoURI)

        State.update({
            // _inputTokens: inputTokens,
            // _outputTokens: outputTokens,
            inputTokens: inputTokens.slice(0, 20),
            outputTokens: [],
        })
    })
}, [])


useEffect(() => {
    refreshTransactionList()
}, [])


useEffect(() => {
    const timer = setTimeout(() => {
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

            getRoute({
                fromChainId: chainFrom.id,
                toChainId: chainTo.id,
                fromTokenAddress: selectInputToken.address,
                toTokenAddress: selectOutputToken.address,
                fromAmount: new Big(sendAmount).times(Math.pow(10, selectInputToken.decimals)).toString(),
                fromAddress: account,
                toAddress: otherAddressChecked ? toAddress : account,
            }, bridge.key).then(route => {
                if (route) {
                    const duration = computeDuration(route)
                    const gasCostUSD = route.gasCostUSD
                    const fromUSD = route.fromAmountUSD
                    const toUSD = route.toAmountUSD
                    const receiveAmount = new Big(route.toAmount).div(Math.pow(10, selectOutputToken.decimals)).toString()
                    State.update({
                        duration,
                        gasCostUSD,
                        receiveAmount,
                        fromUSD,
                        toUSD,
                        route,
                    })
                }

                State.update({
                    loading: false
                })
            })
        } else {
            State.update({
                canRoute: false,
            })
        }
    }, 1000);

    return () => {
        clearTimeout(timer);
    };
}, [state.sendAmount, state.selectInputToken, state.selectOutputToken, state.toAddress])

useEffect(() => {
    if (state.sendAmount && state.inputBalance) {
        const canRoute = validateInput()
        console.log('canRoute: ', canRoute)
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

        State.update({
            btnText: 'Send',
            canRoute: true,
        })
    }
}, [state.sendAmount, state.inputBalance, state.route])

return <BridgePanel>
    <Header>
        <BridgeIcon src={bridge.logoURI} />
        <BridgeName>{bridge.name}</BridgeName>
    </Header>
    <Content>
        <MainTitle>Bridge</MainTitle>
        <ChainPairs>
            <ChainItem>
                <ChainIcon src={chainFrom.logoURI} />
                <ChainName>{chainFrom.name}</ChainName>
            </ChainItem>
            <ChainArrow>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6L13.7273 6M13.7273 6L8.87869 11.0002M13.7273 6L8.87869 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
                </svg>
            </ChainArrow>
            <ChainItem>
                <ChainIcon className="ml30" src={chainTo.logoURI} />
                <ChainName>{chainTo.name}</ChainName>
            </ChainItem>
        </ChainPairs>

        <Widget
            src="dapdapbos.near/widget/Bridge.Token"
            props={{
                title: 'Send',
                selectToken: state.selectInputToken,
                tokens: state.inputTokens,
                amount: state.sendAmount,
                balance: state.inputBalance,
                disabled: false,
                amountUSD: state.fromUSD,
                onTokenChange: (token) => {

                    State.update({
                        selectInputToken: token,
                        sendAmount: '',
                        receiveAmount: '',
                        inputBalance: '0',
                        outputBalance: '0',
                    })

                    getAllPossibleConnections({
                        fromChain: chainFrom.id,
                        toChain: chainTo.id,
                        fromToken: token.address
                    })
                        .then((tokens) => {
                            State.update({
                                outputTokens: tokens.filter(item => !!item.logoURI).slice(0, 10)
                            })
                        })

                    getTokenBalance(chainFrom, token).then(balance => {
                        console.log('balance: ', balance)
                        State.update({
                            inputBalance: balance,
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
                selectToken: state.selectOutputToken,
                tokens: state.outputTokens,
                amount: state.receiveAmount,
                amountUSD: state.toUSD,
                onTokenChange: (token) => {
                    State.update({
                        selectOutputToken: token
                    })

                    getTokenBalance(chainTo, token).then(balance => {
                        console.log('balance: ', balance)
                        State.update({
                            outputBalance: balance,
                        })
                    })
                },
            }}
        />

        <Widget
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
        />

        <Widget
            src="dapdapbos.near/widget/Bridge.FeeMsg"
            props={{
                duration: state.duration,
                gasCostUSD: state.gasCostUSD,
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
                onClick: () => {
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
                chainFrom: chainFrom,
                chainTo: chainTo,
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

                    console.log('route', route)

                    State.update({
                        isSending: true,
                        isSendingDisabled: true,
                    })

                    checkAndSetAllowance(
                        chainFrom.metamask.rpcUrls[0],
                        route,
                        getLifi,
                    ).then(res => {
                        console.log(res)

                        getTokenBalance(chainFrom, state.selectInputToken)
                            .then(balance => {
                                State.update({
                                    inputBalance: balance,
                                })
                            })

                        getTokenBalance(chainTo, state.selectOutputToken)
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

                        refreshTransactionList()

                        props.toast.success({
                            title: 'Transaction success',
                            text: '',
                        })

                    }).catch(err => {
                        props.toast.fail({
                            title: 'Transaction failed',
                            text: err,
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
            onRefresh: () => {
                refreshTransactionList()
            }
        }}
    />

    <div style={{ display: none }}>
        <Widget
            src="dapdapbos.near/widget/Bridge.Utils" />
    </div>
</BridgePanel>