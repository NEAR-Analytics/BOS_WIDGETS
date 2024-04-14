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
    name: "total_collateral_share",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
];
const { formatUnits } = ethers.utils;
useEffect(() => {
  if (!account || !update || !multicallAddress) return;
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
      .then((res) => {
        console.log("getAvailableBorrow_res", res);
        for (let i = 0; i < res.length; i++) {
          rawMarkets[i].availableBorrow = formatUnits(
            res[i][0][0],
            rawMarkets[i].TOKEN_A.decimals
          );
        }
        onLoad({
          markets: rawMarkets,
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
            rawMarkets[i].yourDeposited = formatUnits(
              res[i] ? res[i][0] : 0,
              rawMarkets[i].TOKEN_A.decimals
            );
            rawMarkets[i].depositSymbol = rawMarkets[i].TOKEN_A.symbol;
          }
          onLoad({
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
          rawMarkets[i].yourBorrowed = formatUnits(
            res[i] ? res[i][0] : 0,
            rawMarkets[i].TOKEN_A.decimals
          );
          rawMarkets[i].borrowSymbol = rawMarkets[i].TOKEN_A.symbol;
        }
        onLoad({
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
          rawMarkets[i].yourCollateraled = formatUnits(
            res[i] ? res[i][0] : 0,
            rawMarkets[i].TOKEN_B.decimals
          );
          rawMarkets[i].collateralSymbol = rawMarkets[i].TOKEN_B.symbol;
        }
        onLoad({
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
