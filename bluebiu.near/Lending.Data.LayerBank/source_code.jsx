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
    name: "totalBorrow",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangeRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "accountSnapshot",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gTokenBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "borrowBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "exchangeRate",
            type: "uint256",
          },
        ],
        internalType: "struct Constant.AccountSnapshot",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCash",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalReserve",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveFactor",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const UNITROLLER_ABI = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "marketInfos",
    outputs: [
      { internalType: "bool", name: "isListed", type: "bool" },
      { internalType: "uint256", name: "supplyCap", type: "uint256" },
      { internalType: "uint256", name: "borrowCap", type: "uint256" },
      {
        internalType: "uint256",
        name: "collateralFactor",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      {
        internalType: "contract IOToken",
        name: "oToken",
        type: "address",
      },
    ],
    name: "checkMembership",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint8", name: "", type: "uint8" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "supplyRewardSpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint8", name: "", type: "uint8" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "borrowRewardSpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const ORACLE_ABI = [
  {
    inputs: [{ internalType: "address[]", name: "gTokens", type: "address[]" }],
    name: "getUnderlyingPrices",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "priceOf",
    outputs: [{ internalType: "uint256", name: "priceInUSD", type: "uint256" }],
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
const RATE_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "cash", type: "uint256" },
      { internalType: "uint256", name: "borrows", type: "uint256" },
      { internalType: "uint256", name: "reserves", type: "uint256" },
    ],
    name: "getBorrowRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "cash", type: "uint256" },
      { internalType: "uint256", name: "borrows", type: "uint256" },
      { internalType: "uint256", name: "reserves", type: "uint256" },
      { internalType: "uint256", name: "reserveFactor", type: "uint256" },
    ],
    name: "getSupplyRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const DISTRIBUTION_ABI = [
  {
    inputs: [
      { internalType: "address[]", name: "markets", type: "address[]" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "accuredLAB",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "market", type: "address" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "apyDistributionOf",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "apySupplyLab",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "apyBorrowLab",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "apyAccountSupplyLab",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "apyAccountBorrowLab",
            type: "uint256",
          },
        ],
        internalType: "struct Constant.DistributionAPY",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const {
  multicallAddress,
  unitrollerAddress,
  rateModelSlopeAddress,
  distributionAddress,
  oracleAddress,
  account,
  update,
  dapp,
  onLoad,
  markets,
  multicall,
  prices,
  rewardToken,
} = props;

if (!multicallAddress || !unitrollerAddress || !update || !account) return "";
let _cTokensData = {};
let _loanToValue = null;
let _underlyPrice = {};
let _liquidity = null;
let _underlyingBalance = null;
let _userMerberShip = null;
let _rewardsApy = {};
let _accountRewards = {};

let count = 0;
let oTokensLength = Object.values(markets).length;

const formatedData = (key) => {
  console.log(`${dapp}-${key}`, count);
  if (count < 6) return;
  try {
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
      const underlyingPrice = _underlyPrice[market.address] || 1;
      const marketSupplyUsd = Big(market.totalSupply || 0).mul(underlyingPrice);
      const marketBorrowUsd = Big(market.totalBorrows || 0).mul(
        underlyingPrice
      );
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

      const supplyApy = Big(market.supplyRatePerTimestamp)
        .mul(60 * 60 * 24)
        .plus(1)
        .pow(365)
        .minus(1)
        .mul(100);

      const borrowApy = Big(market.borrowRatePerTimestamp)
        .mul(60 * 60 * 24)
        .plus(1)
        .pow(365)
        .minus(1)
        .mul(100);
      const rewardApy = _rewardsApy[market.address];
      const distributionApy = {
        ...rewardToken,
        supply: Big(rewardApy.apySupply).mul(3).toFixed(2) + "%",
        borrow: Big(rewardApy.apyBorrow).mul(3).toFixed(2) + "%",
      };
      if (Big(rewardApy.apyAccountSupply).gt(0)) {
        distributionApy.apyAccountSupply =
          Big(rewardApy.apyAccountSupply).toFixed(2) + "%";
        totalAccountDistributionApy = totalAccountDistributionApy.plus(
          rewardApy.apyAccountSupply
        );
      }
      if (Big(rewardApy.apyAccountBorrow).gt(0)) {
        distributionApy.apyAccountBorrow =
          Big(rewardApy.apyAccountBorrow).toFixed(2) + "%";
        totalAccountDistributionApy = totalAccountDistributionApy.plus(
          rewardApy.apyAccountBorrow
        );
      }
      markets[market.address] = {
        ...market,
        loanToValue: _loanToValue[market.address],
        liquidity: _liquidity[market.address],
        underlyingPrice: underlyingPrice,
        userUnderlyingBalance: _underlyingBalance[market.address],
        userMerberShip: _userMerberShip[market.address],
        supplyApy: supplyApy.toFixed(2) + "%",
        borrowApy: borrowApy.toFixed(2) + "%",
        distributionApy: [distributionApy],
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
          icon: "https://ipfs.near.social/ipfs/bafkreiecfhuuc6grbyfxfv4uzgaciofdug6sdqv7efruu4uwmzclfqmcs4",
          symbol: "LAB",
          dailyRewards: dailyRewards.toString(),
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
  } catch (err) {
    console.log("format error", err);
  }
};
const getUnitrollerData = () => {
  const calls = [];
  const oTokens = Object.values(markets);
  oTokens.forEach((token) => {
    calls.push({
      address: unitrollerAddress,
      name: "marketInfos",
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
  multicall({
    abi: UNITROLLER_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      _loanToValue = {};
      _userMerberShip = {};
      for (let i = 0, len = res.length; i < len; i++) {
        const index = Math.floor(i / (account ? 2 : 1));
        const mod = i % (account ? 2 : 1);
        switch (mod) {
          case 0:
            _loanToValue[oTokens[index].address] = ethers.utils.formatUnits(
              res[i][3]._hex,
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
    })
    .catch((err) => {
      console.log("error-getUnitrollerData", err);
      setTimeout(() => {
        getUnitrollerData();
      }, 1000);
    });
};
const getUnderlyPrice = () => {
  if (!oracleAddress) return;
  const oTokens = Object.keys(markets);
  const UnderlyingContract = new ethers.Contract(
    oracleAddress,
    ORACLE_ABI,
    Ethers.provider().getSigner()
  );
  UnderlyingContract.getUnderlyingPrices(oTokens)
    .then((res) => {
      _underlyPrice = {};
      for (let i = 0, len = res.length; i < len; i++) {
        _underlyPrice[oTokens[i]] = ethers.utils.formatUnits(res[i]._hex, 18);
      }
      count++;
      formatedData("getUnderlyPrice");
    })
    .catch((err) => {
      console.log("error-getUnderlyPrice", err);
    });
};
const getOTokenLiquidity = () => {
  const assets = Object.values(markets);
  let nativeOToken = "";
  const calls = assets
    .filter((market) => {
      if (market.underlyingToken.address === "native")
        nativeOToken = market.address;
      return (
        market.underlyingToken.address &&
        market.underlyingToken.address !== "native"
      );
    })
    .map((market) => ({
      address: market.underlyingToken.address,
      name: "balanceOf",
      params: [market.address],
    }));
  multicall({
    abi: ERC20_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      _liquidity = {};
      for (let i = 0, len = res.length; i < len; i++) {
        const oToken = markets[calls[i].params[0]];
        _liquidity[oToken.address] = ethers.utils.formatUnits(
          res[i][0]._hex,
          oToken.underlyingToken.decimals
        );
      }
      const provider = Ethers.provider();
      if (nativeOToken) {
        provider.getBalance(nativeOToken).then((rawBalance) => {
          _liquidity[nativeOToken] = ethers.utils.formatUnits(
            rawBalance._hex,
            18
          );
          count++;
          formatedData("getOTokenLiquidity");
        });
      } else {
        count++;
        formatedData("getOTokenLiquidity");
      }
    })
    .catch(() => {
      setTimeout(() => {
        getOTokenLiquidity();
      }, 500);
    });
};
const getWalletBalance = () => {
  let nativeOToken = "";
  const underlyingTokens = Object.values(markets)
    .filter((market) => {
      if (market.underlyingToken.address === "native")
        nativeOToken = market.address;
      return (
        market.underlyingToken.address &&
        market.underlyingToken.address !== "native"
      );
    })
    .map((market) => ({
      ...market.underlyingToken,
      oTokenAddress: market.address,
    }));
  const calls = underlyingTokens.map((token) => ({
    address: token.address,
    name: "balanceOf",
    params: [account],
  }));
  multicall({
    abi: ERC20_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      _underlyingBalance = {};
      for (let i = 0, len = res.length; i < len; i++) {
        _underlyingBalance[underlyingTokens[i].oTokenAddress] = res[i][0]
          ? ethers.utils.formatUnits(
              res[i][0]._hex,
              underlyingTokens[i].decimals
            )
          : "0";
      }
      if (nativeOToken) {
        const provider = Ethers.provider();
        provider.getBalance(account).then((rawBalance) => {
          _underlyingBalance[nativeOToken] = ethers.utils.formatUnits(
            rawBalance._hex,
            18
          );
          count++;
          formatedData("underlyingTokens");
        });
      } else {
        count++;
        formatedData("underlyingTokens");
      }
    })
    .catch((err) => {
      setTimeout(() => {
        getWalletBalance();
      }, 500);
    });
};
const getCTokenData = (oToken) => {
  if (oTokensLength === 0) return;
  const calls = [
    {
      address: oToken.address,
      name: "exchangeRate",
    },
    {
      address: oToken.address,
      name: "totalSupply",
    },
    {
      address: oToken.address,
      name: "totalBorrow",
    },
    {
      address: oToken.address,
      name: "accountSnapshot",
      params: [account],
    },
    {
      address: oToken.address,
      name: "getCash",
    },
    {
      address: oToken.address,
      name: "totalReserve",
    },
    {
      address: oToken.address,
      name: "reserveFactor",
    },
  ];
  multicall({
    abi: OTOKEN_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      const exchangeRateStored = ethers.utils.formatUnits(res[0][0]._hex, 18);
      const userSupply = ethers.utils.formatUnits(
        res[3][0][0]._hex,
        oToken.underlyingToken.decimals
      );
      const totalSupply = ethers.utils.formatUnits(
        res[1][0]._hex,
        oToken.underlyingToken.decimals
      );
      _cTokensData[oToken.address] = {
        ...oToken,
        exchangeRateStored,
        totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
        totalBorrows: ethers.utils.formatUnits(
          res[2][0]._hex,
          oToken.underlyingToken.decimals
        ),
        userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
        userBorrow: ethers.utils.formatUnits(
          res[3][0][1]._hex,
          oToken.underlyingToken.decimals
        ),
      };
      const rateCalls = [
        {
          address: rateModelSlopeAddress,
          name: "getBorrowRate",
          params: [res[4][0], res[2][0], res[5][0]],
        },
        {
          address: rateModelSlopeAddress,
          name: "getSupplyRate",
          params: [res[4][0], res[2][0], res[5][0], res[6][0]],
        },
      ];
      multicall({
        abi: RATE_ABI,
        calls: rateCalls,
        options: {},
        multicallAddress,
        provider: Ethers.provider(),
      })
        .then((rateRes) => {
          oTokensLength--;
          _cTokensData[oToken.address].borrowRatePerTimestamp =
            ethers.utils.formatUnits(rateRes[0][0]._hex, 18);
          _cTokensData[oToken.address].supplyRatePerTimestamp =
            ethers.utils.formatUnits(rateRes[1][0]._hex, 18);
          if (oTokensLength === 0) {
            count++;
            formatedData("oTokens data");
          }
        })
        .catch((err) => {});
    })
    .catch(() => {
      setTimeout(() => {
        getCTokenData(oToken);
      }, 500);
    });
};
const getCTokensData = () => {
  Object.values(markets).forEach((market) => {
    getCTokenData(market);
  });
};
const getRewards = () => {
  const PriceToken = new ethers.Contract(
    oracleAddress,
    ORACLE_ABI,
    Ethers.provider().getSigner()
  );
  PriceToken.priceOf(rewardToken.address).then((priceRes) => {
    const price = Big(ethers.utils.formatUnits(priceRes._hex, 18)).toString();
    getUserRewards(price);
  });
};
const getUserRewards = (price) => {
  const cTokens = Object.keys(markets);
  const calls = cTokens.map((cToken) => ({
    address: distributionAddress,
    name: "apyDistributionOf",
    params: [cToken, account],
  }));
  calls.push({
    address: distributionAddress,
    name: "accuredLAB",
    params: [cTokens, account],
  });
  multicall({
    abi: DISTRIBUTION_ABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      _accountRewards.price = price;
      for (let i = 0; i < res.length; i++) {
        if (i === res.length - 1) {
          const accured = res[i][0]
            ? ethers.utils.formatUnits(res[i][0]._hex, 18)
            : "0";
          _accountRewards.reward = accured;
          count++;
          formatedData("rewards");
          return;
        }
        _rewardsApy[cTokens[i]] = {
          apySupply: ethers.utils.formatUnits(res[i][0][0]._hex, 16),
          apyBorrow: ethers.utils.formatUnits(res[i][0][1]._hex, 16),
          apyAccountSupply: ethers.utils.formatUnits(res[i][0][2]._hex, 16),
          apyAccountBorrow: ethers.utils.formatUnits(res[i][0][3]._hex, 16),
        };
      }
    })
    .catch((err) => {
      console.log("error-rewards", err);
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

useEffect(() => {
  init();
}, []);
