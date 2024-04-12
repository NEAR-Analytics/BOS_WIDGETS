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
} = props;

const Transactions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: var(--label-color);
  gap: 20px;
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
      gasLimit: 5552000,
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
</Transactions>;