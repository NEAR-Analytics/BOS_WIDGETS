const POOL_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "getPool",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const PAIR_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "getAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserves",
    outputs: [
      {
        internalType: "uint256",
        name: "_reserve0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserve1",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ROUTER_ABI = [
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "pool",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
              {
                internalType: "address",
                name: "callback",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "callbackData",
                type: "bytes",
              },
            ],
            internalType: "struct IRouter.SwapStep[]",
            name: "steps",
            type: "tuple[]",
          },
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
        ],
        internalType: "struct IRouter.SwapPath[]",
        name: "paths",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swap",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct IPool.TokenAmount",
        name: "amountOut",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const {
  updater,
  routerAddress,
  classicPoolAddres,
  stablePoolAddress,
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
  if (!updater || !routerAddress || !classicPoolAddres || !stablePoolAddress)
    return;

  if (
    (!inputCurrency.address && !inputCurrency.isNative) ||
    (!outputCurrency.address && !outputCurrency.isNative) ||
    !inputCurrencyAmount
  ) {
    return;
  }

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
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

  const getStablePoolAddress = () => {
    const StablePoolContract = new ethers.Contract(
      stablePoolAddress,
      POOL_ABI,
      Ethers.provider().getSigner()
    );
    StablePoolContract.getPool(...path)
      .then((pool) => {
        if (pool === ZERO_ADDRESS) {
          onLoad({
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            outputCurrencyAmount: "",
            noPair: true,
          });
        } else {
          getAmountOut(pool);
        }
      })
      .catch((err) => {
        onLoad({
          outputCurrencyAmount: "",
          noPair: true,
        });
      });
  };

  const getPoolAddress = () => {
    const ClassicPoolContract = new ethers.Contract(
      classicPoolAddres,
      POOL_ABI,
      Ethers.provider().getSigner()
    );
    ClassicPoolContract.getPool(...path)
      .then((pool) => {
        if (pool === ZERO_ADDRESS) {
          getStablePoolAddress();
        } else {
          getAmountOut(pool);
        }
      })
      .catch((err) => {
        getStablePoolAddress();
      });
  };
  const getAmountOut = (_poolAddress) => {
    const PairContract = new ethers.Contract(
      _poolAddress,
      PAIR_ABI,
      Ethers.provider().getSigner()
    );
    PairContract.getAmountOut(path[0], amount, account)
      .then((res) => {
        const amountoutDesimals = Big(
          ethers.utils.formatUnits(res, outputCurrency.decimals)
        );

        if (amountoutDesimals.gt(0)) {
          getTransaction({
            amountOut: res,
            amountoutDesimals: amountoutDesimals.toString(),
            poolAddress: _poolAddress,
          });
        } else {
          onLoad({
            noPair: true,
          });
        }
      })
      .catch((err) => {
        onLoad({
          noPair: true,
        });
      });
  };

  const getTransaction = ({ amountOut, amountoutDesimals, poolAddress }) => {
    const RouterContract = new ethers.Contract(
      routerAddress,
      ROUTER_ABI,
      Ethers.provider().getSigner()
    );
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const _amountOut = Big(amountOut)
      .mul(1 - (slippage || 0.005))
      .toFixed(0);
    let priceImpact = "0";
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
    const withdrawMode = outputCurrency.isNative ? 1 : 2;
    const options = {
      value: inputCurrency.isNative ? amount : 0,
    };
    const swapData = ethers.utils.defaultAbiCoder.encode(
      ["address", "address", "uint8"],
      [path[0], account, withdrawMode]
    );
    const steps = [
      {
        pool: poolAddress,
        data: swapData,
        callback: ZERO_ADDRESS, // we don't have a callback
        callbackData: "0x",
      },
    ];
    const paths = [
      {
        steps: steps,
        tokenIn: inputCurrency.isNative ? ZERO_ADDRESS : inputCurrency.address,
        amountIn: amount,
      },
    ];

    const returnData = {
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount: Big(amountoutDesimals).gt(0.01)
        ? Big(amountoutDesimals).toPrecision(10)
        : Big(amountoutDesimals).toFixed(10),
      priceImpact,
    };

    const params = [paths, _amountOut, deadline];

    const createTx = (_gas) => {
      RouterContract.populateTransaction
        .swap(...params, {
          ...options,
          gasLimit: _gas || 5000000,
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

    RouterContract.estimateGas
      .swap(...params, options)
      .then((_gas) => {
        createTx(_gas);
      })
      .catch((err) => {
        createTx();
      });
  };
  getPoolAddress();
}, [updater]);
