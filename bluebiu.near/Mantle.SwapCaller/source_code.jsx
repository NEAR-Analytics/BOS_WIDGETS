const {
  tokenIn,
  tokenOut,
  config,
  selectedDex,
  onLoadSwapCall,
  sender,
  amountIn,
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
        ],
        internalType: "struct ISwapRouter.ExactInputParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInput",
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

const callSwap = () => {
  const swapContract = new ethers.Contract(
    selectedDexItem.swapRouter,
    exactInputAbi,
    signer
  );

  const value = expandToken(amountIn, tokenIn.decimals).toFixed();

  const path = [tokenIn.address, tokenOut.address];
  const pathBytes = "0x" + path.map((address) => address.substr(2)).join("");

  const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

  swapContract
    .exactInput([pathBytes, sender, deadline, value, "0"], {
      gasPrice: ethers.utils.parseUnits(gasPrice ?? "10", "gwei"),
      gasLimit: gasLimit ?? 300000,
    })
    .then((tx) => {
      tx.wait().then((receipt) => {
        const { status, transactionHash } = receipt;
        // TODO: add action
      });
    })
    .catch(() => {});
};

if (Number(amountIn) > 0 && onLoadSwapCall) {
  onLoadSwapCall({ callSwap });
}

return <div></div>;
