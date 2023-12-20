const ROUTER_ABI = [
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
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256",
          },
          {
            internalType: "uint160",
            name: "limitSqrtPrice",
            type: "uint160",
          },
        ],
        internalType: "struct ISwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "unwrapWNativeToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
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
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
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
];

const {
  routerAddress,
  wethAddress,
  inputCurrencyAmount,
  inputCurrency,
  outputCurrencyAmount,
  outputCurrency,
  account,
  onSuccess,
  onError,
  swapping,
  title,
} = props;

if (!swapping) return;

const type =
  inputCurrency.address === "native"
    ? 1
    : outputCurrency.address === "native"
    ? 2
    : 0;

const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

const iface = new ethers.utils.Interface(ROUTER_ABI);

const amount = ethers.utils.parseUnits(
  Big(inputCurrencyAmount).toFixed(inputCurrency.decimals),
  inputCurrency.decimals
);

const multicallParams = [];

const _inputCurrencyAddress =
  inputCurrency.address === "native" ? wethAddress : inputCurrency.address;
const _outputCurrencyAddress =
  outputCurrency.address === "native" ? wethAddress : outputCurrency.address;

if (title === "QuickSwap") {
  const inputs = [
    {
      tokenIn: _inputCurrencyAddress,
      tokenOut: _outputCurrencyAddress,
      recipient: type === 2 ? wethAddress : account,
      deadline: deadline.toFixed(),
      amountIn: amount,
      amountOutMinimum: "0",
      limitSqrtPrice: 0,
    },
  ];

  const encodedDataCallSwap = iface.encodeFunctionData(
    "exactInputSingle",
    inputs
  );

  multicallParams.push(encodedDataCallSwap);

  if (type === 2) {
    multicallParams.push(
      iface.encodeFunctionData("unwrapWNativeToken", ["0", account])
    );
  }
}

if (title === "Pancake Swap") {
  const encodedExactOutputSingleData = iface.encodeFunctionData(
    "swapExactTokensForTokens",
    [
      amount,
      "0",
      [_inputCurrencyAddress, wethAddress, _outputCurrencyAddress],
      account,
    ]
  );
  if (type === 2) {
    multicallParams.push(
      iface.encodeFunctionData("unwrapWETH9", ["0", account])
    );
  }
  multicallParams.push(encodedExactOutputSingleData);
}

if (["QuickSwap", "Pancake Swap"].includes(title)) {
  const RouterContract = new ethers.Contract(
    routerAddress,
    ROUTER_ABI,
    Ethers.provider().getSigner()
  );
  const options = {
    value: type === 1 ? amount : "0",
  };
  RouterContract.estimateGas
    .multicall(multicallParams, options)
    .then((gas) => {
      RouterContract.multicall(multicallParams, {
        ...options,
        gasLimit: gas,
      })
        .then((tx) => {
          onSuccess(tx);
        })
        .catch((err) => {
          onError(err);
        });
    })
    .catch((err) => {
      onError(err);
    });
  return "";
}

if (title === "Balancer") {
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
        poolData[0].includes(_inputCurrencyAddress) &&
        poolData[0].includes(_outputCurrencyAddress)
    )
    .map((poolData) => poolData[1]);

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
  const token_limits = [amount, 0];

  const SwapContract = new ethers.Contract(
    routerAddress,
    [
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
    ],
    Ethers.provider().getSigner()
  );

  const params = [
    0,
    swap_steps_struct,
    assets,
    funds,
    token_limits,
    deadline.toFixed(),
  ];
  const options = {
    value: type === 1 ? amount : "0",
  };

  SwapContract.estimateGas
    .batchSwap(...params, options)
    .then((gas) => {
      SwapContract.batchSwap(...params, {
        ...options,
        gasLimit: gas,
      })
        .then((tx) => {
          onSuccess(tx);
        })
        .catch((err) => {
          onError(err);
        });
    })
    .catch((err) => {
      onError(err);
    });
}

return "";
