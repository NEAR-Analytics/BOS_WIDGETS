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
  prices,
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
    const WethContract = new ethers.Contract(
      wethAddress,
      [
        {
          constant: false,
          inputs: [],
          name: "deposit",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
          name: "withdraw",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );
    let params = [];
    let options = {};
    let method = "";
    if (wrapType === 1) {
      method = "deposit";
      options.value = ethers.utils.parseEther(
        Big(inputCurrencyAmount).toFixed(18).toString()
      );
    } else {
      method = "withdraw";
      params = [
        ethers.utils.parseEther(
          Big(inputCurrencyAmount).toFixed(18).toString()
        ),
      ];
    }
    const returnData = {
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount: inputCurrencyAmount,
      noPair: false,
      routes: null,
      routerStr: "",
      gas: "",
    };
    const getTx = (_gas) => {
      WethContract.populateTransaction[method](...params, {
        ...options,
        gasLimit: _gas || 4000000,
      })
        .then((res) => {
          onLoad({
            ...returnData,
            gas: _gas,
            unsignedTx: res,
          });
        })
        .catch((err) => {
          onLoad({
            ...returnData,
          });
        });
    };
    const estimateGas = () => {
      WethContract.estimateGas[method](...params, options)
        .then((_gas) => {
          getTx(_gas);
        })
        .catch((err) => {
          console.log(err);
          getTx();
        });
    };
    estimateGas();
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
      slippage * 100 || 0.5
    }&commission_rate=1000&affiliate=0x6F78C36F8a645509744250B127646ABE4150103b`;

    asyncFetch(`https://router-api.xy.finance/xy_router/quote?${params}`)
      .then((res) => {
        const data = res.body?.routes?.[0];
        if (!data) {
          onLoad({
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            outputCurrencyAmount: "",
            noPair: true,
          });
          return;
        }

        asyncFetch(
          `https://router-api.xy.finance/xy_router/build_tx?src_chain_id=${data.src_chain_id}&src_quote_token_address=${data.src_quote_token_address}&src_quote_token_amount=${data.src_quote_token_amount}&dst_chain_id=${data.dst_chain_id}&dst_quote_token_address=${data.dst_quote_token_address}&slippage=${data.slippage}&receiver=${account}&src_swap_provider=${data.src_swap_description.provider}&commission_rate=1000&affiliate=0x6F78C36F8a645509744250B127646ABE4150103b`
        )
          .then((txRes) => {
            const txData = txRes.body;
            const amountoutDesimals = ethers.utils.formatUnits(
              data.dst_quote_token_amount,
              outputCurrency.decimals
            );
            if (!txData.success) {
              onLoad({
                inputCurrency,
                inputCurrencyAmount,
                outputCurrency,
                outputCurrencyAmount: amountoutDesimals,
                noPair: true,
              });
              return;
            }
            let priceImpact = null;

            if (prices) {
              const poolPrice = Big(prices[inputCurrency.symbol] || 1).div(
                prices[outputCurrency.symbol] || 1
              );
              const amountoutPrice =
                Big(amountoutDesimals).div(inputCurrencyAmount);

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
              outputCurrencyAmount: amountoutDesimals,
              noPair: false,
              priceImpact,
              routerAddress: txData.route.contract_address,
              gas: txData.route.estimated_gas,
              unsignedTx: txData.tx,
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
  };

  getAmountsOut();
}, [updater]);
