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

  --primary: #1aca8a;
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
    justify-content: center;
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
// assets end

// support chain
const CHAIN_ID = 1088;

const POOLS = [
  {
    poolName: "Locked ATH",
    tokenAddress: "0xa4ee142e34d0676edc2b760dd0016003d99a4cec",
    StakingAddress: "0xD481eD22a20708839aeB7f1d07E1d01cbc526184", // Locking
    poolType: "Locking", // Locking MasterChief Staking
  },
  {
    poolName: "HUM-xHUM",
    tokenAddress: "0x31cfdA26D5841d92333D8F9B3acbd5efEedb39c1",
    StakingAddress: "0x652a63c4df14e29080Ab058d6f151aBa61F86c10", // Locking
    poolType: "MasterChief", // Locking MasterChief Staking
  },
];
const TOKENS = {
  "0xa4ee142e34d0676edc2b760dd0016003d99a4cec": {
    address: "0xa4ee142e34d0676edc2b760dd0016003d99a4cec",
    chainId: CHAIN_ID,
    name: "ATH",
    symbol: "ATH",
    icon: "https://www.athenafinance.io/assets/tokens/LATH.svg",
    decimals: 18,
  },
  "0x31cfdA26D5841d92333D8F9B3acbd5efEedb39c1": {
    address: "0x31cfdA26D5841d92333D8F9B3acbd5efEedb39c1",
    chainId: CHAIN_ID,
    name: "vAMM-HUM/xHUM",
    symbol: "vAMM-HUM/xHUM",
    icon: "https://www.athenafinance.io/assets/tokens/HUMxHUM.svg",
    decimals: 18,
  },
};
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
const RewardPoolDepositWrapper = "0x0Fec3d212BcC29eF3E505B555D7a7343DF0B7F76";
const PoolContractWrapper = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";

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
];
const COINGECKO_IDS = {
  USDT: "tether",
  USDC: "usd-coin",
  sDAI: "savings-xdai",
  WBTC: "wrapped-bitcoin",
  WETH: "weth",
  wstETH: "wrapped-steth",
  crvUSD: "crvusd",
  AURA: "aura-finance",
  BAL: "balancer",
  staBAL3: "balancer-stable-usd",
  COW: "cow-protocol",
  stEUR: "staked-ageur",
  EURe: "monerium-eur-money",
  GNO: "gnosis",
};

