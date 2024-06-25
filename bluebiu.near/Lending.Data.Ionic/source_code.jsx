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
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getAssetsIn",
    outputs: [
      { internalType: "contract OToken[]", name: "", type: "address[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
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
  collateralAddress,
  multicallAddress,
  unitrollerAddress,
  oracleAddress,
  account,
  update,
  name,
  onLoad,
  markets,
  multicall,
  prices,
} = props;

const { formatUnits, parseUnits } = ethers.utils;

useEffect(() => {
  if (!multicallAddress || !unitrollerAddress || !update || !account) return "";

  console.log(`${name}-update`);

  let _cTokensData = {};
  let _loanToValue = null;
  let _underlyPrice = {};
  let _liquidity = null;
  let _underlyingBalance = null;
  let _userMerberShip = null;
  let _collateralMap = {};
  let count = 0;
  let oTokensLength = Object.values(markets).length;

  const calcApy = (rateAsNumber) => {
    const blocksPerMin = 30;
    const daysPerYear = 365;
    const blocksPerDay = blocksPerMin * 60 * 24;
    const dailyGrowthRate = Big(rateAsNumber || 0)
      .mul(blocksPerDay)
      .toString();
    const annualGrowth =
      Math.exp(daysPerYear * Math.log1p(dailyGrowthRate)) - 1;
    const apy = Big(annualGrowth).mul(100);
    return apy;
  };

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
      // const underlyingPrice = _underlyPrice[market.address] || 1;

      let underlyingPrice =
        market.underlyingToken.symbol === "weETH.mode"
          ? prices["weETH"]
          : prices[market.underlyingToken.symbol];
      underlyingPrice = underlyingPrice || 1;

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

      // if (_userMerberShip[market.address]) {
      totalCollateralUsd = totalCollateralUsd.plus(
        Big(market.userSupply).mul(underlyingPrice).mul(market["loanToValue"])
      );
      // }
      // for ionic, every token's collateral usd
      const _userCollateralUSD = Big(market.userSupply)
        .mul(underlyingPrice)
        .mul(market["loanToValue"])
        .toString();
      const supplyApy = calcApy(market.supplyRatePerBlock);

      const borrowApy = calcApy(market.borrowRatePerBlock);

      markets[market.address] = {
        ...market,
        // loanToValue: _loanToValue[market.address],
        liquidity: _liquidity[market.address],
        underlyingPrice: underlyingPrice,
        userCollateralUSD: _userCollateralUSD,
        userUnderlyingBalance: _underlyingBalance[market.address],
        userMerberShip: _collateralMap[market.address] ? true : false,
        // userMerberShip: _userMerberShip[market.address],
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
          ? ethers.utils.formatUnits(res[0][0], 18)
          : "0";

        const totalSupply = res[1][0]
          ? ethers.utils.formatUnits(res[1][0]._hex, oToken.decimals)
          : "0";

        const userSupply = res[3][0]
          ? ethers.utils.formatUnits(res[3][0]._hex, oToken.decimals)
          : "0";

        const _totalSupply = Big(totalSupply)
          .mul(exchangeRateStored)
          .toString();

        const _totalBorrows = res[2][0]
          ? ethers.utils.formatUnits(
              res[2][0]._hex,
              oToken.underlyingToken.decimals
            )
          : "0";
        const supplyRatePerBlock = res[6][0]
          ? ethers.utils.formatUnits(res[6][0]._hex, 18)
          : "0";
        const borrowRatePerBlock = res[5][0]
          ? ethers.utils.formatUnits(res[5][0]._hex, 18)
          : "0";
        const _userSupply = Big(userSupply).mul(exchangeRateStored).toString();
        const _userBorrow = res[4][0]
          ? ethers.utils.formatUnits(
              res[4][0]._hex,
              oToken.underlyingToken.decimals
            )
          : "0";

        _cTokensData[oToken.address] = {
          ...oToken,
          exchangeRateStored,
          totalSupply: _totalSupply,
          totalBorrows: _totalBorrows,
          supplyRatePerBlock,
          borrowRatePerBlock,
          userSupply: _userSupply,
          userBorrow: _userBorrow,
        };
        if (oTokensLength === 0) {
          count++;
          formatedData("oTokens data");
        }
      })
      .catch((err) => {
        console.log("getCTokensData err", err);
        // setTimeout(() => {
        //   getCTokenData(oToken);
        // }, 1000);
      });
  };

  const getCTokensData = () => {
    Object.values(markets).forEach((market) => {
      getCTokenData(market);
    });
  };
  const getCollateralStatus = () => {
    const oTokens = Object.values(markets);
    const contract = new ethers.Contract(
      collateralAddress,
      UNITROLLER_ABI,
      Ethers.provider()
    );
    contract
      .getAssetsIn(account)
      .then((res) => {
        console.log("getCollateralStatus-res:", res, oTokens);

        if (Array.isArray(res) && res.length) {
          _collateralMap = {};
          res.forEach((addr) => {
            const _market = oTokens.find(
              (item) =>
                item.address.toLocaleLowerCase() === addr.toLocaleLowerCase()
            );

            if (_market) {
              _collateralMap[_market.address] = true;
            }
          });
        }

        count++;
        formatedData("User Borrows");
      })
      .catch((err) => {
        console.log("CATCH_getCollateralStatus_ERROR:", err);
      });
  };

  // getUnitrollerData();
  getUnderlyPrice();
  getOTokenLiquidity();
  getWalletBalance();
  getCTokensData();
  getCollateralStatus();
}, [update, account]);
