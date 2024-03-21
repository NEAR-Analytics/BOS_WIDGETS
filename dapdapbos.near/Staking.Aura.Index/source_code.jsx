const Wrapper = styled.div`
  --bg-1: #262836;
  --bg-2: #373a53;
  --bg-3: #2e3142;
  --white: #fff;
  --purple: #979abe;
  --dark: #1b1e27;

  --fz-12: 12px;
  --fz-14: 14px;
  --fz-16: 16px;
  --fz-24: 24px;

  --primary: #783ae3;
  /* --secondary: #6c757d; */

  color: var(--white);

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .form-control::placeholder {
    color: white;
  }
  .form-control:focus {
    box-shadow: 0 0 0 0.25rem rgba(120, 58, 227, 0.5);
  }

  padding-top: 34px;
  .grid-pool-head {
    max-width: 1244px;
    margin: 0 auto 12px;
    font-size: 14px;
    color: var(--purple);
  }
`;
const HeadWrapper = styled.div`
  /* border-radius: 16px; */
  max-width: 1244px;
  margin: 0 auto;
  color: var(--white);
  font-size: var(--fz-14);
  position: relative;
  .pool-head {
    border-radius: 16px;
    height: 84px;
    align-items: center;
    cursor: pointer;
    background-color: var(--bg-1);
  }
  .title-primary {
    font-size: var(--fz-16);
    font-weight: 500;
  }
  .title-secondary {
  }
  .title-sub {
    font-size: var(--fz-12);
    color: var(--purple);
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 40% 12% 12% 12% 24%;
`;

const GridItem = styled.div`
  padding-left: 24px;
  &.action-item {
    display: flex;
    column-gap: 10px;
    padding-right: 18px;
    justify-content: right;
  }
  &.action-item-head {
    display: flex;
    justify-content: center;
  }
`;
const PoolItem = styled.div`
  margin-bottom: 10px;
`;
const TabsList = styled("Tabs.List")`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 420px;
  height: 46px;
  background-color: var(--bg-1);
  border-radius: 10px;
  color: var(--white);
  padding: 0 5px;
  margin-bottom: 30px;
  .tab-head-item {
    flex: 1;
    display: flex;
    height: 36px;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 5px;
    color: var(--white);
    cursor: pointer;
  }
  .tab-head-item.active {
    background-color: var(--bg-2);
  }
`;

// assets begin
const AssetsWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 18px;
  max-width: 1244px;
  margin: 0 auto 42px;
`;
const AssetsPanel = styled.div`
  flex: 1;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 20px 18px 0;
  height: 105px;
  .as-title {
    color: var(--purple);
    font-size: var(--fz-16);
  }
  .as-amount {
    color: var(--white);
    font-size: var(--fz-24);
    padding-top: 16px;
  }
  .as-sub {
    font-size: var(--fz-14);
    color: var(--purple);
  }
  .as-action {
    display: flex;
    justify-content: space-between;
  }
