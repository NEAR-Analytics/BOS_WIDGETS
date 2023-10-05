const native = {
  address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  decimals: 18,
  symbol: "BNB",
  name: "BNB",
  description: "native",
  icon: "https://ipfs.near.social/ipfs/bafkreiaeq6ca67je5ocago6vk2efwxiqurxgemputx7p2nt6n2p3zo65xq",
};

const wethAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

const Tokens = {
  "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c": {
    address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    decimals: 18,
    symbol: "BTCB",
    name: "BTCB",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": {
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    decimals: 18,
    symbol: "WBNB",
    name: "WBNB",
    icon: "https://ipfs.near.social/ipfs/bafkreiev2yrk7g4ugo3aytnqydxvtwlfw7ycxrxhk7ph6k2334z7djqd3e",
  },
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56": {
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    decimals: 18,
    symbol: "BUSD",
    name: "BUSD",
    icon: "https://ipfs.near.social/ipfs/bafkreibp36dfkfjzgnnbb7u4jxh57gpjmfjerc6pefmyzhueulz5ovd5xy",
  },
  "0x55d398326f99059fF775485246999027B3197955": {
    address: "0x55d398326f99059fF775485246999027B3197955",
    decimals: 18,
    symbol: "USDT",
    name: "USDT",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d": {
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    decimals: 18,
    symbol: "USDC",
    name: "USDC",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8": {
    address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    decimals: 18,
    symbol: "ETH",
    name: "ETH",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },
};

const RDNTToken = {
  symbol: "RDNT",
  address: "0xf7DE7E8A6bd59ED41a4b5fe50278b3B7f31384dF",
  decimals: 18,
  name: "Radiant",
  icon: "https://ipfs.near.social/ipfs/bafkreiboaplfrmdlyxumajlxnipkk4viu6pxqow7ue2ixlimgkenre2gru",
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
  uiPoolDataProviderAddress,
  account,
  update,
  onLoad,
  PoolAddressProvider,
  walletBalanceProvider,
  lendingPoolAddress,
  wethGateway,
  initConfig,
  loaded,
} = props;

const { incentiveController } = initConfig;

if (
  !aaveProtocolDataProviderAddress ||
  !oracleAddress ||
  !update ||
  !account ||
  !uiPoolDataProviderAddress
)
  return "";

const signer = Ethers.provider().getSigner();

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

const getUserWalletBalances = () => {
  const walletBalanceProviderContract = new ethers.Contract(
    walletBalanceProvider,
    [
      {
        inputs: [
          { internalType: "address", name: "provider", type: "address" },
          { internalType: "address", name: "user", type: "address" },
        ],
        name: "getUserWalletBalances",
        outputs: [
          { internalType: "address[]", name: "", type: "address[]" },
          { internalType: "uint256[]", name: "", type: "uint256[]" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    signer
  );

  const balances = {};

  walletBalanceProviderContract
    .getUserWalletBalances(PoolAddressProvider, account)
    .then((res) => {
      const addresses = res[0];
      const values = res[1];

      values.forEach((value, index) => {
        const parsedValue = Big(value.toString())
          .div(Big(10).pow(Tokens[addresses[index]]?.decimals || 18))
          .toFixed();

        balances[addresses[index]] = parsedValue;
      });

      State.update({
        balances,
      });
    });
};

if (!state.balances) {
  getUserWalletBalances();
}

let rndtPrice = "0";

const rndtPriceData = fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=radiant&vs_currencies=usd"
);

if (rndtPriceData) {
  const data = rndtPriceData.body || [];

  rndtPrice = data["radiant"].usd;
}

const getUserRewards = (aTokenAddress) => {
  const incentiveControllerAbi = [
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "userInfo",
      outputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "rewardDebt", type: "uint256" },
        { internalType: "uint256", name: "enterTime", type: "uint256" },
        { internalType: "uint256", name: "lastClaimTime", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_user", type: "address" },
        { internalType: "address[]", name: "_tokens", type: "address[]" },
      ],
      name: "pendingRewards",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
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
  ];

  const incentiveControllerContract = new ethers.Contract(
    incentiveController,
    incentiveControllerAbi,
    signer
  );

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
              console.log("totalSupply: ", totalSupply, allocPoint);

              const dailyRewardToThisPool = Big(60 * 60 * 24)
                .times(rewardsPerSecond)
                .times(allocPoint)
                .div(totalAllocPoint);

              const rewardPerShareThisPool = dailyRewardToThisPool
                .div(totalSupply)
                .toFixed(0);

              return rewardPerShareThisPool;
            })
            .then((rewardPerShareThisPool) => {
              console.log(
                "rewardPerShareThisPool: ",
                rewardPerShareThisPool,
                aTokenAddress,
                account
              );
              return incentiveControllerContract
                .userInfo(aTokenAddress, account)
                .then((res) => {
                  const amount = res[0].toString();

                  const userDailyReward = Big(rewardPerShareThisPool)
                    .times(Big(amount))
                    .toFixed();

                  return userDailyReward;
                })
                .then((userDailyReward) => {
                  if (Big(userDailyReward).eq(0)) return undefined;

                  return incentiveControllerContract
                    .pendingRewards(account, [aTokenAddress])
                    .then((res) => {
                      const unclaimed = res[0].toString();

                      if (Big(unclaimed).eq(0)) return undefined;

                      const dailyRewards = Big(userDailyReward)
                        .div(Big(10).pow(RDNTToken.decimals))
                        .toFixed();

                      return {
                        ...RDNTToken,
                        rewardTokenAddress: RDNTToken.address,
                        unclaimed: Big(unclaimed)
                          .div(Big(10).pow(RDNTToken.decimals))
                          .toFixed(),
                        price: rndtPrice,
                        dailyRewards,
                        aTokenAddress,
                      };
                    });
                })
                .catch((e) => {
                  return undefined;
                });
            });
        });
    });
};

