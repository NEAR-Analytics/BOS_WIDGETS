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
} = props;


const BASE_API = 'https://open-api.xy.finance/v1'
function buildSwap() {
  return asyncFetch(`${BASE_API}/swap?srcChainId=${quote.srcChainId}&fromTokenAddress=${quote.fromTokenAddress}&amount=${quote.fromTokenAmount}&destChainId=${quote.destChainId}&toTokenAddress=${quote.toTokenAddress}&slippage=1&referrer=0x6F78C36F8a645509744250B127646ABE4150103b&receiveAddress=${account}`).then(res => {
    const { body } = res
    if (body.tx) {
      return body.tx
    }
  })
}

if (!loading) return "";

const signer = Ethers.provider().getSigner()
buildSwap().then(params => {
  console.log('params:', params)
  if (params) {
    
    signer.sendTransaction({
      ...params,
      value: params.value.toString()
      // gasLimit: 11111192000
    })
      .then((tx) => {
        console.log(tx)
        tx.wait()
          .then((res) => {
            onSuccess(res);
          })
          .catch((err) => {
            onError(tx);
          });
      })
      .catch((err) => {
        console.log(err)
        onError(err);
      });
  } else {
    onError("Swap Failed")
  }
})



return "";