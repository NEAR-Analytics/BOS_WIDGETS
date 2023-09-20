const horizonDexRouterAbi = [
  {
    inputs: [
      { internalType: "address", name: "_factory", type: "address" },
      { internalType: "address", name: "_WETH", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "refundEth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "int256", name: "deltaQty0", type: "int256" },
      { internalType: "int256", name: "deltaQty1", type: "int256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "swapCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes", name: "path", type: "bytes" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "minAmountOut", type: "uint256" },
        ],
        internalType: "struct IRouter.ExactInputParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "swapExactInput",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
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
          { internalType: "uint256", name: "minAmountOut", type: "uint256" },
          { internalType: "uint160", name: "limitSqrtP", type: "uint160" },
        ],
        internalType: "struct IRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "swapExactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes", name: "path", type: "bytes" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "maxAmountIn", type: "uint256" },
        ],
        internalType: "struct IRouter.ExactOutputParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "swapExactOutput",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "maxAmountIn", type: "uint256" },
          { internalType: "uint160", name: "limitSqrtP", type: "uint160" },
        ],
        internalType: "struct IRouter.ExactOutputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "swapExactOutputSingle",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "minAmount", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    name: "transferAllTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "minAmount", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "feeUnits", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" },
    ],
    name: "transferAllTokensWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "minAmount", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    name: "unwrapWeth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "minAmount", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "feeUnits", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" },
    ],
    name: "unwrapWethWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
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
} = props;
if (!swapping) return;
const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};
const value = expandToken(inputCurrencyAmount, inputCurrency.decimals).toFixed(
  0
);
const signer = Ethers.provider().getSigner();

const abi = horizonDexRouterAbi;
const iface = new ethers.utils.Interface(abi);

const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

const tokenIn =
  inputCurrency.address === "native" ? wethAddress : inputCurrency.address;

const tokenOut =
  outputCurrency.address === "native" ? wethAddress : outputCurrency.address;

const options = {
  gasLimit: 300000,
  value: inputCurrency.address === "native" ? value : "0",
};

const inputs = [
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
    minAmountOut: "0",
    limitSqrtP: "0",
  },
];

const multicallParams = [];

const encodedDataCallSwap = iface.encodeFunctionData(
  "swapExactInputSingle",
  inputs
);

multicallParams.push(encodedDataCallSwap);

if (outputCurrency.address === "native") {
  multicallParams.push(iface.encodeFunctionData("unwrapWeth", ["0", account]));
}

const multicallContract = new ethers.Contract(routerAddress, abi, signer);

multicallContract
  .multicall(multicallParams, options)
  .then((res) => {
    onSuccess(res);
  })
  .catch((err) => {
    console.log(err);
    onError(err);
  });

return "";
