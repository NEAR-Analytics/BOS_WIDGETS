const QUOTER_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint24", name: "feeUnits", type: "uint24" },
          { internalType: "uint160", name: "limitSqrtP", type: "uint160" },
        ],
        internalType: "struct IQuoterV2.QuoteExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "quoteExactInputSingle",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "usedAmount", type: "uint256" },
          { internalType: "uint256", name: "returnedAmount", type: "uint256" },
          { internalType: "uint160", name: "afterSqrtP", type: "uint160" },
          {
            internalType: "uint32",
            name: "initializedTicksCrossed",
            type: "uint32",
          },
          { internalType: "uint256", name: "gasEstimate", type: "uint256" },
        ],
        internalType: "struct IQuoterV2.QuoteOutput",
        name: "output",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const ROUTER_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          {
            internalType: "uint256",
            name: "minAmountOut",
            type: "uint256",
          },
          { internalType: "uint160", name: "limitSqrtP", type: "uint160" },
        ],
        internalType: "struct IRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "swapExactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "minAmount", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    name: "unwrapWeth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function",
  },
];

const {
  updater,
  routerAddress,
  quoterAddress,
  multicallAddress,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  slippage,
  account,
  fees,
  prices,
} = props;

useEffect(() => {
  if (!updater || !prices) return;

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

  const Iface = new ethers.utils.Interface(QUOTER_ABI);

  const results = [];
  let _count = 0;
  const singleQuote = (fee, cb) => {
    const params = [
      {
        tokenIn: path[0],
        tokenOut: path[1],
        amountIn: amount,
        feeUnits: fee,
        limitSqrtP: 0,
      },
    ];
    const encodedData = Iface.encodeFunctionData(
      "quoteExactInputSingle",
      params
    );

    Ethers.provider()
      .call({
        to: quoterAddress,
        data: encodedData,
      })
      .then((res) => {
        const data = Iface.decodeFunctionResult("quoteExactInputSingle", res);
        results.push({
          amountOut: data[0].returnedAmount,
          gasEstimate: data[0].gasEstimate,
          fee,
        });

        _count++;
        if (_count === fees.length) {
          cb();
        }
      })
      .catch((err) => {
        _count++;
        if (_count === fees.length) {
          cb();
        }
      });
  };
  const getAmountOut = () => {
    let max = {};
    results.forEach((result) => {
      if (
        Big(Number(result.amountOut._hex)).gt(Number(max.amountOut?._hex) || 0)
      ) {
        max = result;
      }
    });

    getTransaction(max);
  };

  const getTransaction = (result) => {
    const RouterIface = new ethers.utils.Interface(ROUTER_ABI);
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const options = {
      value: inputCurrency.isNative ? amount : "0",
    };
    const _amountOut = Big(result.amountOut)
      .mul(1 - (slippage || 0.05))
      .toFixed(0);

    const inputs = [
      {
        tokenIn: path[0],
        tokenOut: path[1],
        fee: result.fee,
        recipient: outputCurrency.isNative ? routerAddress : account,
        deadline: deadline,
        amountIn: amount,
        minAmountOut: _amountOut,
        limitSqrtP: "0",
      },
    ];
    const multicallParams = [];
    const encodedDataCallSwap = RouterIface.encodeFunctionData(
      "swapExactInputSingle",
      inputs
    );
    multicallParams.push(encodedDataCallSwap);

    if (outputCurrency.isNative) {
      multicallParams.push(
        RouterIface.encodeFunctionData("unwrapWeth", ["0", account])
      );
    }

    const multicallContract = new ethers.Contract(
      routerAddress,
      ROUTER_ABI,
      Ethers.provider().getSigner()
    );

    const _amount = Big(
      ethers.utils.formatUnits(result.amountOut, outputCurrency.decimals)
    );

    let priceImpact = null;

    if (prices) {
      const poolPrice = Big(prices[inputCurrency.symbol] || 1).div(
        prices[outputCurrency.symbol] || 1
      );
      const amountoutPrice = Big(_amount).div(inputCurrencyAmount);
      priceImpact = poolPrice
        .minus(amountoutPrice)
        .div(poolPrice)
        .mul(100)
        .toString();
    }
    const returnData = {
      outputCurrencyAmount: Big(_amount).gt(0.01)
        ? Big(_amount).toPrecision(10)
        : Big(_amount).toFixed(10),
      priceImpact,
      noPair: false,
    };

    const getTx = (_gas) => {
      multicallContract.populateTransaction
        .multicall(multicallParams, { ...options, gasLimit: _gas })
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
      multicallContract.estimateGas
        .multicall(multicallParams, options)
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

  (fees || []).forEach((fee) => {
    singleQuote(fee, getAmountOut);
  });
}, [updater, prices]);
