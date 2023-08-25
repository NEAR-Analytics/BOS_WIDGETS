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

const { amountIn, tokenIn, tokenOut, loadAmountOut, config, selectedDex } =
  props;

const feeList = [100, 500, 3000, 10000];

const queryString = `${tokenIn.address}-${tokenOut.address}-${selectedDex}-${amountIn}`;

if (state.cacheString !== queryString) {
  State.update({
    cacheString: queryString,
    quoteDone: false,
    quoting: false,
  });
}

const getAbi = (selectedDex) => {
  if (selectedDex === "Agni Finance") {
    return abiAgni;
  } else if (selectedDex !== "iZiSwap") {
    return abiFusion_Ammos;
  }
};

const selectedDexItem = config.dapps.find((dapp) => dapp.name === selectedDex);

const quoteSingle = (amountIn, tokenIn, tokenOut, fee, finalList) => {
  const abi = getAbi(selectedDex);

  console.log("selectedDexItem.quoter: ", selectedDexItem.quoter);
  const iface = new ethers.utils.Interface(abi);

  const inputs =
    selectedDex === "Agni Finance"
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

  const quoterContractId = selectedDexItem.quoter;

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

const quoteAll = () => {
  State.update({
    quoting: true,
  });

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
