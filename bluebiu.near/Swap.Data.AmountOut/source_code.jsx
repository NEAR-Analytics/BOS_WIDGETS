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
      priceImpact: "",
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

      if (
        prices &&
        prices[inputCurrency.symbol] &&
        prices[outputCurrency.symbol]
      ) {
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
        routes: null,
        routerStr: "",
        gas: "",
        priceImpact: "",
      });
    });
}, [updater]);
