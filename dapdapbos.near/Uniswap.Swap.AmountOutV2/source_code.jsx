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
  chainId,
} = props;

const account = Ethers.send("eth_requestAccounts", [])[0];

if (!account) return "";

if (!update) return "";

if (!inputCurrency.address || !outputCurrency.address || !inputCurrencyAmount) {
  onLoad({});
  return;
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

asyncFetch("https://api.uniswap.org/v2/quote", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    tokenInChainId: chainId,
    tokenIn: path[0],
    tokenOutChainId: chainId,
    tokenOut: path[1],
    amount: ethers.utils
      .parseUnits(currentAmount, currentCurrency.decimals)
      .toString(),
    sendPortionEnabled: false,
    type: "EXACT_INPUT",
    configs: [
      {
        protocols: ["V3"],
        enableUniversalRouter: false,
        routingType: "CLASSIC",
        recipient: account,
      },
    ],
  }),
})
  .then((res) => {
    const parsedRes = res.body;

    if (!parsedRes) throw new Error();

    const outputCurrencyAmount = parsedRes.quote.quoteDecimals;

    onLoad({
      outputCurrencyAmount,
      noPair: false,
      fee: parsedRes.quote.route[0][0].fee,
    });
  })
  .catch((err) => {
    onLoad({
      loading: false,
      noPair: true,
      fee: undefined,
    });
  });

// RouterContract.getAmountsOut(
//   ethers.utils.parseUnits(currentAmount, currentCurrency.decimals),
//   path
// )
//   .then((res) => {
//     const amount = Big(
//       ethers.utils.formatUnits(res[1], outCurrency.decimals)
//     ).toPrecision(10);
//     onLoad({
//       outputCurrencyAmount: Big(amount).gt(0.01)
//         ? amount
//         : Big(amount).toFixed(10),
//       noPair: false,
//     });
//   })
//   .catch((err) => {
//     onLoad({
//       loading: false,
//       noPair: true,
//     });
//   });
