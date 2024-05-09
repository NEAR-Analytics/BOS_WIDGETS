const markets = {
  "0x5F5c479fe590cD4442A05aE4a941dd991A633B8E": {
    underlyingToken: {
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
      symbol: "WETH",
    },
    decimals: 8,
    symbol: "sobWETH",
    address: "0x5F5c479fe590cD4442A05aE4a941dd991A633B8E",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },
  "0xb864BA2aab1f53BC3af7AE49a318202dD3fd54C2": {
    underlyingToken: {
      address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      decimals: 18,
      symbol: "DAI",
    },
    decimals: 8,
    symbol: "sobDAI",
    address: "0xb864BA2aab1f53BC3af7AE49a318202dD3fd54C2",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },
  "0x225886C9beb5eeE254F79d58bbD80cf9F200D4d0": {
    underlyingToken: {
      address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
      decimals: 6,
      symbol: "USDbC",
    },
    decimals: 8,
    symbol: "sobUSDbC",
    address: "0x225886C9beb5eeE254F79d58bbD80cf9F200D4d0",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0xfd68F92B45b633bbe0f475294C1A86aecD62985A": {
    underlyingToken: {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      decimals: 6,
      symbol: "USDC",
    },
    decimals: 8,
    symbol: "sobUSDC",
    address: "0xfd68F92B45b633bbe0f475294C1A86aecD62985A",
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
    name: "supplyRatePerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowRatePerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const UNITROLLER_ABI = [
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "markets",
    outputs: [
      { internalType: "bool", name: "isListed", type: "bool" },
      {
        internalType: "uint256",
        name: "collateralFactorMantissa",
        type: "uint256",
      },
      { internalType: "bool", name: "isQied", type: "bool" },
    ],
    payable: false,
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
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "compSupplySpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "compBorrowSpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "compAccrued",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
const LENS_ABI = [
  {
    inputs: [
      {
        internalType: "contract ComptrollerLensInterface",
        name: "comptroller",
        type: "address",
      },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "rewardsAccrued",
    outputs: [
      {
        internalType: "address[]",
        name: "rewardTokens",
        type: "address[]",
      },
      { internalType: "uint256[]", name: "accrued", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const {
  multicallAddress,
  unitrollerAddress,
  lensAddress,
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
const REWARD_TOKEN = {
  icon: "https://ipfs.near.social/ipfs/bafkreiagqfppcrymfj426ik74axff645ohvi7va5v4yxlszdbu3xstyqeq",
  symbol: "SONNE",
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
    const underlyingPrice = _underlyPrice[market.address] || 1;
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
    const distributionSupplyApy = _rewards[market.address].supply
      .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd)
      .mul(100)
      .toFixed(2);
    const distributionBorrowApy = _rewards[market.address].borrow
      .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd)
      .mul(100)
      .toFixed(2);
    totalAccountDistributionApy = totalAccountDistributionApy
      .plus(distributionSupplyApy)
      .plus(distributionBorrowApy);
    const supplyApy = Big(market.supplyRatePerBlock)
      .mul(60 * 60 * 24)
      .plus(1)
      .pow(365)
      .minus(1)
      .mul(100);

    const borrowApy = Big(market.borrowRatePerBlock)
      .mul(60 * 60 * 24)
      .plus(1)
      .pow(365)
      .minus(1)
      .mul(100);

    markets[market.address] = {
      ...market,
      loanToValue: _loanToValue[market.address],
      liquidity: _liquidity[market.address],
      underlyingPrice: underlyingPrice,
      userUnderlyingBalance: _underlyingBalance[market.address],
      userMerberShip: _userMerberShip[market.address],
      supplyApy: supplyApy.toFixed(2) + "%",
      borrowApy: borrowApy.toFixed(2) + "%",
      distributionApy: [
        {
          ...REWARD_TOKEN,
          supply: distributionSupplyApy + "%",
          borrow: distributionBorrowApy + "%",
        },
      ],
      dapp,
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
  calls.push({
    address: unitrollerAddress,
    name: "compAccrued",
    params: [account],
  });
  multicallv2(
    UNITROLLER_ABI,
    calls,
    {},
    (res) => {
      _loanToValue = {};
      _userMerberShip = {};
      for (let i = 0, len = res.length; i < len; i++) {
        if (i === res.length - 1) {
          _accountRewards.reward = ethers.utils.formatUnits(res[i][0]._hex, 18);
          count++;
          formatedData("getUnitrollerData");
          return;
        }
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
  const calls = oTokens.map((token) => ({
    address: oracleAddress,
    name: "getUnderlyingPrice",
    params: [token],
  }));
  multicallv2(
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
      console.log("error-getUnderlyPrice", err);
    }
  );
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
      const provider = Ethers.provider();
      provider.getBalance(account).then((rawBalance) => {
        _underlyingBalance[nativeOToken] = ethers.utils.formatUnits(
          rawBalance._hex,
          18
        );
        count++;
        formatedData("underlyingTokens");
      });
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
      name: "supplyRatePerBlock",
    },
    {
      address: oToken.address,
      name: "borrowRatePerBlock",
    },
    {
      address: oToken.address,
      name: "getAccountSnapshot",
      params: [account],
    },
  ];
  multicallv2(
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
        supplyRatePerBlock: ethers.utils.formatUnits(res[3][0]._hex, 18),
        borrowRatePerBlock: ethers.utils.formatUnits(res[4][0]._hex, 18),
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

const getUserRewards = (price) => {
  multicallv2(
    LENS_ABI,
    [
      {
        address: lensAddress,
        name: "rewardsAccrued",
        params: [unitrollerAddress, account],
      },
    ],
    {},
    (res) => {
      _accountRewards = {
        price,
        reward: ethers.utils.formatUnits(res[0][1][0], 18).toString(),
      };
      count++;
      formatedData("rewards");
    },
    (err) => {
      console.log(dapp + " error-user-rewards", err);
    }
  );
};

const getCTokenReward = ({ price, cTokens, index }) => {
  const token = cTokens[index];
  const calls = [
    {
      address: unitrollerAddress,
      name: "compBorrowSpeeds",
      params: [token],
    },
    {
      address: unitrollerAddress,
      name: "compSupplySpeeds",
      params: [token],
    },
  ];
  multicallv2(
    UNITROLLER_ABI,
    calls,
    {},
    (res) => {
      const borrow = Big(ethers.utils.formatUnits(res[0][0]._hex, 18)).mul(
        price
      );
      const supply = Big(ethers.utils.formatUnits(res[1][0]._hex, 18)).mul(
        price
      );
      _rewards[token] = {
        borrow: borrow.mul(60 * 60 * 24 * 365),
        supply: supply.mul(60 * 60 * 24 * 365),
      };
      if (index === cTokens.length - 1) {
        getUserRewards(price);
      } else {
        getCTokenReward({
          price,
          cTokens,
          index: index + 1,
        });
      }
    },
    (err) => {
      console.log("error-rewards", err);
    }
  );
};

const getRewards = () => {
  asyncFetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=sonne-finance&vs_currencies=usd"
  ).then((response) => {
    const data = response.body || [];
    const price = data["sonne-finance"].usd;
    const cTokens = Object.keys(markets);
    _accountRewards.price = price;
    getCTokenReward({
      price,
      cTokens,
      index: 0,
    });
  });
};

useEffect(() => {
  getUnitrollerData();
  getUnderlyPrice();
  getOTokenLiquidity();
  getWalletBalance();
  getCTokensData();
  getRewards();
}, []);
