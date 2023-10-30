const {
  update,
  routerAddress,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  outputCurrencyAmount,
  tradeType,
  factoryAddress,
  classicPoolAddres,
  stablePoolAddress,
  onLoad,
} = props;

if (!update) return "";

if (!inputCurrency.address || !outputCurrency.address || !inputCurrencyAmount) {
  onLoad({});
  return "";
}

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const wrapType =
  inputCurrency.address === "native" && outputCurrency.address === wethAddress
    ? 1
    : inputCurrency.address === wethAddress &&
      outputCurrency.address === "native"
    ? 2
    : 0;
if (wrapType) {
  onLoad(
    tradeType === "in"
      ? {
          outputCurrencyAmount: inputCurrencyAmount,
          loading: false,
          noPair: false,
        }
      : {
          inputCurrencyAmount: outputCurrencyAmount,
          loading: false,
          noPair: false,
        }
  );
  return;
}
const currentCurrency = tradeType === "in" ? inputCurrency : outputCurrency;

const currentAmount = Big(
  tradeType === "in" ? inputCurrencyAmount : outputCurrencyAmount
)
  .mul(0.995)
  .toFixed(5);
const outCurrency = tradeType === "in" ? outputCurrency : inputCurrency;

const PoolAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "getPool",
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
];

const ClassicPoolContract = new ethers.Contract(
  classicPoolAddres,
  PoolAbi,
  Ethers.provider().getSigner()
);

const StablePoolContract = new ethers.Contract(
  stablePoolAddress,
  PoolAbi,
  Ethers.provider().getSigner()
);

const path = [
  currentCurrency.address === "native" ? wethAddress : currentCurrency.address,
  outCurrency.address === "native" ? wethAddress : outCurrency.address,
];

StablePoolContract.getPool(...path)
  .then((poolAddress) => {
    if (poolAddress === ZERO_ADDRESS)
      return ClassicPoolContract.getPool(...path);
    return poolAddress;
  })
  .then((poolAddress) => {
    if (poolAddress === ZERO_ADDRESS) throw new Error("No pool found");
    return poolAddress;
  })
  .then((poolAddress) => {
    const PoolContract = new ethers.Contract(
      poolAddress,
      [
        {
          inputs: [
            {
              internalType: "address",
              name: "_tokenIn",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_amountIn",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_sender",
              type: "address",
            },
          ],
          name: "getAmountOut",
          outputs: [
            {
              internalType: "uint256",
              name: "_amountOut",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );

    PoolContract.getAmountOut(
      path[0],
      ethers.utils.parseUnits(currentAmount, currentCurrency.decimals),
      ZERO_ADDRESS
    ).then((res) => {
      const amount = Big(
        ethers.utils.formatUnits(res.toString(), outCurrency.decimals)
      ).toFixed(10);

      onLoad({
        outputCurrencyAmount: Big(amount).gt(0.01)
          ? amount
          : Big(amount).toFixed(10),
        noPair: false,
        syncSwapPoolAddress: poolAddress,
      });
    });
  })
  .catch((err) => {
    onLoad({
      loading: false,
      noPair: true,
    });
  });
