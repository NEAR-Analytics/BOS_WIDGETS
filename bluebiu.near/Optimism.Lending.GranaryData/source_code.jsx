const native = {
  address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  decimals: 18,
  symbol: "BNB",
  name: "BNB",
  description: "native",
  icon: "https://ipfs.near.social/ipfs/bafkreiaeq6ca67je5ocago6vk2efwxiqurxgemputx7p2nt6n2p3zo65xq",
};

const wethAddress = "null";

const Tokens = {
  "0x7F5c764cBc14f9669B88837ca1490cCa17c31607": {
    address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    decimals: 6,
    symbol: "USDC",
    name: "USDC",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58": {
    address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    decimals: 6,
    symbol: "USDT",
    name: "USDT",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },
  "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1": {
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimals: 18,
    symbol: "DAI",
    name: "DAI",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },

  "0x4200000000000000000000000000000000000042": {
    address: "0x4200000000000000000000000000000000000042",
    decimals: 18,
    symbol: "OP",
    name: "OP",
    icon: "https://ipfs.near.social/ipfs/bafkreiemkl7qtrrqnk5mexf7r4cr3mkznna6qvxrzhovlmt4djbkx366ae",
  },

  "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4": {
    address: "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4",
    decimals: 18,
    symbol: "SNX",
    name: "SNX",
    icon: "https://ipfs.near.social/ipfs/bafkreiblu4utwynt7ajvretbjzqtm2v7e7p2hkyyp7jamb742zkwpdzmu4",
  },

  "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9": {
    address: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
    decimals: 18,
    symbol: "sUSD",
    name: "sUSD",
    icon: "https://ipfs.near.social/ipfs/bafkreiaum6qcvs7gqjwfmbfoh5dde244fqd6bji4id5wlyn6q5e3vvsorm",
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

const REWARD_ABI = [
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "claimAllRewards",
    outputs: [
      {
        internalType: "address[]",
        name: "rewardTokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "claimedAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
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
  rewardAddress,
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

const markets = Object.values(Tokens).map((market) => [
  market.symbol,
  market.address,
]);

const RewardToken = {
  "0xFdb794692724153d1488CcdBE0C56c252596735F": {
    symbol: "LDO",
    address: "0xFdb794692724153d1488CcdBE0C56c252596735F",
    decimals: 18,
    name: "Lido DAO Token",
    icon: "https://ipfs.near.social/ipfs/bafkreifnahaufauepdznq7qvkkkt5pmchzl4qx3a3orhbusw2lnjvfvecu",
    coingeckoId: "lido-dao",
  },
  "0x39FdE572a18448F8139b7788099F0a0740f51205": {
    symbol: "OATH",
    address: "0x39FdE572a18448F8139b7788099F0a0740f51205",
    decimals: 18,
    name: "Oath Token",
    icon: "https://ipfs.near.social/ipfs/bafkreibhxoenia7th5yoecfvb5pcypq44yx2qwtuiigjzobotmpdabfmna",
    coingeckoId: "oath",
  },
  "0xfD389Dc9533717239856190F42475d3f263a270d": {
    symbol: "GRAIN",
    address: "0xfD389Dc9533717239856190F42475d3f263a270d",
    decimals: 18,
    name: "Granary Token",
    icon: "https://ipfs.near.social/ipfs/bafkreihovftnvueysjuj7wansa74k3bgtfs4hkip4bgdvguh6nhehkvg5e",
    coingeckoId: "granary",
  },
  "0x4200000000000000000000000000000000000042": {
    symbol: "OP",
    address: "0x4200000000000000000000000000000000000042",
    decimals: 18,
    name: "Optimism",
    icon: "https://ipfs.near.social/ipfs/bafkreiemkl7qtrrqnk5mexf7r4cr3mkznna6qvxrzhovlmt4djbkx366ae",
    coingeckoId: "optimism",
  },
};

let _tokensPrice = {};
let _marketsData = {};
let _userRewards = {};

const getTokensPrices = () => {
  const oracleContract = new ethers.Contract(oracleAddress, ORACLE_ABI, signer);
  oracleContract.getAssetsPrices(Object.keys(Tokens)).then((res) => {
    const parsedRes = res.map((price, i) => {
      return Big(price.toString()).div(100000000).toFixed();
    });

    Object.keys(Tokens).forEach((address, index) => {
      _tokensPrice[address] = parsedRes[index];
    });
    getMarketsData();
  });
};

const getMarketsData = () => {
  const userReserveDataCalls = markets.map((market) => {
    return {
      address: aaveProtocolDataProviderAddress,
      name: "getUserReserveData",
      params: [market[1], account],
    };
  });

  const tokenReserveDataCals = markets.map((market) => {
    return {
      address: aaveProtocolDataProviderAddress,
      name: "getReserveData",
      params: [market[1]],
    };
  });

  const reserveConfigurationDataCalls = markets
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
        return formatUserReserveData(data, markets[i][1]);
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

                  markets[index][1],
                  markets[index][0],
                  _tokensPrice[markets[index][1]],
                  configurationList[index].aTokenAddress,
                  configurationList[index].variableDebtTokenAddress,
                  configurationList[index].loanToValue,
                  userReserveParsedDataList[index]
                );
              }
            );
            getUserRewards();
          });
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
  _marketsData[tokenAddress] = {
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
  };
};

