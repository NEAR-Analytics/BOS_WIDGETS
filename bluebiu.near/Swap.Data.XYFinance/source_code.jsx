const {
  updater,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  slippage,
  account,
  multicall,
  multicallAddress,
  rpc,
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
      outputCurrencyAmount: inputCurrencyAmount,
      noPair: false,
    });
    return;
  }

  const amount = ethers.utils.parseUnits(
    Big(inputCurrencyAmount || 0).toFixed(inputCurrency.decimals),
    inputCurrency.decimals
  );

  const path = [
    inputCurrency.address === "native"
      ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      : inputCurrency.address,
    outputCurrency.address === "native"
      ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      : outputCurrency.address,
  ];
  const getAmountsOut = () => {
    const params = `src_chain_id=${
      inputCurrency.chainId
    }&src_quote_token_address=${
      path[0]
    }&src_quote_token_amount=${amount}&dst_chain_id=${
      outputCurrency.chainId
    }&dst_quote_token_address=${path[1]}&slippage=${
      slippage || 0.5
    }&commission_rate=0`;

    asyncFetch(`https://router-api.xy.finance/xy_router/quote?${params}`)
      .then((res) => {
        const data = res.body?.routes?.[0];
        if (!data) {
          onLoad({
            outputCurrencyAmount: "",
            noPair: true,
          });
          return;
        }

        asyncFetch(
          `https://router-api.xy.finance/xy_router/build_tx?src_chain_id=${data.src_chain_id}&src_quote_token_address=${data.src_quote_token_address}&src_quote_token_amount=${data.src_quote_token_amount}&dst_chain_id=${data.dst_chain_id}&dst_quote_token_address=${data.dst_quote_token_address}&slippage=${data.slippage}&receiver=${account}&src_swap_provider=${data.src_swap_description.provider}&commission_rate=0`
        )
          .then((txRes) => {
            const txData = txRes.body;
            if (!txData.success) {
              onLoad({
                outputCurrencyAmount: ethers.utils.formatUnits(
                  data.dst_quote_token_amount,
                  outputCurrency.decimals
                ),
                noPair: true,
              });
              return;
            }
            const priceImpact = Big(txData.route.dst_quote_token_usd_value)
              .minus(txData.route.src_quote_token_usd_value)
              .div(txData.route.src_quote_token_usd_value)
              .mul(100)
              .toFixed(2);
            onLoad({
              outputCurrencyAmount: ethers.utils.formatUnits(
                txData.route.dst_quote_token_amount,
                outputCurrency.decimals
              ),
              noPair: false,
              priceImpact,
              routerAddress: txData.route.contract_address,
              gas: txData.route.estimated_gas,
              unsignedTx: txData.tx,
            });
          })
          .catch((err) => {
            onLoad({
              outputCurrencyAmount: "",
              noPair: true,
            });
          });
      })
      .catch((err) => {
        onLoad({
          outputCurrencyAmount: "",
          noPair: true,
        });
      });
  };

  getAmountsOut();
}, [updater]);
