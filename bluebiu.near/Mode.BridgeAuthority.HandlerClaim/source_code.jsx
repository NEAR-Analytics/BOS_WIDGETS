const {
  amount,
  account,
  currency,
  routerAddress,
  routerEthAddress,
  target,
  loading,
  onSuccess,
  onError,
  quote,
  currentChainId,
  mainnet,
  toast,
  txs,
} = props;

const {
  getETHWithdrawalsFromOp,
  handleWithdrawalProve,
  checkOutputFinalized,
  handleWithdrawalClaim,
  checkMessageOutput,
} = VM.require('bluebiu.near/widget/Mode.BridgeAuthority.Util');

const Transactions = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: flex-start; */
  color: var(--label-color);
  gap: 20px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    padding: 5px 0;
    color: rgb(151, 154, 190);
    font-weight: 500;
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


State.init({
  isFold: false,
  isLoadingTx: {},
  proccessSum: 0,
  txsUpdated: [],
  filteredTxs: [],
  isLoading: false,
})

const signer = Ethers.provider().getSigner()
function switchChain() {
  if (currentChainId !== mainnet.id) {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: `0x${Number(mainnet.id).toString(16)}` },
    ]);
  }
}

let toastId

function handleProve(tx) {
  if (currentChainId !== mainnet.id) {
    switchChain()
    return
  }

  toastId = toast?.loading({
    title: `Prove Withdrawal From ETH`,
  });



  handleWithdrawalProve(tx.proveData, () => {
    toast?.dismiss(toastId);
    delete state.isLoadingTx[tx.hash]
    // getAllStatus(txs)
    State.update({
      isLoadingTx: state.isLoadingTx
    })
    txs[tx.hash].status = 4
    Storage.privateSet("mode_claim_txs", txs);
    getAllStatus(txs)
    toast?.success({
      title: "Prove Withdrawal Successfully!",
      text: `Prove Withdrawal Successfully`,
      tx: tx,
      chainId: currentChainId,
    });
  }, (e) => {
    console.log(err)
    toast?.fail({
      title: "Prove Withdrawal Failed!",
      text: `Prove Withdrawal Failed`,
      tx: '',
      chainId: currentChainId,
    });
    delete state.isLoadingTx[tx.hash]
    State.update({
      isLoadingTx: state.isLoadingTx
    })
  })

}

function handleCliaim(tx) {
  if (currentChainId !== mainnet.id) {
    switchChain()
    return
  }

  toastId = toast?.loading({
    title: `Prove Withdrawal From ETH`,
  });

  handleWithdrawalClaim(tx.proveData, () => {
    toast?.dismiss(toastId);
    delete state.isLoadingTx[tx.hash]
    // getAllStatus(txs)
    State.update({
      isLoadingTx: state.isLoadingTx
    })
    txs[tx.hash].status = 2
    Storage.privateSet("mode_claim_txs", txs);
    getAllStatus(txs)

    toast?.success({
      title: "Cliam Successfully!",
      text: `Cliam Successfully`,
      tx: tx,
      chainId: currentChainId,
    });
  }, (e) => {
    console.log(err)
    toast?.fail({
      title: "Cliam Failed!",
      text: `Cliam Failed`,
      tx: '',
      chainId: currentChainId,
    });
    delete state.isLoadingTx[tx.hash]
    State.update({
      isLoadingTx: state.isLoadingTx
    })
  })

}

