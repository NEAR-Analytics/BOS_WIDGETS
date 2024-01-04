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
} = props;

const prices = Storage.get(
  "tokensPrice",
  "dapdapbos.near/widget/Linea.Uniswap.Swap.TokensPrice"
);

useEffect(() => {
  if (!updater || !prices) return;

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

  const pools = [
    [
      [
        "0x4c078361fc9bbb78df910800a991c7c3dd2f6ce0",
        "0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc",
        "0xea32a96608495e54156ae48931a7c20f0dcc1a21",
      ],
      "0xa35ad1b31059a652c2bad1114604845469b86692000000000000000000000006",
    ],
    [
      [
        "0x420000000000000000000000000000000000000a",
        "0x433e43047b95cb83517abd7c9978bdf7005e9938",
        "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
        "0xea32a96608495e54156ae48931a7c20f0dcc1a21",
      ],
      "0x9c531f76b974fe0b7f545ba4c0623dd2fea3ef26000100000000000000000002",
    ],
  ];

  const finalPool = pools
    .filter(
      (poolData) =>
        poolData[0].includes(path[0].toLowerCase()) &&
        poolData[0].includes(path[1].toLowerCase())
    )
    .map((poolData) => poolData[1]);

  if (finalPool.length === 0) {
    onLoad({
      noPair: true,
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
        onLoad({ noPair: true });
      });
  };

  const getTransaction = (result) => {
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const _amountOut = Big(result.amountOut)
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
    };

    const _amount = Big(
      ethers.utils.formatUnits(result.amountOut, outputCurrency.decimals)
    ).abs();

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
      RouterContract.populateTransaction
        .batchSwap(...params, { ...options, gasLimit: gas })
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
