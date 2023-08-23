const abi = [
  {
    type: "constructor",
    inputs: [
      { type: "address", name: "_deployer", internalType: "address" },
      { type: "address", name: "_factory", internalType: "address" },
      { type: "address", name: "_WMNT", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "WMNT",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [],
    name: "agniSwapCallback",
    inputs: [
      { type: "int256", name: "amount0Delta", internalType: "int256" },
      { type: "int256", name: "amount1Delta", internalType: "int256" },
      { type: "bytes", name: "path", internalType: "bytes" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "deployer",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "factory",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "uint256", name: "amountOut", internalType: "uint256" }],
    name: "quoteExactInput",
    inputs: [
      { type: "bytes", name: "path", internalType: "bytes" },
      { type: "uint256", name: "amountIn", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "uint256", name: "amountOut", internalType: "uint256" }],
    name: "quoteExactInputSingle",
    inputs: [
      { type: "address", name: "tokenIn", internalType: "address" },
      { type: "address", name: "tokenOut", internalType: "address" },
      { type: "uint24", name: "fee", internalType: "uint24" },
      { type: "uint256", name: "amountIn", internalType: "uint256" },
      { type: "uint160", name: "sqrtPriceLimitX96", internalType: "uint160" },
    ],
  },
];

const { amountIn, tokenIn, tokenOut, loadAmountOut, config, selectedDex } =
  props;

const queryString = `${tokenIn.address}-${tokenOut.address}-${selectedDex}-${amountIn}`;

if (state.cacheString !== queryString) {
  State.update({
    cacheString: queryString,
  });
} else {
  return <div></div>;
}

const quoteStirng = `${amountIn} ${tokenIn.symbol} -> ${tokenOut.symbol} `;

const selectedDexItem = config.dapps.find((dapp) => dapp.name === selectedDex);

const quote = (amountIn, tokenIn, tokenOut) => {
  const iface = new ethers.utils.Interface(abi);

  const path = [tokenIn.address, tokenOut.address];
  console.log(
    "tokenIn.address, tokenOut.address: ",
    tokenIn.address,
    tokenOut.address
  );
  console.log("path: ", path);

  const pathBytes = "0x" + path.map((address) => address.substr(2)).join("");
  console.log("pathBytes: ", pathBytes);

  const inputs = [
    pathBytes,
    Big(amountIn).times(Big(10).pow(tokenIn.decimals)).toFixed(0),
  ];

  const encodedData = iface.encodeFunctionData("quoteExactInput", inputs);

  const quoterContractId = selectedDexItem.quoter;

  Ethers.provider()
    .call({
      to: quoterContractId.trim(),
      data: encodedData,
    })
    .then((data) => {
      const decodedData = iface.decodeFunctionResult("quoteExactInput", data);
      console.log("decodedData: ", decodedData);

      const amountOut = decodedData[0];
      const fee = decodedData[1];

      const estimate = Big(amountOut.toString())
        .div(Big(10).pow(tokenOut.decimals))
        .toFixed(18);

      loadAmountOut({
        amountOut: estimate,
        fee,
      });
    })
    .catch((e) => {
      console.log(e, "error");
    });
};

if (Number(amountIn) > 0) {
  console.log("quote 111");

  quote(amountIn, tokenIn, tokenOut);
}

return <div></div>;
