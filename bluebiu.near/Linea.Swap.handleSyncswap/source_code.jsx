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
  syncSwapPoolAddress,
} = props;

if (!swapping) return;

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const type =
  inputCurrency.address === "native"
    ? 1
    : outputCurrency.address === "native"
    ? 2
    : 0;

const RouterContract = new ethers.Contract(
  routerAddress,
  [
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
  ],
  Ethers.provider().getSigner()
);

const withdrawMode = outputCurrency.address === "native" ? 1 : 2; // 1 or 2 to withdraw to user's wallet

const pathIn = type === 1 ? wethAddress : inputCurrency.address;

const tokenIn = type === 1 ? ZERO_ADDRESS : inputCurrency.address;

const swapData = ethers.utils.defaultAbiCoder.encode(
  ["address", "address", "uint8"],
  [pathIn, account, withdrawMode] // tokenIn, to, withdraw mode
);

const steps = [
  {
    pool: syncSwapPoolAddress,
    data: swapData,
    callback: ZERO_ADDRESS, // we don't have a callback
    callbackData: "0x",
  },
];

const amountIn = ethers.utils.parseUnits(
  inputCurrencyAmount,
  inputCurrency.decimals
);

const value = type === 1 ? amountIn : 0;

const paths = [
  {
    steps: steps,
    tokenIn: tokenIn,
    amountIn: amountIn,
  },
];

RouterContract.swap(
  paths,
  0,
  new Big(Math.floor(Date.now() / 1000)).add(new Big(1800)).toFixed(0),
  { gasLimit: 800000, value }
)
  .then((tx) => {
    onSuccess(tx);
  })
  .catch((err) => {
    console.log("err: ", err);
    onError(err);
  });

return "";
