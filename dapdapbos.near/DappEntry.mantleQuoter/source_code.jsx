const abiAgni = [
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

const abiFusion_Ammos = [
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

const {
  amountIn,
  tokenIn: tokenInProps,
  tokenOut: tokenOutProps,
  loadAmountOut,
  wethAddress,
  quoterContractId: quoterAddress,
} = props;

console.log("tokenInProps: ", tokenInProps, tokenOutProps);

const tokenIn =
  tokenInProps.address === "native"
    ? {
        ...tokenInProps,
        address: wethAddress,
      }
    : tokenInProps;

const tokenOut =
  tokenOutProps.address === "native"
    ? {
        ...tokenOutProps,
        address: wethAddress,
      }
    : tokenOutProps;

const feeList = [100, 500, 3000, 10000];

const queryString = `${tokenIn.address}-${tokenOut.address}-${amountIn}`;

if (state.cacheString !== queryString) {
  State.update({
    cacheString: queryString,
    quoteDone: false,
    quoting: false,
  });
}

const getAbi = () => {
  if (quoterAddress === "0x9488C05a7b75a6FefdcAE4f11a33467bcBA60177") {
    return abiAgni;
  } else if (quoterAddress !== "0x032b241De86a8660f1Ae0691a4760B426EA246d7") {
    return abiFusion_Ammos;
  }
};

const quoteSingleAgni = (amountIn, tokenIn, tokenOut, fee, finalList) => {
  const abi = getAbi();
  console.log("abi: ", abi, quoterAddress);

  const iface = new ethers.utils.Interface(abi);

  const inputs =
    quoterAddress === "0x9488C05a7b75a6FefdcAE4f11a33467bcBA60177"
      ? [
          tokenIn.address,
          tokenOut.address,
          fee,
          ethers.utils.parseUnits(amountIn, tokenIn.decimals),
          0,
        ]
      : [
          {
            tokenIn: tokenIn.address,
            tokenOut: tokenOut.address,
            amountIn: ethers.utils.parseUnits(amountIn, tokenIn.decimals),
            fee: fee,
            sqrtPriceLimitX96: 0,
          },
        ];

  const encodedData = iface.encodeFunctionData("quoteExactInputSingle", inputs);

  const quoterContractId = quoterAddress;

  return Ethers.provider()
    .call({
      to: quoterContractId,
      data: encodedData,
    })
    .then((data) => {
      const res = iface.decodeFunctionResult("quoteExactInputSingle", data);
      console.log("res: ", res);

      const rawAmountOut = Big(Number(res.amountOut._hex)).toFixed();

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
      console.log(" single quote: ", e);
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

  const tokenInAddress = tokenIn.address;

  const tokenOutAddress = tokenOut.address;

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

  const quoterContractId = quoterAddress;

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

const quoteSingle = (amountIn, tokenIn, tokenOut, fee, finalList) => {
  if (quoterAddress === "0x032b241De86a8660f1Ae0691a4760B426EA246d7") {
    return qouteSingleIzi(amountIn, tokenIn, tokenOut, fee, finalList);
  } else {
    return quoteSingleAgni(amountIn, tokenIn, tokenOut, fee, finalList);
  }
};

const quoteAll = () => {
  State.update({
    quoting: true,
  });

  if (tokenIn.address === tokenOut.address) {
    const amountOut = amountIn;
    console.log("amountOut: ", amountOut);
    State.update({ quoteDone: true, quoting: false });
    loadAmountOut({
      fee: 0,
      amountOut: amountOut,
      outputCurrencyAmount: amountOut,
      quoteDone: true,
      quoting: false,
      success: true,
    });
    return;
  }

  quoteSingle(amountIn, tokenIn, tokenOut, feeList[0], []).then(
    (finalList0) => {
      return quoteSingle(
        amountIn,
        tokenIn,
        tokenOut,
        feeList[1],
        finalList0
      ).then((finalList1) => {
        return quoteSingle(
          amountIn,
          tokenIn,
          tokenOut,
          feeList[2],
          finalList1
        ).then((finalList2) => {
          return quoteSingle(
            amountIn,
            tokenIn,
            tokenOut,
            feeList[3],
            finalList2
          ).then((finalList3) => {
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
              noPair: !Big(maxAmountOutEstimate.amountOut).gt(0),
            });
          });
        });
      });
    }
  );
};

if (Number(amountIn) > 0 && !state.quoteDone && !state.quoting) {
  quoteAll();
}

return <div></div>;
