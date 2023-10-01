const markets = {
  "0xEa0F73296a6147FB56bAE29306Aae0FFAfF9De5F": {
    underlyingToken: {
      address: "0x3aab2285ddcddad8edf438c1bab47e1a9d05a9b4",
      decimals: 8,
      symbol: "WBTC",
    },
    decimals: 18,
    symbol: "lWBTC",
    address: "0xEa0F73296a6147FB56bAE29306Aae0FFAfF9De5F",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },
  "0xc7D8489DaE3D2EbEF075b1dB2257E2c231C9D231": {
    underlyingToken: {
      address: "native",
      decimals: 18,
      symbol: "ETH",
    },
    decimals: 18,
    symbol: "lETH",
    address: "0xc7D8489DaE3D2EbEF075b1dB2257E2c231C9D231",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },
  "0x2aD69A0Cf272B9941c7dDcaDa7B0273E9046C4B0": {
    underlyingToken: {
      address: "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
      decimals: 6,
      symbol: "USDC",
    },
    decimals: 18,
    symbol: "lUSDC",
    address: "0x2aD69A0Cf272B9941c7dDcaDa7B0273E9046C4B0",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
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
    inputs: [{ internalType: "address", name: "market", type: "address" }],
    name: "distributionInfoOf",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "supplySpeed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "borrowSpeed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalBoostedSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalBoostedBorrow",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "accPerShareSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "accPerShareBorrow",
            type: "uint256",
          },
          { internalType: "uint256", name: "accruedAt", type: "uint256" },
        ],
        internalType: "struct Constant.DistributionInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "market", type: "address" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "accountDistributionInfoOf",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "accuredLAB",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "boostedSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "boostedBorrow",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "accPerShareSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "accPerShareBorrow",
            type: "uint256",
          },
        ],
        internalType: "struct Constant.DistributionAccountInfo",
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
} = props;

if (!multicallAddress || !unitrollerAddress || !update || !account) return "";
const MulticallContract = new ethers.Contract(
  multicallAddress,
  MULTICALL_ABI,
  Ethers.provider().getSigner()
);
console.log(`${dapp}-update`);
const multicallv2 = (abi, calls, options, onSuccess, onError) => {
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
let _rewards = {};
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
      totalCollateralUsd = totalCollateralUsd.plus(
        Big(market.userSupply)
          .mul(underlyingPrice)
          .mul(_loanToValue[market.address])
          .div(100)
      );
      const distributionSupplyApy = _rewards[market.address].supply.div(
        marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd
      );
      const distributionBorrowApy = _rewards[market.address].borrow.div(
        marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd
      );
      const supplyApy = Big(market.supplyRatePerTimestamp)
        .mul(60 * 60 * 24)
        .plus(1)
        .pow(365)
        .minus(1)
        .add(distributionSupplyApy)
        .mul(100);

      const borrowApy = Big(market.borrowRatePerTimestamp)
        .mul(60 * 60 * 24)
        .plus(1)
        .pow(365)
        .minus(1)
        .minus(distributionBorrowApy)
        .mul(100);
      let rewards;
      const reward = _accountRewards[market.address];
      if (reward && Big(reward.reward || 0).gt(0)) {
        rewards = [
          {
            icon: "https://ipfs.near.social/ipfs/bafkreiecfhuuc6grbyfxfv4uzgaciofdug6sdqv7efruu4uwmzclfqmcs4",
            symbol: "LAB",
            dailyRewards: Big(_rewards[market.address].borrow)
              .plus(_rewards[market.address].supply)
              .toString(),
            price: reward.price,
            unclaimed: reward.reward,
          },
        ];
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
        dapp,
        rewards,
      };
    });

    onLoad({
      markets,
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
  multicallv2(
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
    },
    (err) => {
      console.log("error-getUnitrollerData", err);
      setTimeout(() => {
        getUnitrollerData();
      }, 1000);
    }
  );
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
  multicallv2(
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
    },
    () => {
      setTimeout(() => {
        getOTokenLiquidity();
      }, 500);
    }
  );
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
  multicallv2(
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
    },
    () => {
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
  multicallv2(
    OTOKEN_ABI,
    calls,
    {},
    (res) => {
      const exchangeRateStored = ethers.utils.formatUnits(res[0][0]._hex, 18);
      const userSupply = ethers.utils.formatUnits(
        res[3][0][0]._hex,
        oToken.decimals
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
      multicallv2(
        RATE_ABI,
        rateCalls,
        {},
        (rateRes) => {
          oTokensLength--;
          _cTokensData[oToken.address].borrowRatePerTimestamp =
            ethers.utils.formatUnits(rateRes[0][0]._hex, 18);
          _cTokensData[oToken.address].supplyRatePerTimestamp =
            ethers.utils.formatUnits(rateRes[1][0]._hex, 18);
          if (oTokensLength === 0) {
            count++;
            formatedData("oTokens data");
          }
        },
        (err) => {}
      );
    },
    () => {
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
  const PriceToken = new ethers.Contract(
    oracleAddress,
    ORACLE_ABI,
    Ethers.provider().getSigner()
  );
  PriceToken.priceOf("0xB97F21D1f2508fF5c73E7B5AF02847640B1ff75d").then(
    (priceRes) => {
      const price = Big(ethers.utils.formatUnits(priceRes._hex, 18)).toString();
      const cTokens = Object.keys(markets);
      const calls = cTokens.map((token) => ({
        address: distributionAddress,
        name: "distributionInfoOf",
        params: [token],
      }));
      multicallv2(
        DISTRIBUTION_ABI,
        calls,
        {},
        (res) => {
          for (let i = 0, len = cTokens.length; i < len; i++) {
            const token = cTokens[i];
            const supply = Big(
              ethers.utils.formatUnits(res[i][0][0]._hex, 18)
            ).mul(price);
            const borrow = Big(
              ethers.utils.formatUnits(res[i][0][1]._hex, 18)
            ).mul(price);
            _rewards[token] = {
              borrow: supply.mul(60 * 60 * 24 * 365),
              supply: borrow.mul(60 * 60 * 24 * 365),
            };
          }
          getUserRewards(price);
        },
        (err) => {
          console.log("error-rewards", err);
        }
      );
    }
  );
};
const getUserRewards = (price) => {
  const cTokens = Object.keys(markets);
  const calls = cTokens.map((token) => ({
    address: distributionAddress,
    name: "accountDistributionInfoOf",
    params: [token, account],
  }));
  multicallv2(
    DISTRIBUTION_ABI,
    calls,
    {},
    (res) => {
      for (let i = 0, len = cTokens.length; i < len; i++) {
        const token = cTokens[i];
        const accured = Big(
          ethers.utils.formatUnits(res[i][0][0]._hex, 18)
        ).toString();
        _accountRewards[token] = {
          price,
          reward: accured,
        };
      }
      count++;
      formatedData("rewards");
    },
    (err) => {
      console.log("error-rewards", err);
    }
  );
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
