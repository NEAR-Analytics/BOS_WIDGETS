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
  return asyncFetch(`${BASE_API}/swap?srcChainId=${quote.srcChainId}&fromTokenAddress=${quote.fromTokenAddress}&amount=${quote.fromTokenAmount}&destChainId=${quote.destChainId}&toTokenAddress=${quote.toTokenAddress}&slippage=1&referrer=0x93A193597E08351D84eb115E4644C77578D665E3&receiveAddress=${account}`).then(res => {
    const { body } = res
    console.log('swap: ', body)
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
    
    console.log('signer: ', signer)
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

// const _amount = new Big(amount).mul(Math.pow(10, 18)).toString()
// const lastNum = _amount.slice(0, _amount.length - quote.vc.length) + quote.vc;
// const signer = Ethers.provider().getSigner()
// const params = {
//     from: account,
//     to: quote.endpoint,
//     value: lastNum,
// }
// signer.sendTransaction(params)
// .then((tx) => {
//     console.log(tx)
//     tx.wait()
//       .then((res) => {
//         onSuccess(res);
//       })
//       .catch((err) => {
//         onError(tx);
//       });
//   })
//   .catch((err) => {
//     onError(err);
//   });


return "";