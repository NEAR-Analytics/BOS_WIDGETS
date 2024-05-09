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
      { internalType: "bool", name: "autoCollaterize", type: "bool" },
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
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getAccountLiquidity",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
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

const {
  markets,
  multicallAddress,
  unitrollerAddress,
  oracleAddress,
  account,
  update,
  onLoad,
} = props;
if (!markets || !multicallAddress || !unitrollerAddress || !update) return "";
const MulticallContract = new ethers.Contract(
  multicallAddress,
  MULTICALL_ABI,
  Ethers.provider().getSigner()
);

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
let count = 0;
let oTokensLength = Object.values(markets).length;

const formatedData = (key) => {
  if (count < 5) return;
  count = 0;
  oTokensLength = Object.values(markets).length;
  let totalSupplyUsd = Big(0);
  let totalBorrowUsd = Big(0);
  let userTotalSupplyUsd = Big(0);
  let userTotalBorrowUsd = Big(0);
  let totalCollateralUsd = Big(0);
  const markets = Object.values(_cTokensData).map((market) => {
    const underlyingPrice = _underlyPrice[market.address];
    totalSupplyUsd = totalSupplyUsd.plus(
      Big(market.totalSupply).mul(underlyingPrice)
    );
    totalBorrowUsd = totalBorrowUsd.plus(
      Big(market.totalBorrows).mul(underlyingPrice)
    );
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
    return {
      ...market,
      loanToValue: _loanToValue[market.address],
      liquidity: _liquidity[market.address],
      underlyingPrice: underlyingPrice,
      userUnderlyingBalance: _underlyingBalance[market.address],
      userMerberShip: _userMerberShip[market.address],
      supplyApy: supplyApy + "%",
      borrowApy: borrowApy + "%",
    };
  });

  onLoad({
    markets,
    totalSupplyUsd: totalSupplyUsd.toString(),
    totalBorrowUsd: totalBorrowUsd.toString(),
    userTotalSupplyUsd: userTotalSupplyUsd.toString(),
    userTotalBorrowUsd: userTotalBorrowUsd.toString(),
    accountLiquidity: totalCollateralUsd.minus(userTotalBorrowUsd).toString(),
    healthFactor: totalCollateralUsd
      .div(userTotalBorrowUsd.eq(0) ? 1 : userTotalBorrowUsd)
      .toString(),
  });
};

const getDataFromGecko = () => {
  asyncFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=matic-network,usd-coin,tether,ethereum,bitcoin,ethereum&order=market_cap_desc&sparkline=false&locale=en&precision=full"
  ).then((res) => {
    const data = res.body || [];
    Object.values(markets).forEach((market) => {
      _underlyPrice[market.address] = data.find(
        (item) => item.id === market.geckoId
      )?.current_price;
    });
    count++;
    formatedData("getDataFromGecko");
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
              res[i][2]._hex,
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
    () => {
      getDataFromGecko();
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

      provider.getBalance(nativeOToken).then((rawBalance) => {
        _liquidity[nativeOToken] = ethers.utils.formatUnits(
          rawBalance._hex,
          18
        );
        count++;
        formatedData("getOTokenLiquidity");
      });
    },
    () => {
      setTimeout(() => {
        getOTokenLiquidity();
      }, 500);
    }
  );
};
const getWalletBalance = () => {
  if (!account) {
    _balance = {};
    return;
  }
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

const init = () => {
  getUnitrollerData();
  getUnderlyPrice();
  getOTokenLiquidity();
  getWalletBalance();
  getCTokensData();
};

init();

return "";
