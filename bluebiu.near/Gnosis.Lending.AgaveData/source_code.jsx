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

if ((!update || !account) && !state.tokensPrice) return "";

const native = {
  address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  decimals: 18,
  symbol: "BNB",
  name: "BNB",
  description: "native",
  icon: "https://ipfs.near.social/ipfs/bafkreiaeq6ca67je5ocago6vk2efwxiqurxgemputx7p2nt6n2p3zo65xq",
};

const wethAddress = "null";

const RewardToken = {
  symbol: "40AGVE-60GNO",
  address: "0x870Bb2C024513B5c9A69894dCc65fB5c47e422f3",
  decimals: 18,
  name: "40AGVE-60GNO",
  icon: "https://ipfs.near.social/ipfs/bafkreicbv62kdvlpycujxhzjtfwjmxuavxmwrsi22cqlrgtmmeqs7eoeoe",
};

const Tokens = {
  "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb": {
    address: "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb",
    decimals: 18,
    symbol: "GNO",
    name: "WEGNOTH",
    icon: "https://ipfs.near.social/ipfs/bafkreicldmi7glc46rvi5qhfvcvdwgr5ove3jwrrs7pfjluhgynbt74d3q",
  },

  "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1": {
    address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    decimals: 18,
    symbol: "WETH",
    name: "WETH",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d": {
    address: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
    decimals: 18,
    symbol: "WXDAI",
    name: "Wrapped XDAI",
    icon: "https://ipfs.near.social/ipfs/bafkreieu6n7cav63nwjj5klcsxrk26eo5pqkc4u7xzfle2bjgi5ijm7ipe",
  },

  "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83": {
    address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    decimals: 6,
    symbol: "USDC",
    name: "USDC",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252": {
    address: "0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC on xDai",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  "0x4ECaBa5870353805a9F068101A40E0f32ed605C6": {
    address: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD on xDai",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0xcB444e90D8198415266c6a2724b7900fb12FC56E": {
    address: "0xcB444e90D8198415266c6a2724b7900fb12FC56E",
    decimals: 18,
    symbol: "EURe",
    name: "EURe",
    icon: "https://ipfs.near.social/ipfs/bafkreifdn5sk46celyzbg2eylvowg7i2ts2wasf6niylmyyvo5sd5lmsp4",
  },

  "0x6C76971f98945AE98dD7d4DFcA8711ebea946eA6": {
    address: "0x6C76971f98945AE98dD7d4DFcA8711ebea946eA6",
    decimals: 18,
    symbol: "wstETH",
    name: "wstETH",
    icon: "https://ipfs.near.social/ipfs/bafkreibukwahpp2ei74ax5acm6p7uwcnbsfvdzkizsdzqu26yfbxndpvra",
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
  oracleContract
    .getAssetsPrices(Object.keys(Tokens))
    .then((res) => {
      const parsedRes = res.map((price, i) => {
        return Big(price.toString()).div(1000000000000000000).toFixed();
      });

      const tokensPrice = {};
      Object.keys(Tokens).forEach((address, index) => {
        tokensPrice[address] = parsedRes[index];
      });

      console.log("tokensPrice: ", tokensPrice);

      State.update({
        tokensPrice,
      });
    })
    .catch((e) => {
      console.log(e, "ee");
    });
};

const getMarkets = () => {
  dataProviderContract.getAllReservesTokens().then((marketsRaw) => {
    console.log("marketsRaw: ", marketsRaw);
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
  userReserveParsed
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
      const scaledATokenBalanceUsd = Big(data[0].toString())
        .div(Big(10).pow(underlyingAsset.decimals))
        .times(state.tokensPrice[address])
        .toFixed(4);

      const aTokenBalance = Big(data[0].toString())
        .div(Big(10).pow(underlyingAsset.decimals))
        .toFixed();

      const usageAsCollateralEnabledOnUser = data[8];

      const scaledVariableDebt = Big(data[4].toString())
        .div(Big(10).pow(underlyingAsset.decimals))
        .times(state.tokensPrice[address])
        .toFixed(4);

      const userReserveParsed = {
        address,
        underlyingAsset,
        scaledATokenBalanceUsd,
        usageAsCollateralEnabledOnUser,
        scaledVariableDebt,
        aTokenBalance,
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

          getUserReverveData(market)
            .then((userReserveParsed) => {
              getTokenReserveData(
                address,
                symbol,
                tokensPrice[address],
                aTokenAddress,
                variableDebtTokenAddress,
                loanToValue,
                userReserveParsed
              );
            })
            .catch((e) => {
              console.log("e", e);
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
      totalCollateralUsd = totalCollateralUsd.plus(data.scaledATokenBalanceUsd);
    }

    userTotalSupplyUsd = userTotalSupplyUsd.plus(data.scaledATokenBalanceUsd);

    userTotalBorrowUsd = userTotalBorrowUsd.plus(data.scaledVariableDebt);
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

  let netApy = Big(0);

  userData.parsedData.forEach((d) => {
    const { address } = d;
    marketData[address] = {
      ...marketData[address],
      ...d,
      userSupply: d.scaledATokenBalanceUsd,
      userBorrow: d.scaledVariableDebt,
    };
  });

  Object.keys(marketData).forEach((address) => {
    const market = marketData[address];

    const { netApy: netApyRaw } = market;
    netApy = netApy.plus(netApyRaw);

    market.userUnderlyingBalance = market.aTokenBalance;

    market.lendingPoolAddress = lendingPoolAddress;

    market.wethGateway = wethGateway;

    market.address = market.aTokenAddress;
  });

  userData.netApy = netApy.toFixed(2);

  const parsedMarketData = {};

  Object.entries(marketData).map(([address, market]) => {
    parsedMarketData[market.aTokenAddress] = market;
  });

  console.log("parsedMarketData: ", parsedMarketData);

  onLoad({
    ...{ ...userData, ...props },
    markets: parsedMarketData,
    name: initConfig.name,
  });
}

[
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "rewardToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "emissionManager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "emission",
        type: "uint256",
      },
    ],
    name: "AssetConfigUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "AssetIndexUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newBulkClaimer",
        type: "address",
      },
    ],
    name: "BulkClaimerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
    ],
    name: "ClaimerSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newDistributionEnd",
        type: "uint256",
      },
    ],
    name: "DistributionEndUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "RewardTokenUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsAccrued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    name: "RewardsVaultUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "UserIndexUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "BULK_CLAIMER",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DISTRIBUTION_END",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EMISSION_MANAGER",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PRECISION",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PROXY_ADMIN",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVISION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_TOKEN",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "assets",
    outputs: [
      {
        internalType: "uint104",
        name: "emissionPerSecond",
        type: "uint104",
      },
      {
        internalType: "uint104",
        name: "index",
        type: "uint104",
      },
      {
        internalType: "uint40",
        name: "lastUpdateTimestamp",
        type: "uint40",
      },
      {
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "disabled",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "bulkClaimRewardsOnBehalf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "claimRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "claimRewardsOnBehalf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "emissionsPerSecond",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "assetDecimals",
        type: "uint256[]",
      },
    ],
    name: "configureAssets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
    ],
    name: "disableAssets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "getAssetData",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getClaimer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDistributionEnd",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getRewardsBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardsVault",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "getUserAssetData",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserUnclaimedRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "userBalance",
        type: "uint256",
      },
    ],
    name: "handleAction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "rewardsVault",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "newRewardTokenAdjustmentAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "newRewardTokenAdjustmentMultiplier",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "bulkClaimer",
        type: "address",
      },
    ],
    name: "setBulkClaimer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "setClaimer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "distributionEnd",
        type: "uint256",
      },
    ],
    name: "setDistributionEnd",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "rewardToken",
        type: "address",
      },
    ],
    name: "setRewardToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "RewardTokenAdjustmentMultiplier",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "RewardTokenAdjustmentAmount",
        type: "uint256",
      },
    ],
    name: "setRewardTokenAdjustment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "rewardsVault",
        type: "address",
      },
    ],
    name: "setRewardsVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
