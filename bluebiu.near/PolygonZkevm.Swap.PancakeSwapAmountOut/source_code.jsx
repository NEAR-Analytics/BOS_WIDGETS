const QUOTER_ABI = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "quoteExactInput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint16[]",
        name: "fees",
        type: "uint16[]",
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
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256",
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160",
          },
        ],
        internalType: "struct IV3SwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "bool", name: "stable", type: "bool" },
        ],
        internalType: "struct RouterV2.route[]",
        name: "routes",
        type: "tuple[]",
      },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
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
    inputCurrency.address === "native" ? wethAddress : inputCurrency.address,
    outputCurrency.address === "native" ? wethAddress : outputCurrency.address,
  ];

  const Iface = new ethers.utils.Interface(QUOTER_ABI);

  const getAmountOut = () => {
    const pathBytes = "0x" + path.map((address) => address.substr(2)).join("");
    const encodedData = Iface.encodeFunctionData("quoteExactInput", [
      pathBytes,
      amount,
    ]);
    Ethers.provider()
      .call({
        to: quoterAddress,
        data: encodedData,
      })
      .then((res) => {
        const data = Iface.decodeFunctionResult("quoteExactInput", res);
        getTransaction({ amountOut: data.amountOut });
      })
      .catch((err) => {
        onLoad({
          noPair: true,
        });
      });
  };

  const getTransaction = (result) => {
    const RouterIface = new ethers.utils.Interface(ROUTER_ABI);

    const options = {
      value: inputCurrency.isNative ? amount : "0",
    };
    const _amountOut = Big(result.amountOut)
      .mul(1 - (slippage || 0.05))
      .toFixed(0);

    const multicallParams = [];

    if (!inputCurrency.isNative && !outputCurrency.isNative) {
      const encodedDataCallSwap = RouterIface.encodeFunctionData(
        "swapExactTokensForTokens",
        [amount, _amountOut, [path[0], wethAddress, path[1]], account]
      );
      multicallParams.push(encodedDataCallSwap);
    } else {
      const encodedExactOutputSingleData = RouterIface.encodeFunctionData(
        "exactInputSingle",
        [
          {
            tokenIn: path[0],
            tokenOut: path[1],
            fee: "2500",
            recipient: outputCurrency.isNative ? routerAddress : account,
            amountIn: amount,
            amountOutMinimum: _amountOut,
            sqrtPriceLimitX96: "0",
          },
        ]
      );
      multicallParams.push(encodedExactOutputSingleData);
    }

    if (outputCurrency.isNative) {
      multicallParams.push(
        RouterIface.encodeFunctionData("unwrapWETH9", ["0", account])
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
      const isReverse =
        Number(inputCurrency.address) > Number(outputCurrency.address);

      const poolPrice = Big(
        prices[isReverse ? inputCurrency.symbol : outputCurrency.symbol] || 0
      ).div(
        prices[!isReverse ? inputCurrency.symbol : outputCurrency.symbol] || 0
      );

      const amountoutPrice = !isReverse
        ? Big(inputCurrencyAmount).div(_amount)
        : Big(_amount).div(inputCurrencyAmount);

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

    const getTx = (gas) => {
      multicallContract.populateTransaction
        .multicall(multicallParams, { ...options, gasLimit: gas || 5000000 })
        .then((res) => {
          onLoad({
            ...returnData,
            gas,
            unsignedTx: res,
          });
        })
        .catch((err) => {
          onLoad({
            gas,
            ...returnData,
          });
        });
    };
    multicallContract.estimateGas
      .multicall(multicallParams, options)
      .then((gas) => {
        getTx(gas);
      })
      .catch((err) => {
        getTx();
      });
  };

  getAmountOut();
}, [updater, prices]);
