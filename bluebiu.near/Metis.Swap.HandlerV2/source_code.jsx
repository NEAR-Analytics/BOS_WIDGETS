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
} = props;

if (!swapping) return;

const type =
  inputCurrency.symbol === "METIS"
    ? 1
    : outputCurrency.symbol === "METIS"
    ? 2
    : 0;

const RouterContract = new ethers.Contract(
  routerAddress,
  [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amountInMax",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "path",
          type: "address[]",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
      ],
      name: "swapExactTokensForTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      type: "function",
      stateMutability: "payable",
      outputs: [
        { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
      ],
      name: "swapExactMetisForTokens",
      inputs: [
        { type: "uint256", name: "amountOutMin", internalType: "uint256" },
        { type: "address[]", name: "path", internalType: "address[]" },
        { type: "address", name: "to", internalType: "address" },
        { type: "uint256", name: "deadline", internalType: "uint256" },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
        { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
      ],
      name: "swapExactTokensForMetis",
      inputs: [
        { type: "uint256", name: "amountIn", internalType: "uint256" },
        { type: "uint256", name: "amountOutMin", internalType: "uint256" },
        { type: "address[]", name: "path", internalType: "address[]" },
        { type: "address", name: "to", internalType: "address" },
        { type: "uint256", name: "deadline", internalType: "uint256" },
      ],
    },
  ],
  Ethers.provider().getSigner()
);
if (type === 0) {
  RouterContract.swapExactTokensForTokens(
    ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals),
    "0",
    [inputCurrency.address, outputCurrency.address],
    account,
    Math.ceil(Date.now() / 1000) + 60,
    { gasLimit: 5000000 }
  )
    .then((tx) => {
      onSuccess(tx);
    })
    .catch((err) => {
      onError(err);
    });
  return;
}
if (type === 1) {
  RouterContract.swapExactMetisForTokens(
    Big(ethers.utils.parseUnits(outputCurrencyAmount, outputCurrency.decimals))
      .mul(0.995)
      .toString(),
    [inputCurrency.address, outputCurrency.address],
    account,
    Math.ceil(Date.now() / 1000) + 60,
    {
      gasLimit: 5000000,
      value: ethers.utils.parseEther(inputCurrencyAmount),
    }
  )
    .then((tx) => {
      onSuccess(tx);
    })
    .catch((err) => {
      onError(err);
    });
  return;
}
if (type === 2) {
  RouterContract.swapExactTokensForMetis(
    ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals),
    Big(ethers.utils.parseUnits(outputCurrencyAmount, outputCurrency.decimals))
      .mul(0.995)
      .toString(),
    [inputCurrency.address, outputCurrency.address],
    account,
    Math.ceil(Date.now() / 1000) + 60,
    { gasLimit: 5000000 }
  )
    .then((tx) => {
      onSuccess(tx);
    })
    .catch((err) => {
      onError(err);
    });
}

return "";
