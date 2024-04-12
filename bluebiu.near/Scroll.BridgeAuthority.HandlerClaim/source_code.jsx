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
    .claim-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      .btn {
        cursor: pointer;
        background-color: var(--button-color);
        color: var(--button-text-color);
      }
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
  }
  .time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-bottom: 20px;
    margin-top: 10px;
    border-bottom: 1px solid #343838;
    .format-time-link {
      display: flex;
      align-items: center;
      gap: 10px;
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

console.log('txs: ', txs)

const L1MessageBridgeContract = new ethers.Contract(
  '0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367',
  L1MessageBridgeAbi,
  Ethers.provider().getSigner()
)

function handleClaim(claimInfo) {
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
      console.log(tx)
      tx.wait()
        .then((res) => {
          console.log(res)
          getAllClaimTx()

          toast?.dismiss(toastId);

          toast?.success({
            title: "Claim Successfully!",
            text: `Claim Successfully`,
            tx: tx,
            chainId: currentChainId,
          });
        })
        .catch((err) => {
          console.log(err)
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
    });
}

function getAllClaimTx() {
  State.update({
    isLoading: true,
  })

  return asyncFetch(`https://mainnet-api-bridge-v2.scroll.io/api/l2/unclaimed/withdrawals?address=${account}&page=1&page_size=100`)
    .then(res => {
      console.log('res2:', res)
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
  getAllClaimTx()
}, [])

State.init({
  filteredTxs: [],
  isLoading: false
})

// if (!state.filteredTxs || state.filteredTxs.length === 0) {
//   return ''
// }

return <Transactions>
  <div className="header">
    <div className="title">
      <span>Transaction History</span>
      <span>3 Processing</span>
    </div>
    <div className="fresh" onClick={getAllClaimTx}>
      <RefreshText>
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
      <ArrowIcon>
        <Widget
          src="bluebiu.near/widget/Arbitrum.Swap.ArrowIcon"
          props={{ size: 12 }}
        />
      </ArrowIcon>
    </div>
  </div>
  <div className="list">
    {
      (state.filteredTxs || []).map(item => {
        return <div className="claim-line">
          {formatHash(item.hash)}
          <div className="btn" style={{ opacity: item.claim_info ? 1 : 0.2 }} onClick={() => {
            handleClaim(item.claim_info)
          }}>Claim</div>
        </div>
      })
    }
    {/* {
      Object.values(txs).map(tx => {
        return <div key={tx.hash}>
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
            <div>Processing</div>
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
              <a target="_blank" className="tx-link" src={tx.link}>Tx</a>
            </div>
            <div>~1 hour</div>
          </div>
        </div>
      })
    } */}
  </div>

</Transactions>;