const formatUserReserveData = (data, address) => {
  const underlyingAsset = Tokens[address];

  const scaledATokenBalance = Big(data[0].toString())
    .div(Big(10).pow(underlyingAsset.decimals))
    .toFixed();

  const scaledATokenBalanceUsd = Big(data[0].toString())
    .div(Big(10).pow(underlyingAsset.decimals))
    .times(_tokensPrice[address])
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
    .times(_tokensPrice[address])
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

const getUserRewards = () => {
  const aTokens = Object.values(_marketsData).map(
    (market) => market.aTokenAddress
  );
  const RewardContract = new ethers.Contract(rewardAddress, REWARD_ABI, signer);
  RewardContract.callStatic.claimAllRewards(aTokens, account).then((res) => {
    const tokens = res[0];
    const amounts = res[1];
    const coins = Object.values(RewardToken).map((token) => token.coingeckoId);
    const pricesUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(
      ","
    )}&vs_currencies=usd`;
    asyncFetch(pricesUrl).then((res) => {
      if (!res.ok) return;
      const prices = {};
      coins.forEach((coin) => (prices[coin] = res.body[coin].usd));
      tokens.forEach((token, i) => {
        _userRewards[token] = {
          amount: ethers.utils.formatUnits(
            amounts[i],
            RewardToken[token].decimals
          ),
          price: prices[RewardToken[token].coingeckoId],
        };
      });
      formateData();
    });
  });
};

const formateData = () => {
  const parsedData = [];

  Object.keys(_marketsData).forEach((address) => {
    const market = _marketsData[address];

    parsedData.push(market.userReserveParsed);
  });

  let userTotalSupplyUsd = Big(0);
  let userTotalBorrowUsd = Big(0);

  parsedData.forEach((data) => {
    userTotalSupplyUsd = userTotalSupplyUsd.plus(data.scaledATokenBalanceUsd);
    userTotalBorrowUsd = userTotalBorrowUsd.plus(data.scaledVariableDebtUsd);
  });

  const userData = {
    userTotalSupplyUsd: userTotalSupplyUsd.toString(),
    userTotalBorrowUsd: userTotalBorrowUsd.toString(),
    parsedData,
  };

  userData.parsedData.forEach((d) => {
    const { address } = d;
    _marketsData[address].userMerberShip = d.userMerberShip;
  });

  let netApy = Big(0);

  userData.parsedData.forEach((d) => {
    const { address } = d;
    _marketsData[address] = {
      ..._marketsData[address],
      ...d,
      userSupply: d.scaledATokenBalance,
      userBorrow: d.scaledVariableDebt,
    };
  });

  let totalCollateralUsd = Big(0);
  const aTokenAddress = [];
  Object.keys(_marketsData).forEach((address, i) => {
    const market = _marketsData[address];

    const { netApy: netApyRaw } = market;
    netApy = netApy.plus(netApyRaw);

    market.userUnderlyingBalance = market.aTokenBalance;

    market.lendingPoolAddress = lendingPoolAddress;

    market.wethGateway = wethGateway;

    aTokenAddress.push(market.aTokenAddress);

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

  Object.entries(_marketsData).map(([address, market]) => {
    parsedMarketData[market.aTokenAddress] = market;
  });

  const rewards = [];
  Object.values(RewardToken).forEach((rewardToken) => {
    const reward = _userRewards[rewardToken.address];
    if (Big(reward.amount).gt(0)) {
      rewards.push({
        ...rewardToken,
        price: reward.price,
        unclaimed: reward.amount,
        allPools: aTokenAddress,
      });
    }
  });
  console.log("parsedMarketData", parsedMarketData);
  onLoad({
    ...{ ...userData, ...props },
    markets: parsedMarketData,
    name: initConfig.name,
    rewards,
  });
};

useEffect(() => {
  getTokensPrices();
}, []);
