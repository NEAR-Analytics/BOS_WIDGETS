const ROUTER_ABI = [
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
  updater,
  wethAddress,
  routerAddress,
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

  const amount = Big(
    ethers.utils.parseUnits(
      Big(inputCurrencyAmount || 0).toFixed(inputCurrency.decimals),
      inputCurrency.decimals
    )
  ).toFixed(0);

  const path = [
    inputCurrency.isNative ? wethAddress : inputCurrency.address,
    outputCurrency.isNative ? wethAddress : outputCurrency.address,
  ];
  const getAmountsOut = () => {
    asyncFetch(`https://api.dapdap.net/api/uniswap/v2/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token_in: path[0],
        token_out: path[1],
        amount,
        chain_id: inputCurrency.chainId,
      }),
    })
      .then((res) => {
        if (res.body.data?.result?.quote) {
          const data = res.body.data.result.quote;

          getTransaction({
            routes: data.route,
            priceImpact: Number(data.priceImpact) ? data.priceImpact : 0,
            outputCurrencyAmount: data.quoteDecimals,
            quote: data.quote,
          });
        }
        if (res.body && res.body.error.message === "no pair exist") {
          onLoad({
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            outputCurrencyAmount: "",
            noPair: false,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
        onLoad({
          inputCurrency,
          inputCurrencyAmount,
          outputCurrency,
          outputCurrencyAmount: "",
          noPair: false,
        });
      });
  };

  const getTransaction = ({
    routes,
    priceImpact,
    outputCurrencyAmount,
    quote,
  }) => {
    const deadline = Math.ceil(Date.now() / 1000) + 120;
    const _amountOut = Big(quote)
      .mul(1 - (slippage || 0.005))
      .toFixed(0);
    const Iface = new ethers.utils.Interface(ROUTER_ABI);
    const calldatas = [];
    const _pathTypes = [];
    const _path = [];
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
    calldatas.push(
      Iface.encodeFunctionData("exactInput", [
        {
          path: ethers.utils.solidityPack(_pathTypes, _path),
          recipient:
            outputCurrency.address === "native" ? routerAddress : account,
          amountIn: amount,
          amountOutMinimum: _amountOut,
        },
      ])
    );
    if (outputCurrency.isNative) {
      calldatas.push(Iface.encodeFunctionData("unwrapWETH9", ["0", account]));
    }
    const options = {
      value: inputCurrency.isNative ? amount : "0",
    };
    const returnData = {
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount,
      priceImpact,
    };

    const RouterContract = new ethers.Contract(
      routerAddress,
      ROUTER_ABI,
      Ethers.provider().getSigner()
    );
    const createTx = (gasLimit) => {
      RouterContract.populateTransaction
        .multicall(deadline, calldatas, {
          ...options,
          gasLimit: gasLimit || 500000,
        })
        .then((res) => {
          onLoad({
            ...returnData,
            noPair: false,
            gas: gasLimit,
            unsignedTx: res,
          });
        })
        .catch((err) => {
          onLoad({
            ...returnData,
            noPair: false,
            gas: gasLimit,
          });
        });
    };
    RouterContract.estimateGas
      .multicall(deadline, calldatas, options)
      .then((_gas) => {
        createTx(_gas);
      })
      .catch((err) => {
        onLoad({
          ...returnData,
          noPair: false,
        });
      });
  };

  getAmountsOut();
}, [updater]);
