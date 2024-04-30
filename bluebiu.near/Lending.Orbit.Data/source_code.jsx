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
    name: "totalSupply",
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
  //
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOfUnderlying",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "borrowBalanceStored",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
    name: "totalBorrows",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalReserves",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
const SPACE_ABI = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "compSupplySpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getAssetsIn",
    outputs: [
      { internalType: "contract OToken[]", name: "", type: "address[]" },
    ],
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
  multicall,
  ORBIT_MARKETS,
  RENZO_MARKETS,
  KELP_MARKETS,
  ORBIT_ADDRESS,
  REOZO_ADDRESS,
  KELP_ADDRESS,
  prices,
  orbitTab,
} = props;

const { formatUnits } = ethers.utils;
console.log("ORIBIT-DATA-PROPS--", props);
useEffect(() => {
  if (!multicallAddress || !update || !account) return "";
  let markets;
  let spaceAddress;
  if (orbitTab === "ORBIT") {
    markets = ORBIT_MARKETS;
    spaceAddress = ORBIT_ADDRESS;
  }
  if (orbitTab === "RENZO") {
    markets = RENZO_MARKETS;
    spaceAddress = REOZO_ADDRESS;
  }
  if (orbitTab === "KELP") {
    markets = KELP_MARKETS;
    spaceAddress = KELP_ADDRESS;
  }
  console.log(`${name}-update`);
  let _cTokensData = {};
  let _underlyPrice = {};
  let _liquidity = null;
  let _underlyingBalance = null;
  let count = 0;
  const oTokens = Object.values(markets);
  let oTokensLength = Object.values(markets).length;

  const formatedData = (key) => {
    console.log(`${name}-${key}`, count);
    if (count < 13) return;
    count = 0;
    oTokensLength = Object.values(markets).length;

    let userTotalSupplyUsd = Big(0);
    let userTotalBorrowUsd = Big(0);
    let totalCollateralUsd = Big(0);
    const markets = {};
    Object.values(_cTokensData).forEach((market) => {
      // console.log("---", market);
      // console.log(
      //   market.symbol,
      //   prices[market.symbol],
      //   market.userSupply
      // );
      let underlyingPrice;
      if (market.symbol === "fwWETH") {
        underlyingPrice = prices["oETH"];
      } else {
        underlyingPrice = prices[market.symbol] || 1;
      }

      userTotalSupplyUsd = userTotalSupplyUsd.plus(
        Big(market.userSupply).mul(underlyingPrice)
      );
      userTotalBorrowUsd = userTotalBorrowUsd.plus(
        Big(market.userBorrow).mul(underlyingPrice)
      );

      const _collaterd = market.isCollateral
        ? Big(market.userSupply).mul(underlyingPrice)
        : 0;

      totalCollateralUsd = totalCollateralUsd.plus(_collaterd);

      const supplyApy = Big(market.supplyRatePerBlock).mul(15768000).mul(100);
      const borrowApy = Big(market.borrowRatePerBlock).mul(15768000).mul(100);

      const _poolSize = Big(market.cash || 0)
        .plus(Big(market.totalBorrows || 0))
        .plus(Big(market.totalReserves || 0))
        .toString();
      // .times(Big(underlyingPrice))

      markets[market.address] = {
        ...market,
        // liquidity: _liquidity[market.address],
        underlyingPrice: underlyingPrice,
        userUnderlyingBalance: _underlyingBalance[market.address],
        supplyApy: supplyApy.toFixed(2) + "%",
        borrowApy: borrowApy.toFixed(2) + "%",
        poolSize: _poolSize,
        dapp: name,
      };
    });
    // orbit ltv=0.75
    const _borrowLimitUsd = totalCollateralUsd
      .mul(0.75)
      .minus(userTotalBorrowUsd);

    onLoad({
      markets,
      userTotalSupplyUsd: userTotalSupplyUsd.toString(),
      userTotalBorrowUsd: userTotalBorrowUsd.toString(),
      totalCollateralUsd: totalCollateralUsd.toString(),
      borrowLimitUsd: _borrowLimitUsd.gt(0) ? _borrowLimitUsd.toString() : 0,
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
  const getBorrowRatePerBlock = () => {
    const calls = oTokens.map((oToken) => ({
      address: oToken.address,
      name: "borrowRatePerBlock",
    }));
    multicall({
      abi: OTOKEN_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getBorrowRatePerBlock_res:", res);
        oTokens.forEach((oToken, index) => {
          if (_cTokensData[oToken.address]) {
            _cTokensData[oToken.address] = {
              ..._cTokensData[oToken.address],
              borrowRatePerBlock: res[index] ? formatUnits(res[index][0]) : 0,
            };
          } else {
            _cTokensData[oToken.address] = {
              ...oToken,
              borrowRatePerBlock: res[index] ? formatUnits(res[index][0]) : 0,
            };
          }
        });
        count++;
        formatedData("oTokens data");
      })
      .catch((err) => {
        console.log("getBorrowRatePerBlock_error:", err);
      });
  };

  const getSupplyRatePerBlock = () => {
    const calls = oTokens.map((oToken) => ({
      address: oToken.address,
      name: "supplyRatePerBlock",
    }));
    multicall({
      abi: OTOKEN_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getSupplyRatePerBlock_res:", res);
        oTokens.forEach((oToken, index) => {
          if (_cTokensData[oToken.address]) {
            _cTokensData[oToken.address] = {
              ..._cTokensData[oToken.address],
              supplyRatePerBlock: res[index] ? formatUnits(res[index][0]) : 0,
            };
          } else {
            _cTokensData[oToken.address] = {
              ...oToken,
              supplyRatePerBlock: res[index] ? formatUnits(res[index][0]) : 0,
            };
          }
        });
        count++;
        formatedData("oTokens data");
      })
      .catch((err) => {
        console.log("getSupplyRatePerBlock_error:", err);
      });
  };

  const getUserSupply = () => {
    const calls = oTokens.map((oToken) => ({
      address: oToken.address,
      name: "balanceOfUnderlying",
      params: [account],
    }));
    multicall({
      abi: OTOKEN_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getUserSupply_res:", res, _cTokensData);
        oTokens.forEach((oToken, index) => {
          if (_cTokensData[oToken.address]) {
            _cTokensData[oToken.address] = {
              ..._cTokensData[oToken.address],
              userSupply: res[index]
                ? formatUnits(res[index][0], oToken.decimals)
                : 0,
            };
          } else {
            _cTokensData[oToken.address] = {
              ...oToken,
              userSupply: res[index]
                ? formatUnits(res[index][0], oToken.decimals)
                : 0,
            };
          }
        });
        count++;
        formatedData("oTokens data");
      })
      .catch((err) => {
        console.log("getUserSupply_error:", err);
      });
  };
  const getUserBorrows = () => {
    const calls = oTokens.map((oToken) => ({
      address: oToken.address,
      name: "borrowBalanceStored",
      params: [account],
    }));
    multicall({
      abi: OTOKEN_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getUserBorrows_res:", res, _cTokensData);
        oTokens.forEach((oToken, index) => {
          if (_cTokensData[oToken.address]) {
            _cTokensData[oToken.address] = {
              ..._cTokensData[oToken.address],
              userBorrow: res[index]
                ? formatUnits(res[index][0], oToken.decimals)
                : 0,
            };
          } else {
            _cTokensData[oToken.address] = {
              ...oToken,
              userBorrow: res[index]
                ? formatUnits(res[index][0], oToken.decimals)
                : 0,
            };
          }
        });
        count++;
        formatedData("User Borrows");
      })
      .catch((err) => {
        console.log("getUserBorrows_error:", err);
      });
  };
  const getCollateralStatus = () => {
    const contract = new ethers.Contract(
      spaceAddress,
      SPACE_ABI,
      Ethers.provider()
    );
    contract
      .getAssetsIn(account)
      .then((res) => {
        console.log("getCollateralStatus-res:", spaceAddress, res);
        if (Array.isArray(res) && res.length) {
          res.forEach((addr) => {
            const _market = oTokens.find(
              (item) =>
                item.address.toLocaleLowerCase() === addr.toLocaleLowerCase()
            );

            if (_market) {
              _market.isCollateral = true;
            }
          });

          oTokens.forEach((oToken, index) => {
            if (_cTokensData[oToken.address]) {
              _cTokensData[oToken.address] = {
                ..._cTokensData[oToken.address],
                isCollateral: oToken.isCollateral,
              };
            } else {
              _cTokensData[oToken.address] = {
                ...oToken,
                isCollateral: oToken.isCollateral,
              };
            }
          });
        } else {
          oTokens.forEach((oToken, index) => {
            if (_cTokensData[oToken.address]) {
              _cTokensData[oToken.address] = {
                ..._cTokensData[oToken.address],
                isCollateral: false,
              };
            } else {
              _cTokensData[oToken.address] = {
                ...oToken,
                isCollateral: false,
              };
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
  const getPoolCash = () => {
    const calls = oTokens.map((oToken) => ({
      address: oToken.address,
      name: "getCash",
    }));
    multicall({
      abi: OTOKEN_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getPoolCash_res:", res, _cTokensData);
        oTokens.forEach((oToken, index) => {
          if (_cTokensData[oToken.address]) {
            _cTokensData[oToken.address] = {
              ..._cTokensData[oToken.address],
              cash: res[index]
                ? formatUnits(res[index][0], oToken.decimals)
                : 0,
            };
          } else {
            _cTokensData[oToken.address] = {
              ...oToken,
              cash: res[index]
                ? formatUnits(res[index][0], oToken.decimals)
                : 0,
            };
          }
        });
        count++;
        formatedData("oTokens data");
      })
      .catch((err) => {
        console.log("getPoolCash_error:", err);
      });
  };
  const getTotalBorrows = () => {
    const calls = oTokens.map((oToken) => ({
      address: oToken.address,
      name: "totalBorrows",
    }));
    multicall({
      abi: OTOKEN_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("totalBorrows_res:", res, _cTokensData);
        oTokens.forEach((oToken, index) => {
          if (_cTokensData[oToken.address]) {
            _cTokensData[oToken.address] = {
              ..._cTokensData[oToken.address],
              totalBorrows: res[index]
                ? formatUnits(res[index][0], oToken.decimals)
                : 0,
            };
          } else {
            _cTokensData[oToken.address] = {
              ...oToken,
              totalBorrows: res[index]
                ? formatUnits(res[index][0], oToken.decimals)
                : 0,
            };
          }
        });
        count++;
        formatedData("oTokens data");
      })
      .catch((err) => {
        console.log("totalBorrows_error:", err);
      });
  };
  const getTotalReserves = () => {
    const calls = oTokens.map((oToken) => ({
      address: oToken.address,
      name: "totalReserves",
    }));
    multicall({
      abi: OTOKEN_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("totalReserves_res:", res, _cTokensData);
        oTokens.forEach((oToken, index) => {
          if (_cTokensData[oToken.address]) {
            _cTokensData[oToken.address] = {
              ..._cTokensData[oToken.address],
              totalReserves: res[index]
                ? formatUnits(res[index][0], oToken.decimals)
                : 0,
            };
          } else {
            _cTokensData[oToken.address] = {
              ...oToken,
              totalReserves: res[index]
                ? formatUnits(res[index][0], oToken.decimals)
                : 0,
            };
          }
        });
        count++;
        formatedData("oTokens data");
      })
      .catch((err) => {
        console.log("totalReserves_error:", err);
      });
  };
  const getCompSpeed = () => {
    const calls = oTokens.map((oToken) => ({
      address: spaceAddress,
      name: "compSupplySpeeds",
      params: [oToken.address],
    }));
    multicall({
      abi: SPACE_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getCompSpeed_res:", res, _cTokensData);
        oTokens.forEach((oToken, index) => {
          if (_cTokensData[oToken.address]) {
            _cTokensData[oToken.address] = {
              ..._cTokensData[oToken.address],
              compSupplySpeed: res[index],
            };
          } else {
            _cTokensData[oToken.address] = {
              ...oToken,
              compSupplySpeed: res[index],
            };
          }
        });
        count++;
        formatedData("oTokens data");
      })
      .catch((err) => {
        console.log("getCompSpeed_error:", err);
      });
  };
  const getOTokenBalance = () => {
    const calls = oTokens.map((oToken) => ({
      address: oToken.address,
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
        console.log("getOTokenBalance_res:", res, _cTokensData);
        oTokens.forEach((oToken, index) => {
          // let oTokenBalance = res[index]
          //   ? formatUnits(res[index][0], oToken.decimals)
          //   : 0;
          let oTokenBalance = res[index] ? res[index][0] : 0;
          if (_cTokensData[oToken.address]) {
            _cTokensData[oToken.address] = {
              ..._cTokensData[oToken.address],
              oTokenBalance,
            };
          } else {
            _cTokensData[oToken.address] = {
              ...oToken,
              oTokenBalance,
            };
          }
        });
        count++;
        formatedData("oTokens data");
      })
      .catch((err) => {
        console.log("getOTokenBalance_error", err);
      });
  };
  const getOTokenTotalSupply = () => {
    const calls = oTokens.map((oToken) => ({
      address: oToken.address,
      name: "totalSupply",
    }));
    multicall({
      abi: OTOKEN_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getOTokenTotalSupply_res:", res, _cTokensData);
        oTokens.forEach((oToken, index) => {
          if (_cTokensData[oToken.address]) {
            _cTokensData[oToken.address] = {
              ..._cTokensData[oToken.address],
              oTokenTotalSupply: res[index],
            };
          } else {
            _cTokensData[oToken.address] = {
              ...oToken,
              oTokenTotalSupply: res[index],
            };
          }
        });
        count++;
        formatedData("oTokens data");
      })
      .catch((err) => {
        console.log("getOTokenTotalSupply_error", err);
      });
  };
  getUnderlyPrice();
  // getOTokenLiquidity();
  getWalletBalance();
  // getCTokensData();
  getBorrowRatePerBlock();
  getSupplyRatePerBlock();
  getUserSupply();
  getUserBorrows();
  getCollateralStatus();
  getPoolCash();
  getTotalBorrows();
  getTotalReserves();
  getCompSpeed();
  getOTokenBalance();
  getOTokenTotalSupply();
}, [update, account, orbitTab]);
