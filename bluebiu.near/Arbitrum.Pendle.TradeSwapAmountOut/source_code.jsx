const STATIC_ROUTER_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountTokenIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "bulk",
        type: "address",
      },
    ],
    name: "swapExactTokenForPtStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netPtOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyMinted",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceImpact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeRateAfter",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountTokenIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "bulk",
        type: "address",
      },
    ],
    name: "swapExactTokenForYtStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netYtOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyMinted",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceImpact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeRateAfter",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "exactYtIn",
        type: "uint256",
      },
    ],
    name: "swapExactYtForPtStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netPtOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPtSwapped",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceImpact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeRateAfter",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "exactSyIn",
        type: "uint256",
      },
    ],
    name: "swapExactSyForPtStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netPtOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceImpact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeRateAfter",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "exactSyIn",
        type: "uint256",
      },
    ],
    name: "swapExactSyForYtStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netYtOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceImpact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeRateAfter",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "exactPtIn",
        type: "uint256",
      },
    ],
    name: "swapExactPtForYtStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netYtOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPtToSwap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceImpact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeRateAfter",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "exactPtIn",
        type: "uint256",
      },
    ],
    name: "swapExactPtForSyStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netSyOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceImpact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeRateAfter",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "exactPtIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
      {
        internalType: "address",
        name: "bulk",
        type: "address",
      },
    ],
    name: "swapExactPtForTokenStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netTokenOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyToRedeem",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceImpact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeRateAfter",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "exactYtIn",
        type: "uint256",
      },
    ],
    name: "swapExactYtForSyStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netSyOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceImpact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeRateAfter",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyOwedInt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netPYToRepaySyOwedInt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netPYToRedeemSyOutInt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "exactYtIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
      {
        internalType: "address",
        name: "bulk",
        type: "address",
      },
    ],
    name: "swapExactYtForTokenStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netTokenOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceImpact",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeRateAfter",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netSyOwedInt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netPYToRepaySyOwedInt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "netPYToRedeemSyOutInt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const STATIC_ROUTER = "0xAdB09F65bd90d19e3148D9ccb693F3161C6DB3E8";

const {
  update,
  market,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  isPT,
  onLoad,
} = props;

if (!update) return;

if (
  !inputCurrency.address ||
  !outputCurrency.address ||
  Big(inputCurrencyAmount || 0).eq(0)
) {
  onLoad({});
  return;
}

if (inputCurrency.address === "native")
  inputCurrency.address = "0x0000000000000000000000000000000000000000";

const amount = ethers.utils.parseUnits(
  inputCurrencyAmount,
  inputCurrency.decimals
);

const tradeType = isPT
  ? outputCurrency.baseType === "PT"
    ? "in"
    : "out"
  : outputCurrency.baseType === "YT"
  ? "in"
  : "out";
const getMethod = () => {
  if (inputCurrency.baseType === "PT") {
    return outputCurrency.baseType === "YT"
      ? "swapExactPtForYtStatic"
      : outputCurrency.baseType === "SY"
      ? "swapExactPtForSyStatic"
      : "swapExactPtForTokenStatic";
  }
  if (outputCurrency.baseType === "PT") {
    return inputCurrency.baseType === "YT"
      ? "swapExactYtForPtStatic"
      : inputCurrency.baseType === "SY"
      ? "swapExactSyForPtStatic"
      : "swapExactTokenForPtStatic";
  }
  if (inputCurrency.baseType === "YT") {
    return inputCurrency.baseType === "PT"
      ? "swapExactYtForPtStatic"
      : inputCurrency.baseType === "SY"
      ? "swapExactYtForSyStatic"
      : "swapExactYtForTokenStatic";
  }
  if (outputCurrency.baseType === "YT") {
    return inputCurrency.baseType === "PT"
      ? "swapExactPtForYtStatic"
      : inputCurrency.baseType === "SY"
      ? "swapExactSyForYtStatic"
      : "swapExactTokenForYtStatic";
  }
};
const method = getMethod();

