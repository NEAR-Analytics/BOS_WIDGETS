const {
  updater,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  slippage,
  account,
  prices,
  name,
} = props;

useEffect(() => {
  if (!updater) return;

  if (
    (!inputCurrency.address && !inputCurrency.isNative) ||
    (!outputCurrency.address && !outputCurrency.isNative) ||
    !inputCurrencyAmount
  ) {
    return;
  }

  const wrapType =
    inputCurrency.isNative && outputCurrency.address === wethAddress
      ? 1
      : inputCurrency.address === wethAddress && outputCurrency.isNative
      ? 2
      : 0;

  if (wrapType) {
    onLoad({
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount: inputCurrencyAmount,
      noPair: false,
    });
    return;
  }
  asyncFetch("/dapdap/quoter", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      params: JSON.stringify({
        template: name,
        inputCurrency,
        outputCurrency,
        inputAmount: inputCurrencyAmount,
        slippage,
        account,
      }),
    }),
  })
    .then((res) => {
      const data = res.body?.data;
      if (!data) throw Error;
      let priceImpact = null;

      if (prices) {
        const poolPrice = Big(prices[inputCurrency.symbol] || 1).div(
          prices[outputCurrency.symbol] || 1
        );
        const amountoutPrice = Big(data.outputCurrencyAmount).div(
          inputCurrencyAmount
        );

        priceImpact = poolPrice
          .minus(amountoutPrice)
          .div(poolPrice)
          .mul(100)
          .toString();
      }
      onLoad({
        inputCurrency,
        inputCurrencyAmount,
        outputCurrency,
        priceImpact,
        gas: data.txn.gasLimit,
        ...data,
        unsignedTx: data.txn,
      });
    })
    .catch((err) => {
      onLoad({
        inputCurrency,
        inputCurrencyAmount,
        outputCurrency,
        outputCurrencyAmount: "",
        noPair: true,
      });
    });
}, [updater]);
