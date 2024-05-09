const {
  account,
  config,
  multicall,
  multicallAddress,
  assetsToSupply,
  markets,
  rewardToken,
  onLoad,
} = props;

useEffect(() => {
  if (!account) return "";

  function getRewardsData() {
    const aTokenAddresss = assetsToSupply?.map((item) => item.aTokenAddress);

    const calls = aTokenAddresss?.map((addr) => ({
      address: config.incentivesProxy,
      name: "getRewardsData",
      params: [addr, config.rewardAddress],
    }));

    multicall({
      abi: [
        {
          inputs: [
            { internalType: "address", name: "asset", type: "address" },
            { internalType: "address", name: "reward", type: "address" },
          ],
          name: "getRewardsData",
          outputs: [
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "uint256", name: "", type: "uint256" },
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
        console.log("--------------------fetchRewardsData_res", res);

        onLoad({
          emissionPerSeconds: res,
        });
      })
      .catch((err) => {
        console.log("fetchRewardsData_err", err);
      });
  }

  function getAllUserRewards() {
    const arr = markets
      ?.map((item) => [
        item.aTokenAddress,
        // item.stableDebtTokenAddress,
        item.variableDebtTokenAddress,
      ])
      .flat();
    const addrs = [...new Set(arr)];

    const rewardsProvider = new ethers.Contract(
      config.incentivesProxy,
      [
        {
          inputs: [
            { internalType: "address[]", name: "assets", type: "address[]" },
            { internalType: "address", name: "user", type: "address" },
          ],
          name: "getAllUserRewards",
          outputs: [
            {
              internalType: "address[]",
              name: "rewardsList",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "unclaimedAmounts",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );

    rewardsProvider
      .getAllUserRewards(addrs, account)
      .then((res) => {
        try {
          console.log("getAllUserRewards_res:", res);
          const _amount = res[1].reduce((total, cur) => {
            return Big(total).plus(ethers.utils.formatUnits(cur)).toFixed();
          }, 0);

          rewardToken[0].unclaimed = _amount;
          onLoad({
            rewardData: rewardToken,
          });
        } catch (error) {
          console.log("catch_getAllUserRewards_error", error);
        }
      })
      .catch((err) => {
        console.log("getAllUserRewards_error:", err);
      });
  }

  getRewardsData();
  getAllUserRewards();

  return <div style={{ display: "none" }} />;
}, [account]);
