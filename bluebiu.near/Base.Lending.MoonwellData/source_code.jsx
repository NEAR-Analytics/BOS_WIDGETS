const markets = {
  "0x703843C3379b52F9FF486c9f5892218d2a065cC8": {
    underlyingToken: {
      address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
      decimals: 6,
      symbol: "USDbC",
    },
    decimals: 8,
    symbol: "mUSDbC",
    address: "0x703843C3379b52F9FF486c9f5892218d2a065cC8",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0x628ff693426583D9a7FB391E54366292F509D457": {
    underlyingToken: {
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
      symbol: "ETH",
    },
    decimals: 8,
    symbol: "mWETH",
    address: "0x628ff693426583D9a7FB391E54366292F509D457",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },
};
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
const OTOKEN_ABI = [
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBorrows",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangeRateStored",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getAccountSnapshot",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supplyRatePerTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowRatePerTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const UNITROLLER_ABI = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "markets",
    outputs: [
      { internalType: "bool", name: "isListed", type: "bool" },
      {
        internalType: "uint256",
        name: "collateralFactorMantissa",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "contract MToken", name: "mToken", type: "address" },
    ],
    name: "checkMembership",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];
const ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: "contract IOToken",
        name: "oToken",
        type: "address",
      },
    ],
    name: "getUnderlyingPrice",
    outputs: [{ internalType: "uint256", name: "price", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const REWARD_ABI = [
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getOutstandingRewardsForUser",
    outputs: [
      {
        components: [
          { internalType: "address", name: "mToken", type: "address" },
          {
            components: [
              {
                internalType: "address",
                name: "emissionToken",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "totalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "supplySide",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "borrowSide",
                type: "uint256",
              },
            ],
            internalType: "struct MultiRewardDistributorCommon.RewardInfo[]",
            name: "rewards",
            type: "tuple[]",
          },
        ],
        internalType: "struct MultiRewardDistributorCommon.RewardWithMToken[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract MToken",
        name: "_mToken",
        type: "address",
      },
    ],
    name: "getAllMarketConfigs",
    outputs: [
      {
        components: [
          { internalType: "address", name: "owner", type: "address" },
          {
            internalType: "address",
            name: "emissionToken",
            type: "address",
          },
          { internalType: "uint256", name: "endTime", type: "uint256" },
          {
            internalType: "uint224",
            name: "supplyGlobalIndex",
            type: "uint224",
          },
          {
            internalType: "uint32",
            name: "supplyGlobalTimestamp",
            type: "uint32",
          },
          {
            internalType: "uint224",
            name: "borrowGlobalIndex",
            type: "uint224",
          },
          {
            internalType: "uint32",
            name: "borrowGlobalTimestamp",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "supplyEmissionsPerSec",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "borrowEmissionsPerSec",
            type: "uint256",
          },
        ],
        internalType: "struct MultiRewardDistributorCommon.MarketConfig[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const {
  multicallAddress,
  unitrollerAddress,
  oracleAddress,
  rewardDistributorAddress,
  account,
  update,
  dapp,
  onLoad,
} = props;

if (!multicallAddress || !unitrollerAddress || !update) return "";

const MulticallContract = new ethers.Contract(
  multicallAddress,
  MULTICALL_ABI,
  Ethers.provider().getSigner()
);

const multicall = (abi, calls, options, onSuccess, onError) => {
  const { requireSuccess, ...overrides } = options || {};
  const itf = new ethers.utils.Interface(abi);
  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));
  MulticallContract.callStatic
    .tryAggregate(requireSuccess || true, calldata, overrides)
    .then((res) => {
      onSuccess(
        res.map((call, i) => {
          const [result, data] = call;
          return result && data !== "0x"
            ? itf.decodeFunctionResult(calls[i].name, data)
            : null;
        })
      );
    })
    .catch((err) => {
      onError?.(err);
    });
};
let _cTokensData = {};
let _loanToValue = null;
let _underlyPrice = {};
let _liquidity = null;
let _underlyingBalance = null;
let _userMerberShip = null;
let _accountRewards = {};
let _rewardsForWell = {};
let count = 0;
let oTokensLength = Object.values(markets).length;
const REWARD_TOKEN = {
  icon: "https://ipfs.near.social/ipfs/bafkreih3un4tcbwp3tneicomraozegmftz45sfx4rtg3qyui67nfdrptei",
  symbol: "WELL",
};

const formatedData = (key) => {
  console.log(`${dapp}-${key}`, count);
  if (count < 6) return;
  count = 0;
  oTokensLength = Object.values(markets).length;
  let totalSupplyUsd = Big(0);
  let totalBorrowUsd = Big(0);
  let userTotalSupplyUsd = Big(0);
  let userTotalBorrowUsd = Big(0);
  let totalCollateralUsd = Big(0);
  let totalAccountDistributionApy = Big(0);
  const markets = {};
  Object.values(_cTokensData).forEach((market) => {
    const underlyingPrice = _underlyPrice[market.address];
    const marketSupplyUsd = Big(market.totalSupply || 0).mul(underlyingPrice);
    const marketBorrowUsd = Big(market.totalBorrows || 0).mul(underlyingPrice);
    totalSupplyUsd = totalSupplyUsd.plus(marketSupplyUsd);
    totalBorrowUsd = totalBorrowUsd.plus(marketBorrowUsd);

    userTotalSupplyUsd = userTotalSupplyUsd.plus(
      Big(market.userSupply).mul(underlyingPrice)
    );
    userTotalBorrowUsd = userTotalBorrowUsd.plus(
      Big(market.userBorrow).mul(underlyingPrice)
    );
    if (_userMerberShip[market.address]) {
      totalCollateralUsd = totalCollateralUsd.plus(
        Big(market.userSupply)
          .mul(underlyingPrice)
          .mul(_loanToValue[market.address])
          .div(100)
      );
    }
    const distributionSupplyApy = Big(_rewardsForWell[market.address].supply)
      .mul(365)
      .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd)
      .mul(100)
      .toFixed(2);
    const distributionBorrowApy = Big(_rewardsForWell[market.address].borrow)
      .mul(365)
      .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd)
      .mul(100)
      .toFixed(2);
    totalAccountDistributionApy = totalAccountDistributionApy
      .plus(distributionSupplyApy)
      .plus(distributionBorrowApy);
    const supplyApy = Big(market.supplyRatePerTimestamp)
      .mul(60 * 60 * 24)
      .plus(1)
      .pow(365)
      .minus(1)
      .mul(100)
      .toFixed(2);
    const borrowApy = Big(market.borrowRatePerTimestamp)
      .mul(60 * 60 * 24)
      .plus(1)
      .pow(365)
      .minus(1)
      .mul(100)
      .toFixed(2);

    markets[market.address] = {
      ...market,
      loanToValue: _loanToValue[market.address],
      liquidity: _liquidity[market.address],
      underlyingPrice: underlyingPrice,
      userUnderlyingBalance: _underlyingBalance[market.address],
      userMerberShip: _userMerberShip[market.address],
      supplyApy: supplyApy + "%",
      borrowApy: borrowApy + "%",
      distributionApy: [
        {
          ...REWARD_TOKEN,
          supply: distributionSupplyApy + "%",
          borrow: distributionBorrowApy + "%",
        },
      ],
      dapp,
      rewards,
    };
  });
  let rewards;
  if (_accountRewards && Big(_accountRewards.reward || 0).gt(0)) {
    const dailyRewards = totalAccountDistributionApy
      .mul(userTotalSupplyUsd.add(userTotalBorrowUsd))
      .div(365 * 100)
      .div(_accountRewards.price);
    rewards = [
      {
        ...REWARD_TOKEN,
        dailyRewards: dailyRewards.lt(0.000001)
          ? "0.000001"
          : dailyRewards.toString(),
        price: _accountRewards.price,
        unclaimed: _accountRewards.reward,
      },
    ];
  }
  onLoad({
    markets,
    rewards,
    totalSupplyUsd: totalSupplyUsd.toString(),
    totalBorrowUsd: totalBorrowUsd.toString(),
    userTotalSupplyUsd: userTotalSupplyUsd.toString(),
    userTotalBorrowUsd: userTotalBorrowUsd.toString(),
    totalCollateralUsd: totalCollateralUsd.toString(),
  });
};
const getUnitrollerData = () => {
  const calls = [];
  const oTokens = Object.values(markets);
  oTokens.forEach((token) => {
    calls.push({
      address: unitrollerAddress,
      name: "markets",
      params: [token.address],
    });
    if (account) {
      calls.push({
        address: unitrollerAddress,
        name: "checkMembership",
        params: [account, token.address],
      });
    }
  });
  multicall(
    UNITROLLER_ABI,
    calls,
    {},
    (res) => {
      _loanToValue = {};
      _userMerberShip = {};
      for (let i = 0, len = res.length; i < len; i++) {
        const index = Math.floor(i / (account ? 2 : 1));
        const mod = i % (account ? 2 : 1);
        switch (mod) {
          case 0:
            _loanToValue[oTokens[index].address] = ethers.utils.formatUnits(
              res[i][1]._hex,
              16
            );
            break;
          case 1:
            _userMerberShip[oTokens[index].address] = res[i][0];
            break;
          default:
        }
      }
      count++;
      formatedData("getUnitrollerData");
    },
    (err) => {
      console.log("getUnitrollerData error", err);
      setTimeout(() => {
        getUnitrollerData();
      }, 1000);
    }
  );
};
const getUnderlyPrice = () => {
  if (!oracleAddress) return;
  const oTokens = Object.keys(markets);
  const calls = oTokens.map((token) => ({
    address: oracleAddress,
    name: "getUnderlyingPrice",
    params: [token],
  }));
  multicall(
    ORACLE_ABI,
    calls,
    {},
    (res) => {
      _underlyPrice = {};
      for (let i = 0, len = res.length; i < len; i++) {
        _underlyPrice[oTokens[i]] = ethers.utils.formatUnits(
          res[i][0]._hex,
          36 - markets[oTokens[i]].underlyingToken.decimals
        );
      }
      count++;
      formatedData("getUnderlyPrice");
    },
    (err) => {
      console.log("getUnderlyPrice error", err);
    }
  );
};
const getOTokenLiquidity = () => {
  if (!account) {
    return;
  }
  const underlyingTokens = Object.values(markets).map((market) => ({
    ...market.underlyingToken,
    oTokenAddress: market.address,
  }));
  const calls = underlyingTokens.map((token) => ({
    address: token.address,
    name: "balanceOf",
    params: [token.oTokenAddress],
  }));
  multicall(
    ERC20_ABI,
    calls,
    {},
    (res) => {
      _liquidity = {};
      for (let i = 0, len = res.length; i < len; i++) {
        const oToken = markets[calls[i].params[0]];
        _liquidity[oToken.address] = ethers.utils.formatUnits(
          res[i][0]._hex,
          oToken.underlyingToken.decimals
        );
      }
      count++;
      formatedData("getOTokenLiquidity");
    },
    (err) => {
      console.log("getOTokenLiquidity error", err);
      setTimeout(() => {
        getOTokenLiquidity();
      }, 500);
    }
  );
};
const getWalletBalance = () => {
  const underlyingTokens = Object.values(markets).map((market) => ({
    ...market.underlyingToken,
    oTokenAddress: market.address,
  }));
  const calls = underlyingTokens.map((token) => ({
    address: token.address,
    name: "balanceOf",
    params: [account],
  }));
  multicall(
    ERC20_ABI,
    calls,
    {},
    (res) => {
      _underlyingBalance = {};
      for (let i = 0, len = res.length; i < len; i++) {
        _underlyingBalance[underlyingTokens[i].oTokenAddress] =
          ethers.utils.formatUnits(
            res[i][0]._hex,
            underlyingTokens[i].decimals
          );
      }
      count++;
      formatedData("getWalletBalance");
    },
    (err) => {
      console.log("getWalletBalance error", err);
      setTimeout(() => {
        getWalletBalance();
      }, 500);
    }
  );
};
const getCTokenData = (oToken) => {
  if (oTokensLength === 0) return;
  const calls = [
    {
      address: oToken.address,
      name: "exchangeRateStored",
    },
    {
      address: oToken.address,
      name: "totalSupply",
    },
    {
      address: oToken.address,
      name: "totalBorrows",
    },
    {
      address: oToken.address,
      name: "supplyRatePerTimestamp",
    },
    {
      address: oToken.address,
      name: "borrowRatePerTimestamp",
    },
    {
      address: oToken.address,
      name: "getAccountSnapshot",
      params: [account],
    },
  ];
  multicall(
    OTOKEN_ABI,
    calls,
    {},
    (res) => {
      oTokensLength--;
      const exchangeRateStored = ethers.utils.formatUnits(
        res[0][0]._hex,
        10 + oToken.underlyingToken.decimals
      );
      const userSupply = ethers.utils.formatUnits(
        res[5][1]._hex,
        oToken.decimals
      );
      const totalSupply = ethers.utils.formatUnits(
        res[1][0]._hex,
        oToken.decimals
      );
      _cTokensData[oToken.address] = {
        ...oToken,
        exchangeRateStored,
        totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
        totalBorrows: ethers.utils.formatUnits(
          res[2][0]._hex,
          oToken.underlyingToken.decimals
        ),
        supplyRatePerTimestamp: ethers.utils.formatUnits(res[3][0]._hex, 18),
        borrowRatePerTimestamp: ethers.utils.formatUnits(res[4][0]._hex, 18),
        userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
        userBorrow: ethers.utils.formatUnits(
          res[5][2]._hex,
          oToken.underlyingToken.decimals
        ),
      };
      if (oTokensLength === 0) {
        count++;
        formatedData("oTokens data");
      }
    },
    (err) => {
      console.log("oTokens data error", err);
      setTimeout(() => {
        getCTokenData(oToken);
      }, 500);
    }
  );
};
const getCTokensData = () => {
  Object.values(markets).forEach((market) => {
    getCTokenData(market);
  });
};
const getRewards = () => {
  asyncFetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=moonwell-artemis&vs_currencies=usd"
  ).then((response) => {
    const data = response.body || [];
    const price = data["moonwell-artemis"].usd;
    const cTokens = Object.keys(markets);
    const calls = cTokens.map((token) => ({
      address: rewardDistributorAddress,
      name: "getAllMarketConfigs",
      params: [token],
    }));
    calls.push({
      address: rewardDistributorAddress,
      name: "getOutstandingRewardsForUser",
      params: [account],
    });
    multicall(
      REWARD_ABI,
      calls,
      {},
      (res) => {
        for (let i = 0, len = res.length; i < len; i++) {
          const item = res[i];
          let totalRewards = Big(0);
          if (i === res.length - 1) {
            item[0].forEach((slip) => {
              if (_rewardsForWell[slip[0]]) {
                totalRewards = totalRewards
                  .plus(ethers.utils.formatUnits(slip[1][0][2]._hex, 18))
                  .plus(ethers.utils.formatUnits(slip[1][0][3]._hex, 18));
              }
            });
            _accountRewards = {
              reward: totalRewards.toString(),
              price,
            };
            count++;
            formatedData("getRewards");
            return;
          }
          _rewardsForWell[cTokens[i]] = {
            supply: Big(ethers.utils.formatUnits(item[0][0][7], 18))
              .mul(price)
              .mul(60 * 60 * 24),
            borrow: Big(ethers.utils.formatUnits(item[0][0][8], 18))
              .mul(price)
              .mul(60 * 60 * 24),
          };
        }
      },
      (err) => {
        console.log("rewards error", err);
      }
    );
  });
};

const init = () => {
  getUnitrollerData();
  getUnderlyPrice();
  getOTokenLiquidity();
  getWalletBalance();
  getCTokensData();
  getRewards();
};

init();

return "";
