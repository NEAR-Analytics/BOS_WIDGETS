const {
  update,
  routerAddress,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  outputCurrencyAmount,
  onLoad,
  chainId,
} = props;

const router02List = [56, 8453];

const is02 = router02List.indexOf(chainId) > -1;

const currentCurrency = tradeType === "in" ? inputCurrency : outputCurrency;

const WETH_ADDRESS = props.wethAddress;

const swapQuoterAbi = [
  {
    inputs: [
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "address", name: "tokenOut", type: "address" },
      { internalType: "uint24", name: "fee", type: "uint24" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" },
    ],
    name: "quoteExactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const swapQuoterAbi02 = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint24", name: "fee", type: "uint24" },
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
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint160", name: "sqrtPriceX96After", type: "uint160" },
      {
        internalType: "uint32",
        name: "initializedTicksCrossed",
        type: "uint32",
      },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const getQuoterAbi = () => {
  if (!is02) {
    return swapQuoterAbi;
  }
  return swapQuoterAbi02;
};

const { amountIn, tokenIn, tokenOut, loadAmountOut, quoterAddress, tradeType } =
  props;

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
  const iface = new ethers.utils.Interface(getQuoterAbi());

  const inputs = !is02
    ? [
        tokenIn.address === "native" ? WETH_ADDRESS : tokenIn.address,
        tokenOut.address === "native" ? WETH_ADDRESS : tokenOut.address,
        fee,
        ethers.utils.parseUnits(amountIn, tokenIn.decimals),
        0,
      ]
    : [
        {
          tokenIn:
            tokenIn.address === "native" ? WETH_ADDRESS : tokenIn.address,
          tokenOut:
            tokenOut.address === "native" ? WETH_ADDRESS : tokenOut.address,
          amountIn: ethers.utils.parseUnits(amountIn, tokenIn.decimals),
          fee,
          sqrtPriceLimitX96: 0,
        },
      ];

  const encodedData = iface.encodeFunctionData("quoteExactInputSingle", inputs);
  console.log("encodedData: ", encodedData);

  // const provider = new ethers.providers.JsonRpcProvider();

  return Ethers.provider()
    .call({
      to: quoterAddress,
      data: encodedData,
    })
    .then((data) => {
      console.log("data: ", data);
      const res = iface.decodeFunctionResult("quoteExactInputSingle", data);
      console.log("res: ", res);

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
        outputCurrencyAmount: maxAmountOutEstimate.amountOut,
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
      outputCurrencyAmount: amountIn,
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
