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
    stateMutability: "view",
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "arg0", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "convertToAssets",
    inputs: [{ name: "shareAmount", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "totalAssets",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "user_borrow_part",
    inputs: [{ name: "arg0", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "user_collateral_share",
    inputs: [{ name: "arg0", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "deposit",
    inputs: [
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "Withdraw",
    inputs: [
      { name: "withdrawer", type: "address", indexed: true },
      { name: "receiver", type: "address", indexed: true },
      { name: "owner", type: "address", indexed: true },
      { name: "assets", type: "uint256", indexed: false },
      { name: "shares", type: "uint256", indexed: false },
    ],
    anonymous: false,
    type: "event",
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "add_collateral",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "borrow",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "_from", type: "address" },
      { name: "to", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "repay",
    inputs: [{ name: "payment", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "remove_collateral",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "total_asset",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "elastic", type: "uint128" },
          { name: "base", type: "uint128" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "total_borrow",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "elastic", type: "uint128" },
          { name: "base", type: "uint128" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "total_collateral_share",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
];
const { formatUnits } = ethers.utils;
useEffect(() => {
  if (!isChainSupported || !account || !update || !multicallAddress) return;
  // console.log("rawMarkets--", rawMarkets);
  function getDebt() {
    const _contract = dexConfig.VesselManager;

    let abi;
    let calls;
    const tokens = Object.keys(dexConfig.markets);
    if (IS_ETHOS_DAPP) {
      abi = [
        {
          inputs: [
            { internalType: "address", name: "_borrower", type: "address" },
            { internalType: "address", name: "_collateral", type: "address" },
          ],
          name: "getTroveDebt",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ];
      calls = tokens.map((addr) => ({
        address: _contract,
        name: "getTroveDebt",
        params: [account, addr],
      }));
    }
    if (IS_PREON_DAPP || IS_GRAVITA_DAPP) {
      abi = [
        {
          inputs: [
            { internalType: "address", name: "_asset", type: "address" },
            { internalType: "address", name: "_borrower", type: "address" },
          ],
          name: "getVesselDebt",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ];
      calls = tokens.map((addr) => ({
        address: _contract,
        name: "getVesselDebt",
        params: [addr, account],
      }));
    }

    multicall({
      abi,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getDebt_res", res);
        for (let i = 0, len = res.length; i < len; i++) {
          const _vesselStatus = res[i] ? "ACTIVE" : "INACTIVE";
          const _vesselDebt =
            res[i] && res[i][0] ? ethers.utils.formatUnits(res[i][0]._hex) : 0;
          markets[tokens[i]].vesselStatus = _vesselStatus;
          markets[tokens[i]].vesselDebt = _vesselDebt;
        }

        onLoad({
          newMarkets: markets,
        });
      })
      .catch((err) => {
        console.log("getDebt_error:", err);
      });
  }

  //Total Value Locked
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
        console.log("getTotalAssets_res", res);
        for (let i = 0; i < res.length; i++) {
          rawMarkets[i].totalAssets = formatUnits(
            res[i][0],
            rawMarkets[i].TOKEN_A.decimals
          );
        }
        onLoad({
          markets: rawMarkets,
        });
      })
      .catch((err) => {
        console.log("getTotalAssets_error:", err);
      });
  }
  function getAvailableBorrow() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "total_asset",
    }));

    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((_totalAsset) => {
        console.log("getAvailableBorrow_res", _totalAsset);
        // for (let i = 0; i < _totalAsset.length; i++) {
        //   rawMarkets[i].availableBorrow = formatUnits(
        //     _totalAsset[i][0][0],
        //     rawMarkets[i].TOKEN_A.decimals
        //   );
        // }
        // onLoad({
        //   markets: rawMarkets,
        // });
        return _totalAsset;
      })
      .then((_totalAsset) => {
        const calls = rawMarkets.map((item) => ({
          address: item.POOL_MANAGER,
          name: "total_borrow",
        }));

        multicall({
          abi: ABI,
          calls,
          options: {},
          multicallAddress,
          provider: Ethers.provider(),
        }).then((_totalBorrow) => {
          for (let i = 0; i < _totalAsset.length; i++) {
            const _availableBorrow = formatUnits(
              _totalAsset[i][0][0],
              rawMarkets[i].TOKEN_A.decimals
            );

            const _totalBorrow = formatUnits(
              _totalBorrow[i][0][0],
              rawMarkets[i].TOKEN_A.decimals
            );

            const full_asset_amount = Big(_availableBorrow).plus(
              Big(_totalBorrow)
            );
            const utilization_rate = Big(_totalBorrow)
              .times(Math.pow(1, 18))
              .div(full_asset_amount);
            const utilization_rate_percent = utilization_rate
              .div(Big(Math.pow(1, 18)))
              .times(100)
              .toFixed();
            rawMarkets[i].availableBorrow = _availableBorrow;
            rawMarkets[i].totalBorrow = _totalBorrow;
            rawMarkets[i].utilization = utilization_rate_percent;
          }
          onLoad({
            markets: rawMarkets,
          });
        });
      })
      .catch((err) => {
        console.log("getAvailableBorrow_error:", err);
      });
  }

  function getTotalCollateral() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "total_collateral_share",
    }));

    multicall({
      abi: ABI,
      calls,
      options: {},
      multicallAddress,
      provider: Ethers.provider(),
    })
      .then((res) => {
        console.log("getTotalCollateral_res", res);
        for (let i = 0; i < res.length; i++) {
          rawMarkets[i].totalCollateral = formatUnits(
            res[i][0],
            rawMarkets[i].TOKEN_B.decimals
          );
          rawMarkets[i].collateralSymbol = TOKEN_B.symbol;
        }
        onLoad({
          markets: rawMarkets,
        });
      })
      .catch((err) => {
        console.log("getTotalCollateral_error:", err);
      });
  }
  function getYourDeposited() {
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
      .then((balances) => {
        console.log("getYourDeposited_res", balances);

        return balances;
      })
      .then((balances) => {
        const calls = rawMarkets.map((item, index) => ({
          address: item.POOL_MANAGER,
          name: "convertToAssets",
          params: [balances[index] ? balances[index][0] : 0],
        }));
        multicall({
          abi: ABI,
          calls,
          options: {},
          multicallAddress,
          provider: Ethers.provider(),
        }).then((res) => {
          for (let i = 0; i < res.length; i++) {
            const _yourDeposited = formatUnits(
              res[i] ? res[i][0] : 0,
              rawMarkets[i].TOKEN_A.decimals
            );
            rawMarkets[i].yourDeposited = _yourDeposited;
            const _depositSymbol = rawMarkets[i].TOKEN_A.symbol;
            rawMarkets[i].depositSymbol = _depositSymbol;

            rawMarkets[i].yourDepositUSD = Big(Number(_yourDeposited) || 0)
              .times(prices[_depositSymbol] || 0)
              .toFixed();
          }

          const yourTotalDepositUSD = rawMarkets.reduce((total, curr) => {
            return Big(total).plus(curr.yourDepositUSD).toFixed();
          }, 0);
          onLoad({
            yourTotalDepositUSD,
            markets: rawMarkets,
          });
        });
      })
      .catch((err) => {
        console.log("getYourDeposited_error:", err);
      });
  }
  function getYourBorrowed() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "user_borrow_part",
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
        console.log("getYourBorrowed_res", res);
        for (let i = 0; i < res.length; i++) {
          const _yourBorrowed = formatUnits(
            res[i] ? res[i][0] : 0,
            rawMarkets[i].TOKEN_A.decimals
          );
          rawMarkets[i].yourBorrowed = _yourBorrowed;
          const _borrowSymbol = rawMarkets[i].TOKEN_A.symbol;
          rawMarkets[i].borrowSymbol = _borrowSymbol;
          rawMarkets[i].yourBorrowUSD = Big(Number(_yourBorrowed) || 0)
            .times(prices[_borrowSymbol] || 0)
            .toFixed();
        }
        const yourTotalBorrowUSD = rawMarkets.reduce((total, curr) => {
          return Big(total).plus(curr.yourBorrowUSD).toFixed();
        }, 0);
        onLoad({
          yourTotalBorrowUSD,
          markets: rawMarkets,
        });
      })
      .catch((err) => {
        console.log("getYourBorrowed_error:", err);
      });
  }

  function getYourCollateraled() {
    const calls = rawMarkets.map((item) => ({
      address: item.POOL_MANAGER,
      name: "user_collateral_share",
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
        console.log("getYourCollateraled_res", res);
        for (let i = 0; i < res.length; i++) {
          const _yourCollateraled = formatUnits(
            res[i] ? res[i][0] : 0,
            rawMarkets[i].TOKEN_B.decimals
          );
          const _collateralSymbol = rawMarkets[i].TOKEN_B.symbol;
          rawMarkets[i].yourCollateraled = _yourCollateraled;
          rawMarkets[i].collateralSymbol = _collateralSymbol;

          rawMarkets[i].yourCollateraledUSD = Big(
            Number(_yourCollateraled) || 0
          )
            .times(prices[_collateralSymbol] || 0)
            .toFixed();
        }
        const yourTotalCollateraledUSD = rawMarkets.reduce((total, curr) => {
          return Big(total).plus(curr.yourCollateraledUSD).toFixed();
        }, 0);
        onLoad({
          yourTotalCollateraledUSD,
          markets: rawMarkets,
        });
      })
      .catch((err) => {
        console.log("getYourCollateraled_error:", err);
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
        for (let i = 0; i < res.length; i++) {
          TOKENS[i].balance = formatUnits(
            res[i] ? res[i][0] : 0,
            TOKENS[i].decimals
          );
        }

        onLoad({
          TOKENS,
        });
      })
      .catch((err) => {
        console.log("getWalletBalance_error", err);
      });
  }

  getTotalAssets();
  getAvailableBorrow();
  getTotalCollateral();
  getYourDeposited();
  getYourBorrowed();
  getYourCollateraled();
  getWalletBalance();
}, [account, update]);
