const ROUTER_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minYtOut",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "guessMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessMax",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessOffchain",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxIteration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "eps",
            type: "uint256",
          },
        ],
        internalType: "struct ApproxParams",
        name: "guessYtOut",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "netTokenIn",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenMintSy",
            type: "address",
          },
          {
            internalType: "address",
            name: "bulk",
            type: "address",
          },
          {
            internalType: "address",
            name: "pendleSwap",
            type: "address",
          },
          {
            components: [
              {
                internalType: "enum SwapType",
                name: "swapType",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "extRouter",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "extCalldata",
                type: "bytes",
              },
              {
                internalType: "bool",
                name: "needScale",
                type: "bool",
              },
            ],
            internalType: "struct SwapData",
            name: "swapData",
            type: "tuple",
          },
        ],
        internalType: "struct TokenInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "swapExactTokenForYt",
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
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
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
        internalType: "uint256",
        name: "minPtOut",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "guessMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessMax",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessOffchain",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxIteration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "eps",
            type: "uint256",
          },
        ],
        internalType: "struct ApproxParams",
        name: "guessTotalPtSwapped",
        type: "tuple",
      },
    ],
    name: "swapExactYtForPt",
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
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
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
        internalType: "uint256",
        name: "minYtOut",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "guessMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessMax",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessOffchain",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxIteration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "eps",
            type: "uint256",
          },
        ],
        internalType: "struct ApproxParams",
        name: "guessTotalPtToSwap",
        type: "tuple",
      },
    ],
    name: "swapExactPtForYt",
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
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
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
      {
        internalType: "uint256",
        name: "minYtOut",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "guessMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessMax",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessOffchain",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxIteration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "eps",
            type: "uint256",
          },
        ],
        internalType: "struct ApproxParams",
        name: "guessYtOut",
        type: "tuple",
      },
    ],
    name: "swapExactSyForYt",
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
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
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
      {
        internalType: "uint256",
        name: "minPtOut",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "guessMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessMax",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessOffchain",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxIteration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "eps",
            type: "uint256",
          },
        ],
        internalType: "struct ApproxParams",
        name: "guessPtOut",
        type: "tuple",
      },
    ],
    name: "swapExactSyForPt",
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
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minPtOut",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "guessMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessMax",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guessOffchain",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxIteration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "eps",
            type: "uint256",
          },
        ],
        internalType: "struct ApproxParams",
        name: "guessPtOut",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "netTokenIn",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenMintSy",
            type: "address",
          },
          {
            internalType: "address",
            name: "bulk",
            type: "address",
          },
          {
            internalType: "address",
            name: "pendleSwap",
            type: "address",
          },
          {
            components: [
              {
                internalType: "enum SwapType",
                name: "swapType",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "extRouter",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "extCalldata",
                type: "bytes",
              },
              {
                internalType: "bool",
                name: "needScale",
                type: "bool",
              },
            ],
            internalType: "struct SwapData",
            name: "swapData",
            type: "tuple",
          },
        ],
        internalType: "struct TokenInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "swapExactTokenForPt",
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
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
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
        internalType: "uint256",
        name: "minSyOut",
        type: "uint256",
      },
    ],
    name: "swapExactPtForSy",
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
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
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
        components: [
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minTokenOut",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenRedeemSy",
            type: "address",
          },
          {
            internalType: "address",
            name: "bulk",
            type: "address",
          },
          {
            internalType: "address",
            name: "pendleSwap",
            type: "address",
          },
          {
            components: [
              {
                internalType: "enum SwapType",
                name: "swapType",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "extRouter",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "extCalldata",
                type: "bytes",
              },
              {
                internalType: "bool",
                name: "needScale",
                type: "bool",
              },
            ],
            internalType: "struct SwapData",
            name: "swapData",
            type: "tuple",
          },
        ],
        internalType: "struct TokenOutput",
        name: "output",
        type: "tuple",
      },
    ],
    name: "swapExactPtForToken",
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
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
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
        internalType: "uint256",
        name: "minSyOut",
        type: "uint256",
      },
    ],
    name: "swapExactYtForSy",
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
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "netYtIn",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minTokenOut",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenRedeemSy",
            type: "address",
          },
          {
            internalType: "address",
            name: "bulk",
            type: "address",
          },
          {
            internalType: "address",
            name: "pendleSwap",
            type: "address",
          },
          {
            components: [
              {
                internalType: "enum SwapType",
                name: "swapType",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "extRouter",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "extCalldata",
                type: "bytes",
              },
              {
                internalType: "bool",
                name: "needScale",
                type: "bool",
              },
            ],
            internalType: "struct SwapData",
            name: "swapData",
            type: "tuple",
          },
        ],
        internalType: "struct TokenOutput",
        name: "output",
        type: "tuple",
      },
    ],
    name: "swapExactYtForToken",
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
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const {
  routerAddress,
  swapping,
  account,
  tradeInfo,
  market,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onSuccess,
  onError,
} = props;

if (!swapping || !tradeInfo) return;

