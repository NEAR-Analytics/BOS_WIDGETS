const {
  tokenIn,
  tokenOut,
  config,
  selectedDex,
  onLoadSwapCall,
  sender,
  amountIn,
  onSwapCallBack,
} = props;

const qs = `${tokenIn.address}-${tokenOut.address}-${amountIn}-${selectedDex}`;

if (qs !== state.cacheQs) {
  State.update({
    cacheQs: qs,
  });
} else {
  return <div></div>;
}

if (!sender) {
  return <div></div>;
}

const exactInputAbi = [
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
            internalType: "uint24",
            name: "fee",
            type: "uint24",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256",
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160",
          },
        ],
        internalType: "struct ISwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];
const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const selectedDexItem = config.dapps.find((dapp) => dapp.name === selectedDex);

const signer = Ethers.provider().getSigner();

const callSwap = (fee) => {
  const swapContract = new ethers.Contract(
    selectedDexItem.swapRouter,
    exactInputAbi,
    signer
  );

  const value = expandToken(amountIn, tokenIn.decimals).toFixed();

  const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

  const inputs = [
    tokenIn.address,
    tokenOut.address,
    fee,
    sender,
    deadline.toFixed(),
    value,
    "0",
    0,
  ];

  swapContract
    .exactInputSingle(inputs, {
      gasPrice: ethers.utils.parseUnits(gasPrice ?? "10", "gwei"),
      gasLimit: gasLimit ?? 300000,
    })
    .then((tx) => {
      tx.wait().then((receipt) => {
        const { status, transactionHash } = receipt;
        console.log("transactionHash: ", transactionHash);
        // TODO: add action
        onSwapCallBack();
      });
    })
    .catch(() => {});
};

if (Number(amountIn) > 0 && onLoadSwapCall) {
  onLoadSwapCall({ callSwap });
}

return <div></div>;
