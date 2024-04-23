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

const L1MessageBridgeAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_nonce",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_message",
        "type": "bytes"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "batchIndex",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "merkleProof",
            "type": "bytes"
          }
        ],
        "internalType": "struct IL1ScrollMessenger.L2MessageProof",
        "name": "_proof",
        "type": "tuple"
      }
    ],
    "name": "relayMessageWithProof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
];

State.init({
  isFold: false,
  isLoadingTx: {},
  proccessSum: 0,
  txsUpdated: [],
  filteredTxs: [],
  isLoading: false,
})

const L1MessageBridgeContract = new ethers.Contract(
  '0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367',
  L1MessageBridgeAbi,
  Ethers.provider().getSigner()
)

function handleClaim(claimInfo, hash) {
  if (!claimInfo) {
    return
  }

  if (currentChainId !== mainnet.id) {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: `0x${Number(mainnet.id).toString(16)}` },
    ]);
    return
  }

  let toastId

  toastId = toast?.loading({
    title: `Claim From ETH`,
  });


  L1MessageBridgeContract.relayMessageWithProof(
    claimInfo.from,
    claimInfo.to,
    claimInfo.value,
    claimInfo.nonce,
    claimInfo.message,
    {
      batchIndex: claimInfo.proof.batch_index,
      merkleProof: claimInfo.proof.merkle_proof,
    },
    {
      gasLimit: 162000,
    }).then((tx) => {
      tx.wait()
        .then((res) => {
          txs[hash].status = 2
          Storage.privateSet("claim_txs", txs);
          getAllClaimTx()

          toast?.dismiss(toastId);
          delete state.isLoadingTx[hash]
          State.update({
            isLoadingTx: state.isLoadingTx
          })
          toast?.success({
            title: "Claim Successfully!",
            text: `Claim Successfully`,
            tx: tx,
            chainId: currentChainId,
          });
        })
        .catch((err) => {
          console.log(err)
          delete state.isLoadingTx[hash]
          State.update({
            isLoadingTx: state.isLoadingTx
          })
          toast?.fail({
            title: "Claim Failed!",
            text: "Claim Failed",
            tx: '',
            chainId: currentChainId,
          });
        });
    })
    .catch((err) => {
      console.log(err)
      toast?.fail({
        title: "Claim Failed!",
        text: `Claim Failed`,
        tx: '',
        chainId: currentChainId,
      });
      delete state.isLoadingTx[hash]
          State.update({
            isLoadingTx: state.isLoadingTx
          })
    });
}

function getAllClaimTx() {
  State.update({
    isLoading: true,
  })

  return asyncFetch(`https://mainnet-api-bridge-v2.scroll.io/api/l2/unclaimed/withdrawals?address=${account}&page=1&page_size=100`)
    .then(res => {
      State.update({
        isLoading: false,
        filteredTxs: res.body.data.results
      })
    })
}

function formatHash(hash) {
  return hash.replace(/(\w{6}).+(\w{6})/, ($1, $2, $3) => {
    return `${$2}....${$3}`
  })
}

useEffect(() => {
  const inter = setInterval(() => {
    getAllClaimTx()
  }, 10000)

  return () => {
    clearInterval(inter)
  }
}, [])

useEffect(() => {
  if (state.filteredTxs && txs && !state.loading) {
    const pArray = []
    let needFold = true
    let proccessSum = 0
    pArray = Object.keys(txs).map(key => {
      const currentTx = txs[key]
      if (currentTx.status === 2) {
        return
      }
      return asyncFetch(
        `https://api.orbiter.finance/sdk/transaction/cross-chain/${key}`
      )
        .then((res) => {
          if (res.body.status === "success") {
            
            state.filteredTxs.forEach(item => {
              if (item.hash === key) {
                needFold = true
                proccessSum += 1
                if (item.claim_info) {
                  currentTx.status = 1
                  currentTx.claim_info = item.claim_info
                } else {
                  currentTx.status = 3
                }
              }
            })

            if (!currentTx.status && currentTx.fromChainId === 1) {
              currentTx.status = 2
            } else if (!currentTx.status && currentTx.fromChainId === 534352) {
              currentTx.status = 3
            }

          } else {
            needFold = true
            proccessSum += 1
            currentTx.status = 3
          }

          Storage.privateSet("claim_txs", txs);
        })
    })

    Promise.all(pArray).then((res) => {
      State.update({
        txsUpdated: Object.values(txs),
        isFold: needFold,
        proccessSum
      })
    })
  }
}, [state.filteredTxs, txs, state.loading])


return <Transactions>
  <div className="header">
    <div className="title">
      <span>Transaction History</span>
      <span>{state.proccessSum} Processing</span>
    </div>
    <div className="fresh">
      <RefreshText onClick={() => {
        getAllClaimTx()
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
          if (tx.fromChainId !== 534352 && tx.toChainId !== 534352) {
            return null
          }
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
                  tx.status === 1 && <div className="btn" onClick={() => {
                    if (state.isLoadingTx[tx.hash]) {
                      return
                    }
                    handleClaim(tx.claim_info, tx.hash)
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
                <a target="_blank" className="tx-link" href={tx.link}>Tx</a>
              </div>
              {
                tx.status === 3 ? <div>~1 hour</div> : null
              }
            </div>
          </div>
        })
      }
    </div> : null
  }


</Transactions>;