const markets = {
  "0xAd7f33984bed10518012013D4aB0458D37FEE6F3": {
    underlyingToken: {
      address: "0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f",
      decimals: 18,
      symbol: "WETH",
    },
    decimals: 8,
    symbol: "meWETH",
    address: "0xAd7f33984bed10518012013D4aB0458D37FEE6F3",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },
  "0xf669C3C03D9fdF4339e19214A749E52616300E89": {
    underlyingToken: {
      address: "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
      decimals: 6,
      symbol: "USDT",
    },
    decimals: 8,
    symbol: "meUSDT",
    address: "0xf669C3C03D9fdF4339e19214A749E52616300E89",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },
  "0x1f27f81C1D13Dd96A3b75d42e3d5d92b709869AA": {
    underlyingToken: {
      address: "0x4af15ec2a0bd43db75dd04e62faa3b8ef36b00d5",
      decimals: 18,
      symbol: "DAI",
    },
    decimals: 8,
    symbol: "meDAI",
    address: "0x1f27f81C1D13Dd96A3b75d42e3d5d92b709869AA",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },
  "0x333D8b480BDB25eA7Be4Dd87EEB359988CE1b30D": {
    underlyingToken: {
      address: "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
      decimals: 6,
      symbol: "USDC",
    },
    decimals: 8,
    symbol: "meUSDC",
    address: "0x333D8b480BDB25eA7Be4Dd87EEB359988CE1b30D",
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
const DISTRIBUTION_ABI = [
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "rewardMarketState",
    outputs: [
      { internalType: "uint256", name: "supplySpeed", type: "uint256" },
      { internalType: "uint224", name: "supplyIndex", type: "uint224" },
      { internalType: "uint32", name: "supplyBlock", type: "uint32" },
      { internalType: "uint256", name: "borrowSpeed", type: "uint256" },
      { internalType: "uint224", name: "borrowIndex", type: "uint224" },
      { internalType: "uint32", name: "borrowBlock", type: "uint32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "rewardAccountState",
    outputs: [
      { internalType: "uint256", name: "rewardAccrued", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const REWARD_TOKEN = "0x43E8809ea748EFf3204ee01F08872F063e44065f";

const {
  multicallAddress,
  unitrollerAddress,
  oracleAddress,
  distributionAddress,
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
let usdcPrice = 0;

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
    totalCollateralUsd = totalCollateralUsd.plus(
      Big(market.userSupply)
        .mul(underlyingPrice)
        .mul(_loanToValue[market.address])
        .div(100)
    );

    // const distributionSupplyApy = _rewards[market.address].supply
    //   .mul(usdcPrice)
    //   .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd);
    // const distributionBorrowApy = _rewards[market.address].borrow
    //   .mul(usdcPrice)
    //   .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd);
    const supplyApy = Big(market.supplyRatePerBlock)
      .mul(60 * 60 * 24)
      .plus(1)
      .pow(365)
      .minus(1)
      // .add(distributionSupplyApy)
      .mul(100);

    const borrowApy = Big(market.borrowRatePerBlock)
      .mul(60 * 60 * 24)
      .plus(1)
      .pow(365)
      .minus(1)
      // .minus(distributionBorrowApy)
      .mul(100);

    let rewards;
    const reward = _accountRewards[market.address];
    if (reward && Big(reward.reward || 0).gt(0)) {
      rewards = [
        {
          icon: "https://ipfs.near.social/ipfs/bafkreidlvv5i7d44wtqtts6z7hcltylh2hv2ybjeluf4qklovf7fm6h7my",
          symbol: "MENDI",
          dailyRewards: Big(_rewards[market.address].borrow)
            .plus(_rewards[market.address].supply)
            .toString(),
          price: Big(reward.price).mul(usdcPrice),
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
        if (oTokens[i] === "0x333D8b480BDB25eA7Be4Dd87EEB359988CE1b30D")
          usdcPrice = _underlyPrice[oTokens[i]];
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
const getCTokenReward = ({ avalPrice, qiPrice, cTokens, index }) => {
  const token = cTokens[index];
  const calls = [
    {
      address: unitrollerAddress,
      name: "borrowRewardSpeeds",
      params: [0, token],
    },
    {
      address: unitrollerAddress,
      name: "borrowRewardSpeeds",
      params: [1, token],
    },
    {
      address: unitrollerAddress,
      name: "supplyRewardSpeeds",
      params: [0, token],
    },
    {
      address: unitrollerAddress,
      name: "supplyRewardSpeeds",
      params: [1, token],
    },
  ];
  multicallv2(
    UNITROLLER_ABI,
    calls,
    {},
    (res) => {
      const qiBorrow = Big(ethers.utils.formatUnits(res[0][0]._hex, 18)).mul(
        qiPrice
      );
      const avalBorrow = Big(ethers.utils.formatUnits(res[1][0]._hex, 18)).mul(
        avalPrice
      );
      const qiSupply = Big(ethers.utils.formatUnits(res[2][0]._hex, 18)).mul(
        qiPrice
      );
      const avalSupply = Big(ethers.utils.formatUnits(res[3][0]._hex, 18)).mul(
        avalPrice
      );
      _rewards[token] = {
        borrow: qiBorrow.plus(avalBorrow).mul(60 * 60 * 24 * 365),
        supply: qiSupply.plus(avalSupply).mul(60 * 60 * 24 * 365),
      };
      if (index === cTokens.length - 1) {
        count++;
        formatedData("rewards");
      } else {
        getCTokenReward({
          avalPrice,
          qiPrice,
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
const getUserRewards = (price) => {
  const cTokens = Object.keys(markets);
  const calls = cTokens.map((token) => ({
    address: distributionAddress,
    name: "rewardAccountState",
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
          ethers.utils.formatUnits(res[i][0]._hex, 18)
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
      console.log(dapp + " error-user-rewards", err);
    }
  );
};
const getRewards = () => {
  const LpContract = new ethers.Contract(
    "0xd0E67CE5E72beBA9D0986479Ea4E4021120cf794",
    [
      {
        inputs: [],
        name: "getReserves",
        outputs: [
          { internalType: "uint112", name: "_reserve0", type: "uint112" },
          { internalType: "uint112", name: "_reserve1", type: "uint112" },
          {
            internalType: "uint32",
            name: "_blockTimestampLast",
            type: "uint32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "tokenWeights",
        outputs: [
          { internalType: "uint256", name: "_reserve0", type: "uint256" },
          { internalType: "uint256", name: "_reserve1", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "listedTokens",
        outputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "address", name: "", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  LpContract.tokenWeights()
    .then((weights) => {
      const price = Big(weights[1]).div(weights[0]).toString();
      const cTokens = Object.keys(markets);
      const calls = cTokens.map((token) => ({
        address: distributionAddress,
        name: "rewardMarketState",
        params: [REWARD_TOKEN, token],
      }));
      multicallv2(
        DISTRIBUTION_ABI,
        calls,
        {},
        (res) => {
          for (let i = 0, len = cTokens.length; i < len; i++) {
            const token = cTokens[i];
            const supply = Big(
              ethers.utils.formatUnits(res[i][0]._hex, 18)
            ).mul(price);
            const borrow = Big(
              ethers.utils.formatUnits(res[i][3]._hex, 18)
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
    })
    .catch((err) => {
      console.log(err);
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
