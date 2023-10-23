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

const RewardToken = {
  symbol: "RDNT",
  address: "0x3082CC23568eA640225c2467653dB90e9250AaA0",
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
  multicallAddress,
} = props;

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
      console.log("err: ", err);
      onError?.(err);
    });
};

let rewardPrice = "0";

const rndtPriceData = fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=radiant-capital&vs_currencies=usd"
);

if (rndtPriceData) {
  const data = rndtPriceData.body || [];

  rewardPrice = data["radiant-capital"].usd;
}

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

const getUserRewards = (aTokenAddress, variableDebtTokenAddress, address) => {
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

  const calls = [
    {
      address: incentiveController,
      name: "totalAllocPoint",
      params: [],
    },
    {
      address: incentiveController,
      name: "rewardsPerSecond",
      params: [],
    },
    {
      address: incentiveController,
      name: "poolInfo",
      params: [aTokenAddress],
    },
    {
      address: incentiveController,
      name: "userInfo",
      params: [aTokenAddress, account],
    },
    {
      address: incentiveController,
      name: "pendingRewards",
      params: [account, [aTokenAddress]],
    },

    {
      address: incentiveController,
      name: "poolInfo",
      params: [variableDebtTokenAddress],
    },
    {
      address: incentiveController,
      name: "userInfo",
      params: [variableDebtTokenAddress, account],
    },
    {
      address: incentiveController,
      name: "pendingRewards",
      params: [account, [variableDebtTokenAddress]],
    },
  ];
  return multicallv2(incentiveControllerAbi, calls, {})
    .then((res) => {
      const ACC_REWARD_PRECISION = Big(10).pow(12);
      console.log("ACC_REWARD_PRECISION: ", ACC_REWARD_PRECISION, res);

      const totalAllocPoint = res[0].toString();
      const rewardsPerSecond = res[1].toString();

      const poolInfo = res[2];
      const poolInfoDebt = res[5];
      console.log("poolInfoDebt: ", poolInfoDebt);

      const totalSupply = poolInfo[0].toString();
      const totalSupplyDebt = poolInfoDebt[0].toString();

      const allocPoint = poolInfo[1].toString();
      const allocPointDebt = poolInfoDebt[1].toString();

      const dailyRewardToThisPool = Big(60 * 60 * 24)
        .times(rewardsPerSecond)
        .times(allocPoint)
        .div(totalAllocPoint);

      const yearlyRewardToThisPool = dailyRewardToThisPool
        .mul(365)
        .div(Big(10).pow(RewardToken.decimals));

      console.log("yearlyRewardToThisPool: ", yearlyRewardToThisPool);

      const yearlyRewardToThisPoolUsd = Big(yearlyRewardToThisPool).times(
        rewardPrice
      );
      const totalSupplyUsd = Big(state.tokensPrice[address]).mul(
        ethers.utils.formatUnits(poolInfo[0]._hex, Tokens[address].decimals)
      );
      const supplyApy = yearlyRewardToThisPoolUsd
        .div(totalSupplyUsd)
        .mul(100)
        .toFixed(2, 0);

      console.log("supplyApy: ", supplyApy);

      const dailyRewardToThisPoolDebt = Big(60 * 60 * 24)
        .times(rewardsPerSecond)
        .times(allocPointDebt)
        .div(totalAllocPoint);

      const yearlyRewardToThisPoolDebt = dailyRewardToThisPoolDebt
        .mul(365)
        .div(Big(10).pow(RewardToken.decimals));

      const yearlyRewardToThisPoolDebtUsd = Big(
        yearlyRewardToThisPoolDebt
      ).times(rewardPrice);

      const totalBorrowUsd = Big(state.tokensPrice[address]).mul(
        ethers.utils.formatUnits(poolInfoDebt[0]._hex, Tokens[address].decimals)
      );
      const borrowApy = yearlyRewardToThisPoolDebtUsd
        .div(totalBorrowUsd)
        .mul(100)
        .toFixed(2, 0);

      console.log("borrowApy: ", borrowApy);

      const rewardPerShareThisPool = dailyRewardToThisPool
        .mul(ACC_REWARD_PRECISION)
        .div(totalSupply)
        .toFixed(0);

      const rewardPerShareThisPoolDebt = dailyRewardToThisPoolDebt
        .mul(ACC_REWARD_PRECISION)
        .div(totalSupplyDebt)
        .toFixed(0);

      const userInfo = res[3];
      const userInfoDebt = res[6];

      const amount = userInfo[0].toString();
      const amountDebt = userInfoDebt[0].toString();

      const userDailyReward = Big(rewardPerShareThisPool)
        .times(Big(amount))
        .div(ACC_REWARD_PRECISION)
        .toFixed();

      const userDailyRewardDebt = Big(rewardPerShareThisPoolDebt)
        .times(Big(amountDebt))
        .div(ACC_REWARD_PRECISION)
        .toFixed();

      const pendingRewards = res[4];
      const pendingRewardsDebt = res[7];

      const unclaimed = pendingRewards[0].toString();
      const unclaimedDebt = pendingRewardsDebt[0].toString();

      const dailyRewards = Big(userDailyReward).toFixed();

      const dailyRewardsDebt = Big(userDailyRewardDebt).toFixed();

      const rewards = {
        ...RewardToken,
        unclaimed,
        price: rewardPrice,
        dailyRewards,
        rewardAddress: aTokenAddress,
      };

      const rewardsDebt = {
        ...RewardToken,
        unclaimed: unclaimedDebt,
        price: rewardPrice,
        dailyRewards: dailyRewardsDebt,
        rewardAddress: variableDebtTokenAddress,
      };

      return {
        ...rewards,
        unclaimed: Big(rewards.unclaimed).plus(rewardsDebt.unclaimed).toFixed(),
        supplyApy,
        borrowApy,
        dailyRewards: Big(rewards.dailyRewards)
          .plus(rewardsDebt.dailyRewards)
          .toFixed(),
      };
    })
    .catch((e) => {
      return undefined;
    });
};

