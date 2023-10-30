const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";

const abi = [
  {
    inputs: [{ internalType: "address", name: "_factory", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "path", type: "bytes" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
    ],
    name: "quoteExactInput",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint160[]", name: "afterSqrtPList", type: "uint160[]" },
      {
        internalType: "uint32[]",
        name: "initializedTicksCrossedList",
        type: "uint32[]",
      },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint24", name: "feeUnits", type: "uint24" },
          { internalType: "uint160", name: "limitSqrtP", type: "uint160" },
        ],
        internalType: "struct IQuoterV2.QuoteExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "quoteExactInputSingle",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "usedAmount", type: "uint256" },
          { internalType: "uint256", name: "returnedAmount", type: "uint256" },
          { internalType: "uint160", name: "afterSqrtP", type: "uint160" },
          {
            internalType: "uint32",
            name: "initializedTicksCrossed",
            type: "uint32",
          },
          { internalType: "uint256", name: "gasEstimate", type: "uint256" },
        ],
        internalType: "struct IQuoterV2.QuoteOutput",
        name: "output",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "path", type: "bytes" },
      { internalType: "uint256", name: "amountOut", type: "uint256" },
    ],
    name: "quoteExactOutput",
    outputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint160[]", name: "afterSqrtPList", type: "uint160[]" },
      {
        internalType: "uint32[]",
        name: "initializedTicksCrossedList",
        type: "uint32[]",
      },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint24", name: "feeUnits", type: "uint24" },
          { internalType: "uint160", name: "limitSqrtP", type: "uint160" },
        ],
        internalType: "struct IQuoterV2.QuoteExactOutputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "quoteExactOutputSingle",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "usedAmount", type: "uint256" },
          { internalType: "uint256", name: "returnedAmount", type: "uint256" },
          { internalType: "uint160", name: "afterSqrtP", type: "uint160" },
          {
            internalType: "uint32",
            name: "initializedTicksCrossed",
            type: "uint32",
          },
          { internalType: "uint256", name: "gasEstimate", type: "uint256" },
        ],
        internalType: "struct IQuoterV2.QuoteOutput",
        name: "output",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "int256", name: "amount0Delta", type: "int256" },
      { internalType: "int256", name: "amount1Delta", type: "int256" },
      { internalType: "bytes", name: "path", type: "bytes" },
    ],
    name: "swapCallback",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
];
const { amountIn, tokenIn, tokenOut, loadAmountOut, quoterContractId } = props;

const feeList = [8, 10, 40, 300, 1000];

const queryString = `${tokenIn.address}-${tokenOut.address}-${amountIn}`;

if (state.cacheString !== queryString) {
  State.update({
    cacheString: queryString,
    quoteDone: false,
    quoting: false,
  });
}

const quoteSingle = (amountIn, tokenIn, tokenOut, fee, finalList) => {
  const iface = new ethers.utils.Interface(abi);

  const inputs = [
    {
      tokenIn: tokenIn.address === "native" ? WETH_ADDRESS : tokenIn.address,
      tokenOut: tokenOut.address === "native" ? WETH_ADDRESS : tokenOut.address,
      amountIn: ethers.utils.parseUnits(amountIn, tokenIn.decimals),
      feeUnits: fee,
      limitSqrtP: 0,
    },
  ];

  const encodedData = iface.encodeFunctionData("quoteExactInputSingle", inputs);

  return Ethers.provider()
    .call({
      to: quoterContractId,
      data: encodedData,
    })
    .then((data) => {
      const res = iface.decodeFunctionResult("quoteExactInputSingle", data);

      const rawAmountOut = Big(Number(res[0][1]._hex)).toFixed();

      const parsedAmountOut = new Big(rawAmountOut)
        .div(Big(10).pow(tokenOut.decimals))
        .toFixed();

      return [
        ...finalList,
        {
          fee: fee,
          amountOut: parsedAmountOut,
          success: true,
        },
      ];
    })
    .catch((e) => {
      return [
        ...finalList,
        {
          fee: fee,
          amountOut: "0",
          success: false,
        },
      ];
    });
};

const quoteAll = () => {
  State.update({
    quoting: true,
  });

  quoteSingle(amountIn, tokenIn, tokenOut, feeList[0], [])
    .then((finalList0) => {
      return quoteSingle(amountIn, tokenIn, tokenOut, feeList[1], finalList0);
    })
    .then((finalList1) => {
      return quoteSingle(amountIn, tokenIn, tokenOut, feeList[2], finalList1);
    })
    .then((finalList2) => {
      return quoteSingle(amountIn, tokenIn, tokenOut, feeList[3], finalList2);
    })
    .then((finalList3) => {
      return quoteSingle(amountIn, tokenIn, tokenOut, feeList[4], finalList3);
    })
    .then((finalList4) => {
      const maxAmountOutEstimate = finalList4.reduce((prev, current) => {
        if (Number(prev.amountOut) > Number(current.amountOut)) {
          return prev;
        } else {
          return current;
        }
      }, finalList4[0]);

      State.update({ quoteDone: true, quoting: false });
      loadAmountOut({
        ...maxAmountOutEstimate,
        quoteDone,
        quoting,
        noPair: !Big(maxAmountOutEstimate.amountOut).gt(0),
      });
    });
};
if (Number(amountIn) > 0 && !state.quoteDone && !state.quoting) {
  quoteAll();
}

return <div></div>;
