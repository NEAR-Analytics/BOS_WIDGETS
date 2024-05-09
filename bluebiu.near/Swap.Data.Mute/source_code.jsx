const ROUTER_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsOutExpanded",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      { internalType: "bool[]", name: "stable", type: "bool[]" },
      { internalType: "uint256[]", name: "fees", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool[]", name: "stable", type: "bool[]" },
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
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool[]", name: "stable", type: "bool[]" },
    ],
    name: "swapExactETHForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool[]", name: "stable", type: "bool[]" },
    ],
    name: "swapExactTokensForETH",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
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
  if (!updater) return;

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
    inputCurrency.isNative ? wethAddress : inputCurrency.address,
    outputCurrency.isNative ? wethAddress : outputCurrency.address,
  ];

  const RouterContract = new ethers.Contract(
    routerAddress,
    ROUTER_ABI,
    Ethers.provider().getSigner()
  );

  const getAmountOut = () => {
    RouterContract.getAmountsOutExpanded(amount, path)
      .then((res) => {
        const _amount = Big(
          ethers.utils.formatUnits(res[0][1], outputCurrency.decimals)
        );
        if (_amount.gt(0)) {
          getTransaction({
            amountoutDesimals: _amount.toString(),
            amountOut: res[0][1],
            stable: res[1],
          });
        } else {
          onLoad({
            noPair: true,
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            outputCurrencyAmount: "",
          });
        }
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

  const getTransaction = ({ amountOut, amountoutDesimals, stable }) => {
    let method = "";
    const deadline = Math.ceil(Date.now() / 1000) + 120;
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

    const options = {};
    const params = [_amountOut, path, account, deadline, stable];
    if (inputCurrency.isNative) {
      method = "swapExactETHForTokens";
      options.value = amount;
    } else if (outputCurrency.isNative) {
      method = "swapExactTokensForETH";
      params.unshift(amount);
    } else {
      method = "swapExactTokensForTokens";
      params.unshift(amount);
    }
    const returnData = {
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
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
