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
        name: "netSyIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minPyOut",
        type: "uint256",
      },
    ],
    name: "mintPyFromSy",
    outputs: [
      {
        internalType: "uint256",
        name: "netPyOut",
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
        name: "minPyOut",
        type: "uint256",
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
    name: "mintPyFromToken",
    outputs: [
      {
        internalType: "uint256",
        name: "netPyOut",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const hanleMint = () => {
  const signer = Ethers.provider().getSigner();

  const contract = new ethers.Contract(routerAddress, abi, signer);

  const receiver = account;
  const YT = market.yt.address;

  const minPyOut = "0";

  // const netTokenIn = ethers.utils.parseUnits(
  //   inputCurrencyAmount,
  //   inputCurrency.decimals
  // );

  const netTokenIn = Big(inputCurrencyAmount)
    .times(Big(10).pow(inputCurrency.decimals))
    .toFixed(0);

  const bulk = "0x0000000000000000000000000000000000000000";

  const pendleSwap = "0x38812C3AC3563Bf200482ac9D096952D7cB55f9b";

  const options = {
    gasLimit: 5000000,
    value: inputCurrency.address === "native" ? netTokenIn : "0",
  };

  if (inputCurrency.baseType === "SY") {
    contract
      .mintPyFromSy(receiver, YT, netTokenIn, minPyOut, options)
      .then((res) => {
        onSuccess?.();
      })
      .catch(() => {
        onError?.();
      });
  } else {
    const tokenIn =
      inputCurrency.address == "native"
        ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        : inputCurrency.address;

    // const params = {
    //   tokenIn: tokenIn,
    //   netTokenIn,
    //   tokenMintSy: market.sy.address,
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
      tokenIn,
      netTokenIn,
      tokenIn,
      bulk,
      pendleSwap,
      [0, bulk, "0x00", false],
    ];

    return contract
      .mintPyFromToken(receiver, YT, minPyOut, params, options)
      .then((res) => {
        onSuccess?.(res);
      })
      .catch((e) => {
        onError?.();
      });
  }
};

if (swapping === state.swapping) {
  return;
} else {
  State.update({
    swapping,
  });
  hanleMint();
}

return "";