const getRewardApy = (aTokenAddress, variableDebtTokenAddress, address) => {
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

  const calls = [
    {
      address: incentiveController,
      name: "totalAllocPoint",
      params: [],
    },
    {
      address: incentiveController,
      name: "rewardsPerSecond",
      params: [],
    },
    {
      address: incentiveController,
      name: "poolInfo",
      params: [aTokenAddress],
    },
    {
      address: incentiveController,
      name: "poolInfo",
      params: [variableDebtTokenAddress],
    },
  ];
  return multicallv2(incentiveControllerAbi, calls, {})
    .then((res) => {
      console.log("res: ", res);
      const totalAllocPoint = res[0].toString();
      const rewardsPerSecond = res[1].toString();

      const poolInfo = res[2];
      const poolInfoDebt = res[3];

      const allocPoint = poolInfo[1].toString();
      const allocPointDebt = poolInfoDebt[1].toString();

      const dailyRewardToThisPool = Big(60 * 60 * 24)
        .times(rewardsPerSecond)
        .times(allocPoint)
        .div(totalAllocPoint);

      const yearlyRewardToThisPool = dailyRewardToThisPool
        .mul(365)
        .div(Big(10).pow(RewardToken.decimals));

      const yearlyRewardToThisPoolUsd = Big(yearlyRewardToThisPool).times(
        rewardPrice
      );
      const totalSupplyUsd = Big(state.tokensPrice[address]).mul(
        ethers.utils.formatUnits(poolInfo[0]._hex, Tokens[address].decimals)
      );
      const supplyApy = yearlyRewardToThisPoolUsd
        .div(totalSupplyUsd)
        .mul(100)
        .toFixed(2, 0);

      const dailyRewardToThisPoolDebt = Big(60 * 60 * 24)
        .times(rewardsPerSecond)
        .times(allocPointDebt)
        .div(totalAllocPoint);

      const yearlyRewardToThisPoolDebt = dailyRewardToThisPoolDebt
        .mul(365)
        .div(Big(10).pow(RewardToken.decimals));

      const yearlyRewardToThisPoolDebtUsd = Big(
        yearlyRewardToThisPoolDebt
      ).times(rewardPrice);

      const totalBorrowUsd = Big(state.tokensPrice[address]).mul(
        ethers.utils.formatUnits(poolInfoDebt[0]._hex, Tokens[address].decimals)
      );
      const borrowApy = yearlyRewardToThisPoolDebtUsd
        .div(totalBorrowUsd)
        .mul(100)
        .toFixed(2, 0);

      console.log("borrowApy: ", borrowApy);

      return {
        supplyApy,
        borrowApy,
      };
    })
    .catch((e) => {
      return undefined;
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

      const calls = [
        {
          address: aaveProtocolDataProviderAddress,
          name: "getReserveConfigurationData",
          params: [address],
        },
        {
          address: aaveProtocolDataProviderAddress,
          name: "getReserveTokensAddresses",
          params: [address],
        },
      ];

      return multicallv2(aaveProtocolDataProviderAbi, calls, {}).then((res) => {
        const loanToValue = Big(res[0][1].toString()).div(100).toNumber();

        const aTokenAddress = res[1][0];
        const variableDebtTokenAddress = res[1][2];
        console.log(
          "variableDebtTokenAddress: ",
          variableDebtTokenAddress,
          aTokenAddress
        );

        getRewardApy(aTokenAddress, variableDebtTokenAddress, address).then(
          ({
            supplyApy: incentiveSupplyApy,
            borrowApy: incentiveBorrowApy,
          }) => {
            getUserRewards(
              aTokenAddress,
              variableDebtTokenAddress,
              address
            ).then((rawRewards) => {
              const rewards = !rawRewards ? undefined : [rawRewards];
              getTokenReserveData(
                address,
                symbol,
                tokensPrice[address],
                aTokenAddress,
                variableDebtTokenAddress,
                loanToValue,
                rewards,
                incentiveSupplyApy,
                incentiveBorrowApy
              );
            });
          }
        );
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
  rewards,
  incentiveSupplyApy,
  incentiveBorrowApy
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
    const totalDebtUsd = Big(totalDebt).times(price).toFixed();
    const totalDebtRaw = Big(totalStableDebt.toString())
      .plus(totalVariableDebt.toString())
      .toFixed();
    const totalDeposit = Big(availableLiquidity.toString())
      .plus(totalDebtRaw)
      .div(decimalBig)
      .toFixed();

    const totalDepositUsd = Big(totalDeposit).times(price).toFixed();

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

    console.log("incentiveSupplyApy: ", incentiveSupplyApy, incentiveBorrowApy);

    State.update({
      [tokenAddress]: {
        availableLiquidity,
        totalStableDebt,
        totalVariableDebt,
        totalBorrows: !price ? "-" : Big(totalDebt).toFixed(4),
        totalSupply: !price ? "-" : Big(totalDeposit).toFixed(4),
        liquidity: !price ? "-" : Big(marketSize).toFixed(4),
        totalDebtUsd,
        totalDepositUsd,
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
        rewards,
        distributionApy: [
          {
            ...RewardToken,
            supply: incentiveSupplyApy + "%",
            borrow: incentiveBorrowApy + "%",
          },
        ],
      },
    });
  });
};

const getUserRevervesData = (addresses) => {
  const calls = addresses.map((address) => {
    return {
      address: aaveProtocolDataProviderAddress,
      name: "getUserReserveData",
      params: [address, account],
    };
  });

  multicallv2(aaveProtocolDataProviderAbi, calls, {}).then((res) => {
    const parsedData = res.map((data, index) => {
      const address = addresses[index];

      const underlyingAsset = Tokens[address];

      const scaledATokenBalance = Big(data[0].toString())
        .div(Big(10).pow(underlyingAsset.decimals))
        // .times(state.tokensPrice[address])
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

      return {
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
    });

    let userTotalSupplyUsd = Big(0);
    let userTotalBorrowUsd = Big(0);

    parsedData.forEach((data, i) => {
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
  const addresses = state.markets.map((market) => market[1]);

  getUserRevervesData(addresses);
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
      ...d,
      ...marketData[address],
      userSupply: d.scaledATokenBalance,
      userBorrow: d.scaledVariableDebt,
    };
  });

  let reduceUnclaimed = Big(0);

  let reduceDailyRewards = Big(0);

  let totalCollateralUsd = Big(0);

  Object.keys(marketData).forEach((address, i) => {
    const market = marketData[address];
    if (market.rewards) {
      const unclaimed = market.rewards[0].unclaimed;
      const dailyRewards = market.rewards[0].dailyRewards;

      reduceUnclaimed = reduceUnclaimed.plus(Big(unclaimed));

      reduceDailyRewards = reduceDailyRewards.plus(Big(dailyRewards));
    }

    if (userData.parsedData[i]) {
      const data = userData.parsedData[i];
      if (data.usageAsCollateralEnabledOnUser) {
        totalCollateralUsd = totalCollateralUsd
          .plus(data.scaledATokenBalanceUsd)
          .times(market.loanToValue / 100);
      }
    }

    const { netApy: netApyRaw } = market;
    netApy = netApy.plus(netApyRaw);
    console.log("netApy: ", netApy);

    market.userUnderlyingBalance = market.aTokenBalance;

    market.lendingPoolAddress = lendingPoolAddress;

    market.wethGateway = wethGateway;

    market.address = market.aTokenAddress;
  });

  userData.totalCollateralUsd = totalCollateralUsd.toFixed();

  userData.netApy = netApy.toFixed(2);

  const parsedMarketData = {};

  Object.entries(marketData).map(([address, market], index) => {
    parsedMarketData[market.aTokenAddress] = market;
  });

  userData.rewards = [
    {
      ...RewardToken,
      unclaimed: reduceUnclaimed
        .div(Big(10).pow(RewardToken.decimals))
        .toFixed(),
      dailyRewards: reduceDailyRewards
        .div(Big(10).pow(RewardToken.decimals))
        .toFixed(),
      price: rewardPrice,
    },
  ];

  onLoad({
    ...{ ...userData, ...props },
    markets: parsedMarketData,
    name: initConfig.name,
  });
}
