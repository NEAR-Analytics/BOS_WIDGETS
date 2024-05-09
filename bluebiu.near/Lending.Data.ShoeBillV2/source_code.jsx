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
  {
    inputs: [],
    name: "reserveFactorMantissa",
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

const { multicallAddress, account, update, dapp, onLoad, multicall, markets } =
  props;

useEffect(() => {
  if (!multicallAddress || !update || !account) return "";
  console.log(`${dapp}-update`);
  let _cTokensData = {};
  let _loanToValue = {};
  let _underlyPrice = {};
  let _liquidity = null;
  let _underlyingBalance = null;
  let count = 0;
  let oTokensLength = Object.values(markets).length;

  const formatedData = (key) => {
    console.log(`${dapp}-${key}`, count);
    if (count < 4) return;
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
      const supplyApy = Big(market.supplyRatePerBlock)
        .mul(4 * 60 * 24)
        .plus(1)
        .pow(365)
        .minus(1)
        .mul(100);

      const borrowApy = Big(market.borrowRatePerBlock)
        .mul(4 * 60 * 24)
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
  const getUnderlyPrice = () => {
    Object.values(markets).forEach((market) => {
      _underlyPrice[market.address] =
        prices[
          market.underlyingToken.priceKey || market.underlyingToken.symbol
        ] || "1";
    });
    count++;
    formatedData("getUnderlyPrice");
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
      {
        address: oToken.address,
        name: "reserveFactorMantissa",
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
          ? ethers.utils.formatUnits(
              res[0][0]._hex,
              10 + oToken.underlyingToken.decimals
            )
          : "0";
        const totalSupply = res[1][0]
          ? ethers.utils.formatUnits(res[1][0]._hex, oToken.decimals)
          : "0";
        const userSupply = res[3][0]
          ? ethers.utils.formatUnits(res[3][0]._hex, oToken.decimals)
          : "0";
        _loanToValue[oToken.address] = ethers.utils.formatUnits(
          res[7][0]._hex,
          16
        );
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
      .catch((err) => {
        console.log("oTokens data err", err);
        // setTimeout(() => {
        //   getCTokenData(oToken);
        // }, 500);
      });
  };
  const getCTokensData = () => {
    Object.values(markets).forEach((market) => {
      getCTokenData(market);
    });
  };
  getUnderlyPrice();
  getOTokenLiquidity();
  getWalletBalance();
  getCTokensData();
}, []);
