const {
  tokenIn,
  tokenOut,
  config,
  selectedDex,
  onLoadSwapCall,
  sender,
  amountIn,
  onSwapCallBack,
} = props;

const qs = `${tokenIn.address}-${tokenOut.address}-${amountIn}-${selectedDex}`;

if (qs !== state.cacheQs) {
  State.update({
    cacheQs: qs,
  });
} else {
  return "";
}

if (!sender) {
  return "";
}
const wethAddress = "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8";

const handleWrap = (type, onSuccess, onError) => {
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

  if (type === 1) {
    WethContract.deposit({
      value: ethers.utils.parseEther(amountIn),
    })
      .then((tx) => {
        tx.wait().then((res) => {
          onSuccess?.(res);
        });
      })
      .catch((err) => {
        onError?.();
      });
  } else {
    WethContract.withdraw(ethers.utils.parseEther(amountIn))
      .then((tx) => {
        tx.wait().then((res) => {
          onSuccess?.(res);
        });
      })
      .catch((err) => {
        onError?.();
      });
  }
};

const exactInputAbi = [
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
            internalType: "uint24",
            name: "fee",
            type: "uint24",
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
            name: "sqrtPriceLimitX96",
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
    inputs: [],
    name: "refundETH",
    outputs: [],
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
    name: selectedDex === "Agni Finance" ? "unwrapWMNT" : "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const swapAmountAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WETH9",
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
  {
    inputs: [],
    name: "factory",
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
    ],
    name: "pool",
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
  {
    inputs: [],
    name: "refundETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "path",
            type: "bytes",
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
            name: "minAcquired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct Swap.SwapAmountParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "swapAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "acquire",
        type: "uint256",
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
            internalType: "bytes",
            name: "path",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "desire",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "maxPayed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct Swap.SwapDesireParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "swapDesire",
    outputs: [
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "acquire",
        type: "uint256",
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
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "swapX2YCallback",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "swapX2YDesireY",
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
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "swapY2XCallback",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "swapY2XDesireX",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
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
    name: "sweepToken",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const selectedDexItem = config.dapps.find((dapp) => dapp.name === selectedDex);

const signer = Ethers.provider().getSigner();

const callSwap = (fee) => {
  const value = expandToken(amountIn, tokenIn.decimals).toFixed();
  const abi = exactInputAbi;

  const iface = new ethers.utils.Interface(abi);
  const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

  const tokenInAddress =
    tokenIn.symbol === config.NATIVE_TOKEN_SYMBOL
      ? config.WRAP_NATIVE_TOKEN_ADDRESS
      : tokenIn.address;

  const options = {
    gasLimit: gasLimit ?? 300000,
    value: tokenIn.symbol === config.NATIVE_TOKEN_SYMBOL ? value : "0",
  };

  const tokenOutAddress =
    tokenOut.symbol === config.NATIVE_TOKEN_SYMBOL
      ? config.WRAP_NATIVE_TOKEN_ADDRESS
      : tokenOut.address;

  const inputs = [
    {
      tokenIn: tokenInAddress,
      tokenOut: tokenOutAddress,
      fee: fee,
      recipient:
        tokenOut.symbol === config.NATIVE_TOKEN_SYMBOL
          ? tokenOut.address
          : sender,
      deadline: deadline.toFixed(),
      amountIn: ethers.utils.parseUnits(amountIn, tokenIn.decimals),
      amountOutMinimum: "0",
      sqrtPriceLimitX96: "0",
    },
  ];

  const multicallParams = [];

  const encodedDataCallSwap = iface.encodeFunctionData(
    "exactInputSingle",
    inputs
  );

  multicallParams.push(encodedDataCallSwap);

  if (
    tokenIn.symbol === config.NATIVE_TOKEN_SYMBOL &&
    selectedDex !== "Agni Finance"
  ) {
    multicallParams.push(iface.encodeFunctionData("refundETH", []));
  }

  if (tokenOut.symbol === config.NATIVE_TOKEN_SYMBOL) {
    multicallParams.push(
      iface.encodeFunctionData(
        selectedDex === "Agni Finance" ? "unwrapWMNT" : "unwrapWETH9",
        ["0", sender]
      )
    );
  }

  const multicallContract = new ethers.Contract(
    selectedDexItem.swapRouter,
    abi,
    signer
  );

  multicallContract
    .multicall(multicallParams, options)
    .then((tx) => {
      tx.wait().then((receipt) => {
        const { status, transactionHash } = receipt;
        console.log("transactionHash: ", transactionHash);
        onSwapCallBack();
      });
    })
    .catch(() => {});
};

const callSwapIzi = (fee) => {
  const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

  const abi = swapAmountAbi;

  const iface = new ethers.utils.Interface(abi);

  const tokenInAddress =
    tokenIn.symbol === config.NATIVE_TOKEN_SYMBOL
      ? config.WRAP_NATIVE_TOKEN_ADDRESS
      : tokenIn.address;

  const tokenOutAddress =
    tokenOut.symbol === config.NATIVE_TOKEN_SYMBOL
      ? config.WRAP_NATIVE_TOKEN_ADDRESS
      : tokenOut.address;

  const isX2Y = tokenInAddress.toLowerCase() < tokenOutAddress.toLowerCase();
  const boundaryPt = isX2Y ? -799999 : 799999;

  const multicallParams = [];

  const parsedAmountIn = ethers.utils.parseUnits(amountIn, tokenIn.decimals);

  const options = {
    from: sender,
    value: "0",
  };

  if (tokenIn.symbol === config.NATIVE_TOKEN_SYMBOL) {
    options.value = parsedAmountIn;
  }

  if (isX2Y) {
    const inputs = [
      {
        tokenX: tokenInAddress,
        tokenY: tokenOutAddress,
        fee: fee,
        boundaryPt: boundaryPt,
        recipient:
          tokenOut.symbol === config.NATIVE_TOKEN_SYMBOL
            ? tokenOut.address
            : sender,
        amount: ethers.utils.parseUnits(amountIn, tokenIn.decimals),
        maxPayed: "0",
        minAcquired: "0",
        deadline: deadline.toFixed(),
      },
    ];
    const encodedDataCallSwap = iface.encodeFunctionData("swapX2Y", inputs);

    multicallParams.push(encodedDataCallSwap);
  } else {
    const inputs = [
      {
        tokenX: tokenOutAddress,
        tokenY: tokenInAddress,
        fee: fee,
        boundaryPt: boundaryPt,
        recipient:
          tokenOut.symbol === config.NATIVE_TOKEN_SYMBOL
            ? tokenOut.address
            : sender,
        amount: ethers.utils.parseUnits(amountIn, tokenIn.decimals),
        maxPayed: "0",
        minAcquired: "0",
        deadline: deadline.toFixed(),
      },
    ];
    const encodedDataCallSwap = iface.encodeFunctionData("swapY2X", inputs);

    multicallParams.push(encodedDataCallSwap);
  }

  if (tokenIn.symbol === config.NATIVE_TOKEN_SYMBOL) {
    multicallParams.push(iface.encodeFunctionData("refundETH", []));
  }

  if (tokenOut.symbol === config.NATIVE_TOKEN_SYMBOL) {
    multicallParams.push(
      iface.encodeFunctionData("unwrapWETH9", ["0", sender])
    );
  }

  const multicallContract = new ethers.Contract(
    selectedDexItem.swapRouter,
    abi,
    signer
  );

  const multicallData = iface.encodeFunctionData("multicall", [
    multicallParams,
  ]);

  console.log("multicallData: ", multicallParams, multicallData);

  const txdata = {
    ...options,
    to: selectedDexItem.swapRouter,
    from: sender,
    data: multicallData,
  };

  // return Ethers.provider().getSigner().sendTransaction(txdata);

  multicallContract
    .multicall(multicallParams, options)
    .then((tx) => {
      tx.wait().then((receipt) => {
        const { status, transactionHash } = receipt;
        onSwapCallBack();
      });
    })
    .catch(() => {});
};

if (Number(amountIn) > 0 && onLoadSwapCall) {
  if (tokenIn.symbol === "MNT" && tokenOut.symbol == "WMNT") {
    onLoadSwapCall({
      callSwap: () => handleWrap(1),
    });

    return;
  }

  if (tokenIn.symbol === "WMNT" && tokenOut.symbol == "MNT") {
    onLoadSwapCall({
      callSwap: () => handleWrap(2),
    });

    return;
  }

  if (selectedDex === "iZiSwap") {
    onLoadSwapCall({ callSwap: callSwapIzi });
  } else {
    onLoadSwapCall({ callSwap });
  }
}

return <div></div>;
