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

  if (!inputCurrency || !outputCurrency || !inputCurrencyAmount) {
    return;
  }

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

  const path = [inputCurrency.address, outputCurrency.address];

  const finalPool = pools
    .filter(
      (poolData) =>
        poolData[0].includes(path[0]) && poolData[0].includes(path[1])
    )
    .map((poolData) => poolData[1]);
  if (finalPool.length === 0) {
    onLoad({
      noPair: true,
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
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

  const getSwapStepsStruct = (isAmountOut) => {
    const _inputAddress =
      inputCurrency.isNative && isAmountOut
        ? "0x0000000000000000000000000000000000000000"
        : inputCurrency.address;
    const _outputAddress =
      outputCurrency.isNative && isAmountOut
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
      swap_steps_struct.push([
        step["poolId"],
        token_indices[step["assetIn"]],
        token_indices[step["assetOut"]],
        step["amount"],
        "0x",
      ]);
    }
    return { swap_steps_struct, assets, funds };
  };

  const getAmountOut = () => {
    const { swap_steps_struct, assets, funds } = getSwapStepsStruct(true);
    const params = [0, swap_steps_struct, assets, funds];
    RouterContract.callStatic
      .queryBatchSwap(...params)
      .then((res) => {
        getTransaction({ amountOut: res[1] });
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

  const getTransaction = (result) => {
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const _amountOut = Big(result.amountOut)
      .abs()
      .mul(1 - (slippage || 0.005))
      .toFixed(0);

    const token_limits = [amount, _amountOut];
    const { swap_steps_struct, assets, funds } = getSwapStepsStruct(false);
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
      const poolPrice = Big(prices[inputCurrency.symbol] || 1).div(
        prices[outputCurrency.symbol] || 1
      );
      const amountoutPrice = Big(_amount).div(inputCurrencyAmount);

      priceImpact = poolPrice
        .minus(amountoutPrice)
        .div(poolPrice.eq(0) ? 1 : poolPrice)
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
        onLoad({
          ...returnData,
          noPair: false,
        });
      });
  };

  getAmountOut();
}, [updater, prices]);
