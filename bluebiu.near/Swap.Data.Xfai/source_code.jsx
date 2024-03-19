const ROUTER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "address", name: "_token0", type: "address" },
      { internalType: "address", name: "_token1", type: "address" },
      { internalType: "uint256", name: "_amount0In", type: "uint256" },
      {
        internalType: "uint256",
        name: "_amount1OutMin",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "address", name: "_token1", type: "address" },
      {
        internalType: "uint256",
        name: "_amount1OutMin",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "swapExactETHForTokens",
    outputs: [{ internalType: "uint256", name: "amount1Out", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "address", name: "_token0", type: "address" },
      { internalType: "uint256", name: "_amount0In", type: "uint256" },
      {
        internalType: "uint256",
        name: "_amount1OutMin",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "swapExactTokensForETH",
    outputs: [{ internalType: "uint256", name: "amount1Out", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const PAIR_ABI = [
  {
    inputs: [],
    name: "getStates",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const FACTORY_ABI = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "getPool",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

const {
  updater,
  routerAddress,
  factoryAddress,
  multicallAddress,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  multicall,
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
    inputCurrency.isNative ? wethAddress : inputCurrency.address,
    outputCurrency.isNative ? wethAddress : outputCurrency.address,
  ];

  const RouterContract = new ethers.Contract(
    routerAddress,
    ROUTER_ABI,
    Ethers.provider().getSigner()
  );

  const getAmountOut = () => {
    const factoryCalls = path.map((_path) => ({
      address: factoryAddress,
      name: "getPool",
      params: [_path],
    }));
    multicall({
      abi: FACTORY_ABI,
      calls: factoryCalls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        const pool0 = inputCurrency.isNative ? null : res[0][0];
        const pool1 = outputCurrency.isNative ? null : res[1][0];
        const poolCalls = [];
        if (pool0) {
          poolCalls.push({
            address: pool0,
            name: "getStates",
          });
        }
        if (pool1) {
          poolCalls.push({
            address: pool1,
            name: "getStates",
          });
        }
        multicall({
          abi: PAIR_ABI,
          calls: poolCalls,
          options: {},
          multicallAddress,
          provider: Ethers.provider(),
        })
          .then((poolsRes) => {
            let pool0Reverse = 0;
            let pool0EthReverse = 0;
            let pool1Reverse = 0;
            let pool1EthReverse = 0;

            if (pool0) {
              pool0Reverse = ethers.utils.formatUnits(
                poolsRes[0][0],
                inputCurrency.decimals
              );
              pool0EthReverse = ethers.utils.formatUnits(poolsRes[0][1], 18);
            }
            if (!pool0 && pool1) {
              pool0Reverse = ethers.utils.formatUnits(
                poolsRes[0][0],
                outputCurrency.decimals
              );
              pool0EthReverse = ethers.utils.formatUnits(poolsRes[0][1], 18);
            }

            if (pool0 && pool1) {
              pool1Reverse = poolsRes[1]
                ? ethers.utils.formatUnits(
                    poolsRes[1][0],
                    outputCurrency.decimals
                  )
                : 0;
              pool1EthReverse = poolsRes[1]
                ? ethers.utils.formatUnits(poolsRes[1][1], 18)
                : 0;
            }

            let amountOut = 0;

            if (!pool0) {
              amountOut = Big(pool0Reverse)
                .div(pool0EthReverse)
                .mul(inputCurrencyAmount)
                .toString();
            } else if (!pool1) {
              amountOut = Big(pool0EthReverse)
                .div(pool0Reverse)
                .mul(inputCurrencyAmount)
                .toString();
            } else {
              const token0Price = Big(pool0Reverse).div(pool0EthReverse);
              const token1Price = Big(pool1Reverse).div(pool1EthReverse);
              amountOut = token0Price
                .div(token1Price)
                .mul(inputCurrencyAmount)
                .toString();
            }
            getTransaction(amountOut);
          })
          .catch((err) => {
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

  const getTransaction = (amountOut) => {
    let method = "";
    const deadline = Math.ceil(Date.now() / 1000) + 60;

    const _amountOut = Big(amountOut)
      .mul(Big(10).pow(outputCurrency.decimals))
      .mul(1 - (slippage || 0.05))
      .toFixed(0);

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

    const options = {};
    let params = [];
    if (inputCurrency.isNative) {
      method = "swapExactETHForTokens";
      params = [account, path[1], _amountOut, deadline];
      options.value = amount;
    } else if (outputCurrency.isNative) {
      params = [account, path[0], amount, _amountOut, deadline];
      method = "swapExactTokensForETH";
    } else {
      params = [account, path[0], path[1], amount, _amountOut, deadline];
      method = "swapExactTokensForTokens";
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
          getTx();
        });
    };

    estimateGas();
  };
  getAmountOut();
}, [updater]);