const LockingABI = [
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IERC20",
      },
    ],
    name: "ATH",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "DENOMINATOR",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "__LockerV2_init_",
    inputs: [
      {
        type: "address",
        name: "_masterchief",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_maxSlots",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "_rewarder",
        internalType: "address",
      },
      {
        type: "address",
        name: "_stakingToken",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addNewStrategy",
    inputs: [
      {
        type: "uint256",
        name: "_lockTime",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_rewardPercent",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_forfeitPercent",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_instantUnstakePercent",
        internalType: "uint256",
      },
      {
        type: "bool",
        name: "_isLinear",
        internalType: "bool",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addToUnlock",
    inputs: [
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "slotIndex",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "allowance",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
      },
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "approve",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "balanceOf",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    name: "bribeManager",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "cancelUnlock",
    inputs: [
      {
        type: "uint256",
        name: "slotIndex",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "address[]",
        name: "rewardTokens",
        internalType: "address[]",
      },
      {
        type: "uint256[]",
        name: "earnedRewards",
        internalType: "uint256[]",
      },
    ],
    name: "claim",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "address[]",
        name: "rewardTokens",
        internalType: "address[]",
      },
      {
        type: "uint256[]",
        name: "earnedRewards",
        internalType: "uint256[]",
      },
    ],
    name: "claimFor",
    inputs: [
      {
        type: "address",
        name: "_for",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint8",
        name: "",
        internalType: "uint8",
      },
    ],
    name: "decimals",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "decreaseAllowance",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "subtractedValue",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "deposit",
    inputs: [
      {
        type: "uint256",
        name: "_amount",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "depositFor",
    inputs: [
      {
        type: "address",
        name: "_for",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_amount",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple[]",
        name: "slots",
        internalType: "struct LockerV2.UserUnlocking[]",
        components: [
          {
            type: "uint256",
          },
          {
            type: "uint256",
          },
          {
            type: "uint256",
          },
          {
            type: "uint256",
          },
          {
            type: "uint256",
          },
          {
            type: "uint256",
          },
        ],
      },
    ],
    name: "getAllUserUnlocking",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "startTime",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "endTime",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "unlockingStrategy",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "alreadyUnstaked",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "alreadyWithdrawn",
        internalType: "uint256",
      },
    ],
    name: "getUserNthSlot",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "n",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "rewardPercentage",
        internalType: "uint256",
      },
    ],
    name: "getUserRewardPercentage",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "getUserSlotLength",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "getUserTotalDeposit",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "harvest",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "increaseAllowance",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "addedValue",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    name: "masterchief",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "maxSlot",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "migrated",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    name: "name",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "pause",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "paused",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IBaseRewardPoolLocker",
      },
    ],
    name: "rewarder",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setBribeManager",
    inputs: [
      {
        type: "address",
        name: "_address",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setMaxSlots",
    inputs: [
      {
        type: "uint256",
        name: "_maxDeposits",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setStrategyStatus",
    inputs: [
      {
        type: "uint256",
        name: "strategyIndex",
        internalType: "uint256",
      },
      {
        type: "bool",
        name: "status",
        internalType: "bool",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setWhitelistForTransfer",
    inputs: [
      {
        type: "address",
        name: "_for",
        internalType: "address",
      },
      {
        type: "bool",
        name: "status",
        internalType: "bool",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "stakeInMasterChief",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    name: "stakingToken",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "startUnlock",
    inputs: [
      {
        type: "uint256",
        name: "strategyIndex",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "slotIndex",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    name: "symbol",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "totalLocked",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "totalSupply",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "totalUnlocking",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "transfer",
    inputs: [
      {
        type: "address",
        name: "recipient",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "transferFrom",
    inputs: [
      {
        type: "address",
        name: "sender",
        internalType: "address",
      },
      {
        type: "address",
        name: "recipient",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    name: "transferWhitelist",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "unlock",
    inputs: [
      {
        type: "uint256",
        name: "slotIndex",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "unlockTime",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "forfeitPercent",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "rewardPercent",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "instantUnstakePercent",
        internalType: "uint256",
      },
      {
        type: "bool",
        name: "isLinear",
        internalType: "bool",
      },
      {
        type: "bool",
        name: "isActive",
        internalType: "bool",
      },
    ],
    name: "unlockingStrategies",
    inputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "unpause",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "userUnlocking",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "startTime",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "endTime",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "unlockingStrategy",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "alreadyUnstaked",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "alreadyWithdrawn",
        internalType: "uint256",
      },
    ],
    name: "userUnlockings",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        type: "address",
        name: "owner",
        indexed: true,
      },
      {
        type: "address",
        name: "spender",
        indexed: true,
      },
      {
        type: "uint256",
        name: "value",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Claim",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
      },
      {
        type: "uint256",
        name: "timestamp",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NewDeposit",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
      },
      {
        type: "uint256",
        name: "timestamp",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        type: "address",
        name: "account",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ResetSlot",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
      },
      {
        type: "uint256",
        name: "timestamp",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount",
        indexed: false,
      },
      {
        type: "uint256",
        name: "slotIndex",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        type: "address",
        name: "from",
        indexed: true,
      },
      {
        type: "address",
        name: "to",
        indexed: true,
      },
      {
        type: "uint256",
        name: "value",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unlock",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
      },
      {
        type: "uint256",
        name: "timestamp",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UnlockStarts",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
      },
      {
        type: "uint256",
        name: "timestamp",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount",
        indexed: false,
      },
      {
        type: "uint256",
        name: "strategyIndex",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        type: "address",
        name: "account",
        indexed: false,
      },
    ],
    anonymous: false,
  },
];

const initList = POOLS.map((item) => ({ ...item, stakedAmount: 0, reward: 0 }));
const { toast } = props;
State.init({
  currentTab: "TAB_POOL",
  chainId: "", // current chain
  account: "", // current wallet address
  poolsList: initList, //
  slotLength: 0,
  myPoolsList: [],
  totalDepositAmount: 0,
  totalRewardsAmount: 0,
  fresh: 1,
  isClaiming: false,
  isAllClaiming: false,
  tokenPrices: "",
  TVLS: [],
});
const account = Ethers.send("eth_requestAccounts", [])[0];

function initPoolList() {
  for (let i = 0; i < state.poolsList.length; i++) {
    const item = state.poolsList[i];

    if (i === 0) {
      const temp = [...state.poolsList];
      // Locking
      getUserTotalDeposit(item).then((total) => {
        temp[0].totalDeposit = total;
        State.update({
          poolsList: temp,
          fresh: state.fresh + 1,
        });
      });
      getUserUnlocking(item).then((unlocking) => {
        temp[0].unlocking = unlocking;
        State.update({
          poolsList: temp,
          fresh: state.fresh + 1,
        });
      });
      getUserSlotLength(item).then((slotLength) => {
        State.update({
          slotLength,
        });
      });
      getAllUserUnlocking(item);
      // userUnlockings(item);
      // getUserRewardPercentage(item);
    }
  }
}

function fetchTokenPrice(tokenIds) {
  return asyncFetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd`
  ).then((res) => {
    if (res.ok) {
      return res.body;
    }
    return 0;
  });
}

function getTokenPrices() {
  const ids = Object.values(COINGECKO_IDS).join();
  fetchTokenPrice(ids)
    .then((res) => {
      State.update({
        tokenPrices: res,
      });
    })
    .catch((error) => {
      console.error("getTokenPrices_error: ", error);
    });
}

function getUserUnlocking(pool) {
  const LockingContract = new ethers.Contract(
    pool.StakingAddress,
    LockingABI,
    Ethers.provider()
  );

  return LockingContract.userUnlocking(account)
    .then((res) => {
      console.log(
        "userUnlocking: ",
        res,
        res.toString(),
        Big(ethers.utils.formatUnits(res)).toFixed(2)
      );
      return Big(ethers.utils.formatUnits(res)).toFixed(2);
    })
    .catch((err) => {
      console.log("getUserUnlocking_error:", err);
    });
}

function getUserSlotLength(pool) {
  const LockingContract = new ethers.Contract(
    pool.StakingAddress,
    LockingABI,
    Ethers.provider()
  );

  return LockingContract.getUserSlotLength(account)
    .then((res) => {
      return res.toString();
    })
    .catch((err) => {
      console.log("getUserSlotLength_error:", err);
    });
}

function getAllUserUnlocking(pool) {
  const LockingContract = new ethers.Contract(
    pool.StakingAddress,
    LockingABI,
    Ethers.provider()
  );

  return LockingContract.getAllUserUnlocking(account)
    .then((res) => {
      console.log(
        "getAllUserUnlocking: ",
        res
        // res.toString(),
        // Big(ethers.utils.formatUnits(res)).toFixed(2)
      );
      // return Big(ethers.utils.formatUnits(res)).toFixed(2);
    })
    .catch((err) => {
      console.log("getAllUserUnlocking_error:", err);
    });
}

// function userUnlockings(pool) {
//   console.log(1111111, Ethers.provider());
//   console.log(1111111, Ethers);
//   const LockingContract = new ethers.Contract(
//     pool.StakingAddress,
//     LockingABI,
//     Ethers.provider()
//   );

//   return LockingContract.userUnlockings(account, 0)
//     .then((res) => {
//       console.log(
//         "22222: ",
//         res,
//         res.toString(),
//         Big(ethers.utils.formatUnits(res)).toFixed(2)
//       );
//       return Big(ethers.utils.formatUnits(res)).toFixed(2);
//     })
//     .catch((err) => {
//       console.log("3333:", err);
//     });
// }

function getUserTotalDeposit(pool) {
  const LockingContract = new ethers.Contract(
    pool.StakingAddress,
    LockingABI,
    Ethers.provider()
  );

  return LockingContract.getUserTotalDeposit(account)
    .then((res) => {
      console.log(
        "getUserTotalDeposit: ",
        res,
        res.toString(),
        Big(ethers.utils.formatUnits(res)).toFixed(2)
      );
      return Big(ethers.utils.formatUnits(res)).toFixed(2);
    })
    .catch((err) => {
      console.log("getUserTotalDeposit_error:", err);
    });
}

function getUserRewardPercentage(pool) {
  const LockingContract = new ethers.Contract(
    pool.StakingAddress,
    LockingABI,
    Ethers.provider()
  );

  return LockingContract.getUserRewardPercentage(account)
    .then((res) => {
      console.log(
        "getUserRewardPercentage: ",
        res,
        res.toString()
        // Big(ethers.utils.formatUnits(res)).toFixed(2)
      );
      // return Big(ethers.utils.formatUnits(res)).toFixed(2);
    })
    .catch((err) => {
      console.log("getUserRewardPercentage_error:", err);
    });
}

useEffect(() => {
  State.update({ account });
  if (account) {
    // getUserTotalDeposit("0xD481eD22a20708839aeB7f1d07E1d01cbc526184");
    initPoolList();
  }
}, [account]);

useEffect(() => {
  getTokenPrices();
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    })
    .catch(() => {});
}, []);

useEffect(() => {
  console.log("state:", state.poolsList);
}, [state.poolsList]);

const handleChangeTabs = (value) => {
  State.update({
    currentTab: value,
  });
};

const switchChain = () => {
  Ethers.send("wallet_switchEthereumChain", [
    { chainId: `0x${Number(CHAIN_ID).toString(16)}` },
  ]);
};

// const handleClaim = (address) => {
//   State.update({
//     isClaiming: true,
//   });
//   const ClaimRewardsContract = new ethers.Contract(
//     address,
//     [
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "_account",
//             type: "address",
//           },
//           {
//             internalType: "bool",
//             name: "_claimExtras",
//             type: "bool",
//           },
//         ],
//         name: "getReward",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//     ],
//     Ethers.provider().getSigner()
//   );

//   return ClaimRewardsContract.getReward(account, true)
//     .then((tx) => {
//       console.log("tx: ", tx);
//       tx.wait()
//         .then((res) => {
//           const { status, transactionHash } = res;
//           console.info("tx_res: ", res);
//           if (status === 1) {
//             toast.success?.({
//               title: "Transaction Successful!",
//               text: `transactionHash ${transactionHash}`,
//             });
//           } else {
//             toast.fail?.({
//               title: "Transaction Failed!",
//               text: `transactionHash ${transactionHash}`,
//             });
//           }
//         })
//         .finally(() => {
//           State.update({
//             isClaiming: false,
//           });
//         });
//     })
//     .catch((err) => {
//       console.log("getPoolTokens_error:", err);
//       State.update({
//         isClaiming: false,
//       });
//     });
// };

// const handleClaimAll = () => {
//   State.update({
//     isAllClaiming: true,
//   });
//   // let getClaimAllArray = [];

//   // for (let i = 0; i < state.myPoolsList.length; i++) {
//   //   const addr = state.myPoolsList[i].Rewards_contract_address;
//   //   getClaimAllArray.push(handleClaim(addr));
//   // }
//   // Promise.allSettled(getClaimAllArray)
//   //   .then((res) => {
//   //     console.info("getClaimAllArray: ", res);
//   //   })
//   //   .catch((error) => {
//   //     console.info("getClaimAllArray: ", error);
//   //   })
//   //   .finally(() => {
//   //     State.update({
//   //       isAllClaiming: false,
//   //     });
//   //   });
// };

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
                src="dapdapbos.near/widget/Staking.Athena.Pool"
                props={{
                  ...props,
                  data: item,
                  chainId: state.chainId,
                  account: state.account,
                  TOKENS,
                  CHAIN_ID,
                  LockingABI,
                  slotLength: state.slotLength,
                  //
                  RewardPoolDepositWrapper,
                  RewardPoolDepositABI,
                  switchChain,
                  // tokenIcons: getPoolIcon(item.tokenAssets),
                  TVLS: state.TVLS,
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
              <Widget
                src="dapdapbos.near/widget/UI.Button"
                props={{
                  text: "Claim All",
                  type: "green",
                  style: { width: 118 },
                  loading: state.isAllClaiming,
                  disabled: !state.myPoolsList.length,
                  onClick: handleClaimAll,
                }}
              />
            </div>
          </AssetsPanel>
        </AssetsWrapper>
        <GridContainer className="grid-pool-head">
          <GridItem>Pool</GridItem>
          <GridItem>APR</GridItem>
          <GridItem>You Staked</GridItem>
          <GridItem>Your rewards</GridItem>
          <GridItem className="action-item-head">Action</GridItem>
        </GridContainer>
        <HeadWrapper>
          {state.myPoolsList.length
            ? state.myPoolsList?.map((item, index) => (
                <PoolItem key={index}>
                  <GridContainer className="pool-head">
                    <GridItem>
                      <div className="title-primary">
                        <Widget
                          src="dapdapbos.near/widget/UI.Avatar"
                          props={{ src: TOKENS[tokenAddress].icon }}
                        />

                        <span style={{ marginLeft: 8 }}>{item.poolName}</span>
                      </div>
                    </GridItem>
                    <GridItem>
                      <div className="title-secondary">%</div>
                      <div className="title-sub">proj. %</div>
                    </GridItem>
                    <GridItem>
                      <div className="title-secondary">
                        ${item.stakedAmount}
                      </div>
                    </GridItem>
                    <GridItem>
                      <div className="title-secondary">${item.reward}</div>
                      <div className="title-sub"></div>
                    </GridItem>
                    <GridItem className="action-item">
                      <Widget
                        src="dapdapbos.near/widget/UI.Button"
                        props={{
                          text: "Claim",
                          type: "green",
                          style: { width: 118 },
                          loading: state.isClaiming,
                          onClick: () => {
                            // handleClaim(item.Rewards_contract_address);
                          },
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </PoolItem>
              ))
            : null}
        </HeadWrapper>
      </Tabs.Content>
    </Tabs.Root>
  </Wrapper>
);
