const ROUTER_ABI = [
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "getAmountsOut",
    inputs: [
      { type: "uint256", name: "amountIn", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "swapExactTokensForTokens",
    inputs: [
      { type: "uint256", name: "amountIn", internalType: "uint256" },
      { type: "uint256", name: "amountOutMin", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "swapExactNativeForTokens",
    inputs: [
      { type: "uint256", name: "amountOutMin", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "swapExactTokensForNative",
    inputs: [
      { type: "uint256", name: "amountIn", internalType: "uint256" },
      { type: "uint256", name: "amountOutMin", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "bool", name: "stable", type: "bool" },
    ],
    name: "getReserves",
    outputs: [
      { internalType: "uint256", name: "reserveA", type: "uint256" },
      { internalType: "uint256", name: "reserveB", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const {
  updater,
  routerAddress,
  factoryAddress,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  slippage,
  account,
  prices,
} = props;

useEffect(() => {
  if (!updater || !routerAddress || !factoryAddress) return;

  if (
    (!inputCurrency.address && !inputCurrency.isNative) ||
    (!outputCurrency.address && !outputCurrency.isNative) ||
    !inputCurrencyAmount
  ) {
    return;
  }

  const wrapType =
    inputCurrency.address === "native" && outputCurrency.address === wethAddress
      ? 1
      : inputCurrency.address === wethAddress &&
        outputCurrency.address === "native"
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
    inputCurrency.isNative ? wethAddress : inputCurrency.address,
    outputCurrency.isNative ? wethAddress : outputCurrency.address,
  ];

  const RouterContract = new ethers.Contract(
    routerAddress,
    ROUTER_ABI,
    Ethers.provider().getSigner()
  );

  const getAmountOut = () => {
    RouterContract.getAmountsOut(amount, path)
      .then((res) => {
        const _amount = Big(
          ethers.utils.formatUnits(res[1], outputCurrency.decimals)
        );
        if (_amount.gt(0)) {
          getTransaction({
            amountoutDesimals: _amount.toString(),
            amountOut: res[1],
          });
        } else {
          onLoad({
            noPair: true,
            outputCurrencyAmount: "",
          });
        }
      })
      .catch((err) => {
        onLoad({
          noPair: true,
          outputCurrencyAmount: "",
        });
      });
  };

  const getTransaction = ({ amountOut, amountoutDesimals }) => {
    let method = "";
    const deadline = Math.ceil(Date.now() / 1000) + 120;
    const _amountOut = Big(amountOut)
      .mul(1 - (slippage || 0.05))
      .toFixed(0);

    let priceImpact = null;
    if (prices) {
      const poolPrice = Big(prices[inputCurrency.symbol] || 1).div(
        prices[outputCurrency.symbol] || 1
      );
      const amountoutPrice = Big(amountoutDesimals).div(inputCurrencyAmount);

      priceImpact = poolPrice
        .minus(amountoutPrice)
        .div(poolPrice)
        .mul(100)
        .toString();
    }

    const options = {};
    const params = [_amountOut, path, account, deadline];
    if (inputCurrency.address === "native") {
      method = "swapExactNativeForTokens";
      options.value = amount;
    } else if (outputCurrency.address === "native") {
      method = "swapExactTokensForNative";
      params.unshift(amount);
    } else {
      method = "swapExactTokensForTokens";
      params.unshift(amount);
    }
    const returnData = {
      outputCurrencyAmount: Big(amountoutDesimals).gt(0.01)
        ? Big(amountoutDesimals).toPrecision(10)
        : Big(amountoutDesimals).toFixed(10),
      priceImpact,
    };
    const createTx = (gasLimit) => {
      RouterContract.populateTransaction[method](...params, {
        ...options,
        gasLimit: gasLimit || 500000,
      })
        .then((res) => {
          onLoad({
            ...returnData,
            noPair: false,
            gas: gasLimit,
            unsignedTx: res,
          });
        })
        .catch((err) => {
          onLoad({
            ...returnData,
            noPair: false,
            gas: gasLimit,
          });
        });
    };
    RouterContract.estimateGas[method](...params, options)
      .then((_gas) => {
        createTx(_gas);
      })
      .catch((err) => {
        onLoad({
          ...returnData,
          noPair: false,
        });
      });
  };

  getAmountOut();
}, [updater]);