const RouterContract = new ethers.Contract(
  STATIC_ROUTER,
  STATIC_ROUTER_ABI,
  Ethers.provider().getSigner()
);

const noSmartRouter =
  tradeType === "in"
    ? ["PT", "SY", "IB", "YT"].includes(inputCurrency.baseType)
    : ["PT", "SY", "IB", "YT"].includes(outputCurrency.baseType);

console.log("noNeedRouter", noSmartRouter, method);

const getParams = ({ market, amount, tokenIn, tokenOut }) => {
  switch (method) {
    case "swapExactYtForPtStatic":
    case "swapExactYtForSyStatic":
    case "swapExactSyForPtStatic":
    case "swapExactSyForYtStatic":
    case "swapExactPtForYtStatic":
    case "swapExactPtForSyStatic":
      return [market, amount];
    case "swapExactTokenForPtStatic":
    case "swapExactTokenForYtStatic":
      return [
        market,
        tokenIn,
        amount,
        "0x0000000000000000000000000000000000000000",
      ];
    case "swapExactPtForTokenStatic":
    case "swapExactYtForTokenStatic":
      return [
        market,
        amount,
        tokenOut,
        "0x0000000000000000000000000000000000000000",
      ];
    default:
      return [];
  }
};
const getRoutes = (netOut) => {
  if (
    ["PT", "YT", "SY"].includes(inputCurrency.baseType) &&
    ["PT", "YT", "SY"].includes(outputCurrency.baseType)
  ) {
    return [
      {
        from: { ...inputCurrency, amount: inputCurrencyAmount },
        to: { ...outputCurrency, amount: Big(netOut).toFixed(3) },
      },
    ];
  }
  return [
    {
      from: { ...inputCurrency, amount: inputCurrencyAmount },
      to: { ...market.sy, amount: inputCurrencyAmount },
    },
    {
      from: { ...market.sy, amount: inputCurrencyAmount },
      to: { ...outputCurrency, amount: Big(netOut).toFixed(3) },
    },
  ];
};

const params = getParams({
  market: market.address,
  amount,
  tokenIn: inputCurrency.address,
  tokenOut: outputCurrency.address,
});
RouterContract[method](...params)
  .then((res) => {
    let data = {};
    switch (method) {
      case "swapExactYtForPtStatic":
      case "swapExactPtForYtStatic":
      case "swapExactTokenForPtStatic":
      case "swapExactTokenForYtStatic":
      case "swapExactPtForTokenStatic":
        data = {
          totalSwapped: ethers.utils.formatUnits(
            res[1],
            outputCurrency.decimals
          ),
          netSyFee: ethers.utils.formatUnits(res[2], 16),
          priceImpact: ethers.utils.formatUnits(res[3], 16),
          exchangeRateAfter: ethers.utils.formatUnits(res[4], 18),
        };
        break;
      case "swapExactSyForPtStatic":
      case "swapExactSyForYtStatic":
      case "swapExactPtForSyStatic":
      case "swapExactYtForSyStatic":
      case "swapExactYtForTokenStatic":
        data = {
          netSyFee: ethers.utils.formatUnits(res[1], 16),
          priceImpact: ethers.utils.formatUnits(
            res[2],
            outputCurrency.decimals - 2
          ),
          exchangeRateAfter: ethers.utils.formatUnits(
            res[3],
            outputCurrency.decimals
          ),
        };
        break;
      default:
        data = {};
    }
    data.netOut = ethers.utils.formatUnits(res[0], outputCurrency.decimals);
    data.routes = getRoutes(data.netOut);
    const syAmount = ["PT", "YT"].includes(inputCurrency.baseType)
      ? data.netOut
      : inputCurrencyAmount;
    data.netSyFee = Big(data.netSyFee).div(syAmount).toString();
    data.apy = Big(market.impliedApy)
      .minus(data.priceImpact / 100)
      .minus(data.netSyFee / 100)
      .mul(99)
      .toFixed(3);
    onLoad(data);
    return;
  })
  .catch((err) => {
    console.log(err);
  });
