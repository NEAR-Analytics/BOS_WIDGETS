const {
  multicallAddress,
  multicall,
  account,
  prices,
  dexConfig,
  update,
  onLoad,
  isChainSupported,
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
const { formatUnits } = ethers.utils;
useEffect(() => {
  if (!isChainSupported || !account || !update || !multicallAddress) return;
  console.log("rawMarkets--", rawMarkets);
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

  function formatData(params) {
    if (count < 9) return;

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
    }
    for (let i = 0; i < rawMarkets.length; i++) {
      rawMarkets[i].Utilization = Big(rawMarkets[i].totalBorrows)
        .div(Big(rawMarkets[i].totalAssets))
        .toFixed(4);
    }

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
        formatData();
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
        formatData();
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
        formatData();
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
        formatData();
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
        formatData();
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
          formatData();
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
          formatData();
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
          formatData();
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
        formatData();
      })
      .catch((err) => {
        console.log("getWalletBalance_error", err);
      });
  }

  getTotalBorrow();
  getTotalAssets();
  getLiquidationFee();
  getMaxLTV();
  getTotalSupply();
  getUserSnapshot();
  getUserLends();
  getWalletBalance();
}, [account, update]);
