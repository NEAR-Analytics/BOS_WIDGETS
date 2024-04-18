const TransactionWapper = styled.div`
    width: 478px;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid rgba(55, 58, 83, 1);
    background: #262836;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 5px 0;
  }
  .list {
    flex: 1;
    .tx-line {
      &:not(:last-child) {
        border-bottom: 1px solid #343838;
      } 
    }
    .claim-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      
    }

  }
  .fresh {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .chain-token-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-top: 20px;
    .chain-token {
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        height: 22px;
      }
    }
    .btn {
        cursor: pointer;
        background-color: #EBF479;
        color: #000;
        width: 90px;
        height: 32px;
        line-height: 16px;
        text-align: center;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    .complete {
      color: #979ABE;
    }
    .proccessing {
      color: #00D1FF;
    }
  }
  .time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-bottom: 20px;
    margin-top: 10px;
    
    .format-time-link {
      display: flex;
      align-items: center;
      gap: 10px;
      a {
        color: #64B5FF;
      }
    }
  }
`

const RefreshText = styled.div`
  text-decoration: underline;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ArrowIcon = styled.div`
  transform: rotate(180deg);
  cursor: pointer;
`;

const { updater, storageKey, getStatus, tool, account } = props

State.init({
    isFold: true,
    isLoadingTx: {},
    proccessSum: 0,
    refreshTransactionList: [],
    isLoading: false,
})

const {
    getTransaction,
    saveTransaction,
    saveAllTransaction,
    balanceFormated,
} = VM.require('dapdapbos.near/widget/Bridge.Utils');

function refreshTransactionList() {
    State.update({
        isLoading: true
    })
    const transactionObj = getTransaction(storageKey)

    const transactionList = []
    let proccessSum = 0

    // console.log('transactionObj: ', transactionObj)

    const pList = transactionObj.transactionList.map(item => {
        if (item.status === 2) {
            transactionList.push(item)
            return
        }
        return getStatus({
            hash: item.hash,
            chainId: item.fromChainId,
            address: account,
            fromChainId: item.fromChainId,
            toChainId: item.toChainId,
        }, tool).then(isComplate => {
            if (isComplate) {
                item.status = 2
            } else {
                proccessSum ++
                item.status = 3
            }

            transactionList.push(item)
        }).catch(err => {
            transactionList.push(item)
        })
    })

    Promise.all(pList).then(() => {
        // console.log('transactionObj.transactionList: ', transactionList.length, transactionList)
        if (transactionList.length > 0) {
            saveAllTransaction(storageKey, transactionList)
        }
        // saveAllTransaction(storageKey, transactionList)
        const isFold = proccessSum > 0
        State.update({
            transactionList,
            isLoading: false,
            proccessSum,
            isFold,
        })
    }).catch(err => {
        if (transactionList.length > 0) {
            saveAllTransaction(storageKey, transactionList)
        }
        // saveAllTransaction(storageKey, transactionList)
        const isFold = proccessSum > 0
        State.update({
            transactionList,
            isLoading: false,
            proccessSum,
            isFold,
        })
    })
}

useEffect(() => {
    refreshTransactionList()
}, [updater])

return <TransactionWapper>
    <div className="header">
        <div className="title">
            <span>Transaction History</span>
            <span>{state.proccessSum} Processing</span>
        </div>
        <div className="fresh">
            <RefreshText onClick={() => {
                refreshTransactionList()
            }}>
                {state.isLoading && (
                    <Widget
                        src="bluebiu.near/widget/0vix.LendingLoadingIcon"
                        props={{
                            size: 16,
                        }}
                    />
                )}
                Refresh
            </RefreshText>
            <ArrowIcon onClick={() => {
                State.update({
                    isFold: !state.isFold
                })
            }}>
                <Widget
                    src="bluebiu.near/widget/Arbitrum.Swap.ArrowIcon"
                    props={{ size: 12 }}
                />
            </ArrowIcon>
        </div>
    </div>
    {
        state.isFold ? <div className="list">
            {
                (state.transactionList || []).map(tx => {
                    return <div className="tx-line" key={tx.hash}>
                        <div className="chain-token-status">
                            <div className="chain-token">
                                <img src={tx.fromChainLogo} />
                                <Widget src="bluebiu.near/widget/Base.Bridge.SwapRightIcon" />
                                <img src={tx.toChainLogo} />
                                <img src={tx.fromTokenLogo} />
                                <div>{balanceFormated(tx.fromAmount)} {tx.fromTokenSymbol}</div>
                                <Widget src="bluebiu.near/widget/Base.Bridge.SwapRightIcon" />
                                <img src={tx.toTokenLogo} />
                                <div>{balanceFormated(tx.toAmout)} {tx.toToenSymbol}</div>
                            </div>
                            <div>
                                {
                                    tx.status === 1 && <div className="btn" onClick={() => {
                                        if (state.isLoadingTx[tx.hash]) {
                                            return
                                        }
                                        // handleClaim(tx.claim_info, tx.hash)

                                    }}>
                                        {state.isLoadingTx[tx.hash] && (
                                            <Widget
                                                src="bluebiu.near/widget/0vix.LendingLoadingIcon"
                                                props={{
                                                    size: 16,
                                                }}
                                            />
                                        )}
                                        Claim
                                    </div>
                                }
                                {
                                    tx.status === 2 && <div className="complete">Complete</div>
                                }
                                {
                                    tx.status === 3 && <div className="processing">Processing</div>
                                }
                            </div>
                        </div>
                        <div className="time">
                            <div className="format-time-link">
                                <div className="format-time">
                                    <Widget
                                        src="bluebiu.near/widget/Base.Bridge.FormateTxDate"
                                        props={{
                                            date: tx.time,
                                        }}
                                    />
                                </div>
                                <a target="_blank" className="tx-link" href={`${tx.link}/tx/${tx.hash}`}>Tx</a>
                            </div>
                            {
                                tx.status === 3 ? <div>~{ tx.duration } min</div> : null
                            }
                        </div>
                    </div>
                })
            }
        </div> : null
    }


</TransactionWapper>