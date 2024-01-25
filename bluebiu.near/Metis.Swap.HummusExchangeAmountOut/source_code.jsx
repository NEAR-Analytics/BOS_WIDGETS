const ROUTER_ABI = [
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "int256[]",
        name: "",
        internalType: "int256[]",
      },
    ],
    name: "queryBatchSwap",
    inputs: [
      {
        type: "uint8",
        name: "kind",
        internalType: "enum IVault.SwapKind",
      },
      {
        type: "tuple[]",
        name: "swaps",
        internalType: "struct IVault.BatchSwapStep[]",
        components: [
          {
            type: "bytes32",
            name: "poolId",
            internalType: "bytes32",
          },
          {
            type: "uint256",
            name: "assetInIndex",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "assetOutIndex",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "amount",
            internalType: "uint256",
          },
          {
            type: "bytes",
            name: "userData",
            internalType: "bytes",
          },
        ],
      },
      {
        type: "address[]",
        name: "assets",
        internalType: "contract IAsset[]",
      },
      {
        type: "tuple",
        name: "funds",
        internalType: "struct IVault.FundManagement",
        components: [
          {
            type: "address",
            name: "sender",
            internalType: "address",
          },
          {
            type: "bool",
            name: "fromInternalBalance",
            internalType: "bool",
          },
          {
            type: "address",
            name: "recipient",
            internalType: "address payable",
          },
          {
            type: "bool",
            name: "toInternalBalance",
            internalType: "bool",
          },
        ],
      },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      {
        type: "int256[]",
        name: "assetDeltas",
        internalType: "int256[]",
      },
    ],
    name: "batchSwap",
    inputs: [
      {
        type: "uint8",
        name: "kind",
        internalType: "enum IVault.SwapKind",
      },
      {
        type: "tuple[]",
        name: "swaps",
        internalType: "struct IVault.BatchSwapStep[]",
        components: [
          {
            type: "bytes32",
            name: "poolId",
            internalType: "bytes32",
          },
          {
            type: "uint256",
            name: "assetInIndex",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "assetOutIndex",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "amount",
            internalType: "uint256",
          },
          {
            type: "bytes",
            name: "userData",
            internalType: "bytes",
          },
        ],
      },
      {
        type: "address[]",
        name: "assets",
        internalType: "contract IAsset[]",
      },
      {
        type: "tuple",
        name: "funds",
        internalType: "struct IVault.FundManagement",
        components: [
          {
            type: "address",
            name: "sender",
            internalType: "address",
          },
          {
            type: "bool",
            name: "fromInternalBalance",
            internalType: "bool",
          },
          {
            type: "address",
            name: "recipient",
            internalType: "address payable",
          },
          {
            type: "bool",
            name: "toInternalBalance",
            internalType: "bool",
          },
        ],
      },
      {
        type: "int256[]",
        name: "limits",
        internalType: "int256[]",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
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
  fees,
  pools,
  prices,
} = props;

useEffect(() => {
  if (!updater || !prices || !pools.length) return;

  if (
    (!inputCurrency.address && !inputCurrency.isNative) ||
    (!outputCurrency.address && !outputCurrency.isNative) ||
    !inputCurrencyAmount
  ) {
    return;
  }

  const path = [
    inputCurrency.address === "native" ? wethAddress : inputCurrency.address,
    outputCurrency.address === "native" ? wethAddress : outputCurrency.address,
  ];

  const finalPool = pools
    .filter(
      (poolData) =>
        poolData[0].includes(path[0]) && poolData[0].includes(path[1])
    )
    .map((poolData) => poolData[1]);

  if (finalPool.length === 0) {
    onLoad({
      noPair: true,
      outputCurrencyAmount: "",
    });
    return;
  }

  const amount = ethers.utils.parseUnits(
    Big(inputCurrencyAmount || 0).toFixed(inputCurrency.decimals),
    inputCurrency.decimals
  );

  const RouterContract = new ethers.Contract(
    routerAddress,
    ROUTER_ABI,
    Ethers.provider().getSigner()
  );

  const _inputAddress = inputCurrency.isNative
    ? "0x0000000000000000000000000000000000000000"
    : inputCurrency.address;
  const _outputAddress = outputCurrency.isNative
    ? "0x0000000000000000000000000000000000000000"
    : outputCurrency.address;
  const assets = [_inputAddress, _outputAddress];
  const funds = [account, false, account, false];

  const swap_steps = [
    {
      poolId: finalPool[0],
      assetIn: _inputAddress,
      assetOut: _outputAddress,
      amount,
    },
  ];

  const token_indices = {};
  for (let i = 0; i < assets.length; i++) {
    token_indices[assets[i]] = i;
  }
  const swap_steps_struct = [];
  for (const step of swap_steps) {
    const swap_step_struct = [
      step["poolId"],
      token_indices[step["assetIn"]],
      token_indices[step["assetOut"]],
      step["amount"],
      "0x",
    ];
    swap_steps_struct.push(swap_step_struct);
  }

  const getAmountOut = () => {
    const params = [0, swap_steps_struct, assets, funds];
    RouterContract.callStatic
      .queryBatchSwap(...params)
      .then((res) => {
        getTransaction({ amountOut: res[1] });
      })
      .catch((err) => {
        console.log("err", err);
        onLoad({ noPair: true, outputCurrencyAmount: "" });
      });
  };

  const getTransaction = (result) => {
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const _amountOut = Big(result.amountOut)
      .abs()
      .mul(1 - (slippage || 0.05))
      .toFixed(0);

    const token_limits = [amount, _amountOut];
    const params = [
      0,
      swap_steps_struct,
      assets,
      funds,
      token_limits,
      deadline.toFixed(),
    ];

    const options = {
      value: inputCurrency.isNative ? amount : "0",
      gasLimit: 11000000,
    };

    const _amount = Big(
      ethers.utils.formatUnits(result.amountOut, outputCurrency.decimals)
    ).abs();

    let priceImpact = null;

    if (prices) {
      const isReverse = Number(path[0]) > Number(path[1]);

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
        .div(poolPrice.eq(0) ? 1 : poolPrice)
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
      RouterContract.populateTransaction
        .batchSwap(...params, { ...options, gasLimit: gas || 11000000 })
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
    RouterContract.estimateGas
      .batchSwap(...params, options)
      .then((gas) => {
        getTx(gas);
      })
      .catch((err) => {
        getTx();
      });
  };

  getAmountOut();
}, [updater, prices]);