const handleSwap = () => {
  const RouterContract = new ethers.Contract(
    routerAddress,
    ROUTER_ABI,
    Ethers.provider().getSigner()
  );

  if (inputCurrency.address === "native")
    inputCurrency.address = "0x0000000000000000000000000000000000000000";

  const amount = ethers.utils.parseUnits(
    inputCurrencyAmount,
    inputCurrency.decimals
  );
  console.log("amount", amount, tradeInfo.netOut);
  const minOutputAmount = Big(
    ethers.utils.parseUnits(tradeInfo.netOut, outputCurrency.decimals)
  )
    .mul(1 - 1 * 0.005)
    .toFixed(0);

  const getMethod = () => {
    if (inputCurrency.baseType === "PT") {
      return outputCurrency.baseType === "YT"
        ? "swapExactPtForYt"
        : outputCurrency.baseType === "SY"
        ? "swapExactPtForSy"
        : "swapExactPtForToken";
    }
    if (outputCurrency.baseType === "PT") {
      return inputCurrency.baseType === "YT"
        ? "swapExactYtForPt"
        : inputCurrency.baseType === "SY"
        ? "swapExactSyForPt"
        : "swapExactTokenForPt";
    }
    if (inputCurrency.baseType === "YT") {
      return inputCurrency.baseType === "PT"
        ? "swapExactYtForPt"
        : inputCurrency.baseType === "SY"
        ? "swapExactYtForSy"
        : "swapExactYtForToken";
    }
    if (outputCurrency.baseType === "YT") {
      return inputCurrency.baseType === "PT"
        ? "swapExactPtForYt"
        : inputCurrency.baseType === "SY"
        ? "swapExactSyForYt"
        : "swapExactTokenForYt";
    }
  };
  const method = getMethod();
  console.log("method", method);
  const calcMaxIteration = () => {
    const x = Big(6 * 0.005).div("10000000000000000000000");
    if (!x.gt(1)) return 3;
    return Math.ceil(Math.log2(x)) + 3;
  };
  const getPullApproxParams = ({ minOut, decimals }) => {
    return [
      Big(ethers.utils.parseUnits(minOut, decimals))
        .mul(1 - 1 * 0.005)
        .toFixed(0),
      Big(ethers.utils.parseUnits(minOut, decimals))
        .mul(1 - 5 * 0.005)
        .toFixed(0),
      Big(ethers.utils.parseUnits(minOut, decimals)).toFixed(0),
      calcMaxIteration(),
      "100000000000000",
    ];
  };
  const getPushApproxParams = ({ minOut, decimals }) => {
    return [
      Big(ethers.utils.parseUnits(minOut, decimals))
        .mul(1 + 5 * 0.005)
        .toFixed(0),
      Big(ethers.utils.parseUnits(minOut, decimals))
        .mul(1 + 1 * 0.005)
        .toFixed(0),
      Big(ethers.utils.parseUnits(minOut, decimals)).toFixed(0),
      calcMaxIteration(),
      "100000000000000",
    ];
  };

  const getParams = (inputData) => {
    switch (method) {
      case "swapExactYtForPt": // 1
        return [
          account,
          market.address,
          amount,
          minOutputAmount,
          getPushApproxParams({
            minOut: tradeInfo.totalSwapped,
            decimals: inputCurrency.decimals,
          }),
        ];
      case "swapExactSyForPt": // 1
      case "swapExactSyForYt": // 1
        return [
          account,
          market.address,
          amount,
          minOutputAmount,
          getPullApproxParams({
            minOut: tradeInfo.netOut,
            decimals: outputCurrency.decimals,
          }),
        ];
      case "swapExactPtForYt": // 1
        return [
          account,
          market.address,
          amount,
          minOutputAmount,
          getPushApproxParams({
            minOut: tradeInfo.totalSwapped,
            decimals: inputCurrency.decimals,
          }),
        ];
      case "swapExactYtForSy": // 1
      case "swapExactPtForSy": // 1
        return [account, market.address, amount, minOutputAmount];
      case "swapExactTokenForPt": // 1
      case "swapExactTokenForYt": // 1
        return [
          account,
          market.address,
          minOutputAmount,
          getPullApproxParams({
            minOut: tradeInfo.netOut,
            decimals: outputCurrency.decimals,
          }),
          inputData,
        ];
      case "swapExactPtForToken": // 1
      case "swapExactYtForToken": // 1
        return [account, market.address, amount, inputData];
      default:
        return [];
    }
  };
  if (
    ![
      "swapExactTokenForPt",
      "swapExactTokenForYt",
      "swapExactPtForToken",
      "swapExactYtForToken",
    ].includes(method)
  ) {
    console.log("simpleParams", getParams());
    RouterContract[method](...getParams(), { gasLimit: 5000000 })
      .then((tx) => {
        onSuccess(tx);
      })
      .catch((err) => {
        console.log("error", err);
        onError(err);
      });
    return;
  }
  let inputData = [];
  if (["swapExactTokenForPt", "swapExactTokenForYt"].includes(method)) {
    inputData = [
      inputCurrency.address,
      Big(
        ethers.utils.parseUnits(inputCurrencyAmount, inputCurrency.decimals)
      ).toFixed(),
      inputCurrency.address,
      "0x0000000000000000000000000000000000000000",
      "0x38812c3ac3563bf200482ac9d096952d7cb55f9b",
      [0, "0x0000000000000000000000000000000000000000", "0x00", false],
    ];
  }
  if (["swapExactPtForToken", "swapExactYtForToken"].includes(method)) {
    inputData = [
      outputCurrency.address,
      minOutputAmount,
      outputCurrency.address,
      "0x0000000000000000000000000000000000000000",
      "0x38812c3ac3563bf200482ac9d096952d7cb55f9b",
      [0, "0x0000000000000000000000000000000000000000", "0x00", false],
    ];
  }
  console.log("token params", getParams(inputData));
  const itf = new ethers.utils.Interface(ROUTER_ABI);
  const encodeData = itf.encodeFunctionData(method, getParams(inputData));

  RouterContract[method](...getParams(inputData), {
    gasLimit: 5000000,
    value:
      inputCurrency.address === "0x0000000000000000000000000000000000000000"
        ? amount
        : 0,
  })
    .then((tx) => {
      onSuccess(tx);
    })
    .catch((err) => {
      onError(err);
    });
};

if (swapping === state.swapping) {
  return;
} else {
  State.update({
    swapping,
  });
  handleSwap();
}

return "";
