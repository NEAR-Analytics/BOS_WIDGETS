const swapRouterV3Abi = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
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
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
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

const swapRouerV302Abi = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
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
        internalType: "struct IV3SwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },

  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
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
  routerAddress,
  wethAddress,
  account,
  inputCurrencyAmount,
  inputCurrency,
  outputCurrency,
  fee,
  swapping,
  onSuccess,
  onError,
  chainId,
} = props;

const router02List = [56, 8453, 42220, 43114];

const is02 = router02List.indexOf(chainId) > -1;

const getRouterAbi = () => {
  if (is02) {
    return swapRouerV302Abi;
  }
  return swapRouterV3Abi;
};

if (!swapping || !chainId) return "";

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};
const value = expandToken(inputCurrencyAmount, inputCurrency.decimals).toFixed(
  0
);

const signer = Ethers.provider().getSigner();

const abi = is02 ? swapRouerV302Abi : swapRouterV3Abi;
const iface = new ethers.utils.Interface(abi);

const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

const tokenIn =
  inputCurrency.address === "native" ? wethAddress : inputCurrency.address;

const tokenOut =
  outputCurrency.address === "native" ? wethAddress : outputCurrency.address;

const options = {
  gasLimit: 250000,
  value: inputCurrency.address === "native" ? value : "0",
};

const inputs = !is02
  ? [
      {
        tokenIn,
        tokenOut,
        fee: fee,
        recipient:
          outputCurrency.address === "native"
            ? "0x0000000000000000000000000000000000000000"
            : account,
        deadline: deadline.toFixed(),
        amountIn: value,
        amountOutMinimum: "0",
        sqrtPriceLimitX96: "0",
      },
    ]
  : [
      {
        tokenIn,
        tokenOut,
        fee: fee,
        recipient:
          outputCurrency.address === "native"
            ? "0x0000000000000000000000000000000000000000"
            : account,
        amountIn: value,
        amountOutMinimum: "0",
        sqrtPriceLimitX96: "0",
      },
    ];

// Ethers get gas price

const multicallParams = [];
const encodedDataCallSwap = iface.encodeFunctionData(
  "exactInputSingle",
  inputs
);

multicallParams.push(encodedDataCallSwap);

if (outputCurrency.address === "native") {
  multicallParams.push(iface.encodeFunctionData("unwrapWETH9", ["0", account]));
}

const multicallContract = new ethers.Contract(routerAddress, abi, signer);

const multicallit = () => {
  return multicallContract
    .multicall(multicallParams, options)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      console.log(err);
      onError(err);
    });
};

multicallContract.estimateGas
  .multicall(multicallParams, options)
  .then((gas) => {
    const gasLimit = gas.toString();

    return Big(gasLimit).times(1.1).toFixed(0);
  })
  .then((gasLimit) => {
    return multicallContract
      .multicall(multicallParams, { value: options.value, gasLimit })
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        console.log(err);
        onError(err);
      });
  })
  .catch((err) => {
    if (err.code === "UNPREDICTABLE_GAS_LIMIT") {
      return multicallit();
    }

    console.log(err);
    onError(err);
  });

return "";
