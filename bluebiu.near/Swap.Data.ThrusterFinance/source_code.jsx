const ROUTER_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "bytes", name: "path", type: "bytes" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
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
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
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
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function",
  },
];
const {
  updater,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  slippage,
  account,
  routerAddress,
  prices,
} = props;

useEffect(() => {
  if (!updater) return;

  if (
    (!inputCurrency.address && !inputCurrency.isNative) ||
    (!outputCurrency.address && !outputCurrency.isNative) ||
    !inputCurrencyAmount
  ) {
    return;
  }

  const wrapType =
    inputCurrency.isNative && outputCurrency.address === wethAddress
      ? 1
      : inputCurrency.address === wethAddress && outputCurrency.isNative
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
    inputCurrency.isNative ? wethAddress : inputCurrency.address,
    outputCurrency.isNative ? wethAddress : outputCurrency.address,
  ];

  const getTokenSymbol = (tokens, str, cb) => {
    if (tokens.length === 0) {
      cb(str);
      return;
    }
    const TokenContract = new ethers.Contract(
      tokens.pop(),
      [
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );
    TokenContract.symbol().then((res) => {
      str += ` > ${res}`;
      if (tokens.length) {
        getTokenSymbol(tokens, str);
      } else {
        cb(str);
      }
    });
  };

  const getAmountsOut = () => {
    const params = `amount=${amount}&tokenIn=${path[0].toLowerCase()}&tokenOut=${path[1].toLowerCase()}&type=EXACT_INPUT&chainId=${
      inputCurrency.chainId
    }`;

    asyncFetch(`https://api.thruster.finance/quote?${params}`)
      .then((res) => {
        const data = res.body?.bestQuote;

        if (!data) {
          onLoad({
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            outputCurrencyAmount: "",
            noPair: true,
          });
          return;
        }
        const tokens = [];
        for (let i = 0, len = data.route.length; i < len - 1; i++) {
          tokens.push(data.route[i].tokenOut);
        }

        let routerStr = "";
        getTokenSymbol(tokens, routerStr, (str) => {
          const routerStr = `${inputCurrency.symbol} ${str} > ${outputCurrency.symbol}`;

          getTransaction({
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            priceImpact: data.priceImpact * 100,
            outputCurrencyAmount: Big(data.quote)
              .div(Big(10).pow(outputCurrency.decimals))
              .toFixed(outputCurrency.decimals),
            noPair: false,
            routerStr,
            routes: data.route,
          });
        });
      })
      .catch((err) => {
        onLoad({
          inputCurrency,
          inputCurrencyAmount,
          outputCurrency,
          outputCurrencyAmount: "",
          noPair: true,
        });
      });
  };

  const getTransaction = (params) => {
    const { routes, ...rest } = params;
    const RouterContract = new ethers.Contract(
      routerAddress,
      ROUTER_ABI,
      Ethers.provider().getSigner()
    );
    let _pathTypes = ["address"];
    let _path = [path[0]];
    routes.forEach((route, i) => {
      _pathTypes.push("uint24");
      _path.push(route.feeTier * 1000000);
      _pathTypes.push("address");
      _path.push(route.tokenOut);
    });

    const deadline = Math.ceil(Date.now() / 1000) + 60;
    const _amountOut = Big(params.outputCurrencyAmount)
      .mul(Big(10).pow(outputCurrency.decimals))
      .mul(1 - (slippage || 0.005))
      .toFixed(0);
    const Iface = new ethers.utils.Interface(ROUTER_ABI);
    const calldatas = [];
    const options = {
      value: inputCurrency.isNative ? amount : 0,
    };
    calldatas.push(
      Iface.encodeFunctionData("exactInput", [
        {
          path: ethers.utils.solidityPack(_pathTypes, _path),
          recipient: outputCurrency.isNative ? routerAddress : account,
          deadline,
          amountIn: amount,
          amountOutMinimum: _amountOut,
        },
      ])
    );
    if (outputCurrency.isNative) {
      calldatas.push(Iface.encodeFunctionData("unwrapWETH9", ["0", account]));
    }

    const getTx = (_gas) => {
      RouterContract.populateTransaction
        .multicall(calldatas, {
          ...options,
          gasLimit: _gas,
        })
        .then((res) => {
          onLoad({
            ...rest,
            noPair: false,
            gas: _gas,
            unsignedTx: res,
          });
        })
        .catch((err) => {
          onLoad({
            ...rest,
            noPair: false,
            gas: _gas,
          });
        });
    };
    const estimateGas = () => {
      RouterContract.estimateGas
        .multicall(calldatas, options)
        .then((_gas) => {
          getTx(_gas);
        })
        .catch((err) => {
          getTx();
        });
    };

    estimateGas();
  };
  getAmountsOut();
}, [updater]);
