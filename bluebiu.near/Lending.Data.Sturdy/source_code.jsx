const {
  multicallAddress,
  multicall,
  account,
  prices,
  dexConfig,
  update,
  onLoad,
} = props;
const { rawMarkets, TOKENS } = dexConfig;

const ABI = [
  {
    inputs: [],
    name: "totalSupply",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
  {
    inputs: [],
    name: "totalBorrow",
    outputs: [
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "shares",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssets",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getUserSnapshot",
    outputs: [
      {
        internalType: "uint256",
        name: "_userAssetShares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_userBorrowShares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_userCollateralBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
    ],
    name: "convertToAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cleanLiquidationFee",
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
  {
    inputs: [],
    name: "maxLTV",
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

const RATE_ABI = [
  {
    inputs: [],
    name: "MAX_FULL_UTIL_RATE",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_deltaTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_utilization",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "_oldFullUtilizationInterest",
        type: "uint64",
      },
    ],
    name: "getNewRate",
    outputs: [
      {
        internalType: "uint64",
        name: "_newRatePerSec",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "_newFullUtilizationInterest",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const { formatUnits, parseUnits } = ethers.utils;
useEffect(() => {
  if (!account || !update || !multicallAddress) return;
  let count = 0;
  let _balanceRes = [];
  let _totalBorrowRes = [];
  let _totalAssetsRes = [];
  let _liquidationFeeRes = [];
  let _maxLTVRes = [];
  let _totalSupplyRes = [];
  let _yourBorrows = [];
  let _yourCollaterals = [];
  let _yourLends = [];
  let _maxRateRes = [];
  // let _ratePerSecRes = [];

  function formatData(params) {
    console.log(params, count);
    if (count < 9) return;
    count = 0;
    for (let i = 0; i < rawMarkets.length; i++) {
      rawMarkets[i].totalSupplied = formatUnits(
        _totalSupplyRes[i][0],
        rawMarkets[i].TOKEN_B.decimals
      ).toString();
      rawMarkets[i].totalBorrows = _totalBorrowRes[i]
        ? _totalBorrowRes[i][0]
        : 0;
      rawMarkets[i].totalAssets = _totalAssetsRes[i]
        ? _totalAssetsRes[i][0]
        : 0;

      rawMarkets[i].liquidationFee = formatUnits(_liquidationFeeRes[i][0], 5);
      rawMarkets[i].maxLTV = formatUnits(_maxLTVRes[i][0], 5);

      const yourBorrow = _yourBorrows[i]
        ? formatUnits(_yourBorrows[i][0], rawMarkets[i].TOKEN_B.decimals)
        : 0;
      rawMarkets[i].yourBorrow = yourBorrow;
      rawMarkets[i].yourBorrowUSD = Big(yourBorrow)
        .times(Big(prices[rawMarkets[i].TOKEN_B.symbol] || 1))
        .toFixed();

      const yourCollateral = _yourCollaterals[i]
        ? formatUnits(_yourCollaterals[i][0], rawMarkets[i].TOKEN_A.decimals)
        : 0;
      rawMarkets[i].yourCollateral = yourCollateral;
      rawMarkets[i].yourCollateralUSD = Big(yourCollateral)
        .times(Big(prices[rawMarkets[i].TOKEN_A.symbol] || 1))
        .toFixed();
      const yourLends = _yourLends[i]
        ? formatUnits(_yourLends[i][0], rawMarkets[i].TOKEN_B.decimals)
        : 0;

      rawMarkets[i].yourLends = yourLends;
      rawMarkets[i].yourLendsUSD = Big(yourLends)
        .times(Big(prices[rawMarkets[i].TOKEN_B.symbol] || 1))
        .toFixed();

      rawMarkets[i].MAX_FULL_UTIL_RATE = _maxRateRes[i] ? _maxRateRes[i][0] : 0;
    }
    for (let i = 0; i < rawMarkets.length; i++) {
      rawMarkets[i].Utilization = Big(rawMarkets[i].totalBorrows)
        .div(Big(rawMarkets[i].totalAssets))
        .toFixed(4);
    }
    getNewRates(rawMarkets);

    // for (let i = 0; i < rawMarkets.length; i++) {
    //   rawMarkets[i].ratePerSecRes = _ratePerSecRes[i][0];
    // }
    for (let i = 0; i < _balanceRes.length; i++) {
      TOKENS[i].balance = formatUnits(
        _balanceRes[i] ? _balanceRes[i][0] : 0,
        TOKENS[i].decimals
      );
    }

    const yourTotalCollateraledUSD = rawMarkets.reduce((total, item) => {
      return Big(total).plus(Big(item.yourCollateralUSD)).toFixed();
    }, 0);
    const yourTotalBorrowUSD = rawMarkets.reduce((total, item) => {
      return Big(total).plus(Big(item.yourBorrowUSD)).toFixed();
    }, 0);
    const yourTotalDepositUSD = rawMarkets.reduce((total, item) => {
      return Big(total).plus(Big(item.yourLendsUSD)).toFixed();
    }, 0);
    onLoad({
      markets: rawMarkets,
      TOKENS,
      yourTotalCollateraledUSD,
      yourTotalBorrowUSD,
      yourTotalDepositUSD,
    });
  }

  function getTotalBorrow() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "totalBorrow",
      // params: [],
    }));

    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getTotalBorrow_res", res);
        _totalBorrowRes = res;
        count++;
        formatData("getTotalBorrow");
      })
      .catch((err) => {
        console.log("getTotalAssets_error:", err);
      });
  }
  function getTotalAssets() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "totalAssets",
      // params: [],
    }));

    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getTotalAssets--", res);
        _totalAssetsRes = res;
        count++;
        formatData("getTotalAssets");
      })
      .catch((err) => {
        console.log("getTotalAssets_error:", err);
      });
  }

  function getLiquidationFee() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "cleanLiquidationFee",
      // params: [],
    }));

    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("get cleanLiquidationFee--", res);
        _liquidationFeeRes = res;
        count++;
        formatData("getLiquidationFee");
      })
      .catch((err) => {
        console.log("getcleanLiquidationFee_error:", err);
      });
  }

  function getMaxLTV() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "maxLTV",
      // params: [],
    }));

    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("get getMaxLTV--", res);
        _maxLTVRes = res;
        count++;
        formatData("getMaxLTV");
      })
      .catch((err) => {
        console.log("get MaxLTV_error:", err);
      });
  }
  function getTotalSupply() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "totalSupply",
    }));

    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getTotalSupply--", res);
        _totalSupplyRes = res;
        count++;
        formatData("getTotalSupply");
      })
      .catch((err) => {
        console.log("getTotalSupply-error:", err);
      });
  }

  function getUserSnapshot() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "getUserSnapshot",
      params: [account],
    }));

    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getUserSnapshot--", res);
        return res;
      })
      .then((snapshot) => {
        const calls = rawMarkets.map((item, index) => {
          const snapshotItem = snapshot[index] ? snapshot[index] : [0, 0, 0];
          const [rest, borrowShares, collateralShares] = snapshotItem;
          return {
            address: item.POOL_MANAGER,
            name: "convertToAssets",
            params: [borrowShares],
          };
        });

        multicall({
          abi: ABI,
          calls,
          options: {},
          multicallAddress,
          provider: Ethers.provider(),
        }).then((res) => {
          // console.log("convertToAssets--", res);
          _yourBorrows = res;
          count++;
          formatData("getUserSnapshot");
        });
        return snapshot;
      })
      .then((snapshot) => {
        const calls = rawMarkets.map((item, index) => {
          const snapshotItem = snapshot[index] ? snapshot[index] : [0, 0, 0];
          const [rest, borrowShares, collateralShares] = snapshotItem;
          return {
            address: item.POOL_MANAGER,
            name: "convertToAssets",
            params: [collateralShares],
          };
        });

        multicall({
          abi: ABI,
          calls,
          options: {},
          multicallAddress,
          provider: Ethers.provider(),
        }).then((res) => {
          console.log("convertToAssets--", res);
          _yourCollaterals = res;
          count++;
          formatData("convertToAssets");
        });
      })
      .catch((err) => {
        console.log("getUserSnapshot-error:", err);
      });
  }
  function getUserLends() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "balanceOf",
      params: [account],
    }));

    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getUserLends--", res);
        return res;
      })
      .then((lendShare) => {
        const calls = rawMarkets.map((item, index) => {
          const _lendShare = lendShare[index] ? lendShare[index][0] : 0;
          return {
            address: item.POOL_MANAGER,
            name: "convertToAssets",
            params: [_lendShare],
          };
        });

        multicall({
          abi: ABI,
          calls,
          options: {},
          multicallAddress,
          provider: Ethers.provider(),
        }).then((res) => {
          console.log("convertToAssets--", res);
          _yourLends = res;
          count++;
          formatData("getUserLends");
        });
      })

      .catch((err) => {
        console.log("getUserSnapshot-error:", err);
      });
  }

  function getWalletBalance() {
    let nativeOToken = "";

    const calls = TOKENS.map((token) => ({
      address: token.address,
      name: "balanceOf",
      params: [account],
    }));

    multicall({
      abi: [
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
      ],
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("get_wallet_bal_res:", res);
        _balanceRes = res;
        count++;
        formatData("getWalletBalance");
      })
      .catch((err) => {
        console.log("getWalletBalance_error", err);
      });
  }
  function getRate() {
    // RATE_CONTRACT

    const contract = new ethers.Contract(
      "0xAE610460522F3e71c40Ad6a2c70f486341B88Daf",
      [
        {
          inputs: [],
          name: "MAX_FULL_UTIL_RATE",
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
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_deltaTime",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_utilization",
              type: "uint256",
            },
            {
              internalType: "uint64",
              name: "_oldFullUtilizationInterest",
              type: "uint64",
            },
          ],
          name: "getNewRate",
          outputs: [
            {
              internalType: "uint64",
              name: "_newRatePerSec",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "_newFullUtilizationInterest",
              type: "uint64",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );
    contract
      .getNewRate(0, 0, 0)
      .then((res) => {
        console.log(111, res, res[1].toString());

        // _totalBorrowRes = res;
        count++;
        formatData("getRate");
      })
      .catch((err) => {
        console.log(222, err);
      });
  }

  function getMaxRates() {
    const calls = rawMarkets.map((item) => ({
      address: item.RATE_CONTRACT,
      name: "MAX_FULL_UTIL_RATE",
      // params: [],
    }));

    multicall({
      abi: RATE_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getMaxRates--", res);
        _maxRateRes = res;
        count++;
        formatData("getMaxRates");
      })
      .catch((err) => {
        console.log("getRates-error:", err);
      });
  }
  function getNewRates(rawMarkets) {
    const calls = rawMarkets.map((item) => {
      return {
        address: item.RATE_CONTRACT,
        name: "getNewRate",
        params: [0, parseUnits(item.Utilization, 5), item.MAX_FULL_UTIL_RATE],
      };
    });

    multicall({
      abi: RATE_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getNewRates--", res);

        for (let index = 0; index < res.length; index++) {
          let _ratePerSec = res[index][0].toString();
          const { borrowAPR, lendAPR } = caLcSiLoAPYS(
            _ratePerSec,
            rawMarkets[index].Utilization,
            rawMarkets[index].protocolFee
          );
          rawMarkets[index].borrowAPR = borrowAPR;
          rawMarkets[index].lendAPR = lendAPR;
        }
        onLoad({
          markets: rawMarkets,
        });
      })
      .catch((err) => {
        console.log("getNewRates-error:", err);
      });
  }

  function caLcSiLoAPYS(ratePerSec, utilizationRate, protocolFee) {
    const FEE_PRECISION = 100_000;
    const RATE_PRECISION = Math.pow(10, 18);
    const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;

    const interestPerSecond = Big(ratePerSec).div(RATE_PRECISION);
    const fee = Big(protocolFee).div(FEE_PRECISION).toNumber();

    const borrowAPR = interestPerSecond.times(SECONDS_PER_YEAR).toString();
    // const borrowAPY =
    //   (1 + interestPerSecond) ** SECONDS_PER_YEAR.toNumber() - 1;
    const lendAPR = Big(borrowAPR)
      .times(1 - fee)
      .times(utilizationRate)
      .toString();
    // const lendAPY = borrowAPY * (1 - fee) * utilizationRate;
    return {
      borrowAPR,
      lendAPR,
      //  borrowAPY, lendAPY,
    };
  }
  caLcSiLoAPYS(7503944640, 0.8184, 0.1);
  getTotalBorrow();
  getTotalAssets();
  getLiquidationFee();
  getMaxLTV();
  getTotalSupply();
  getUserSnapshot();
  getUserLends();
  getWalletBalance();
  getMaxRates();
}, [account, update]);
