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

const handleCamelotSwap = (type) => {
  const RouterContract = new ethers.Contract(
    routerAddress,
    [
      {
        inputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          {
            internalType: "uint256",
            name: "amountOutMin",
            type: "uint256",
          },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "address", name: "referrer", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountOutMin",
            type: "uint256",
          },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "address", name: "referrer", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          {
            internalType: "uint256",
            name: "amountOutMin",
            type: "uint256",
          },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "address", name: "referrer", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  if (type === 0) {
    RouterContract.swapExactTokensForTokensSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals),
      ethers.utils.parseUnits(outputCurrencyAmount, outputCurrency.decimals),
      [inputCurrency.address, outputCurrency.address],
      account,
      "0x0000000000000000000000000000000000000000",
      Math.ceil(Date.now() / 1000) + 60,
      { gasLimit: 5000000 }
    )
      .then((tx) => {
        onSuccess(tx);
      })
      .catch((err) => {
        onerror(err);
      });
    return;
  }
  if (type === 1) {
    RouterContract.swapExactETHForTokensSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits(outputCurrencyAmount, outputCurrency.decimals),
      [wethAddress, outputCurrency.address],
      account,
      "0x0000000000000000000000000000000000000000",
      Math.ceil(Date.now() / 1000) + 60,
      { gasLimit: 5000000, value: ethers.utils.parseEther(inputCurrencyAmount) }
    )
      .then((tx) => {
        onSuccess(tx);
      })
      .catch((err) => {
        onError();
      });
    return;
  }
  if (type === 2) {
    RouterContract.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals),
      ethers.utils.parseUnits(outputCurrencyAmount, outputCurrency.decimals),
      [inputCurrency.address, wethAddress],
      account,
      "0x0000000000000000000000000000000000000000",
      Math.ceil(Date.now() / 1000) + 60,
      { gasLimit: 5000000 }
    )
      .then((tx) => {
        onSuccess(tx);
      })
      .catch((err) => {
        console.log(err);
        onError(tx);
      });
  }
};

const type =
  inputCurrency.address === "native"
    ? 1
    : outputCurrency.address === "native"
    ? 2
    : 0;

if (title === "Camelot") {
  handleCamelotSwap(type);
  return;
}
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
      inputs: [
        {
          internalType: "uint256",
          name: "amountOutMin",
          type: "uint256",
        },
        { internalType: "address[]", name: "path", type: "address[]" },
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
        {
          internalType: "uint256",
          name: "amountOutMin",
          type: "uint256",
        },
        { internalType: "address[]", name: "path", type: "address[]" },
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
  RouterContract.swapExactETHForTokens(
    "0",
    [wethAddress, outputCurrency.address],
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
    [inputCurrency.address, wethAddress],
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
