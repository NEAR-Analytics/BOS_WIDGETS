const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WETH9",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
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
    ],
    name: "pool",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "refundETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "path",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "minAcquired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct Swap.SwapAmountParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "swapAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "acquire",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "path",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "desire",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "maxPayed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct Swap.SwapDesireParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "swapDesire",
    outputs: [
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "acquire",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
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
            internalType: "int24",
            name: "boundaryPt",
            type: "int24",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "maxPayed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAcquired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct Swap.SwapParams",
        name: "swapParams",
        type: "tuple",
      },
    ],
    name: "swapX2Y",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "swapX2YCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
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
            internalType: "int24",
            name: "boundaryPt",
            type: "int24",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "maxPayed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAcquired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct Swap.SwapParams",
        name: "swapParams",
        type: "tuple",
      },
    ],
    name: "swapX2YDesireY",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
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
            internalType: "int24",
            name: "boundaryPt",
            type: "int24",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "maxPayed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAcquired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct Swap.SwapParams",
        name: "swapParams",
        type: "tuple",
      },
    ],
    name: "swapY2X",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "swapY2XCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
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
            internalType: "int24",
            name: "boundaryPt",
            type: "int24",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "amount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "maxPayed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAcquired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct Swap.SwapParams",
        name: "swapParams",
        type: "tuple",
      },
    ],
    name: "swapY2XDesireX",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const {
  inputCurrencyAmount,
  outputCurrencyAmount,
  inputCurrency,
  outputCurrency,
  wethAddress,
  account,
  fee,
  chainId,
  routerAddress,
  swapping: swapping,
  title,
  onError,
  onSuccess,
} = props;
console.log("props: ", props);

if (!swapping || !account) return "";

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};
const value = expandToken(inputCurrencyAmount, inputCurrency.decimals).toFixed(
  0
);

const signer = Ethers.provider().getSigner();

const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

const iface = new ethers.utils.Interface(abi);
const tokenInAddress =
  inputCurrency.address === "native" ? wethAddress : inputCurrency.address;

const tokenOutAddress =
  outputCurrency.address === "native" ? wethAddress : outputCurrency.address;

const isX2Y = tokenInAddress.toLowerCase() < tokenOutAddress.toLowerCase();
const boundaryPt = isX2Y ? -799999 : 799999;

const multicallParams = [];

const parsedAmountIn = ethers.utils.parseUnits(
  inputCurrencyAmount,
  inputCurrency.decimals
);

console.log("multicallParams: ", multicallParams);

const options = {
  from: account,
  value: "0",
};

if (inputCurrency.address === "native") {
  options.value = parsedAmountIn;
}

if (isX2Y) {
  const inputs = [
    {
      tokenX: tokenInAddress,
      tokenY: tokenOutAddress,
      fee: fee,
      boundaryPt: boundaryPt,
      recipient:
        outputCurrency.address === "native"
          ? "0x0000000000000000000000000000000000000000"
          : account,
      amount: parsedAmountIn,
      maxPayed: "0",
      minAcquired: "0",
      deadline: deadline.toFixed(),
    },
  ];

  console.log("inputs: ", inputs);

  const encodedDataCallSwap = iface.encodeFunctionData("swapX2Y", inputs);

  multicallParams.push(encodedDataCallSwap);
} else {
  const inputs = [
    {
      tokenX: tokenOutAddress,
      tokenY: tokenInAddress,
      fee: fee,
      boundaryPt: boundaryPt,
      recipient:
        outputCurrency.address === "native"
          ? "0x0000000000000000000000000000000000000000"
          : account,
      amount: parsedAmountIn,
      maxPayed: "0",
      minAcquired: "0",
      deadline: deadline.toFixed(),
    },
  ];

  console.log("inputs: ", inputs);

  const encodedDataCallSwap = iface.encodeFunctionData("swapY2X", inputs);

  multicallParams.push(encodedDataCallSwap);
}

if (outputCurrency.address === "native") {
  multicallParams.push(iface.encodeFunctionData("unwrapWETH9", ["0", account]));
}

const multicallit = () => {
  return multicallContract
    .multicall(multicallParams, options)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      console.log(err);
      onError(err);
    });
};

const multicallContract = new ethers.Contract(routerAddress, abi, signer);

multicallContract.estimateGas
  .multicall(multicallParams, { ...options, gasLimit: 5000000 })
  .then((gas) => {
    console.log("gas: ", gas);

    const gasLimit = gas.toString();

    return Big(gasLimit).times(1.1).toFixed(0);
  })
  .then((gasLimit) => {
    return multicallContract
      .multicall(multicallParams, { value: options.value, gasLimit })
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        console.log(err);
        onError(err);
      });
  })
  .catch((err) => {
    if (err.code === "UNPREDICTABLE_GAS_LIMIT") {
      return multicallit();
    }

    onError(err);
  });

return "";