`;
const EmptyWrap = styled.div`
  padding-top: 150px;
  .empty-title {
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 13px;
  }
  .empty-intro {
    color: #979abe;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }
`;
// assets end

const {
  toast,
  curChain,
  onSwitchChain,
  switchingChain,
  chainId,
  isChainSupported,
  multicallAddress,
  multicall,
  dexConfig,
  prices,
} = props;

const { POOLS, TOKENS } = dexConfig;

const RewardsContractABI = [
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "maxWithdraw",
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
    name: "newRewardRatio",
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
    name: "rewardRate",
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
        name: "",
        type: "address",
      },
    ],
    name: "rewards",
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
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    name: "convertToShares",
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
const { RewardPoolDepositWrapper, PoolContractWrapper } = dexConfig;

const RewardPoolDepositABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_rewardPoolAddress",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_inputToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_inputAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_balancerPoolId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "contract IAsset[]",
            name: "assets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "maxAmountsIn",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "userData",
            type: "bytes",
          },
          {
            internalType: "bool",
            name: "fromInternalBalance",
            type: "bool",
          },
        ],
        internalType: "struct IBalancerVault.JoinPoolRequest",
        name: "_request",
        type: "tuple",
      },
    ],
    name: "depositSingle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const PoolContractABI = [
  {
    inputs: [{ internalType: "bytes32", name: "poolId", type: "bytes32" }],
    name: "getPoolTokens",
    outputs: [
      {
        internalType: "contract IERC20[]",
        name: "tokens",
        type: "address[]",
      },
      { internalType: "uint256[]", name: "balances", type: "uint256[]" },
      {
        internalType: "uint256",
        name: "lastChangeBlock",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const LPTokenABI = [
  {
    inputs: [],
    name: "getActualSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSwapFeePercentage",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const globalABI = [
  {
    inputs: [],
    name: "reductionPerCliff",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EMISSIONS_MAX_SUPPLY",
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
    name: "totalCliffs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

console.log("AURA_PROPS:", props);
const initList = POOLS.map((item) => ({
  ...item,
  swapFee: 0,
  stakedAmount: 0,
  reward: 0,
}));

State.init({
  currentTab: "TAB_POOL",
  account: "", // current wallet address
  poolsList: initList, //
  myPoolsList: [],
  totalDepositAmount: 0,
  totalRewardsAmount: 0,
  isClaiming: false,
  isAllClaiming: false,
  flag1: false,
  flag2: false,
  flag3: false,
});
const account = Ethers.send("eth_requestAccounts", [])[0];
const auraGlobalData = {
  auraMaxSupply: "50000000000000000000000000",
  auraTotalCliffs: "500",
  auraMinterMinted: "0",
  auraReductionPerCliff: "100000000000000000000000",
  auraTotalSupply: "70357299813420858641594656",
};
function initPoolList() {
  for (let i = 0; i < state.poolsList.length; i++) {
    const item = state.poolsList[i];

    getMultiLPToken(item, i);

    getMultiRewards(item, i);
  }

  getMultiPoolTokens();
  // getMultiGlobal();
}

function getMultiRewards(pool, index) {
  const calls = [
    {
      address: pool.Rewards_contract_address,
      name: "balanceOf",
      params: [account],
    },
    {
      address: pool.Rewards_contract_address,
      name: "rewardRate",
    },
    {
      address: pool.Rewards_contract_address,
      name: "totalSupply",
    },
    {
      address: pool.Rewards_contract_address,
      name: "rewards",
      params: [account],
    },
  ];
  multicall({
    abi: RewardsContractABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      console.log("getMultiRewards_res", res);
      const temp = [...state.poolsList];
      const [[balance], [rewardRate], [totalSupply], [rewards]] = res;
      // console.log(ethers.utils.formatUnits(balance || 0));
      temp[index].rewardRate = rewardRate;
      temp[index].stakedAmount = Big(
        ethers.utils.formatUnits(balance || 0)
      ).toFixed();
      temp[index].rewardTotalSupply = totalSupply;
      temp[index].reward = Big(
        ethers.utils.formatUnits(rewards || 0)
      ).toFixed();
      State.update({
        poolsList: temp,
        flag1: true,
      });
    })
    .catch((err) => {
      console.log("getMultiRewards_error", err);
    });
}

function getMultiLPToken(pool, index) {
  const calls = [
    {
      address: pool.LP_token_address,
      name: "balanceOf",
      params: [account],
    },
    {
      address: pool.LP_token_address,
      name: "getActualSupply",
    },
    {
      address: pool.LP_token_address,
      name: "getSwapFeePercentage",
    },
  ];

  multicall({
    abi: LPTokenABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      console.log("getMultiLPToken res:", res);
      const temp = [...state.poolsList];
      const [[balance], [totalSupply], [swapFeePer]] = res;

      temp[index].bptAmount = ethers.utils.formatUnits(balance || 0);
      temp[index].bptTotalSupply = totalSupply;
      const _swapFee = Big(ethers.utils.formatUnits(swapFeePer))
        .mul(100)
        .toFixed();
      temp[index].swapFee = _swapFee;

      State.update({
        poolsList: temp,
        flag2: true,
      });
    })
    .catch((err) => {
      console.log("getMultiLPToken_error", err);
    });
}

function getMultiPoolTokens() {
  const ids = state.poolsList.map((item) => item.Balancer_Pool_ID);

  const calls = ids.map((id) => ({
    address: PoolContractWrapper,
    name: "getPoolTokens",
    params: [id],
  }));

  multicall({
    abi: PoolContractABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      console.log("getMultiPoolTokens res:", res);
      const temp = [...state.poolsList];
      for (let i = 0; i < res.length; i++) {
        const addrArray = res[i][0];
        const tokenBalArray = res[i][1];
        temp[i].tokenAssets = addrArray;
        temp[i].tokenBalance = tokenBalArray;
        temp[i].tokens = addrArray
          ? addrArray.map((addr) => TOKENS[addr].symbol)
          : [];
      }
      State.update({
        poolsList: temp,
        flag3: true,
      });
    })
    .catch((err) => {
      console.log("getMultiPoolTokens_error", err);
    });
}

function getMultiGlobal() {
  const globalAddress = "0xC0c293ce456fF0ED870ADd98a0828Dd4d2903DBF";
  const calls = [
    {
      address: globalAddress,
      name: "reductionPerCliff",
    },
    {
      address: globalAddress,
      name: "EMISSIONS_MAX_SUPPLY",
    },
    {
      address: globalAddress,
      name: "totalSupply",
    },
    {
      address: globalAddress,
      name: "totalCliffs",
    },
  ];

  multicall({
    abi: globalABI,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  })
    .then((res) => {
      console.log("getMultiGlobal res:", res);
    })
    .catch((err) => {
      console.log("getMultiGlobal error", err);
    });
}

function getAuraMintAmount(balEarned, global) {
  const reductionPerCliff = ethers.BigNumber.from(global.auraReductionPerCliff);
  const maxSupply = ethers.BigNumber.from(global.auraMaxSupply);
  const totalSupply = ethers.BigNumber.from(global.auraTotalSupply);
  const totalCliffs = ethers.BigNumber.from(global.auraTotalCliffs);
  const minterMinted = ethers.BigNumber.from(0);

  // e.g. emissionsMinted = 6e25 - 5e25 - 0 = 1e25;
  const emissionsMinted = totalSupply.sub(maxSupply).sub(minterMinted);

  // e.g. reductionPerCliff = 5e25 / 500 = 1e23
  // e.g. cliff = 1e25 / 1e23 = 100
  const cliff = emissionsMinted.div(reductionPerCliff);

  // e.g. 100 < 500
  if (cliff.lt(totalCliffs)) {
    // e.g. (new) reduction = (500 - 100) * 2.5 + 700 = 1700;
    // e.g. (new) reduction = (500 - 250) * 2.5 + 700 = 1325;
    // e.g. (new) reduction = (500 - 400) * 2.5 + 700 = 950;
    const reduction = totalCliffs.sub(cliff).mul(5).div(2).add(700);
    // e.g. (new) amount = 1e19 * 1700 / 500 =  34e18;
    // e.g. (new) amount = 1e19 * 1325 / 500 =  26.5e18;
    // e.g. (new) amount = 1e19 * 950 / 500  =  19e17;
    // let amount = simpleToExact(balEarned).mul(reduction).div(totalCliffs);
    let amount = ethers.utils
      .parseUnits(balEarned)
      .mul(reduction)
      .div(totalCliffs);

    // e.g. amtTillMax = 5e25 - 1e25 = 4e25
    const amtTillMax = maxSupply.sub(emissionsMinted);
    if (amount.gt(amtTillMax)) {
      amount = amtTillMax;
    }

    return amount;
  }

  return ethers.BigNumber.from(0);
}
function calcTVL() {
  const temp = [...state.poolsList];
  for (let i = 0; i < temp.length; i++) {
    const tokens = temp[i].tokens;
    const tokenBalance = temp[i].tokenBalance;
    const bptTotalSupply = temp[i].bptTotalSupply;
    const rewardTotalSupply = temp[i].rewardTotalSupply;
    const rewardRate = temp[i].rewardRate;

    if (tokens && tokenBalance && bptTotalSupply && rewardTotalSupply) {
      try {
        const sum = tokens?.reduce((total, cur, j) => {
          if (cur) {
            const price = prices[cur] || 0;

            return Big(total)
              .plus(
                Big(ethers.utils.formatUnits(tokenBalance[j] || 0)).times(
                  Big(price || 0)
                )
              )
              .toFixed();
          } else {
            return total;
          }
        }, 0);

        const bptPriceUsd = Big(sum).div(Big(bptTotalSupply));

        const TVL = Big(rewardTotalSupply).times(bptPriceUsd).toFixed(0);

        // temp[i].poolValueUsd = sum;
        temp[i].bptPriceUsd = bptPriceUsd;
        temp[i].TVL = TVL;

        // calc bal apr
        const rewardPerYear = Big(ethers.utils.formatUnits(rewardRate)).times(
          Big(86400).times(365)
        );

        const rewardPerYearUsd = rewardPerYear.times(Big(prices["BAL"]));
        const BAL_APR = rewardPerYearUsd.div(TVL).times(100).toFixed(2);
        temp[i].BAL_APR = BAL_APR;

        const auraPerYear = getAuraMintAmount(
          rewardPerYear.toString(),
          auraGlobalData
        );
        const auraPerYearUsd =
          ethers.utils.formatUnits(auraPerYear) * prices["AURA"];
        const AURA_APR = Big(auraPerYearUsd)
          .div(Big(TVL))
          .times(100)
          .toFixed(2);
        temp[i].AURA_APR = AURA_APR;

        temp[i].APR =
          Number(temp[i].swapFee) + Number(BAL_APR) + Number(AURA_APR);
      } catch (error) {
        console.log("calcTVL_error", error);
      }
    }
  }
}

useEffect(() => {
  State.update({ account });
  if (account && isChainSupported) {
    initPoolList();
  }
}, [account]);

useEffect(() => {
  if (!isChainSupported) return;

  if (state.flag1 && state.flag2 && state.flag3) {
    try {
      const totalDepositAmount = state.poolsList.reduce((total, cur) => {
        return Big(cur.stakedAmount || 0)
          .plus(total)
          .toFixed(2);
      }, 0);
      const totalRewardsAmount = state.poolsList.reduce((total, cur) => {
        return Big(cur.reward || 0)
          .plus(total)
          .toFixed(2);
      }, 0);

      const temp = state.poolsList.filter((item) =>
        Big(item.stakedAmount || 0).gt(0)
      );
      const _myPools = temp.map((item) => ({ ...item, isClaiming: false }));
      calcTVL();
      State.update({
        totalDepositAmount,
        totalRewardsAmount,
        myPoolsList: _myPools,
      });
    } catch (error) {
      console.log(333, error);
    }
  }
}, [state.flag1, state.flag2, state.flag3]);

const handleChangeTabs = (value) => {
  State.update({
    currentTab: value,
  });
};
const getPoolIcon = (tokenAssets) => {
  if (tokenAssets) {
    const icons = tokenAssets?.map((addr, index) => TOKENS[addr].icon);
    const usefulIcons = icons.filter((n) => n);
    return usefulIcons;
  } else {
    return [];
  }
};

const renderPoolIcon = (tokenAssets) => {
  const icons = getPoolIcon(tokenAssets);

  if (icons) {
    return icons.map((addr, index) => {
      return (
        <span key={index} style={{ marginRight: -12 }}>
          <Widget src="dapdapbos.near/widget/UI.Avatar" props={{ src: addr }} />
        </span>
      );
    });
  }
};

const handleClaim = (address, index) => {
  const temp = [...state.myPoolsList];
  temp[index].isClaiming = true;
  State.update({
    myPoolsList: temp,
  });
  const ClaimRewardsContract = new ethers.Contract(
    address,
    [
      {
        inputs: [
          {
            internalType: "address",
            name: "_account",
            type: "address",
          },
          {
            internalType: "bool",
            name: "_claimExtras",
            type: "bool",
          },
        ],
        name: "getReward",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );

  return ClaimRewardsContract.getReward(account, true)
    .then((tx) => {
      console.log("tx: ", tx);
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          console.info("tx_res: ", res);
          if (status === 1) {
            toast.success?.({
              title: "Transaction Successful!",
              text: `transactionHash ${transactionHash}`,
            });
          } else {
            toast.fail?.({
              title: "Transaction Failed!",
              text: `transactionHash ${transactionHash}`,
            });
          }
        })
        .finally(() => {
          const temp = [...state.myPoolsList];
          temp[index].isClaiming = false;
          State.update({
            myPoolsList: temp,
          });
        });
    })
    .catch((err) => {
      console.log("getPoolTokens_error:", err);
      const temp = [...state.myPoolsList];
      temp[index].isClaiming = false;
      State.update({
        myPoolsList: temp,
      });
    });
};

const handleClaimAll = () => {
  State.update({
    isAllClaiming: true,
  });
  let getClaimAllArray = [];

  for (let i = 0; i < state.myPoolsList.length; i++) {
    const addr = state.myPoolsList[i].Rewards_contract_address;
    getClaimAllArray.push(handleClaim(addr));
  }
  Promise.allSettled(getClaimAllArray)
    .then((res) => {
      console.info("getClaimAllArray: ", res);
    })
    .catch((error) => {
      console.info("getClaimAllArray: ", error);
    })
    .finally(() => {
      State.update({
        isAllClaiming: false,
      });
    });
};

console.info("STATE: ", state);
return (
  <Wrapper>
    <Tabs.Root value={state.currentTab} onValueChange={handleChangeTabs}>
      <TabsList>
        <Tabs.Trigger value="TAB_POOL" asChild>
          <div
            className={`tab-head-item ${
              state.currentTab === "TAB_POOL" ? "active" : ""
            }`}
          >
            All Pools
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger value="TAB_ASSETS" asChild>
          <div
            className={`tab-head-item ${
              state.currentTab === "TAB_ASSETS" ? "active" : ""
            }`}
          >
            Your Assets
          </div>
        </Tabs.Trigger>
      </TabsList>
      <Tabs.Content value="TAB_POOL">
        <GridContainer className="grid-pool-head">
          <GridItem>Pool</GridItem>
          <GridItem>APR</GridItem>
          <GridItem>TVL</GridItem>
          <GridItem>You Staked</GridItem>
          <GridItem>Your rewards</GridItem>
        </GridContainer>
        <Accordion.Root type="single" collapsible>
          {state.poolsList.map((item) => (
            <PoolItem>
              <Widget
                src="dapdapbos.near/widget/Staking.Aura.Pool"
                props={{
                  ...props,
                  data: item,
                  account: state.account,
                  TOKENS,
                  RewardPoolDepositWrapper,
                  RewardPoolDepositABI,
                  tokenIcons: getPoolIcon(item.tokenAssets),
                }}
                key={item.poolName}
              />
            </PoolItem>
          ))}
        </Accordion.Root>
      </Tabs.Content>
      <Tabs.Content value="TAB_ASSETS">
        <AssetsWrapper>
          <AssetsPanel>
            <div className="as-title">You deposit</div>
            <div className="as-amount">${state.totalDepositAmount}</div>
          </AssetsPanel>
          <AssetsPanel>
            <div className="as-title">Claimable Rewards</div>
            <div className="as-action">
              <div className="as-amount">
                ${state.totalRewardsAmount}
                <span className="as-sub"></span>
              </div>
              {state.myPoolsList.length ? (
                <Widget
                  src="dapdapbos.near/widget/UI.Button"
                  props={{
                    text: "Claim All",
                    type: "primary",
                    style: { width: 118 },
                    loading: state.isAllClaiming,
                    disabled: !state.myPoolsList.length,
                    onClick: handleClaimAll,
                  }}
                />
              ) : null}
            </div>
          </AssetsPanel>
        </AssetsWrapper>
        {state.myPoolsList.length ? (
          <GridContainer className="grid-pool-head">
            <GridItem>Pool</GridItem>
            <GridItem>APR</GridItem>
            <GridItem>You Staked</GridItem>
            <GridItem>Your rewards</GridItem>
            <GridItem className="action-item-head">Action</GridItem>
          </GridContainer>
        ) : null}

        <HeadWrapper>
          {state.myPoolsList.length ? (
            state.myPoolsList?.map((item, index) => (
              <PoolItem key={index}>
                <GridContainer className="pool-head">
                  <GridItem>
                    <div className="title-primary">
                      {renderPoolIcon(item.tokenAssets)}

                      <span style={{ marginLeft: 20 }}>{item.poolName}</span>
                    </div>
                  </GridItem>
                  <GridItem>
                    <div className="title-secondary">
                      {Big(item.APR || 0).toFixed(2)}%
                    </div>
                    <div className="title-sub">
                      proj.{Big(item.pjAPR).mul(100).toFixed(2)} %
                    </div>
                  </GridItem>
                  <GridItem>
                    <div className="title-secondary">
                      <Widget
                        src="dapdapbos.near/widget/Utils.FormatRawValue"
                        props={{
                          value: item.stakedAmount,
                        }}
                      />
                    </div>
                  </GridItem>
                  <GridItem>
                    <div className="title-secondary">
                      <Widget
                        src="dapdapbos.near/widget/Utils.FormatRawValue"
                        props={{
                          value: item.reward,
                        }}
                      />
                    </div>
                    <div className="title-sub"></div>
                  </GridItem>
                  <GridItem className="action-item">
                    {/* <Widget
                        src="dapdapbos.near/widget/UI.Button"
                        props={{
                          text: "Unstake",
                          type: "secondary",
                          style: { width: 118 },
                          disabled: true,
                          onClick: () => {},
                        }}
                      /> */}
                    {Big(item.reward).gt(0) ? (
                      <Widget
                        src="dapdapbos.near/widget/UI.Button"
                        props={{
                          text: "Claim",
                          type: "primary",
                          style: { width: 118 },
                          loading: item.isClaiming,
                          onClick: () => {
                            handleClaim(item.Rewards_contract_address, index);
                          },
                        }}
                      />
                    ) : (
                      <Widget
                        src="dapdapbos.near/widget/UI.Button"
                        props={{
                          text: "Claim",
                          type: "primary",
                          disabled: true,
                          style: { width: 118 },
                        }}
                      />
                    )}
                  </GridItem>
                </GridContainer>
              </PoolItem>
            ))
          ) : (
            <EmptyWrap>
              <div className="empty-title">No productive assets detected</div>
              <div className="empty-intro">
                Head over to the pools list and make a deposit to start earning
                yield!
              </div>
            </EmptyWrap>
          )}
        </HeadWrapper>
      </Tabs.Content>
    </Tabs.Root>
    {!isChainSupported && (
      <Widget
        src="bluebiu.near/widget/Swap.ChainWarnigBox"
        props={{
          chain: curChain,
          onSwitchChain: onSwitchChain,
          switchingChain: switchingChain,
          theme: dexConfig.theme,
        }}
      />
    )}
  </Wrapper>
);
