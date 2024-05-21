const {
  multicallAddress,
  multicall,
  account,
  prices,
  dexConfig,
  update,
  onLoad,
} = props;
const { StakeTokens } = dexConfig;

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

const { formatUnits, parseUnits } = ethers.utils;

useEffect(() => {
  if (!account || !update || !multicallAddress) return;
  let count = 0;

  let _balanceRes = {};
  let _APY = "";
  let _TVL = "";

  function formatData(params) {
    console.log(params, count);

    if (count < 3) return;
    count = 0;
    console.log("_balanceRes--", _balanceRes);
    for (let i = 0; i < StakeTokens.length; i++) {
      StakeTokens[i].balance = _balanceRes[StakeTokens[i].address];
    }

    onLoad({
      StakeTokens,
      APY: _APY + "%",
      TVL: _TVL,
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
  function fetchData(url) {
    return asyncFetch(url);
  }
  function getAPY() {
    const url = `https://universe.kelpdao.xyz/rseth/apy`;
    fetchData(url)
      .then((res) => {
        _APY = res.body.value || "-";
        count++;
        formatData("getAPY");
      })
      .catch((err) => {
        console.log("Catch-getAPY--", err);
      });
  }
  function getTVL() {
    const url = `https://universe.kelpdao.xyz/rseth/tvl/?lrtToken`;
    fetchData(url)
      .then((res) => {
        _TVL = res.body.usdTvl || "-";
        count++;
        formatData("getTVL");
      })
      .catch((err) => {
        console.log("Catch-getTVL--", err);
      });
  }

  function getWalletBalance() {
    // not eth
    const underlyingTokens = StakeTokens.filter((market) => {
      return market.address && !market.isNative;
    });

    Ethers.provider()
      .getBalance(account)
      .then((rawBalance) => {
        _balanceRes["native"] = ethers.utils.formatUnits(rawBalance, 18);

        if (underlyingTokens.length) {
          const calls = underlyingTokens.map((token) => ({
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
              console.log("getWalletBalance--", res);

              for (let i = 0, len = res.length; i < len; i++) {
                _balanceRes[underlyingTokens[i].address] = res[i]
                  ? ethers.utils.formatUnits(
                      res[i][0],
                      underlyingTokens[i].decimals
                    )
                  : "0";
              }

              count++;
              formatData("getWalletBalance");
            })
            .catch((err) => {
              console.log("getWalletBalance-error--", err);
              // setTimeout(() => {
              //   getWalletBalance();
              // }, 500);
            });
        } else {
          count++;
          formatData("getWalletBalance");
        }
      });
  }
  // getMaxLTV();
  getWalletBalance();
  getAPY();
  getTVL();
}, [account, update]);
