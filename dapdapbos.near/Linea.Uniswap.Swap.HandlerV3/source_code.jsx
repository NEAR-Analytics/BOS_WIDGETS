const swapRouterV3Abi = [
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
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256",
          },
        ],
        internalType: "struct IV3SwapRouter.ExactInputParams",
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
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" },
    ],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function",
  },
];

const {
  routerAddress,
  wethAddress,
  account,
  inputCurrencyAmount,
  inputCurrency,
  outputCurrencyAmount,
  outputCurrency,
  swapping,
  onSuccess,
  onError,
  chainId,
  trade,
} = props;

const slippage = props.slippage || 0.5;

if (!swapping || !chainId || state.fetching) return "";

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const value = expandToken(inputCurrencyAmount, inputCurrency.decimals).toFixed(
  0
);
const signer = Ethers.provider().getSigner();

const iface = new ethers.utils.Interface(swapRouterV3Abi);

const tokenIn =
  inputCurrency.address === "native" ? wethAddress : inputCurrency.address;

const tokenOut =
  outputCurrency.address === "native" ? wethAddress : outputCurrency.address;

const routes = trade.routes || [];

const calldatas = [];
const amountOutMinimum = expandToken(
  Big(outputCurrencyAmount)
    .mul(1 - slippage / 100)
    .toString(),
  outputCurrency.decimals
);
let _pathTypes = [];
let _path = [];
routes.forEach((route, i) => {
  const tokenPath = route.tokenPath || [];
  route.route.forEach((path, j) => {
    _pathTypes.push("address");
    _path.push(tokenPath[j].address);
    _pathTypes.push("uint24");
    _path.push(path.fee);
    if (j === route.route.length - 1) {
      _pathTypes.push("address");
      _path.push(tokenPath[j + 1].address);
    }
  });
});
console.log(_path);
calldatas.push(
  iface.encodeFunctionData("exactInput", [
    {
      path: ethers.utils.solidityPack(_pathTypes, _path),
      recipient: outputCurrency.address === "native" ? routerAddress : account,
      amountIn: value,
      amountOutMinimum: amountOutMinimum.toFixed(0),
    },
  ])
);

let _ethValue = inputCurrency.address === "native" ? value : 0;

const multicallContract = new ethers.Contract(
  routerAddress,
  swapRouterV3Abi,
  signer
);

const options = {
  value: _ethValue,
};

if (outputCurrency.address === "native") {
  calldatas.push(iface.encodeFunctionData("unwrapWETH9", ["0", account]));
}
State.update({
  fetching: true,
});
const multicallit = (gasLimit) => {
  multicallContract
    .multicall(Math.ceil(Date.now() / 1000) + 60, calldatas, {
      ...options,
      gasLimit: gasLimit || 500000,
    })
    .then((res) => {
      onSuccess(res);
      setTimeout(() => {
        State.update({
          pending: false,
        });
      }, 500);
    })
    .catch((err) => {
      console.log("call-err", err);
      onError(err);
    });
};
multicallContract.estimateGas
  .multicall(Math.ceil(Date.now() / 1000) + 60, calldatas, options)
  .then((gas) => {
    const gasLimit = Big(gas.toString()).times(1.1).toFixed(0);
    multicallit(gasLimit);
  })
  .catch((err) => {
    console.log("estimate-err", err);
    multicallit();
  });

return "";
