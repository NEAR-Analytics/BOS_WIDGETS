const ROUTER_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token1", type: "address" },
      { internalType: "address", name: "token2", type: "address" },
    ],
    name: "getPair",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "address", name: "referrer", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "address", name: "referrer", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "address", name: "referrer", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const PAIR_ABI = [
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint112", name: "_reserve0", type: "uint112" },
      { internalType: "uint112", name: "_reserve1", type: "uint112" },
      {
        internalType: "uint16",
        name: "_token0FeePercent",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_token1FeePercent",
        type: "uint16",
      },
    ],
    payable: false,
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
          getReverse({
            amountoutDesimals: _amount.toString(),
            amountOut: res[1],
          });
        } else {
          onLoad({
            noPair: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        onLoad({
          noPair: true,
        });
      });
  };
  const getReverse = ({ amountOut, amountoutDesimals }) => {
    RouterContract.getPair(...path)
      .then((res) => {
        const PairContract = new ethers.Contract(
          res,
          PAIR_ABI,
          Ethers.provider().getSigner()
        );
        PairContract.getReserves()
          .then((res) => {
            const isReverse = Number(path[0]) > Number(path[1]);
            const token0 = Big(
              ethers.utils.formatUnits(
                res[0],
                isReverse ? outputCurrency.decimals : inputCurrency.decimals
              )
            );
            const token1 = Big(
              ethers.utils.formatUnits(
                res[1],
                isReverse ? inputCurrency.decimals : outputCurrency.decimals
              )
            );
            const poolPrice = token1.div(token0);

            const amountoutPrice = isReverse
              ? Big(inputCurrencyAmount).div(amountoutDesimals)
              : Big(amountoutDesimals).div(inputCurrencyAmount);

            const priceImpact = poolPrice
              .minus(amountoutPrice)
              .div(poolPrice)
              .mul(100)
              .toString();
            getTransaction({
              priceImpact,
              amountoutDesimals,
              amountOut,
            });
          })
          .catch((err) => {
            getTransaction({
              amountoutDesimals,
              amountOut,
            });
          });
      })
      .catch((err) => {
        onLoad({
          noPair: true,
        });
      });
  };

  const getTransaction = ({ amountOut, amountoutDesimals, priceImpact }) => {
    let method = "";
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const _amountOut = Big(amountOut)
      .mul(1 - (slippage || 0.05))
      .toFixed(0);
    const options = {};
    const params = [
      _amountOut,
      path,
      account,
      "0x0000000000000000000000000000000000000000",
      deadline,
    ];
    if (inputCurrency.address === "native") {
      method = "swapExactETHForTokensSupportingFeeOnTransferTokens";
      options.value = amount;
    } else if (outputCurrency.address === "native") {
      method = "swapExactTokensForETHSupportingFeeOnTransferTokens";
      params.unshift(amount);
    } else {
      method = "swapExactTokensForTokensSupportingFeeOnTransferTokens";
      params.unshift(amount);
    }
    const returnData = {
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
  getAmountOut();
}, [updater]);
