const QUOTER_ABI = [
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
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenX",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenY",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        internalType: "int24",
        name: "lowPt",
        type: "int24",
      },
    ],
    name: "swapX2Y",
    outputs: [
      {
        internalType: "uint256",
        name: "amountY",
        type: "uint256",
      },
      {
        internalType: "int24",
        name: "finalPoint",
        type: "int24",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },

  {
    inputs: [
      {
        internalType: "address",
        name: "tokenX",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenY",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        internalType: "int24",
        name: "highPt",
        type: "int24",
      },
    ],
    name: "swapY2X",
    outputs: [
      {
        internalType: "uint256",
        name: "amountX",
        type: "uint256",
      },
      {
        internalType: "int24",
        name: "finalPoint",
        type: "int24",
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
          {
            internalType: "address",
            name: "tokenX",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenY",
            type: "address",
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24",
          },
          {
            internalType: "int24",
            name: "boundaryPt",
            type: "int24",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "maxPayed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAcquired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct Swap.SwapParams",
        name: "swapParams",
        type: "tuple",
      },
    ],
    name: "swapX2Y",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenX",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenY",
            type: "address",
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24",
          },
          {
            internalType: "int24",
            name: "boundaryPt",
            type: "int24",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "maxPayed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAcquired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct Swap.SwapParams",
        name: "swapParams",
        type: "tuple",
      },
    ],
    name: "swapY2X",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minAmount",
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

  const path = [
    inputCurrency.isNative ? wethAddress : inputCurrency.address,
    outputCurrency.isNative ? wethAddress : outputCurrency.address,
  ];

  const isX2Y = path[0].toLowerCase() < path[1].toLowerCase();

  const Iface = new ethers.utils.Interface(QUOTER_ABI);

  const results = [];
  let _count = 0;
  const singleQuote = (fee, cb) => {
    const params = [
      isX2Y ? path[0] : path[1],
      isX2Y ? path[1] : path[0],
      fee,
      amount,
      isX2Y ? -799999 : 799999,
    ];
    const method = isX2Y ? "swapX2Y" : "swapY2X";

    const encodedData = Iface.encodeFunctionData(method, params);

    Ethers.provider()
      .call({
        to: quoterAddress,
        data: encodedData,
      })
      .then((res) => {
        const data = Iface.decodeFunctionResult(method, res);

        const amountName = isX2Y ? "amountY" : "amountX";

        results.push({
          amountOut: data[amountName],
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
    let max = null;
    results.forEach((result) => {
      if (
        Big(Number(result.amountOut._hex)).gt(Number(max.amountOut?._hex) || 0)
      ) {
        max = result;
      }
    });
    if (max) {
      getTransaction(max);
    } else {
      onLoad({
        inputCurrency,
        inputCurrencyAmount,
        outputCurrency,
        outputCurrencyAmount: "",
        noPair: true,
      });
    }
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

    const method = isX2Y ? "swapX2Y" : "swapY2X";

    const inputs = [
      {
        tokenX: isX2Y ? path[0] : path[1],
        tokenY: isX2Y ? path[1] : path[0],
        fee: result.fee,
        boundaryPt: isX2Y ? -799999 : 799999,
        recipient: outputCurrency.isNative ? routerAddress : account,
        amount: amount,
        maxPayed: "0",
        minAcquired: _amountOut,
        deadline: deadline,
      },
    ];

    const multicallParams = [];
    const encodedDataCallSwap = RouterIface.encodeFunctionData(method, inputs);
    multicallParams.push(encodedDataCallSwap);

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
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount: Big(_amount).gt(0.01)
        ? Big(_amount).toPrecision(10)
        : Big(_amount).toFixed(10),
      priceImpact,
      noPair: false,
    };

    const createTx = (gas) => {
      multicallContract.populateTransaction
        .multicall(multicallParams, { ...options, gasLimit: gas || 400000 })
        .then((res) => {
          onLoad({
            ...returnData,
            gas,
            unsignedTx: res,
          });
        })
        .catch((err) => {
          onLoad({
            ...returnData,
            gas,
          });
        });
    };

    multicallContract.estimateGas
      .multicall(multicallParams, options)
      .then((gas) => {
        createTx(gas);
      })
      .catch((err) => {
        createTx();
      });
  };

  (fees || []).forEach((fee) => {
    singleQuote(fee, getAmountOut);
  });
}, [updater, prices]);
