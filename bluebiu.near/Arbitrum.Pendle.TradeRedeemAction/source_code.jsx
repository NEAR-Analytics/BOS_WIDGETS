const {
  onSuccess,
  onError,
  inputCurrencyAmount,
  inputCurrency,
  wethAddress,
  outputCurrency,
  routerAddress,
  account,
  market,
  redeemParams,
  swapping,
} = props;

if (!swapping) return;

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "YT",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "netPyIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minSyOut",
        type: "uint256",
      },
    ],
    name: "redeemPyToSy",
    outputs: [
      {
        internalType: "uint256",
        name: "netSyOut",
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
        name: "YT",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "netPyIn",
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
    name: "redeemPyToToken",
    outputs: [
      {
        internalType: "uint256",
        name: "netTokenOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const hanleRedeem = () => {
  const signer = Ethers.provider().getSigner();
  console.log("signer: ", signer);

  const contract = new ethers.Contract(routerAddress, abi, signer);
  console.log("contract: ", contract);

  const receiver = account;
  const YT = market.yt.address;
  console.log("YT: ", YT);

  const minSyOut = "0";

  const netPyIn = ethers.utils.parseUnits(
    inputCurrencyAmount,
    inputCurrency.decimals
  );

  console.log("netPyIn: ", netPyIn);

  const bulk = "0x0000000000000000000000000000000000000000";

  const pendleSwap = "0x38812C3AC3563Bf200482ac9D096952D7cB55f9b";

  const options = {
    gasLimit: 5000000,
  };

  if (outputCurrency.baseType === "SY") {
    contract
      .mintPyFromSy(receiver, YT, netPyIn, minSyOut, options)
      .then((res) => {
        onSuccess?.();
      })
      .catch(() => {
        onError?.();
      });
  } else {
    // const params = {
    //   tokenOut: outputCurrency.address,
    //   minTokenOut: minSyOut,
    //   tokenRedeemSy: market.sy.address,
    //   bulk,
    //   pendleSwap,
    //   swapData: {
    //     swapType: 0,
    //     extRouter: bulk,
    //     extCalldata: "0x00",
    //     needScale: false,
    //   },
    // };

    const params = [
      outputCurrency.address,
      minSyOut,
      outputCurrency.address,
      bulk,
      pendleSwap,
      [0, bulk, "0x00", false],
    ];

    contract
      .redeemPyToToken(receiver, YT, netPyIn, params, options)
      .then((res) => {
        onSuccess?.(res);
      })
      .catch((e) => {
        onError?.();
      });
  }
};

hanleRedeem();

return "";