function getAllStatus(txs) {
  if (txs && !state.isLoading) {
    State.update({
      isLoading: true
    })

    const pArray = []
    let needFold = true
    pArray = Object.keys(txs).map(key => {
      return new Promise((resolve, reject) => {
        const currentTx = txs[key]
        if (currentTx.status === 2) {
          resolve(currentTx)
          return
        }

        if (!currentTx.status) {
          currentTx.status = 1
        }


        if (currentTx.fromChainId === 34443) {
            getETHWithdrawalsFromOp(account, currentTx.symbol === 'ETH' ? 1 : 2, currentTx.hash, (proveData) => {
              // console.log('proveData:', proveData)
              
              currentTx.proveData = proveData
              if (currentTx.status === 1) { 
                checkMessageOutput(proveData.blockNumber, (l2OutputIndex) => {
                  if (l2OutputIndex) {
                    currentTx.status = 3 // need prove
                  } 
                  resolve(currentTx)
                })
              }

              if (currentTx.status === 4) { // wating 7 days 
                checkOutputFinalized(proveData, (isFinalized) => {
                  if (isFinalized) {
                    currentTx.status = 5 // can cliam
                  }
                  resolve(currentTx)
                }, (err) => {
                  console.log(err)
                })
              } else {
                resolve(currentTx)
              }
            })
        } else {
          currentTx.status = 2
          resolve(currentTx)
        }

      })
    })

    Promise.all(pArray).then((res) => {
      const txList = Object.values(txs)
      if (txList.length) {
        Storage.privateSet("mode_claim_txs", txs);
      }

      const proccessSum = txList.filter(item => item.status !== 2).length

      State.update({
        txsUpdated: txList,
        isFold: needFold,
        proccessSum,
        isLoading: false
      })
    })
  }
}

useEffect(() => {
  getAllStatus(txs)
}, [txs])

useEffect(() => {
  const inter = setInterval(() => {
    // getAllStatus(txs)
  }, 30000)

  return () => {
    clearInterval(inter)
  }
}, [txs])


return <Transactions>
  <div className="header">
    <div className="title">
      <span>Transaction History</span>
      <span>{state.proccessSum} Processing</span>
    </div>
    <div className="fresh">
      <RefreshText onClick={() => {
        getAllStatus(txs)
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
        (state.txsUpdated || []).map(tx => {

          return <div className="tx-line" key={tx.hash}>
            <div className="chain-token-status">
              <div className="chain-token">
                <img src={tx.fromLogo} />
                <Widget src="bluebiu.near/widget/Base.Bridge.SwapRightIcon" />
                <img src={tx.toLogo} />
                <img src={tx.tokenLogo} />
                <div>{tx.amount} {tx.symbol}</div>
                <Widget src="bluebiu.near/widget/Base.Bridge.SwapRightIcon" />
                <img src={tx.tokenLogo} />
                <div>{tx.amount} {tx.symbol}</div>
              </div>
              <div>
                {
                  tx.status === 1 && <div className="processing">Processing</div>
                }
                {
                  tx.status === 2 && <div className="complete">Complete</div>
                }
                {
                  tx.status === 3 && <div className="btn" onClick={() => {
                    if (state.isLoadingTx[tx.hash]) {
                      return
                    }
                    handleProve(tx)
                    state.isLoadingTx[tx.hash] = true
                    State.update({
                      isLoadingTx: state.isLoadingTx
                    })
                  }}>
                    {state.isLoadingTx[tx.hash] && (
                      <Widget
                        src="bluebiu.near/widget/0vix.LendingLoadingIcon"
                        props={{
                          size: 16,
                        }}
                      />
                    )}
                    Prove
                  </div>
                }
                {
                  tx.status === 4 && <div className="processing">Wait for 7 days</div>
                }
                {
                  tx.status === 5 && <div className="btn" onClick={() => {
                    if (state.isLoadingTx[tx.hash]) {
                      return
                    }
                    handleWithdrawalClaim(tx)
                    state.isLoadingTx[tx.hash] = true
                    State.update({
                      isLoadingTx: state.isLoadingTx
                    })
                  }}>
                    {state.isLoadingTx[tx.hash] && (
                      <Widget
                        src="bluebiu.near/widget/0vix.LendingLoadingIcon"
                        props={{
                          size: 16,
                        }}
                      />
                    )}
                    Prove
                  </div>
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
                <a target="_blank" className="tx-link" href={tx.link}>Tx</a>
              </div>
              {
                tx.status !== 2 ? <div>~7 day</div> : null
              }
            </div>
          </div>
        })
      }
    </div> : null
  }

  <div style={{ display: 'none' }}>
    <Widget
      src="bluebiu.near/widget/Mode.BridgeAuthority.Util"
    />
  </div>
</Transactions>;