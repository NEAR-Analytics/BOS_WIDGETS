const QUOTER_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "route",
        type: "address[]",
      },
      {
        internalType: "uint128",
        name: "amountIn",
        type: "uint128",
      },
    ],
    name: "findBestPathFromAmountIn",
    outputs: [
      {
        components: [
          {
            internalType: "address[]",
            name: "route",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "pairs",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "binSteps",
            type: "uint256[]",
          },
          {
            internalType: "enum ILBRouter.Version[]",
            name: "versions",
            type: "uint8[]",
          },
          {
            internalType: "uint128[]",
            name: "amounts",
            type: "uint128[]",
          },
          {
            internalType: "uint128[]",
            name: "virtualAmountsWithoutSlippage",
            type: "uint128[]",
          },
          {
            internalType: "uint128[]",
            name: "fees",
            type: "uint128[]",
          },
        ],
        internalType: "struct LBQuoter.Quote",
        name: "quote",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const ROUTER_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256[]",
            name: "pairBinSteps",
            type: "uint256[]",
          },
          {
            internalType: "enum ILBRouter.Version[]",
            name: "versions",
            type: "uint8[]",
          },
          {
            internalType: "contract IERC20[]",
            name: "tokenPath",
            type: "address[]",
          },
        ],
        internalType: "struct ILBRouter.Path",
        name: "path",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactNATIVEForTokens",
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
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMinNATIVE",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256[]",
            name: "pairBinSteps",
            type: "uint256[]",
          },
          {
            internalType: "enum ILBRouter.Version[]",
            name: "versions",
            type: "uint8[]",
          },
          {
            internalType: "contract IERC20[]",
            name: "tokenPath",
            type: "address[]",
          },
        ],
        internalType: "struct ILBRouter.Path",
        name: "path",
        type: "tuple",
      },
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForNATIVE",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256[]",
            name: "pairBinSteps",
            type: "uint256[]",
          },
          {
            internalType: "enum ILBRouter.Version[]",
            name: "versions",
            type: "uint8[]",
          },
          {
            internalType: "contract IERC20[]",
            name: "tokenPath",
            type: "address[]",
          },
        ],
        internalType: "struct ILBRouter.Path",
        name: "path",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const {
  updater,
  quoterAddress,
  routerAddress,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  slippage,
  account,
} = props;

useEffect(() => {
  if (!updater) return;
  if (
    !inputCurrency.address ||
    !outputCurrency.address ||
    !quoterAddress ||
    !routerAddress ||
    !inputCurrencyAmount
  ) {
    return;
  }

  const wrapType =
    inputCurrency.address === "native" && outputCurrency.address === wethAddress
      ? 1
      : inputCurrency.address === wethAddress &&
        outputCurrency.address === "native"
      ? 2
      : 0;

  if (wrapType) {
    const WethContract = new ethers.Contract(
      wethAddress,
      [
        {
          constant: false,
          inputs: [],
          name: "deposit",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
          name: "withdraw",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );
    let params = [];
    let options = {};
    let method = "";
    if (wrapType === 1) {
      method = "deposit";
      options.value = ethers.utils.parseEther(
        Big(inputCurrencyAmount).toFixed(18).toString()
      );
    } else {
      method = "withdraw";
      params = [
        ethers.utils.parseEther(
          Big(inputCurrencyAmount).toFixed(18).toString()
        ),
      ];
    }
    const returnData = {
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount: inputCurrencyAmount,
      noPair: false,
      routes: null,
      routerStr: "",
      gas: "",
    };
    const getTx = (_gas) => {
      WethContract.populateTransaction[method](...params, {
        ...options,
        gasLimit: _gas || 4000000,
      })
        .then((res) => {
          onLoad({
            ...returnData,
            gas: _gas,
            unsignedTx: res,
          });
        })
        .catch((err) => {
          onLoad({
            ...returnData,
          });
        });
    };
    const estimateGas = () => {
      WethContract.estimateGas[method](...params, options)
        .then((_gas) => {
          getTx(_gas);
        })
        .catch((err) => {
          console.log(err);
          getTx();
        });
    };
    estimateGas();
    return;
  }
  const amount = ethers.utils.parseUnits(
    Big(inputCurrencyAmount || 0).toFixed(inputCurrency.decimals),
    inputCurrency.decimals
  );

  const path = [
    inputCurrency.address === "native" ? wethAddress : inputCurrency.address,
    outputCurrency.address === "native" ? wethAddress : outputCurrency.address,
  ];

  const getTraderJoeAmount = () => {
    const QuoterContract = new ethers.Contract(
      quoterAddress,
      QUOTER_ABI,
      Ethers.provider().getSigner()
    );

    QuoterContract.findBestPathFromAmountIn(path, amount)
      .then((res) => {
        const amount = Big(
          ethers.utils.formatUnits(res[4][1], outputCurrency.decimals)
        );

        if (amount.gt(0)) {
          const virtualAmount = Big(
            ethers.utils.formatUnits(res[5][1], outputCurrency.decimals)
          );
          const priceImpact = Big(virtualAmount)
            .minus(amount)
            .div(virtualAmount)
            .mul(100)
            .toString();
          getTraderJoeTransaction({
            binSteps: res[2],
            versions: res[3],
            amountout: res[4][1],
            priceImpact,
            amountoutDesimals: amount.toString(),
          });
        } else {
          onLoad({
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            noPair: true,
            outputCurrencyAmount: "",
          });
        }
      })
      .catch((err) => {
        onLoad({
          inputCurrency,
          inputCurrencyAmount,
          outputCurrency,
          noPair: true,
          outputCurrencyAmount: "",
        });
      });
  };

  const getTraderJoeTransaction = ({
    binSteps,
    versions,
    amountout,
    priceImpact,
    amountoutDesimals,
  }) => {
    const RouterContract = new ethers.Contract(
      routerAddress,
      ROUTER_ABI,
      Ethers.provider().getSigner()
    );
    let method = "";
    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const _amountOut = Big(amountout)
      .mul(1 - (slippage || 0.005))
      .toFixed(0);

    const options = {};
    const params = [_amountOut, [binSteps, versions, path], account, deadline];

    if (inputCurrency.address === "native") {
      method = "swapExactNATIVEForTokens";
      options.value = amount;
    } else if (outputCurrency.address === "native") {
      method = "swapExactTokensForNATIVE";
      params.unshift(amount);
    } else {
      method = "swapExactTokensForTokens";
      params.unshift(amount);
    }

    const returnData = {
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount: Big(amountoutDesimals).gt(0.01)
        ? Big(amountoutDesimals).toPrecision(10)
        : Big(amountoutDesimals).toFixed(10),
      priceImpact,
    };

    RouterContract.estimateGas[method](...params, options)
      .then((_gas) => {
        RouterContract.populateTransaction[method](...params, options)
          .then((res) => {
            onLoad({
              ...returnData,
              noPair: false,
              gas: _gas,
              unsignedTx: res,
            });
          })
          .catch((err) => {
            onLoad({
              ...returnData,
              noPair: false,
              gas: _gas,
            });
          });
      })
      .catch((err) => {
        onLoad({
          ...returnData,
          noPair: false,
        });
      });
  };

  getTraderJoeAmount();
}, [updater]);
