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
  amountIn,
  tokenIn,
  tokenOut,
  loadAmountOut,
  quoterAddress,
  tradeType,
} = props;

const account = Ethers.send("eth_requestAccounts", [])[0];

if (!update || !account) return "";

const router02List = [56, 8453, 42220];

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

const feeList = [100, 500, 3000, 10000];

const quoteSingle = (amountIn, tokenIn, tokenOut, fee, finalList) => {
  const iface = new ethers.utils.Interface(getQuoterAbi());

  const amountInUnit = Big(amountIn)
    .times(Big(10).pow(tokenIn.decimals))
    .toFixed(0);

  const inputs = !is02
    ? [
        tokenIn.address === "native" ? WETH_ADDRESS : tokenIn.address,
        tokenOut.address === "native" ? WETH_ADDRESS : tokenOut.address,
        fee,
        amountInUnit,
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

  return Ethers.provider()
    .call({
      to: quoterAddress,
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
  return quoteSingle(amountIn, tokenIn, tokenOut, feeList[0], [])
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

      if (maxAmountOutEstimate.amountOut === "0") {
        loadAmountOut({
          loading: false,
          noPair: true,
        });
      }

      if (tokenIn.chainId === chainId) {
        loadAmountOut({
          ...maxAmountOutEstimate,
          outputCurrencyAmount: maxAmountOutEstimate.amountOut,
          noPair: false,
        });
      }
    });
};

const wrapType =
  tokenIn.address === "native" && tokenOut.symbol === "WETH"
    ? 1
    : tokenIn.symbol === "WETH" && tokenOut.address === "native"
    ? 2
    : 0;

if (wrapType > 0) {
  loadAmountOut({
    amountOut: amountIn,
    outputCurrencyAmount: amountIn,
    fee: 0,
    success: true,
    noPair: false,
    loading: false,
  });
} else {
  if (Big(amountIn || "0").eq(0)) {
    loadAmountOut({
      loading: false,
      success: true,
      noPair: false,
    });
    return "";
  }

  quoteAll();
}
return "";
