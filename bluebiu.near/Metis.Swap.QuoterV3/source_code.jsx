const WETH_ADDRESS = props.wethAddress;

const abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24",
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160",
          },
        ],
        internalType: "struct IQuoterV2.QuoteExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "quoteExactInputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint160",
        name: "sqrtPriceX96After",
        type: "uint160",
      },
      {
        internalType: "uint32",
        name: "initializedTicksCrossed",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const { amountIn, tokenIn, tokenOut, loadAmountOut, quoterContractId } = props;

const feeList = [100, 500, 3000, 10000];

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
      fee: fee,
      sqrtPriceLimitX96: 0,
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

      const rawAmountOut = Big(res.amountOut.toString()).toFixed();

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
    quoteAll();
  }
}
return <div></div>;
