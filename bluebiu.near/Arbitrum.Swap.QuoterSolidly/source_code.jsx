const {
  update,
  routerAddress,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  outputCurrencyAmount,
  tradeType,
  onLoad,
} = props;

if (!update) return "";

if (!inputCurrency.address || !outputCurrency.address || !inputCurrencyAmount) {
  onLoad({});
  return "";
}
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
  return "";
}
const currentCurrency = tradeType === "in" ? inputCurrency : outputCurrency;

const currentAmount = Big(
  tradeType === "in" ? inputCurrencyAmount : outputCurrencyAmount
).toFixed();
const outCurrency = tradeType === "in" ? outputCurrency : inputCurrency;

const RouterContract = new ethers.Contract(
  routerAddress,
  [
    {
      inputs: [
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "address", name: "tokenIn", type: "address" },
        { internalType: "address", name: "tokenOut", type: "address" },
      ],
      name: "getAmountOut",
      outputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "bool", name: "stable", type: "bool" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  Ethers.provider().getSigner()
);
const path = [
  currentCurrency.address === "native" ? wethAddress : currentCurrency.address,
  outCurrency.address === "native" ? wethAddress : outCurrency.address,
];

const currentAmountUnit = Big(currentAmount)
  .times(Big(10).pow(currentCurrency.decimals))
  .toFixed(0);

RouterContract.getAmountOut(currentAmountUnit, ...path)
  .then((res) => {
    const amount = Big(
      ethers.utils.formatUnits(res[0], outCurrency.decimals)
    ).toFixed();

    onLoad({
      outputCurrencyAmount: Big(amount).gt(0.01)
        ? amount
        : Big(amount).toFixed(),
      noPair: !Big(amount || "").gt(0),
      stable: res[1],
    });
  })
  .catch((err) => {
    onLoad({
      loading: false,
      noPair: true,
      stable: false,
    });
  });