const getMarkets = () => {
  const dataProviderContract = new ethers.Contract(
    aaveProtocolDataProviderAddress,
    aaveProtocolDataProviderAbi,
    signer
  );

  dataProviderContract.getAllReservesTokens().then((markets) => {
    State.update({
      markets,
    });
    markets.forEach((token) => {
      const [symbol, address] = token;

      const tokensPrice = state.tokensPrice;

      dataProviderContract
        .getReserveConfigurationData(address)
        .then((res) => {
          const loanToValue = Big(res[1].toString()).div(100).toNumber();

          return loanToValue;
        })
        .then((loanToValue) => {
          dataProviderContract
            .getReserveTokensAddresses(address)
            .then((data) => {
              const aTokenAddress = data[0];
              const variableDebtTokenAddress = data[2];
              getUserRewards(aTokenAddress, signer).then((res) => {
                const rewards = !res ? undefined : [res];
                getTokenReserveData(
                  address,
                  symbol,
                  tokensPrice[address],
                  aTokenAddress,
                  variableDebtTokenAddress,
                  loanToValue,
                  rewards
                );
              });
            });
        });
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
  rewards
) => {
  const dataProviderContract = new ethers.Contract(
    aaveProtocolDataProviderAddress,
    aaveProtocolDataProviderAbi,
    signer
  );

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
        rewards,
        underlyingToken:
          tokenAddress.toLowerCase() === wethAddress.toLowerCase()
            ? native
            : Tokens[tokenAddress],
        dapp: "Radiant",
        dappName: "Radiant",
        address: tokenAddress,
        ...(tokenAddress.toLowerCase() === wethAddress.toLowerCase()
          ? native
          : Tokens[tokenAddress]),
        userUnderlyingBalance: state.balances[tokenAddress],
        netApy: netApyBig.toFixed(),
        aTokenAddress,
        variableDebtTokenAddress,
        wethAddress,
      },
    });
  });
};

const getUserRevervesData = () => {
  const abi = [
    {
      inputs: [
        {
          internalType: "contract ILendingPoolAddressesProvider",
          name: "provider",
          type: "address",
        },
        { internalType: "address", name: "user", type: "address" },
      ],
      name: "getUserReservesData",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "underlyingAsset",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "scaledATokenBalance",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "usageAsCollateralEnabledOnUser",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "stableBorrowRate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "scaledVariableDebt",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "principalStableDebt",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "stableBorrowLastUpdateTimestamp",
              type: "uint256",
            },
          ],
          internalType: "struct IUiPoolDataProviderV3.UserReserveData[]",
          name: "",
          type: "tuple[]",
        },
        { internalType: "uint8", name: "", type: "uint8" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const contract = new ethers.Contract(uiPoolDataProviderAddress, abi, signer);
  contract.getUserReservesData(PoolAddressProvider, account).then((res) => {
    const parsedData = res[0].map((data) => {
      const address = data[0];

      const underlyingAsset = Tokens[data[0]];

      const scaledATokenBalanceUsd = Big(data[1].toString())
        .div(Big(10).pow(underlyingAsset.decimals))
        .times(state.tokensPrice[address])
        .toFixed(4);

      const aTokenBalance = Big(data[1].toString())
        .div(Big(10).pow(underlyingAsset.decimals))
        .toFixed();

      const usageAsCollateralEnabledOnUser = data[2];

      const scaledVariableDebt = Big(data[4].toString())
        .div(Big(10).pow(underlyingAsset.decimals))
        .times(state.tokensPrice[address])
        .toFixed(4);

      return {
        address,
        underlyingAsset,
        scaledATokenBalanceUsd,
        usageAsCollateralEnabledOnUser,
        scaledVariableDebt,
        aTokenBalance,
        userMerberShip: usageAsCollateralEnabledOnUser,
      };
    });

    let userTotalSupplyUsd = Big(0);
    let userTotalBorrowUsd = Big(0);
    let totalCollateralUsd = Big(0);

    parsedData.forEach((data) => {
      if (data.usageAsCollateralEnabledOnUser) {
        totalCollateralUsd = totalCollateralUsd.plus(
          data.scaledATokenBalanceUsd
        );
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
  });
};

if (!state.tokensPrice) {
  getTokensPrices();
}

if (
  !state.markets &&
  state.tokensPrice &&
  state.balances &&
  !state.userLoading
) {
  State.update({ userLoading: true });

  getMarkets();
}

if (state.markets && !state.userData) {
  getUserRevervesData();
}

if (
  state.userData &&
  state.markets &&
  Object.keys(state).length === state.markets.length + 5
) {
  const {
    markets,
    tokensPrice,
    balances,
    userData,
    userLoading,
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

  onLoad({
    ...{ ...userData, ...props },
    markets: parsedMarketData,
    name: initConfig.name,
  });
}
