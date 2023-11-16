const {
  update,
  routerAddress,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  chainId,
  loadAmountOut,
  quoterAddress,
  tradeType,
} = props;
const account = Ethers.send("eth_requestAccounts", [])[0];

if (
  !update ||
  !inputCurrency.address ||
  !outputCurrency.address ||
  state.fetching
) {
  return "";
}

const WETH_ADDRESS = props.wethAddress;

const wrapType =
  inputCurrency.address === "native" && outputCurrency.address === wethAddress
    ? 1
    : inputCurrency.address === wethAddress &&
      outputCurrency.address === "native"
    ? 2
    : 0;

const onError = () => {
  loadAmountOut({
    loading: false,
    success: true,
    noPair: false,
  });
  return "";
};
if (wrapType > 0) {
  loadAmountOut({
    amountOut: inputCurrencyAmount,
    outputCurrencyAmount: inputCurrencyAmount,
    fee: 0,
    noPair: false,
    loading: false,
  });
  return "";
}
if (Big(inputCurrencyAmount || "0").eq(0)) {
  onError();
  return "";
}
const realTokenIn =
  inputCurrency.address === "native" ? WETH_ADDRESS : inputCurrency.address;

const realTokenOut =
  outputCurrency.address === "native" ? WETH_ADDRESS : outputCurrency.address;

const AccessKey = Storage.get(
  "AccessKey",
  "guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
);
State.update({
  fetching: true,
});
const _amountIn = Big(inputCurrencyAmount)
  .mul(Big(10).pow(inputCurrency.decimals))
  .toFixed();
const fetchTradeInfo = () => {
  asyncFetch(
    `https://api.dapdap.net/api/uniswap/v2/quote?token_in=${realTokenIn}&token_out=${realTokenOut}&chain_id=${chainId}&amount=${_amountIn}`
  )
    .then((res) => {
      if (res?.body && res.body.code === "0" && res.body.data?.quote) {
        const data = res.body.data.quote;
        loadAmountOut({
          ...data,
          outputCurrencyAmount: data.quoteDecimals,
          noPair: data.noPair,
          trade: {
            gasCost: Big(data.gasUseEstimate || 0)
              .div(Big(10).pow(18))
              .toFixed(),
            priceImpact: data.priceImpact,
            routes: data.route,
            tokenPath: data.tokenPath,
          },
        });
        setTimeout(() => {
          State.update({
            fetching: false,
          });
        }, 500);
        return;
      }
      if (
        res.body &&
        res.body.data === null &&
        res.body.msg === "no pair exist"
      ) {
        loadAmountOut({
          outputCurrencyAmount: 0,
          noPair: true,
          loading: false,
        });
        setTimeout(() => {
          State.update({
            fetching: false,
          });
        }, 500);
        return;
      }
      setTimeout(() => {
        fetchTradeInfo();
      }, 2000);
    })
    .catch(() => {
      onError();
      return "";
    });
};

fetchTradeInfo();

return "";
