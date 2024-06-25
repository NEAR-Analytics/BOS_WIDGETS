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
  multicallAddress,
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
  if (!multicallAddress || !update || !account) return "";

  console.log(`${name}-update`);

  let _cTokensData = {};

  let _underlyPrice = {};
  let _liquidity = null;
  let _underlyingBalance = null;
  let _userMerberShip = null;
  let _collateralMap = {};
  let _minBorrowMap = {};
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
      // // const underlyingPrice = _underlyPrice[market.address] || 1;

      // let underlyingPrice =
      //   market.underlyingToken.symbol === "weETH.mode"
      //     ? prices["weETH"]
      //     : prices[market.underlyingToken.symbol];
      // underlyingPrice = underlyingPrice || 1;

      // const marketSupplyUsd = Big(market.totalSupply || 0).mul(underlyingPrice);
      // const marketBorrowUsd = Big(market.totalBorrows || 0).mul(
      //   underlyingPrice
      // );
      // totalSupplyUsd = totalSupplyUsd.plus(marketSupplyUsd);
      // totalBorrowUsd = totalBorrowUsd.plus(marketBorrowUsd);
      // userTotalSupplyUsd = userTotalSupplyUsd.plus(
      //   Big(market.userSupply).mul(underlyingPrice)
      // );
      // userTotalBorrowUsd = userTotalBorrowUsd.plus(
      //   Big(market.userBorrow).mul(underlyingPrice)
      // );

      // // if (_userMerberShip[market.address]) {
      // totalCollateralUsd = totalCollateralUsd.plus(
      //   Big(market.userSupply)
      //     .mul(underlyingPrice)
      //     .mul(market["COLLATERAL_FACTOR"])
      // );
      // // }
      // // for ionic, every token's collateral usd
      // const _userCollateralUSD = Big(market.userSupply)
      //   .mul(underlyingPrice)
      //   .toString();
      // const supplyApy = calcApy(market.supplyRatePerBlock);

      // const borrowApy = calcApy(market.borrowRatePerBlock);

      // const _minBorrowAmount = Big(
      //   formatUnits(_minBorrowMap[market.address][0])
      // )
      //   .times(Big(prices["ETH"] || 0))
      //   .div(underlyingPrice)
      //   .toFixed(6, 0);

      markets[market.address] = {
        ...market,

        // liquidity: _liquidity[market.address],
        // underlyingPrice: underlyingPrice,
        // userCollateralUSD: _userCollateralUSD,
        // userUnderlyingBalance: _underlyingBalance[market.address],
        // userMerberShip: _collateralMap[market.address] ? true : false,
        // // userMerberShip: _userMerberShip[market.address],
        // supplyApy: supplyApy.toFixed(2) + "%",
        // borrowApy: borrowApy.toFixed(2) + "%",
        // minBorrowAmount: _minBorrowAmount,
        // dapp: name,
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

  const getMinBorrow = () => {
    const cTokens = Object.keys(markets);

    const calls = cTokens.map((_cToken) => ({
      address: "0x8ea3fc79D9E463464C5159578d38870b770f6E57",
      name: "getMinBorrowEth",
      params: [_cToken],
    }));
    multicall({
      abi: [
        {
          inputs: [
            {
              internalType: "contract ICErc20",
              name: "_ctoken",
              type: "address",
            },
          ],
          name: "getMinBorrowEth",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getMinBorrow-res:", res);

        if (Array.isArray(res) && res.length) {
          _minBorrowMap = {};
          res.forEach((_rawMinAmount, index) => {
            _minBorrowMap[cTokens[index]] = _rawMinAmount;
          });
        }

        count++;
        formatedData("getMinBorrow");
      })
      .catch((err) => {
        console.log("CATCH_getMinBorrow_ERROR:", err);
      });
  };

  getUnderlyPrice();
  getWalletBalance();
  getMinBorrow();
}, [update, account]);
