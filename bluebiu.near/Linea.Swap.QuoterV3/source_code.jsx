const WETH_ADDRESS = props.wethAddress;

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

const abiIzi = [
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },

  {
    inputs: [
      {
        internalType: "address",
        name: "tokenX",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenY",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        internalType: "int24",
        name: "lowPt",
        type: "int24",
      },
    ],
    name: "swapX2Y",
    outputs: [
      {
        internalType: "uint256",
        name: "amountY",
        type: "uint256",
      },
      {
        internalType: "int24",
        name: "finalPoint",
        type: "int24",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },

  {
    inputs: [
      {
        internalType: "address",
        name: "tokenX",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenY",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        internalType: "int24",
        name: "highPt",
        type: "int24",
      },
    ],
    name: "swapY2X",
    outputs: [
      {
        internalType: "uint256",
        name: "amountX",
        type: "uint256",
      },
      {
        internalType: "int24",
        name: "finalPoint",
        type: "int24",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const iziQuoterAddress = "0xe6805638db944eA605e774e72c6F0D15Fb6a1347";

const { amountIn, tokenIn, tokenOut, loadAmountOut, quoterContractId } = props;

const feeList = [8, 10, 40, 300, 1000];

const feeListIzi = [100, 500, 3000, 10000];

const queryString = `${tokenIn.address}-${tokenOut.address}-${amountIn}-${quoterContractId}`;

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

const qouteSingleIzi = (amountIn, tokenIn, tokenOut, fee, finalList) => {
  const abi = abiIzi;

  const tokenInAddress =
    tokenIn.address === "native" ? WETH_ADDRESS : tokenIn.address;

  const tokenOutAddress =
    tokenOut.address === "native" ? WETH_ADDRESS : tokenOut.address;

  const isX2Y = tokenInAddress.toLowerCase() < tokenOutAddress.toLowerCase();

  const boundaryPt = isX2Y ? -799999 : 799999;
  const iface = new ethers.utils.Interface(abi);

  const inputs = isX2Y
    ? [
        tokenInAddress,
        tokenOutAddress,
        fee,
        ethers.utils.parseUnits(amountIn, tokenIn.decimals),
        boundaryPt,
      ]
    : [
        tokenOutAddress,
        tokenInAddress,
        fee,
        ethers.utils.parseUnits(amountIn, tokenIn.decimals),
        boundaryPt,
      ];

  const method = isX2Y ? "swapX2Y" : "swapY2X";

  const encodedData = iface.encodeFunctionData(method, inputs);
  console.log("encodedData: ", encodedData);

  return Ethers.provider()
    .call({
      to: quoterContractId,
      data: encodedData,
    })
    .then((data) => {
      const res = iface.decodeFunctionResult(method, data);

      const amountName = isX2Y ? "amountY" : "amountX";

      const rawAmountOut = Big(Number(res[amountName]._hex)).toFixed();
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
      console.log("e1111: ", e);
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
      });
    });
};

const quoteAllIzi = () => {
  State.update({
    quoting: true,
  });

  qouteSingleIzi(amountIn, tokenIn, tokenOut, feeListIzi[0], [])
    .then((finalList0) => {
      return qouteSingleIzi(
        amountIn,
        tokenIn,
        tokenOut,
        feeListIzi[1],
        finalList0
      );
    })
    .then((finalList1) => {
      return qouteSingleIzi(
        amountIn,
        tokenIn,
        tokenOut,
        feeListIzi[2],
        finalList1
      );
    })
    .then((finalList2) => {
      return qouteSingleIzi(
        amountIn,
        tokenIn,
        tokenOut,
        feeListIzi[3],
        finalList2
      );
    })
    .then((finalList3) => {
      const maxAmountOutEstimate = finalList3.reduce((prev, current) => {
        if (Number(prev.amountOut) > Number(current.amountOut)) {
          return prev;
        } else {
          return current;
        }
      }, finalList3[0]);

      State.update({ quoteDone: true, quoting: false });
      loadAmountOut({
        ...maxAmountOutEstimate,
        quoteDone,
        quoting,
      });
    });
};

const wrapType =
  tokenIn.address === "native" && tokenOut.symbol === "WETH"
    ? 1
    : tokenIn.symbol === "WETH" && tokenOut.address === "native"
    ? 2
    : 0;

if (Number(amountIn) > 0 && !state.quoteDone && !state.quoting) {
  if (wrapType > 0) {
    loadAmountOut({
      amountOut: amountIn,
      fee: 0,
      success: true,
      quoteDone: true,
      quoting: false,
    });
  } else {
    if (quoterContractId === iziQuoterAddress) {
      quoteAllIzi();
    } else {
      quoteAll();
    }
  }
}
return <div></div>;
