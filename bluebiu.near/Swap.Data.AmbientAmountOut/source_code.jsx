const ROUTER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "base", type: "address" },
      { internalType: "address", name: "quote", type: "address" },
      { internalType: "uint256", name: "poolIdx", type: "uint256" },
      { internalType: "bool", name: "isBuy", type: "bool" },
      { internalType: "bool", name: "inBaseQty", type: "bool" },
      { internalType: "uint128", name: "qty", type: "uint128" },
      { internalType: "uint16", name: "tip", type: "uint16" },
      { internalType: "uint128", name: "limitPrice", type: "uint128" },
      { internalType: "uint128", name: "minOut", type: "uint128" },
      { internalType: "uint8", name: "reserveFlags", type: "uint8" },
    ],
    name: "swap",
    outputs: [
      { internalType: "int128", name: "baseQuote", type: "int128" },
      { internalType: "int128", name: "quoteFlow", type: "int128" },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const QUOTER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "base", type: "address" },
      { internalType: "address", name: "quote", type: "address" },
      { internalType: "uint256", name: "poolIdx", type: "uint256" },
    ],
    name: "queryPrice",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "base", type: "address" },
      { internalType: "address", name: "quote", type: "address" },
      { internalType: "uint256", name: "poolIdx", type: "uint256" },
      { internalType: "bool", name: "isBuy", type: "bool" },
      { internalType: "bool", name: "inBaseQty", type: "bool" },
      { internalType: "uint128", name: "qty", type: "uint128" },
      { internalType: "uint16", name: "poolTip", type: "uint16" },
      { internalType: "uint128", name: "limitPrice", type: "uint128" },
    ],
    name: "calcImpact",
    outputs: [
      { internalType: "int128", name: "baseFlow", type: "int128" },
      { internalType: "int128", name: "quoteFlow", type: "int128" },
      { internalType: "uint128", name: "finalPrice", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const {
  updater,
  routerAddress,
  quoterAddress,
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
  if (!updater || !quoterAddress || !routerAddress) return;

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

  const amount = ethers.utils.parseUnits(
    Big(inputCurrencyAmount || 0).toFixed(inputCurrency.decimals),
    inputCurrency.decimals
  );

  const options = {
    value: inputCurrency.isNative ? amount : 0,
  };

  const path = [
    inputCurrency.isNative
      ? "0x0000000000000000000000000000000000000000"
      : inputCurrency.address,
    outputCurrency.isNative
      ? "0x0000000000000000000000000000000000000000"
      : outputCurrency.address,
  ];

  const isReverse = Number(path[0]) > Number(path[1]);

  const RouterContract = new ethers.Contract(
    routerAddress,
    ROUTER_ABI,
    Ethers.provider().getSigner()
  );
  const _path = isReverse ? [path[1], path[0]] : [path[0], path[1]];
  const getAmountout = () => {
    const QuoterContract = new ethers.Contract(
      quoterAddress,
      QUOTER_ABI,
      Ethers.provider().getSigner()
    );

    QuoterContract.calcImpact(
      ..._path,
      420,
      !isReverse,
      !isReverse,
      amount,
      0,
      isReverse ? 65538 : "21267430153580247136652501917186561137"
    )
      .then((res) => {
        getTransaction(res[1].abs());
      })
      .catch((err) => {
        onLoad({
          noPair: true,
          inputCurrency,
          inputCurrencyAmount,
          outputCurrency,
          outputCurrencyAmount: "",
        });
      });
  };

  const getTransaction = (amountOut) => {
    let priceImpact = null;

    const _amountOutWithoutDecimal = Big(
      ethers.utils.formatUnits(amountOut, outputCurrency.decimals)
    );
    if (prices) {
      const poolPrice = Big(prices[inputCurrency.symbol] || 1).div(
        prices[outputCurrency.symbol] || 1
      );
      const amountoutPrice = Big(_amountOutWithoutDecimal).div(
        inputCurrencyAmount
      );

      priceImpact = poolPrice
        .minus(amountoutPrice)
        .div(poolPrice)
        .mul(100)
        .toString();
    }
    const _amountOut = Big(amountOut)
      .mul(1 - (slippage || 0.005))
      .toFixed(0);

    const params = [
      ..._path,
      420,
      !isReverse,
      !isReverse,
      amount,
      0,
      isReverse ? 65538 : "21267430153580247136652501917186561137",
      _amountOut,
      0,
    ];
    const returnData = {
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount: Big(_amountOutWithoutDecimal).gt(0.01)
        ? Big(_amountOutWithoutDecimal).toPrecision(10)
        : Big(_amountOutWithoutDecimal).toFixed(10),
      priceImpact,
      noPair: false,
    };

    const getTx = (_gas) => {
      RouterContract.populateTransaction
        .swap(...params, {
          ...options,
          gasLimit: _gas,
        })
        .then((res) => {
          onLoad({
            ...returnData,
            noPair: false,
            gas: _gas,
            unsignedTx: res,
          });
        })
        .catch((err) => {
          onLoad({
            ...returnData,
            noPair: false,
            gas: _gas,
          });
        });
    };

    const estimateGas = () => {
      RouterContract.estimateGas
        .swap(...params, options)
        .then((_gas) => {
          getTx(_gas);
        })
        .catch((err) => {
          onLoad({
            ...returnData,
            noPair: false,
          });
        });
    };

    estimateGas();
  };
  getAmountout();
}, [updater]);
