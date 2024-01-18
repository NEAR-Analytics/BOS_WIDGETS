const QUOTER_ABI = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "quoteExactInput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint16[]",
        name: "fees",
        type: "uint16[]",
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
        internalType: "enum IVault.SwapKind",
        name: "kind",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "poolId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "assetInIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "assetOutIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "userData",
            type: "bytes",
          },
        ],
        internalType: "struct IVault.BatchSwapStep[]",
        name: "swaps",
        type: "tuple[]",
      },
      {
        internalType: "contract IAsset[]",
        name: "assets",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "bool",
            name: "fromInternalBalance",
            type: "bool",
          },
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "bool",
            name: "toInternalBalance",
            type: "bool",
          },
        ],
        internalType: "struct IVault.FundManagement",
        name: "funds",
        type: "tuple",
      },
      {
        internalType: "int256[]",
        name: "limits",
        type: "int256[]",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "batchSwap",
    outputs: [
      {
        internalType: "int256[]",
        name: "assetDeltas",
        type: "int256[]",
      },
    ],
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

  const path = [
    inputCurrency.address === "native" ? wethAddress : inputCurrency.address,
    outputCurrency.address === "native" ? wethAddress : outputCurrency.address,
  ];

  const pools = [
    [
      [
        "0xa2036f0538221a77a3937f1379699f44945018d0",
        "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
        "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
      ],
      "0xc951aebfa361e9d0063355b9e68f5fa4599aa3d1000100000000000000000017",
    ],
    [
      [
        "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
        "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",
      ],
      "0xa7f602cfaf75a566cb0ed110993ee81c27fa3f53000200000000000000000009",
    ],
    [
      [
        "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
        "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",
        "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
      ],
      "0xe8ca7400eb61d5bdfc3f8f2ea99e687e0a4dbf78000100000000000000000019",
    ],
    [
      [
        "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
        "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
      ],
      "0x53ddc1f1ef585b426c03674f278f8107f1524ade000200000000000000000012",
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

  const Iface = new ethers.utils.Interface(QUOTER_ABI);

  const getAmountOut = () => {
    const pathBytes = "0x" + path.map((address) => address.substr(2)).join("");
    const encodedData = Iface.encodeFunctionData("quoteExactInput", [
      pathBytes,
      amount,
    ]);
    Ethers.provider()
      .call({
        to: quoterAddress,
        data: encodedData,
      })
      .then((res) => {
        const data = Iface.decodeFunctionResult("quoteExactInput", res);
        getTransaction({ amountOut: data.amountOut });
      })
      .catch((err) => {
        onLoad({
          noPair: true,
        });
      });
  };

  const getTransaction = (result) => {
    const deadline = Math.ceil(Date.now() / 1000) + 60;

    const _inputAddress =
      inputCurrency.address === "native"
        ? "0x0000000000000000000000000000000000000000"
        : inputCurrency.address;
    const _outputAddress =
      outputCurrency.address === "native"
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

    const RouterContract = new ethers.Contract(
      routerAddress,
      ROUTER_ABI,
      Ethers.provider().getSigner()
    );

    const _amount = Big(
      ethers.utils.formatUnits(result.amountOut, outputCurrency.decimals)
    );

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
