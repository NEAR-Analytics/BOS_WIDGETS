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
  return;
}
const currentCurrency = tradeType === "in" ? inputCurrency : outputCurrency;

const currentAmount = Big(
  tradeType === "in" ? inputCurrencyAmount : outputCurrencyAmount
)
  .mul(0.995)
  .toFixed(5);
const outCurrency = tradeType === "in" ? outputCurrency : inputCurrency;
const RouterContract = new ethers.Contract(
  routerAddress,
  [
    {
      inputs: [
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "address[]", name: "path", type: "address[]" },
      ],
      name: "getAmountsOut",
      outputs: [
        { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
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
RouterContract.getAmountsOut(
  ethers.utils.parseUnits(currentAmount, currentCurrency.decimals),
  path
)
  .then((res) => {
    const amount = Big(
      ethers.utils.formatUnits(res[1], outCurrency.decimals)
    ).toPrecision(10);
    onLoad({
      outputCurrencyAmount: Big(amount).gt(0.01)
        ? amount
        : Big(amount).toFixed(10),
      noPair: false,
    });
  })
  .catch((err) => {
    onLoad({
      loading: false,
      noPair: true,
    });
  });
