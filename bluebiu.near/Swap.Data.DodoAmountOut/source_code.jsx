const {
  updater,
  routerAddress,
  DVMFactory,
  DPPFactory,
  DSPFactory,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  slippage,
  account,
  multicall,
  multicallAddress,
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
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    asyncFetch(
      `https://api.dodoex.io/route-service/frontend-v2/getdodoroute?fromTokenAddress=${
        path[0]
      }&toTokenAddress=${
        path[1]
      }&fromAmount=${amount}&userAddr=${"0x0000000000000000000000000000000000000000"}&estimateGas=false&chainId=${
        inputCurrency.chainId
      }&slippage=${
        slippage || 0.5
      }&deadLine=${deadline}&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxMzg2NDM1MzQ2NDM0NjMzMzM0NjMzMTM4MzgzMjJkMzA2NTY1Mzg2NjM3NjIzMjMwMzI2NDY0MzQzOTJkMzE2NjM1MzIzNTM2MzMzNzJkMzE2NjYxMzQzMDMwMmQzMTM4NjQzNTM0NjQzNDYzMzMzNDY0MzIzNjY2MzIiLCJzIjo0MCwiaWF0IjoxNzA2NTI1MjQ4LCJleHAiOjE3MDY2MTE2NDh9.S-BMaYcu4K4m0Q54hqRCgsKOu8qs4-Qbqp9rONohzoI`
    )
      .then((res) => {
        const data = res.body?.data;
        if (data?.resAmount) {
          const wallet = Ethers.provider().getSigner();
          const returnData = {
            outputCurrencyAmount: data.resAmount,
            priceImpact: data.priceImpact,
            noPair: false,
            routerAddress: data.targetApproveAddr,
          };
          wallet
            .estimateGas({
              to: data.to,
              data: data.data,
              value: inputCurrency.isNative ? amount : 0,
            })
            .then((gasRes) => {
              const tx = {
                from: account,
                to: data.to,
                value: inputCurrency.isNative ? amount : 0,
                data: data.data,
                gasLimit: gasRes,
              };
              onLoad({
                ...returnData,
                gas: gasRes,
                unsignedTx: tx,
              });
            })
            .catch((err) => {
              onLoad(returnData);
            });
        } else {
          onLoad({
            outputCurrencyAmount: "",
            noPair: true,
          });
        }
      })
      .catch((err) => {
        onLoad({
          outputCurrencyAmount: "",
          noPair: true,
        });
      });
  };

  const getTransaction = ({ amountOut, priceImpact }) => {};

  getAmountsOut();
}, [updater]);
