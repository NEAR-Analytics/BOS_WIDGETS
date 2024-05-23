const {
  CHAIN_LIST,
  multicallAddress,
  multicall,
  account,
  prices,
  update,
  onLoad,
  StakeTokens,
} = props;

const { formatUnits, parseUnits } = ethers.utils;

useEffect(() => {
  if (!account || !update || !multicallAddress) return;

  let count = 0;
  let _balanceRes = {};
  let _APY = "";
  let _TVL = "";

  function formatData(params) {
    console.log(params, count);
    if (count < 1) return;
    count = 0;
    console.log("_balanceRes--", _balanceRes);
    for (let i = 0; i < StakeTokens.length; i++) {
      StakeTokens[i].balance = _balanceRes[StakeTokens[i].address];
    }

    onLoad({
      StakeTokens,
      // APY: _APY + "%",
      // TVL: _TVL,
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

  getWalletBalance();
}, [account, update, config]);
