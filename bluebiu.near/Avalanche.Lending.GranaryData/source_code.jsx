const native = {
  address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  decimals: 18,
  symbol: "AVAX",
  name: "AVAX",
  description: "native",
  icon: "https://ipfs.near.social/ipfs/bafkreib4qjsech2rplxykox5xhmhhp4mviqczzezjj35v6katfbln5wg7u",
};

const wethAddress = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";

const Tokens = {
  "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664": {
    address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    decimals: 6,
    symbol: "USDC.e",
    name: "USDC.e",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70": {
    address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
    decimals: 18,
    symbol: "DAI.e",
    name: "DAI.e",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },

  "0xc7198437980c041c805A1EDcbA50c1Ce5db95118": {
    address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    decimals: 6,
    symbol: "USDT.e",
    name: "USDT.e",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB": {
    address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    decimals: 18,
    symbol: "WETH.e",
    name: "WETH.e",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },

  "0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4": {
    address: "0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4",
    decimals: 18,
    symbol: "XAVA",
    name: "XAVA",
    icon: "https://ipfs.near.social/ipfs/bafkreicuaysmsfe2vy3abg3ugozhptrjddyjvlnpbfujlcgo3bqfuh2goi",
  },

  "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7": {
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    decimals: 18,
    symbol: "WAVAX",
    name: "WAVAX",
    icon: "https://ipfs.near.social/ipfs/bafkreidhh4bxo55sq6bf2t2kkdbotbxcaj4s2v2wcwmq2e4bb6ilepmpve",
  },

  "0x50b7545627a5162F82A992c33b87aDc75187B218": {
    address: "0x50b7545627a5162F82A992c33b87aDc75187B218",
    decimals: 8,
    symbol: "WBTC.e",
    name: "WBTC.e",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },
};

