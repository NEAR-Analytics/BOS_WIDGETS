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
  "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111": {
    address: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
    decimals: 18,
    symbol: "WETH",
    name: "WETH",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8": {
    address: "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
    decimals: 18,
    symbol: "WMNT",
    name: "WMNT",
    icon: "https://ipfs.near.social/ipfs/bafkreiboetskbxmub4djn3j73aj7tawfpqnh4sf3adhdghsnfo55cz5h24",
  },

  "0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2": {
    address: "0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2",
    decimals: 8,
    symbol: "WBTC",
    name: "WBTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE": {
    address: "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",
    decimals: 6,
    symbol: "USDT",
    name: "USDT",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9": {
    address: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
    decimals: 6,
    symbol: "USDC",
    name: "USDC",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
};

const RewardToken = {
  symbol: "LEND",
  address: "0x25356aeca4210ef7553140edb9b8026089e49396",
  decimals: 18,
  name: "LEND",
  icon: "https://ipfs.near.social/ipfs/bafkreig36gyyl6bv2s6f5c2kq22x4omgaclfzyf5ifvjmsxl55svptlq3e",
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
} = props;

const { incentiveController } = initConfig;

if ((!update || !account) && !state.tokensPrice) return "";

let rewardPrice = "0";
const _yearRewards = Storage.privateGet("yearRewards") || {};

const rndtPriceData = fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=lendle&vs_currencies=usd"
);

if (rndtPriceData) {
  const data = rndtPriceData.body || [];

  rewardPrice = data["lendle"].usd;
}

const getUserRewards = (aTokenAddress) => {
  const incentiveControllerAbi = [
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        { type: "uint256", name: "amount", internalType: "uint256" },
        { type: "uint256", name: "rewardDebt", internalType: "uint256" },
      ],
      name: "userInfo",
      inputs: [
        { type: "address", name: "", internalType: "address" },
        { type: "address", name: "", internalType: "address" },
      ],
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
        {
          internalType: "address[]",
          name: "_tokens",
          type: "address[]",
        },
      ],
      name: "claimableReward",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "poolInfo",
      outputs: [
        { internalType: "uint256", name: "totalSupply", type: "uint256" },
        { internalType: "uint256", name: "allocPoint", type: "uint256" },
        { internalType: "uint256", name: "lastRewardTime", type: "uint256" },
        { internalType: "uint256", name: "accRewardPerShare", type: "uint256" },
        {
          internalType: "contract IOnwardIncentivesController",
          name: "onwardIncentives",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalAllocPoint",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "rewardsPerSecond",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },

    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "poolLength",
      inputs: [],
    },
  ];

  const incentiveControllerContract = new ethers.Contract(
    incentiveController,
    incentiveControllerAbi,
    Ethers.provider().getSigner()
  );

  const ACC_REWARD_PRECISION = Big(10).pow(12);

  return incentiveControllerContract
    .totalAllocPoint()
    .then((res) => {
      return res.toString();
    })
    .then((totalAllocPoint) => {
      return incentiveControllerContract
        .rewardsPerSecond()
        .then((res) => {
          const rewardsPerSecond = res.toString();

          return {
            totalAllocPoint,
            rewardsPerSecond,
          };
        })
        .then(({ totalAllocPoint, rewardsPerSecond }) => {
          return incentiveControllerContract
            .poolInfo(aTokenAddress)
            .then((res) => {
              const totalSupply = res[0].toString();
              const allocPoint = res[1].toString();

              const dailyRewardToThisPool = Big(60 * 60 * 24)
                .times(rewardsPerSecond)
                .times(allocPoint)
                .div(totalAllocPoint);

              const rewardPerShareThisPool = dailyRewardToThisPool
                .mul(ACC_REWARD_PRECISION)
                .div(totalSupply)
                .toFixed();

              _yearRewards[aTokenAddress] = Big(60 * 60 * 24 * 365)
                .times(rewardsPerSecond)
                .times(allocPoint)
                .div(totalAllocPoint)
                .div(Big(10).pow(18))
                .toString();

              Storage.privateSet("yearRewards", _yearRewards);
              return rewardPerShareThisPool;
            })
            .then((rewardPerShareThisPool) => {
              return incentiveControllerContract
                .userInfo(aTokenAddress, account)
                .then((res) => {
                  const amount = res[0].toString();

                  const userDailyReward = Big(rewardPerShareThisPool)
                    .times(Big(amount))
                    .div(ACC_REWARD_PRECISION)
                    .toFixed();

                  return userDailyReward;
                })
                .then((userDailyReward) => {
                  if (Big(userDailyReward).eq(0)) return undefined;

                  return incentiveControllerContract
                    .claimableReward(account, [aTokenAddress])
                    .then((res) => {
                      const unclaimed = res[0].toString();

                      if (Big(unclaimed).eq(0)) return undefined;

                      const dailyRewards = Big(userDailyReward)
                        .div(Big(10).pow(RewardToken.decimals))
                        .toFixed();

                      return {
                        ...RewardToken,
                        unclaimed: Big(unclaimed)
                          .div(Big(10).pow(RewardToken.decimals))
                          .toFixed(),
                        price: rewardPrice,
                        dailyRewards,
                        rewardAddress: aTokenAddress,
                      };
                    });
                });
            });
        });
    })
    .catch(() => {
      return undefined;
    });
};

