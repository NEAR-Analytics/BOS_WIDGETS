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
    name: "exchangeRateCurrent",
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
    name: "borrowBalanceCurrent",
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
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "markets",
    outputs: [
      {
        internalType: "uint256",
        name: "collateralFactorMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrowFactorMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrowCapacity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "supplyCapacity",
        type: "uint256",
      },
      { internalType: "bool", name: "mintPaused", type: "bool" },
      { internalType: "bool", name: "redeemPaused", type: "bool" },
      { internalType: "bool", name: "borrowPaused", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "address", name: "_iToken", type: "address" },
    ],
    name: "hasEnteredMarket",
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
  name,
  onLoad,
  multicall,
  markets,
} = props;

useEffect(() => {
  if (!multicallAddress || !unitrollerAddress || !update || !account) return "";
  console.log(`${name}-update`);
  let _cTokensData = {};
  let _loanToValue = null;
  let _underlyPrice = {};
  let _liquidity = null;
  let _underlyingBalance = null;
  let _userMerberShip = null;
  let count = 0;
  let oTokensLength = Object.values(markets).length;

  const formatedData = (key) => {
    console.log(`${name}-${key}`, count);
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
      const supplyApy = Big(market.supplyRatePerBlock)
        .mul(20 * 60 * 24)
        .plus(1)
        .pow(365)
        .minus(1)
        .mul(100);

      const borrowApy = Big(market.borrowRatePerBlock)
        .mul(20 * 60 * 24)
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
        dapp: name,
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
          name: "hasEnteredMarket",
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
                res[i][0]._hex,
                16
              );
              break;
            case 1:
              _userMerberShip[oTokens[index].address] = res[i][0] || false;
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
    const calls = oTokens.map((token) => ({
      address: oracleAddress,
      name: "getUnderlyingPrice",
      params: [token],
    }));
    multicall({
      abi: ORACLE_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        _underlyPrice = {};
        for (let i = 0, len = res.length; i < len; i++) {
          _underlyPrice[oTokens[i]] = ethers.utils.formatUnits(
            res[i][0]._hex,
            36 - markets[oTokens[i]].underlyingToken.decimals
          );
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
          _liquidity[oToken.address] = res[i][0]
            ? ethers.utils.formatUnits(
                res[i][0]._hex,
                oToken.underlyingToken.decimals
              )
            : "0";
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
      .catch((err) => {
        console.log("getOTokenLiquidity-err", err);
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
            formatedData("getWalletBalance");
          });
        } else {
          count++;
          formatedData("getWalletBalance");
        }
      })
      .catch(() => {
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
        name: "exchangeRateCurrent",
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
        name: "borrowBalanceCurrent",
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
    multicall({
      abi: OTOKEN_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        oTokensLength--;
        const exchangeRateStored = res[0][0]
          ? ethers.utils.formatUnits(res[0][0]._hex, 18)
          : "0";
        const totalSupply = res[1][0]
          ? ethers.utils.formatUnits(res[1][0]._hex, oToken.decimals)
          : "0";
        const userSupply = res[3][0]
          ? ethers.utils.formatUnits(res[3][0]._hex, oToken.decimals)
          : "0";
        _cTokensData[oToken.address] = {
          ...oToken,
          exchangeRateStored,
          totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
          totalBorrows: res[2][0]
            ? ethers.utils.formatUnits(
                res[2][0]._hex,
                oToken.underlyingToken.decimals
              )
            : "0",
          supplyRatePerBlock: res[6][0]
            ? ethers.utils.formatUnits(res[6][0]._hex, 18)
            : "0",
          borrowRatePerBlock: res[5][0]
            ? ethers.utils.formatUnits(res[5][0]._hex, 18)
            : "0",
          userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
          userBorrow: res[4][0]
            ? ethers.utils.formatUnits(
                res[4][0]._hex,
                oToken.underlyingToken.decimals
              )
            : "0",
        };
        if (oTokensLength === 0) {
          count++;
          formatedData("oTokens data");
        }
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
  getUnitrollerData();
  getUnderlyPrice();
  getOTokenLiquidity();
  getWalletBalance();
  getCTokensData();
}, [update, account]);