const aaveProtocolDataProviderAbi = [
  {
    inputs: [
      {
        internalType: "contract ILendingPoolAddressesProvider",
        name: "addressesProvider",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ADDRESSES_PROVIDER",
    outputs: [
      {
        internalType: "contract ILendingPoolAddressesProvider",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllATokens",
    outputs: [
      {
        components: [
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        internalType: "struct AaveProtocolDataProvider.TokenData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllReservesTokens",
    outputs: [
      {
        components: [
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        internalType: "struct AaveProtocolDataProvider.TokenData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveConfigurationData",
    outputs: [
      { internalType: "uint256", name: "decimals", type: "uint256" },
      { internalType: "uint256", name: "ltv", type: "uint256" },
      {
        internalType: "uint256",
        name: "liquidationThreshold",
        type: "uint256",
      },
      { internalType: "uint256", name: "liquidationBonus", type: "uint256" },
      { internalType: "uint256", name: "reserveFactor", type: "uint256" },
      { internalType: "bool", name: "usageAsCollateralEnabled", type: "bool" },
      { internalType: "bool", name: "borrowingEnabled", type: "bool" },
      { internalType: "bool", name: "stableBorrowRateEnabled", type: "bool" },
      { internalType: "bool", name: "isActive", type: "bool" },
      { internalType: "bool", name: "isFrozen", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveData",
    outputs: [
      { internalType: "uint256", name: "availableLiquidity", type: "uint256" },
      { internalType: "uint256", name: "totalStableDebt", type: "uint256" },
      { internalType: "uint256", name: "totalVariableDebt", type: "uint256" },
      { internalType: "uint256", name: "liquidityRate", type: "uint256" },
      { internalType: "uint256", name: "variableBorrowRate", type: "uint256" },
      { internalType: "uint256", name: "stableBorrowRate", type: "uint256" },
      {
        internalType: "uint256",
        name: "averageStableBorrowRate",
        type: "uint256",
      },
      { internalType: "uint256", name: "liquidityIndex", type: "uint256" },
      { internalType: "uint256", name: "variableBorrowIndex", type: "uint256" },
      { internalType: "uint40", name: "lastUpdateTimestamp", type: "uint40" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveTokensAddresses",
    outputs: [
      { internalType: "address", name: "aTokenAddress", type: "address" },
      {
        internalType: "address",
        name: "stableDebtTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "variableDebtTokenAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getUserReserveData",
    outputs: [
      {
        internalType: "uint256",
        name: "currentATokenBalance",
        type: "uint256",
      },
      { internalType: "uint256", name: "currentStableDebt", type: "uint256" },
      { internalType: "uint256", name: "currentVariableDebt", type: "uint256" },
      { internalType: "uint256", name: "principalStableDebt", type: "uint256" },
      { internalType: "uint256", name: "scaledVariableDebt", type: "uint256" },
      { internalType: "uint256", name: "stableBorrowRate", type: "uint256" },
      { internalType: "uint256", name: "liquidityRate", type: "uint256" },
      { internalType: "uint40", name: "stableRateLastUpdated", type: "uint40" },
      { internalType: "bool", name: "usageAsCollateralEnabled", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ORACLE_ABI = [
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getAssetPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address[]", name: "assets", type: "address[]" }],
    name: "getAssetsPrices",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
];

const {
  aaveProtocolDataProviderAddress,
  oracleAddress,
  account,
  update,
  onLoad,
  PoolAddressProvider,
  lendingPoolAddress,
  wethGateway,
  initConfig,
  loaded,
  multicallAddress,
} = props;

if (!aaveProtocolDataProviderAddress || !oracleAddress || !update || !account)
  return "";

const signer = Ethers.provider().getSigner();

const MULTICALL_ABI = [
  {
    inputs: [
      { internalType: "bool", name: "requireSuccess", type: "bool" },
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "bytes", name: "callData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "returnData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const multicallv2 = (abi, calls, options, onError) => {
  const { requireSuccess, ...overrides } = options || {};
  const itf = new ethers.utils.Interface(abi);
  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));

  const MulticallContract = new ethers.Contract(
    multicallAddress,
    MULTICALL_ABI,
    signer
  );
  return MulticallContract.callStatic
    .tryAggregate(requireSuccess || true, calldata, overrides)
    .then((res) => {
      return res.map((call, i) => {
        const [result, data] = call;
        return result && data !== "0x"
          ? itf.decodeFunctionResult(calls[i].name, data)
          : null;
      });
    })
    .catch((err) => {
      onError?.(err);
    });
};

const dataProviderContract = new ethers.Contract(
  aaveProtocolDataProviderAddress,
  aaveProtocolDataProviderAbi,
  signer
);

const getTokensPrices = () => {
  const oracleContract = new ethers.Contract(oracleAddress, ORACLE_ABI, signer);
  oracleContract.getAssetsPrices(Object.keys(Tokens)).then((res) => {
    const parsedRes = res.map((price, i) => {
      return Big(price.toString()).div(100000000).toFixed();
    });

    const tokensPrice = {};
    Object.keys(Tokens).forEach((address, index) => {
      tokensPrice[address] = parsedRes[index];
    });
    State.update({
      tokensPrice,
    });
  });
};

const getMarkets = () => {
  dataProviderContract.getAllReservesTokens().then((marketsRaw) => {
    const markets = marketsRaw.filter((market) => {
      const add = market[1];
      return Object.keys(Tokens)
        .map((t) => t.toLowerCase())
        .includes(add.toLowerCase());
    });

    State.update({
      markets: markets,
    });
  });
};

const formateTokenReserveData = (
  data,
  tokenAddress,
  symbol,
  price,
  aTokenAddress,
  variableDebtTokenAddress,
  loanToValue,
  userReserveParsed
) => {
  const [
    availableLiquidity,
    totalStableDebt,
    totalVariableDebt,
    liquidityRate,
    variableBorrowRate,
    stableBorrowRate,
    averageStableBorrowRate,
    liquidityIndex,
    variableBorrowIndex,
    lastUpdateTimestamp,
  ] = data;

  const decimalBig = Big(10).pow(Tokens[tokenAddress].decimals);

  const totalDebt = Big(totalStableDebt.toString())
    .plus(totalVariableDebt.toString())
    .div(decimalBig)
    .toFixed();

  const totalDebtRaw = Big(totalStableDebt.toString())
    .plus(totalVariableDebt.toString())
    .toFixed();

  const totalDeposit = Big(availableLiquidity.toString())
    .plus(totalDebtRaw)
    .div(decimalBig)
    .toFixed();

  const marketSize = Big(availableLiquidity.toString())
    .div(decimalBig)
    .toFixed();

  const Ray = Big(10).pow(27);

  const SECONDS_PER_YEAR = 31536000;

  const depositAPR = Big(liquidityRate).div(Ray);

  const variableBorrowAPR = Big(variableBorrowRate).div(Ray);

  const depositAPY0 = Big(1)
    .plus(depositAPR.div(Big(SECONDS_PER_YEAR)))
    .toNumber();

  const depositAPY = Big(
    100 * (Math.pow(depositAPY0, SECONDS_PER_YEAR) - 1)
  ).toFixed(2);

  const variableBorrowAPY0 = Big(1)
    .plus(Big(variableBorrowAPR).div(Big(SECONDS_PER_YEAR)))
    .toNumber();

  const variableBorrowAPYRaw = Big(
    100 * (Math.pow(variableBorrowAPY0, SECONDS_PER_YEAR) - 1)
  );

  const variableBorrowAPY = Big(
    100 * (Math.pow(variableBorrowAPY0, SECONDS_PER_YEAR) - 1)
  ).toFixed(2);

  const netApyBig = Big(depositAPY0).minus(variableBorrowAPYRaw);

  return {
    [tokenAddress]: {
      availableLiquidity,
      totalStableDebt,
      totalVariableDebt,
      totalBorrows: !price ? "-" : Big(totalDebt).toFixed(4),
      totalSupply: !price ? "-" : Big(totalDeposit).toFixed(4),
      liquidity: !price ? "-" : Big(marketSize).toFixed(4),
      liquidityRate,
      variableBorrowRate,
      stableBorrowRate,
      averageStableBorrowRate,
      liquidityIndex,
      variableBorrowIndex,
      lastUpdateTimestamp,
      tokenAddress,
      depositAPY,
      loanToValue,
      supplyApy: depositAPY + "%",
      variableBorrowAPY,
      borrowApy: variableBorrowAPY + "%",
      underlyingPrice: price,
      underlyingToken:
        tokenAddress.toLowerCase() === wethAddress.toLowerCase()
          ? native
          : Tokens[tokenAddress],
      dapp: initConfig.name,
      dappName: initConfig.name,
      address: tokenAddress,
      ...(tokenAddress.toLowerCase() === wethAddress.toLowerCase()
        ? native
        : Tokens[tokenAddress]),
      netApy: netApyBig.toFixed(),
      aTokenAddress,
      variableDebtTokenAddress,
      wethAddress,
      userReserveParsed,
    },
  };
};

const formatUserReserveData = (data, address) => {
  const underlyingAsset = Tokens[address];

  const scaledATokenBalance = Big(data[0].toString())
    .div(Big(10).pow(underlyingAsset.decimals))
    .toFixed();

  const scaledATokenBalanceUsd = Big(data[0].toString())
    .div(Big(10).pow(underlyingAsset.decimals))
    .times(state.tokensPrice[address])
    .toFixed();

  const aTokenBalance = Big(data[0].toString())
    .div(Big(10).pow(underlyingAsset.decimals))
    .toFixed();

  const usageAsCollateralEnabledOnUser = data[8];

  const scaledVariableDebt = Big(data[2].toString())
    .div(Big(10).pow(underlyingAsset.decimals))

    .toFixed();

  const scaledVariableDebtUsd = Big(data[2].toString())
    .div(Big(10).pow(underlyingAsset.decimals))
    .times(state.tokensPrice[address])
    .toFixed();

  const userReserveParsed = {
    address,
    underlyingAsset,
    scaledATokenBalanceUsd,
    scaledATokenBalance,
    usageAsCollateralEnabledOnUser,
    scaledVariableDebt,
    scaledVariableDebtUsd,
    aTokenBalance,
    userMerberShip: usageAsCollateralEnabledOnUser,
  };

  return userReserveParsed;
};

if (!state.tokensPrice) {
  getTokensPrices();
}

if (!state.markets && state.tokensPrice) {
  getMarkets();
}

if (
  state.markets &&
  Object.keys(state).length === 2 &&
  !state.userDataLoading
) {
  State.update({
    userDataLoading: true,
  });

  const userReserveDataCalls = state.markets.map((market) => {
    return {
      address: aaveProtocolDataProviderAddress,
      name: "getUserReserveData",
      params: [market[1], account],
    };
  });

  const tokenReserveDataCals = state.markets.map((market) => {
    return {
      address: aaveProtocolDataProviderAddress,
      name: "getReserveData",
      params: [market[1]],
    };
  });

  const reserveConfigurationDataCalls = state.markets
    .map((market) => {
      return [
        {
          address: aaveProtocolDataProviderAddress,
          name: "getReserveConfigurationData",
          params: [market[1]],
        },

        {
          address: aaveProtocolDataProviderAddress,
          name: "getReserveTokensAddresses",
          params: [market[1]],
        },
      ];
    })
    .flat();

  // get user reserve data
  multicallv2(aaveProtocolDataProviderAbi, userReserveDataCalls, {})
    .then((res) => {
      const userReserveParsedDataList = res.map((data, i) => {
        return formatUserReserveData(data, state.markets[i][1]);
      });
      return userReserveParsedDataList;
    })
    .then((userReserveParsedDataList) => {
      //  get configuration data
      multicallv2(
        aaveProtocolDataProviderAbi,
        reserveConfigurationDataCalls,
        {}
      )
        .then((res) => {
          const loanToValues = [];

          const aTokenAddressList = [];

          const variableDebtTokenAddressList = [];

          res.forEach((data, i) => {
            if (i % 2 == 0) {
              const loanToValue = Big(data[1].toString()).div(100).toNumber();
              loanToValues.push(loanToValue);
            }
          });

          res.forEach((data, i) => {
            if (i % 2 == 1) {
              const aTokenAddress = data[0];
              const variableDebtTokenAddress = data[2];
              aTokenAddressList.push(aTokenAddress);
              variableDebtTokenAddressList.push(variableDebtTokenAddress);
            }
          });

          return loanToValues.map((loanToValue, i) => {
            return {
              loanToValue,
              aTokenAddress: aTokenAddressList[i],
              variableDebtTokenAddress: variableDebtTokenAddressList[i],
            };
          });
        })
        .then((configurationList) => {
          multicallv2(
            aaveProtocolDataProviderAbi,
            tokenReserveDataCals,
            {}
          ).then((tokenReserveDataList) => {
            const formattedTokenReserveDataList = tokenReserveDataList.map(
              (data, index) => {
                return formateTokenReserveData(
                  data,

                  state.markets[index][1],
                  state.markets[index][0],
                  state.tokensPrice[state.markets[index][1]],
                  configurationList[index].aTokenAddress,
                  configurationList[index].variableDebtTokenAddress,
                  configurationList[index].loanToValue,
                  userReserveParsedDataList[index]
                );
              }
            );

            const toUpdateObj = {};

            formattedTokenReserveDataList.forEach((data) => {
              const address = Object.keys(data)[0];
              toUpdateObj[address] = data[address];
            });

            console.log("toUpdateObj: ", toUpdateObj);

            State.update(toUpdateObj);
          });
        });
    });
}

if (
  state.markets &&
  state.tokensPrice &&
  Object.keys(state).length === state.markets.length + 3
) {
  const { markets, tokensPrice, balances, userDataLoading, ...marketData } =
    state;

  const parsedData = [];

  Object.keys(marketData).forEach((address) => {
    const market = marketData[address];

    parsedData.push(market.userReserveParsed);
  });

  let userTotalSupplyUsd = Big(0);
  let userTotalBorrowUsd = Big(0);

  parsedData.forEach((data) => {
    userTotalSupplyUsd = userTotalSupplyUsd.plus(data.scaledATokenBalanceUsd);

    userTotalBorrowUsd = userTotalBorrowUsd.plus(data.scaledVariableDebtUsd);
  });

  State.update({
    userData: {
      userTotalSupplyUsd: userTotalSupplyUsd.toString(),
      userTotalBorrowUsd: userTotalBorrowUsd.toString(),
      parsedData,
    },
  });
}
if (
  state.userData &&
  state.markets &&
  Object.keys(state).length === state.markets.length + 4
) {
  const {
    markets,
    tokensPrice,
    balances,
    userData,
    userDataLoading,
    ...marketData
  } = state;

  userData.parsedData.forEach((d) => {
    const { address } = d;
    marketData[address].userMerberShip = d.userMerberShip;
  });

  let netApy = Big(0);

  userData.parsedData.forEach((d) => {
    const { address } = d;
    marketData[address] = {
      ...marketData[address],
      ...d,
      userSupply: d.scaledATokenBalance,
      userBorrow: d.scaledVariableDebt,
    };
  });

  let totalCollateralUsd = Big(0);

  Object.keys(marketData).forEach((address, i) => {
    const market = marketData[address];

    const { netApy: netApyRaw } = market;
    netApy = netApy.plus(netApyRaw);

    market.userUnderlyingBalance = market.aTokenBalance;

    market.lendingPoolAddress = lendingPoolAddress;

    market.wethGateway = wethGateway;

    market.address = market.aTokenAddress;

    if (userData.parsedData[i]) {
      const data = userData.parsedData[i];
      if (data.usageAsCollateralEnabledOnUser) {
        totalCollateralUsd = totalCollateralUsd
          .plus(data.scaledATokenBalanceUsd)
          .times(market.loanToValue / 100);
      }
    }
  });

  userData.totalCollateralUsd = totalCollateralUsd.toFixed();

  userData.netApy = netApy.toFixed(2);

  const parsedMarketData = {};

  Object.entries(marketData).map(([address, market]) => {
    parsedMarketData[market.aTokenAddress] = market;
  });

  onLoad({
    ...{ ...userData, ...props },
    markets: parsedMarketData,
    name: initConfig.name,
  });
}