const dataProviderContract = new ethers.Contract(
  aaveProtocolDataProviderAddress,
  aaveProtocolDataProviderAbi,
  Ethers.provider().getSigner()
);

const getTokensPrices = () => {
  const oracleContract = new ethers.Contract(
    oracleAddress,
    ORACLE_ABI,
    Ethers.provider().getSigner()
  );
  oracleContract.getAssetsPrices(Object.keys(Tokens)).then((res) => {
    const parsedRes = res.map((price, i) => {
      return Big(price.toString()).div(1000000000000000000).toFixed();
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

const getTokenReserveData = (
  tokenAddress,
  symbol,
  price,
  aTokenAddress,
  variableDebtTokenAddress,
  loanToValue,
  userReserveParsed,
  rewards
) => {
  dataProviderContract.getReserveData(tokenAddress).then((data) => {
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

    State.update({
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
        rewards,
      },
    });
  });
};

const getUserReverveData = (market) => {
  const address = market[1];

  return dataProviderContract
    .getUserReserveData(address, account)
    .then((data) => {
      const underlyingAsset = Tokens[address];
      const userSupply = Big(data[0].toString()).div(
        Big(10).pow(underlyingAsset.decimals)
      );
      const scaledATokenBalanceUsd = userSupply
        .times(state.tokensPrice[address])
        .toFixed(4);

      const aTokenBalance = Big(data[0].toString())
        .div(Big(10).pow(underlyingAsset.decimals))
        .toFixed();

      const usageAsCollateralEnabledOnUser = data[8];

      const scaledVariableDebt = Big(data[2].toString())
        .div(Big(10).pow(underlyingAsset.decimals))

        .toFixed(4);

      const scaledVariableDebtUsd = Big(data[2].toString())
        .div(Big(10).pow(underlyingAsset.decimals))
        .times(state.tokensPrice[address])
        .toFixed(4);

      const userReserveParsed = {
        address,
        underlyingAsset,
        scaledATokenBalanceUsd,
        userSupply: userSupply.toFixed(4),
        usageAsCollateralEnabledOnUser,
        scaledVariableDebt,
        scaledVariableDebtUsd,
        aTokenBalance,
        userMerberShip: usageAsCollateralEnabledOnUser,
      };

      return userReserveParsed;
    });
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

  state.markets.forEach((market) => {
    const [symbol, address] = market;

    const tokensPrice = state.tokensPrice;

    dataProviderContract
      .getReserveConfigurationData(address)
      .then((res) => {
        const loanToValue = Big(res[1].toString()).div(100).toNumber();

        return loanToValue;
      })
      .then((loanToValue) => {
        dataProviderContract.getReserveTokensAddresses(address).then((data) => {
          const aTokenAddress = data[0];
          const variableDebtTokenAddress = data[2];
          getUserRewards(aTokenAddress, signer)
            .then((res) => {
              return res;
            })
            .then((atokenReward) => {
              return getUserRewards(variableDebtTokenAddress, signer).then(
                (variableDebtTokenReward) => {
                  if (!atokenReward) return variableDebtTokenReward;
                  else if (atokenReward && !variableDebtTokenReward)
                    return atokenReward;
                  else {
                    return {
                      ...atokenReward,
                      unclaimed: Big(atokenReward.unclaimed)
                        .plus(variableDebtTokenReward.unclaimed)
                        .toFixed(),
                      dailyRewards: Big(atokenReward.dailyRewards)
                        .plus(variableDebtTokenReward.dailyRewards)
                        .toFixed(),
                    };
                  }
                }
              );
            })
            .then((rawRewards) => {
              const rewards = !rawRewards ? undefined : [rawRewards];

              getUserReverveData(market).then((userReserveParsed) => {
                getTokenReserveData(
                  address,
                  symbol,
                  tokensPrice[address],
                  aTokenAddress,
                  variableDebtTokenAddress,
                  loanToValue,
                  userReserveParsed,
                  rewards
                );
              });
            });
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
  let totalCollateralUsd = Big(0);
  parsedData.forEach((data) => {
    if (data.usageAsCollateralEnabledOnUser) {
      const loanToValue = marketData[data.address].loanToValue;
      totalCollateralUsd = totalCollateralUsd.plus(
        Big(data.scaledATokenBalanceUsd).mul(loanToValue / 100)
      );
    }

    userTotalSupplyUsd = userTotalSupplyUsd.plus(data.scaledATokenBalanceUsd);

    userTotalBorrowUsd = userTotalBorrowUsd.plus(data.scaledVariableDebtUsd);
  });

  State.update({
    userData: {
      userTotalSupplyUsd: userTotalSupplyUsd.toString(),
      userTotalBorrowUsd: userTotalBorrowUsd.toString(),
      totalCollateralUsd: totalCollateralUsd.toString(),
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
      userSupply: d.userSupply,
      userBorrow: d.scaledVariableDebt,
    };
  });

  let reduceUnclaimed = Big(0);

  let reduceDailyRewards = Big(0);

  const allPools = [];
  Object.keys(marketData).forEach((address) => {
    const market = marketData[address];
    if (market.rewards) {
      const unclaimed = market.rewards[0].unclaimed;
      const dailyRewards = market.rewards[0].dailyRewards;

      reduceUnclaimed = reduceUnclaimed.plus(Big(unclaimed || 0));

      reduceDailyRewards = reduceDailyRewards.plus(Big(dailyRewards || 0));
    }

    market.rewards = undefined;

    market.distributionApy = [
      {
        ...RewardToken,
        supply:
          Big(_yearRewards[market.aTokenAddress])
            .mul(rewardPrice)
            .div(market.totalSupply)
            .div(market.underlyingPrice)
            .mul(100)
            .toFixed(2) + "%",
        borrow:
          Big(_yearRewards[market.aTokenAddress])
            .mul(rewardPrice)
            .div(market.totalBorrows)
            .div(market.underlyingPrice)
            .mul(100)
            .toFixed(2) + "%",
      },
    ];

    const { netApy: netApyRaw } = market;
    netApy = netApy.plus(netApyRaw);

    market.userUnderlyingBalance = market.aTokenBalance;

    market.lendingPoolAddress = lendingPoolAddress;

    market.wethGateway = wethGateway;

    market.address = market.aTokenAddress;

    allPools.push(market.aTokenAddress);
  });

  userData.netApy = netApy.toFixed(2);

  const parsedMarketData = {};

  Object.entries(marketData).map(([address, market], index) => {
    parsedMarketData[market.aTokenAddress] = market;

    if (index === 0 && reduceUnclaimed.gt(0)) {
      market.rewards = [
        {
          ...RewardToken,
          unclaimed: reduceUnclaimed.toFixed(),
          dailyRewards: reduceDailyRewards.toFixed(),
          price: rewardPrice,
        },
      ];
    }
  });
  const rewards = [
    {
      ...RewardToken,
      dailyRewards: reduceDailyRewards.lt(0.000001)
        ? "0.000001"
        : reduceDailyRewards.toString(),
      price: rewardPrice,
      unclaimed: reduceUnclaimed.toString(),
      allPools,
    },
  ];
  onLoad({
    ...{ ...userData, ...props },
    rewards,
    markets: parsedMarketData,
    name: initConfig.name,
  });
}
