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

const path = [
  currentCurrency.address === "native" ? wethAddress : currentCurrency.address,
  outCurrency.address === "native" ? wethAddress : outCurrency.address,
];

const QuoteContractAddress = "0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D";

const iface = new ethers.utils.Interface([
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
]);

const pathBytes = "0x" + path.map((address) => address.substr(2)).join("");

const inputs = [
  pathBytes,
  ethers.utils.parseUnits(currentAmount, currentCurrency.decimals),
];

const encodedData = iface.encodeFunctionData("quoteExactInput", inputs);

Ethers.provider()
  .call({
    to: QuoteContractAddress,
    data: encodedData,
  })
  .then((data) => {
    const decodedData = iface.decodeFunctionResult("quoteExactInput", data);
    // decodedData = [amountOut, fee]
    const amountOut = decodedData[0];
    // const fee = decodedData[1];
    const estimate = Big(amountOut.toString())
      .div(Big(10).pow(outCurrency.decimals))
      .toFixed(18);
    onLoad({
      outputCurrencyAmount: Big(estimate).gt(0.01)
        ? estimate
        : Big(estimate).toFixed(10),
      noPair: false,
    });
  })
  .catch((err) => {
    onLoad({
      loading: false,
      noPair: true,
    });
  });
