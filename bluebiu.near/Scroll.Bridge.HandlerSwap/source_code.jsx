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
if (!loading) return "";

const _amount = new Big(amount).mul(Math.pow(10, 18)).toString()
const lastNum = _amount.slice(0, _amount.length - quote.vc.length) + quote.vc;
const signer = Ethers.provider().getSigner()
const params = {
    from: account,
    to: quote.endpoint,
    value: lastNum,
}
signer.sendTransaction(params)
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
    onError(err);
  });


return "";