const {
  multicallAddress,
  multicall,
  account,
  prices,
  dexConfig,
  update,
  onLoad,
} = props;
const { borrowTokenAddress, StabilityPool, VesselManagerOperations, markets } =
  dexConfig;
useEffect(() => {
  if (!account || !update || !multicallAddress) return;

  function getDeposit() {
    const contract = new ethers.Contract(
      StabilityPool,
      [
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "deposits",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      Ethers.provider()
    );
    contract
      .deposits(account)
      .then((res) => {
        console.log("get_deposits_res:", res);
        onLoad({
          deposits: ethers.utils.formatUnits(res),
        });
      })
      .catch((err) => {
        console.log("getDeposit_error", err);
      });
  }

  function getInfo() {
    const calls = [
      {
        address: borrowTokenAddress,
        name: "balanceOf",
        params: [StabilityPool],
      },
      { address: borrowTokenAddress, name: "balanceOf", params: [account] },
    ];
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
        const [[tvlAmount], [tokenBalAmount]] = res;
        console.log("get_borrow_token_res", tvlAmount, tokenBalAmount);
        onLoad({
          tvl: Big(ethers.utils.formatUnits(tvlAmount || 0)).toFixed(2),
          tokenBal: Big(ethers.utils.formatUnits(tokenBalAmount || 0)).toFixed(
            2
          ),
        });
      })
      .catch((err) => {
        console.log("get_borrow_token_error:", err);
      });
  }

  function getWalletBalance() {
    if (!markets) return;
    let nativeOToken = "";
    const underlyingTokens = Object.values(markets)
      .filter((market) => {
        if (market.underlyingToken.address === "native")
          nativeOToken = wethAddress;
        return (
          market.underlyingToken.address &&
          market.underlyingToken.address !== "native"
        );
      })
      .map((market) => ({
        ...market.underlyingToken,
      }));
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
        console.log("get_wallet_bal_res:", res);
        for (let i = 0, len = res.length; i < len; i++) {
          markets[underlyingTokens[i].address].userUnderlyingBalance = res[i][0]
            ? ethers.utils.formatUnits(
                res[i][0]._hex,
                underlyingTokens[i].decimals
              )
            : "0";
        }

        if (nativeOToken) {
          const provider = Ethers.provider();
          provider.getBalance(account).then((rawBalance) => {
            markets[nativeOToken].userUnderlyingBalance =
              ethers.utils.formatUnits(rawBalance._hex, 18);
          });
        }

        onLoad({
          newMarkets: markets,
        });
      })
      .catch((err) => {
        console.log("getWalletBalance_error", err);
      });
  }

  function getMinted() {
    const underlyingTokens = Object.values(markets);

    const calls = underlyingTokens.map((item) => ({
      address: VesselManagerOperations,
      name: "getEntireSystemDebt",
      params: [item.underlyingToken.address],
    }));

    multicall({
      abi: [
        {
          inputs: [
            { internalType: "address", name: "_asset", type: "address" },
          ],
          name: "getEntireSystemDebt",
          outputs: [
            {
              internalType: "uint256",
              name: "entireSystemDebt",
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
        console.log("getMinted_res", res);
        for (let i = 0, len = res.length; i < len; i++) {
          markets[underlyingTokens[i].underlyingToken.address]["MINTED"] = res[
            i
          ][0]
            ? ethers.utils.formatUnits(res[i][0]._hex)
            : "0";
        }
        onLoad({
          newMarkets: markets,
        });
      })
      .catch((err) => {
        console.log("getMinted_err", err);
      });
  }

  getDeposit();
  getInfo();
  getWalletBalance();
  getMinted();
}, [account, update]);
