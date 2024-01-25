const VAULT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "Token[]",
        name: "tokenRef",
        type: "bytes32[]",
      },
      {
        internalType: "int128[]",
        name: "deposit",
        type: "int128[]",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "poolId",
            type: "bytes32",
          },
          {
            internalType: "bytes32[]",
            name: "tokenInformations",
            type: "bytes32[]",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct VelocoreOperation[]",
        name: "ops",
        type: "tuple[]",
      },
    ],
    name: "query",
    outputs: [
      {
        internalType: "int128[]",
        name: "",
        type: "int128[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "Token[]",
        name: "tokenRef",
        type: "bytes32[]",
      },
      {
        internalType: "int128[]",
        name: "deposit",
        type: "int128[]",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "poolId",
            type: "bytes32",
          },
          {
            internalType: "bytes32[]",
            name: "tokenInformations",
            type: "bytes32[]",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct VelocoreOperation[]",
        name: "ops",
        type: "tuple[]",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
const FACTORY_ABI = [
  {
    inputs: [
      { internalType: "Token", name: "", type: "bytes32" },
      { internalType: "Token", name: "", type: "bytes32" },
    ],
    name: "pools",
    outputs: [
      {
        internalType: "contract ConstantProductPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const {
  updater,
  routerAddress,
  factoryAddress,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  prices,
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
    onLoad({
      outputCurrencyAmount: inputCurrencyAmount,
      noPair: false,
    });
    return;
  }

  const solidityPack = ethers.utils.solidityPack;
  const toToken = (spec, id, addr) =>
    solidityPack(
      ["uint8", "uint88", "address"],
      [["erc20", "erc721", "erc1155"].indexOf(spec), id, addr]
    );
  const poolId = (i, poolAddress) =>
    solidityPack(["bytes1", "uint88", "address"], [i, 0, poolAddress]);

  const tokenInformation = (index, amountType, amount) =>
    solidityPack(
      ["uint8", "uint8", "uint112", "int128"],
      [
        index,
        ["exactly", "at most", "all", "flashloan"].indexOf(amountType),
        0,
        amount,
      ]
    );

  const amount = ethers.utils.parseUnits(
    Big(inputCurrencyAmount || 0).toFixed(inputCurrency.decimals),
    inputCurrency.decimals
  );

  const path = [
    inputCurrency.isNative
      ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      : toToken("erc20", 0, inputCurrency.address),
    outputCurrency.isNative
      ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      : toToken("erc20", 0, outputCurrency.address),
  ];

  const isReverse = Number(path[0]) > Number(path[1]);

  const options = {
    value: inputCurrency.isNative ? amount : 0,
  };

  const getTokenRef = (ops) => {
    return [...new Set(ops.flatMap((x) => x[1].map((i) => i[0])))].sort();
  };

  const VaultContract = new ethers.Contract(
    routerAddress,
    VAULT_ABI,
    Ethers.provider().getSigner()
  );

  const getAmountout = () => {
    const FactoryContract = new ethers.Contract(
      factoryAddress,
      FACTORY_ABI,
      Ethers.provider().getSigner()
    );
    FactoryContract.pools(...path)
      .then((pool) => {
        const opts = [
          [
            poolId(0, pool),
            [
              [path[0], "exactly", amount],
              [path[1], "at most", "0"],
            ],
          ],
        ];
        const tokenRef = getTokenRef(opts);
        const params = [
          account,
          tokenRef,
          new Array(tokenRef.length).fill(0),
          opts.map((op) => ({
            poolId: op[0],
            tokenInformations: op[1]
              .map((i) => tokenInformation(tokenRef.indexOf(i[0]), i[1], i[2]))
              .sort(),
            data: [],
          })),
        ];
        VaultContract.callStatic
          .query(...params)
          .then((res) => {
            getTransaction(isReverse ? res[0] : res[1], pool);
          })
          .catch((err) => {
            onLoad({
              noPair: true,
              outputCurrencyAmount: "",
            });
          });
      })
      .catch((err) => {
        onLoad({
          noPair: true,
          outputCurrencyAmount: "",
        });
      });
  };

  const getTransaction = (amountOut, pool) => {
    let priceImpact = null;

    const _amountOutWithoutDecimal = Big(
      ethers.utils.formatUnits(amountOut, outputCurrency.decimals)
    );
    if (prices) {
      const poolPrice = Big(
        prices[isReverse ? inputCurrency.symbol : outputCurrency.symbol] || 0
      ).div(
        prices[!isReverse ? inputCurrency.symbol : outputCurrency.symbol] || 0
      );
      const amountoutPrice = !isReverse
        ? Big(inputCurrencyAmount).div(_amountOutWithoutDecimal)
        : Big(_amountOutWithoutDecimal).div(inputCurrencyAmount);

      priceImpact = poolPrice
        .minus(amountoutPrice)
        .div(poolPrice)
        .mul(100)
        .toString();
    }
    const _amountOut = Big(amountOut)
      .mul(1 - (slippage || 0.05))
      .toFixed(0);

    const returnData = {
      outputCurrencyAmount: Big(_amountOutWithoutDecimal).gt(0.01)
        ? Big(_amountOutWithoutDecimal).toPrecision(10)
        : Big(_amountOutWithoutDecimal).toFixed(10),
      priceImpact,
      noPair: false,
    };
    const opts = [
      [
        poolId(0, pool),
        [
          [path[0], "exactly", amount],
          [path[1], "at most", _amountOut],
        ],
      ],
    ];

    const tokenRef = getTokenRef(opts);
    const params = [
      tokenRef,
      new Array(tokenRef.length).fill(0),
      opts.map((op) => ({
        poolId: op[0],
        tokenInformations: op[1]
          .map((i) => tokenInformation(tokenRef.indexOf(i[0]), i[1], i[2]))
          .sort(),
        data: [],
      })),
    ];

    const getTx = (_gas) => {
      VaultContract.populateTransaction
        .execute(...params, {
          ...options,
          gasLimit: _gas,
        })
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
    };

    const estimateGas = () => {
      VaultContract.estimateGas
        .execute(...params, options)
        .then((_gas) => {
          getTx(_gas);
        })
        .catch((err) => {
          onLoad({
            ...returnData,
            noPair: false,
          });
        });
    };

    estimateGas();
  };

  getAmountout();
}, [updater]);
