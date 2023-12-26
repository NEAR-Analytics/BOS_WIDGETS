const {
  update,
  routerAddress,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  outputCurrencyAmount,
  tradeType,
  title,
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

  if (finalPool.length === 0) {
    onLoad({
      loading: false,
      noPair: true,
    });
    return "";
  }
}

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
