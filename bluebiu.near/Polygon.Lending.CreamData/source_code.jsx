const markets = {
  "0xf976C9bc0E16B250E0B1523CffAa9E4c07Bc5C8a": {
    underlyingToken: {
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      decimals: 6,
      symbol: "USDT",
    },
    decimals: 8,
    symbol: "crUSDT",
    address: "0xf976C9bc0E16B250E0B1523CffAa9E4c07Bc5C8a",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },
  "0x3FaE5e5722C51cdb5B0afD8c7082e8a6AF336Ee8": {
    underlyingToken: {
      address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      decimals: 18,
      symbol: "WMATIC",
    },
    decimals: 8,
    symbol: "crMATIC",
    address: "0x3FaE5e5722C51cdb5B0afD8c7082e8a6AF336Ee8",
    icon: "https://ipfs.near.social/ipfs/bafkreih5yowurclpyrr5bwzonh76ywld22riv4mjp2scne6ye7746dcjl4",
  },
  "0x73CF8c5D14Aa0EbC89f18272A568319F5BAB6cBD": {
    underlyingToken: {
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      decimals: 6,
      symbol: "USDC",
    },
    decimals: 8,
    symbol: "crUSDC",
    address: "0x73CF8c5D14Aa0EbC89f18272A568319F5BAB6cBD",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0x7ef18d0a9C3Fb1A716FF6c3ED0Edf52a2427F716": {
    underlyingToken: {
      address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      decimals: 18,
      symbol: "WETH",
    },
    decimals: 8,
    symbol: "crWETH",
    address: "0x7ef18d0a9C3Fb1A716FF6c3ED0Edf52a2427F716",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },
  "0x4486835e0C567A320C0636d8F6e6e6679A46a271": {
    underlyingToken: {
      address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
      decimals: 18,
      symbol: "AAVE",
    },
    decimals: 8,
    symbol: "crAAVE",
    address: "0x4486835e0C567A320C0636d8F6e6e6679A46a271",
    icon: "https://ipfs.near.social/ipfs/bafkreicmsnivbvp2xd3ewcjb5kybgnbnevbcojhn4mgub7rregnbtqcige",
  },
  "0x2eE80614Ccbc5e28654324a66A396458Fa5cD7Cc": {
    underlyingToken: {
      address: "0x831753dd7087cac61ab5644b308642cc1c33dc13",
      decimals: 18,
      symbol: "QUICK",
    },
    decimals: 8,
    symbol: "crQUICK",
    address: "0x2eE80614Ccbc5e28654324a66A396458Fa5cD7Cc",
    icon: "https://ipfs.near.social/ipfs/bafkreic7svq723bgukivtik7lb3xujjq24s7wsxto4bfzlh235k2ejzjme",
  },
  "0x20d5d319C2964ecb52e1B006a4C059b7f6d6ad0a": {
    underlyingToken: {
      address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
      decimals: 18,
      symbol: "LINK",
    },
    decimals: 8,
    symbol: "crLINK",
    address: "0x20d5d319C2964ecb52e1B006a4C059b7f6d6ad0a",
    icon: "https://ipfs.near.social/ipfs/bafkreidrq7qk3d6epwaxobq4gk7yowljr5tnslxwrsbd7vnw3srkt7ok3u",
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
    constant: true,
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "borrowBalanceStored",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
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
  multicallAddress,
  unitrollerAddress,
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
let count = 0;
let oTokensLength = Object.values(markets).length;

const formatedData = (key) => {
  console.log(`${dapp}-${key}`, count);
  if (count < 5) return;
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
    const supplyApy = Big(market.supplyRatePerBlock)
      .mul(30 * 60 * 24)
      .plus(1)
      .pow(365)
      .minus(1)
      .mul(100);

    const borrowApy = Big(market.borrowRatePerBlock)
      .mul(30 * 60 * 24)
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
      dapp,
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
      name: "balanceOf",
      params: [account],
    },
    {
      address: oToken.address,
      name: "borrowBalanceStored",
      params: [account],
    },
    {
      address: oToken.address,
      name: "borrowRatePerBlock",
    },
    {
      address: oToken.address,
      name: "supplyRatePerBlock",
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
      const totalSupply = ethers.utils.formatUnits(
        res[1][0]._hex,
        oToken.decimals
      );
      const userSupply = ethers.utils.formatUnits(
        res[3][0]._hex,
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
        supplyRatePerBlock: ethers.utils.formatUnits(res[6][0]._hex, 18),
        borrowRatePerBlock: ethers.utils.formatUnits(res[5][0]._hex, 18),
        userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
        userBorrow: ethers.utils.formatUnits(
          res[4][0]._hex,
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
