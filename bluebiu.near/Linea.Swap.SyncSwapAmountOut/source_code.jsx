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

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

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
            noPair: true,
          });
        } else {
          getAmountOut(pool);
        }
      })
      .catch((err) => {
        onLoad({
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
          getReverse({
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
  const getReverse = ({ amountOut, amountoutDesimals, poolAddress }) => {
    const PairContract = new ethers.Contract(
      poolAddress,
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
          poolAddress,
        });
      })
      .catch((err) => {
        getTransaction({
          amountoutDesimals,
          amountOut,
          poolAddress,
        });
      });
  };

  const getTransaction = ({
    amountOut,
    amountoutDesimals,
    priceImpact,
    poolAddress,
  }) => {
    const RouterContract = new ethers.Contract(
      routerAddress,
      ROUTER_ABI,
      Ethers.provider().getSigner()
    );
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const _amountOut = Big(amountOut)
      .mul(1 - (slippage || 0.05))
      .toFixed(0);
    const withdrawMode = outputCurrency.address === "native" ? 1 : 2;
    const options = {
      value: inputCurrency.address === "native" ? amount : 0,
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
      outputCurrencyAmount: Big(amountoutDesimals).gt(0.01)
        ? Big(amountoutDesimals).toPrecision(10)
        : Big(amountoutDesimals).toFixed(10),
      priceImpact,
    };

    const params = [paths, _amountOut, deadline];

    RouterContract.estimateGas
      .swap(...params, options)
      .then((_gas) => {
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
      })
      .catch((err) => {
        onLoad({
          ...returnData,
          noPair: false,
        });
      });
  };
  getPoolAddress();
}, [updater]);
