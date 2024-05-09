const LP_ABI = [
  {
    inputs: [
      { internalType: "address", name: "trader", type: "address" },
      { internalType: "uint256", name: "payBaseAmount", type: "uint256" },
    ],
    name: "querySellBase",
    outputs: [
      {
        internalType: "uint256",
        name: "receiveQuoteAmount",
        type: "uint256",
      },
      { internalType: "uint256", name: "mtFee", type: "uint256" },
      {
        internalType: "enum PMMPricing.RState",
        name: "newRState",
        type: "uint8",
      },
      { internalType: "uint256", name: "newBaseTarget", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "trader", type: "address" },
      { internalType: "uint256", name: "payQuoteAmount", type: "uint256" },
    ],
    name: "querySellQuote",
    outputs: [
      { internalType: "uint256", name: "receiveBaseAmount", type: "uint256" },
      { internalType: "uint256", name: "mtFee", type: "uint256" },
      {
        internalType: "enum PMMPricing.RState",
        name: "newRState",
        type: "uint8",
      },
      { internalType: "uint256", name: "newQuoteTarget", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint256", name: "baseReserve", type: "uint256" },
      { internalType: "uint256", name: "quoteReserve", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const ROUTER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "lp", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "minimumOut", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "sellBaseTokensForTokens",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "lp", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "minimumOut", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "sellQuoteTokensForTokens",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const {
  updater,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  slippage,
  account,
  routerAddress,
  lpAddress,
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

  const amount = Big(inputCurrencyAmount || 0)
    .mul(Big(10).pow(inputCurrency.decimals))
    .toFixed(0);
  const path = [inputCurrency.address, outputCurrency.address];
  const LpContract = new ethers.Contract(
    lpAddress,
    LP_ABI,
    Ethers.provider().getSigner()
  );

  const getAmountsOut = () => {
    const method =
      inputCurrency.symbol === "MIM" ? "querySellBase" : "querySellQuote";

    LpContract[method](account, amount)
      .then((res) => {
        getTransaction({
          amountOut: res[0],
          amountoutDesimals: Big(res[0] || 0)
            .div(Big(10).pow(outputCurrency.decimals))
            .toFixed(outputCurrency.decimals),
        });
      })
      .catch((err) => {
        console.log("err", err);
        onLoad({
          inputCurrency,
          inputCurrencyAmount,
          outputCurrency,
          outputCurrencyAmount: "",
          noPair: true,
        });
      });
  };

  const getTransaction = ({ amountOut, amountoutDesimals }) => {
    const RouterContract = new ethers.Contract(
      routerAddress,
      ROUTER_ABI,
      Ethers.provider().getSigner()
    );
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const _amountOut = Big(amountOut)
      .mul(1 - (slippage || 0.005))
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
    const method =
      inputCurrency.symbol === "MIM"
        ? "sellBaseTokensForTokens"
        : "sellQuoteTokensForTokens";
    const options = {};
    const params = [lpAddress, account, amount, _amountOut, deadline];

    const returnData = {
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount: Big(amountoutDesimals).gt(0.01)
        ? Big(amountoutDesimals).toPrecision(10)
        : Big(amountoutDesimals).toFixed(10),
      priceImpact,
    };

    const getTx = (_gas) => {
      RouterContract.populateTransaction[method](...params, {
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
      RouterContract.estimateGas[method](...params, options)
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
  getAmountsOut();
}, [updater]);
