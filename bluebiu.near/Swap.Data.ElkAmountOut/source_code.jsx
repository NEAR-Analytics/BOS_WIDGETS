const ROUTER_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMax",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
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
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactxDAIForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
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
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForxDAI",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
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
        internalType: "uint32",
        name: "_blockTimestampLast",
        type: "uint32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const FACTORY_ABI = [
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

  const RouterContract = new ethers.Contract(
    routerAddress,
    ROUTER_ABI,
    Ethers.provider().getSigner()
  );

  const getReverse = () => {
    const FactoryContract = new ethers.Contract(
      factoryAddress,
      FACTORY_ABI,
      Ethers.provider().getSigner()
    );
    FactoryContract.getPair(...path)
      .then((res) => {
        if (res === "0x0000000000000000000000000000000000000000")
          throw new Error("");
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

            const amountOut = Big(inputCurrencyAmount)
              .mul(poolPrice)
              .toFixed(20);

            getTransaction({
              amountOut,
            });
          })
          .catch((err) => {
            console.log("err", err);
            onLoad({
              noPair: true,
              outputCurrencyAmount: "",
            });
          });
      })
      .catch((err) => {
        onLoad({
          noPair: true,
          outputCurrencyAmount: "",
        });
      });
  };

  const getTransaction = ({ amountOut }) => {
    let method = "";
    let priceImpact = null;
    if (prices) {
      const poolPrice = Big(prices[inputCurrency.symbol] || 1).div(
        prices[outputCurrency.symbol] || 1
      );
      const amountoutPrice = Big(amountOut).div(inputCurrencyAmount);

      priceImpact = poolPrice
        .minus(amountoutPrice)
        .div(poolPrice)
        .mul(100)
        .toString();
    }
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const _amountOut = Big(amountOut)
      .mul(Big(10).pow(outputCurrency.decimals))
      .mul(1 - (slippage || 0.05))
      .toFixed(0);
    const options = {};
    const params = [_amountOut, path, account, deadline];
    if (inputCurrency.isNative) {
      method = "swapExactxDAIForTokens";
      options.value = amount;
    } else if (outputCurrency.isNative) {
      method = "swapExactTokensForxDAI";
      params.unshift(amount);
    } else {
      method = "swapExactTokensForTokens";
      params.unshift(amount);
    }
    const returnData = {
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount: Big(amountOut).gt(0.01)
        ? Big(amountOut).toPrecision(10)
        : Big(amountOut).toFixed(10),
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
  getReverse();
}, [updater]);
