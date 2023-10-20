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
  stable,
} = props;

if (!swapping) return;

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
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        {
          components: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "bool", name: "stable", type: "bool" },
          ],
          internalType: "struct RouterV2.route[]",
          name: "routes",
          type: "tuple[]",
        },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "swapExactTokensForTokens",
      outputs: [
        { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        {
          components: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "bool", name: "stable", type: "bool" },
          ],
          internalType: "struct RouterV2.route[]",
          name: "routes",
          type: "tuple[]",
        },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "swapExactETHForTokens",
      outputs: [
        { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        {
          components: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "bool", name: "stable", type: "bool" },
          ],
          internalType: "struct RouterV2.route[]",
          name: "routes",
          type: "tuple[]",
        },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "swapExactTokensForETH",
      outputs: [
        { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  Ethers.provider().getSigner()
);
if (type === 0) {
  RouterContract.swapExactTokensForTokens(
    ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals),
    "0",
    [
      {
        from: inputCurrency.address,
        to: outputCurrency.address,
        stable,
      },
    ],
    account,
    Math.ceil(Date.now() / 1000) + 60,
    { gasLimit: 5000000 }
  )
    .then((tx) => {
      onSuccess(tx);
    })
    .catch((err) => {
      console.log("err: ", err);
      onError(err);
    });
  return;
}
if (type === 1) {
  RouterContract.swapExactETHForTokens(
    "0",
    [
      {
        from: wethAddress,
        to: outputCurrency.address,
        stable,
      },
    ],
    account,
    Math.ceil(Date.now() / 1000) + 60,
    { gasLimit: 5000000, value: ethers.utils.parseEther(inputCurrencyAmount) }
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
  RouterContract.swapExactTokensForETH(
    ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals),
    "0",
    [
      {
        from: inputCurrency.address,
        to: wethAddress,
        stable,
      },
    ],
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
