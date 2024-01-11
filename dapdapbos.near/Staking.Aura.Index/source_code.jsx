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
const CHAIN_ID = 100;

const POOL_TYPES = {
  WeightedPool: "WeightedPool",
  ComposableStablePool: "ComposableStablePool",
  StablePool: "StablePool",
};

const POOLS = [
  {
    poolName: "WETH-wstETH",
    Rewards_contract_address: "0x026d163C28cC7dbf57d6ED57f14208Ee412CA526",
    Rewards_depositor_contract_address:
      "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
    LP_token_address: "0xbad20c15a773bf03ab973302f61fabcea5101f0a",
    Balancer_Gauge: "0x27519F69b2Ac912aeb6fE066180FB25a17c71755",
    Aura_Stash: "0xe2F2499474B4Bef0a7320c1D2b0FEfFD5430Acf8",
    Balancer_Pool_ID:
      "0xbad20c15a773bf03ab973302f61fabcea5101f0a000000000000000000000034",
    Aura_Pool_ID: 0,
    poolType: POOL_TYPES.WeightedPool,
  },
  {
    poolName: "staBAL3-EURe",
    Rewards_contract_address: "0xf4116f1be90057e6f85b0dcc14c47c84cc4575da",
    Rewards_depositor_contract_address:
      "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
    LP_token_address: "0x0c1b9ce6bf6c01f587c2ee98b0ef4b20c6648753",
    Balancer_Gauge: "0x492cd2290e5b971eab622d6325cef6a329cf8a58",
    Aura_Stash: "0x727d3d124bc9880d06aa7508c78c2c1f4e7369b2",
    Balancer_Pool_ID:
      "0x0c1b9ce6bf6c01f587c2ee98b0ef4b20c6648753000000000000000000000050",
    Aura_Pool_ID: 14,
    poolType: POOL_TYPES.ComposableStablePool,
  },
  {
    poolName: "USDT-sDAI-USDC",
    Rewards_contract_address: "0x7513105d6cf9d18756d95ded81d6d3f68db4b8da",
    Rewards_depositor_contract_address:
      "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
    LP_token_address: "0x7644fa5d0ea14fcf3e813fdf93ca9544f8567655",
    Balancer_Gauge: "0xdec0362b3229690fbe4f88c57472610588bb9a2e",
    Aura_Stash: "0xffd046ed3635697c98c5ee1ac92f6c7ed1c9da54",
    Balancer_Pool_ID:
      "0x7644fa5d0ea14fcf3e813fdf93ca9544f8567655000000000000000000000066",
    Aura_Pool_ID: 21,
    poolType: POOL_TYPES.ComposableStablePool,
  },
  {
    poolName: "stEUR-EURe",
    Rewards_contract_address: "0x408883e983695dec78cf66480e6efef907a73c21",
    Rewards_depositor_contract_address:
      "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
    LP_token_address: "0x06135a9ae830476d3a941bae9010b63732a055f4",
    Balancer_Gauge: "0x49b7c059bf0a71583918928d33c84dcb2aa001f8",
    Aura_Stash: "0xf2a9d8ea9bebf593977e98da1e642403c8834e06",
    Balancer_Pool_ID:
      "0x06135a9ae830476d3a941bae9010b63732a055f4000000000000000000000065",
    Aura_Pool_ID: 22,
    poolType: POOL_TYPES.ComposableStablePool,
  },
  {
    poolName: "wstETH-GNO",
    Rewards_contract_address: "0x14a81c9283cc16897daa3f466847baa260b770eb",
    Rewards_depositor_contract_address:
      "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
    LP_token_address: "0x4683e340a8049261057d5ab1b29c8d840e75695e",
    Balancer_Gauge: "0xb812249d60b80c7cbc9398e382ed6dfdf82e23d2",
    Aura_Stash: "0x95d41829eb179d549ede8e6db31c10818c7a4e0f",
    Balancer_Pool_ID:
      "0x4683e340a8049261057d5ab1b29c8d840e75695e00020000000000000000005a",
    Aura_Pool_ID: 15,
    poolType: POOL_TYPES.WeightedPool,
  },
  {
    poolName: "staBAL3-GNO",
    Rewards_contract_address: "0x7e6ccd111b56dd650af9d598e23f0cb0da7e59e7",
    Rewards_depositor_contract_address:
      "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
    LP_token_address: "0x274dedb9356c3e1e24bfe2bf3d4349fbdbfa0d14",
    Balancer_Gauge: "0x4489dc0ff2a43023f2a85efdc4614d250612dd0d",
    Aura_Stash: "0x429dc5616f9c78131a4bb592b1a0eb6f5e996c0e",
    Balancer_Pool_ID:
      "0x274dedb9356c3e1e24bfe2bf3d4349fbdbfa0d14000200000000000000000054",
    Aura_Pool_ID: 12,
    poolType: POOL_TYPES.WeightedPool,
  },
  {
    poolName: "staBAL3-WETH-WBTC",
    Rewards_contract_address: "0x112EA63D3A70bB7926F95DA81EaDF71Aba0f0955",
    Rewards_depositor_contract_address:
      "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
    LP_token_address: "0x66888e4f35063ad8bb11506a6fde5024fb4f1db0",
    Balancer_Gauge: "0x9fF4e3925B88B6885083A88c2283a21CD504D3d4",
    Aura_Stash: "0x353a64558c8670974216BDa16c3d420FADE65293",
    Balancer_Pool_ID:
      "0x66888e4f35063ad8bb11506a6fde5024fb4f1db0000100000000000000000053",
    Aura_Pool_ID: 13,
    poolType: POOL_TYPES.WeightedPool,
  },

  // {
  //   poolName: "wstETH-BAL-AURA",
  //   Rewards_contract_address: "0x51867537e5532186E76BA5380235512A9A4ca52a",
  //   Rewards_depositor_contract_address:
  //     "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
  //   LP_token_address: "0x00df7f58e1cf932ebe5f54de5970fb2bdf0ef06d",
  //   Balancer_Gauge: "0x64cee2356f959E78DB36A4C23a28f0454447C3dF",
  //   Aura_Stash: "0xbcb983169F5206E7a01DdB75f22489965fB9eF66",
  //   Balancer_Pool_ID:
  //     "0x00df7f58e1cf932ebe5f54de5970fb2bdf0ef06d00010000000000000000005b",
  //   Aura_Pool_ID: 17,
  //   poolType: POOL_TYPES.WeightedPool,
  // },
  // {
  //   poolName: "crvUSD-sDAI",
  //   Rewards_contract_address: "0xfad4505c5bf3d3654ba7c97a0cea6e7b35882959",
  //   Rewards_depositor_contract_address:
  //     "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
  //   LP_token_address: "0xc9f00c3a713008ddf69b768d90d4978549bfdf94",
  //   Balancer_Gauge: "0xb079bd76dd9b5f9a8d3954e4250fc25be0549ac0",
  //   Aura_Stash: "0x19e21f4a9283f940e871f648efd07051cd274eaa",
  //   Balancer_Pool_ID:
  //     "0xc9f00c3a713008ddf69b768d90d4978549bfdf9400000000000000000000006d",
  //   Aura_Pool_ID: 23,
  //   poolType: POOL_TYPES.ComposableStablePool,
  // },
  // {
  //   poolName: "wstETH-COW",
  //   Rewards_contract_address: "0x85298595d4f6f8fa91f8658ba9c10f9a85b17f62",
  //   Rewards_depositor_contract_address:
  //     "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
  //   LP_token_address: "0x4cdabe9e07ca393943acfb9286bbbd0d0a310ff6",
  //   Balancer_Gauge: "0xce18a3d0d928ab8883f355b5009d2de07d5c1d83",
  //   Aura_Stash: "0x918a3d87ddb20f225647e1560f4f66f8e0590311",
  //   Balancer_Pool_ID:
  //     "0x4cdabe9e07ca393943acfb9286bbbd0d0a310ff600020000000000000000005c",
  //   Aura_Pool_ID: 20,
  //   poolType: POOL_TYPES.WeightedPool,
  // },
  // {
  //   poolName: "sDAI-wstETH",
  //   Rewards_contract_address: "0x49aadc30b5ccc57bddd55ac8bd7d8db7cf1f2b8b",
  //   Rewards_depositor_contract_address:
  //     "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
  //   LP_token_address: "0xbc2acf5e821c5c9f8667a36bb1131dad26ed64f9",
  //   Balancer_Gauge: "0x4d13d387f372dbe5125b7d78e75094ac85b31edc",
  //   Aura_Stash: "0x6363d0c1f5cbc85e49af00cd8da1827f7a417b19",
  //   Balancer_Pool_ID:
  //     "0xbc2acf5e821c5c9f8667a36bb1131dad26ed64f9000200000000000000000063",
  //   Aura_Pool_ID: 19,
  //   poolType: POOL_TYPES.WeightedPool,
  // },
  // {
  //   poolName: "sDAI-EURe",
  //   Rewards_contract_address: "0xde151980d461696543aa07a19bbe2603b20ecbae",
  //   Rewards_depositor_contract_address:
  //     "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
  //   LP_token_address: "0xdd439304a77f54b1f7854751ac1169b279591ef7",
  //   Balancer_Gauge: "0xbb2598b89202596a743be0b615001d7d5164f167",
  //   Aura_Stash: "0x6068eb7490748a1a49830b58524c002b545c1ce2",
  //   Balancer_Pool_ID:
  //     "0xdd439304a77f54b1f7854751ac1169b279591ef7000000000000000000000064",
  //   Aura_Pool_ID: 18,
  //   poolType: POOL_TYPES.ComposableStablePool,
  // },
  // {
  //   poolName: "staBAL3-wstETH",
  //   Rewards_contract_address: "0xddb26f9864da5cf70c680942be91fc7e9aa2401c",
  //   Rewards_depositor_contract_address:
  //     "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
  //   LP_token_address: "0xeb30c85cc528537f5350cf5684ce6a4538e13394",
  //   Balancer_Gauge: "0xef23c2ec60a1ea3ed6a44681fb72356cb411177e",
  //   Aura_Stash: "0x44b9143e4582b5141b654b9486a52b4124d9b623",
  //   Balancer_Pool_ID:
  //     "0xeb30c85cc528537f5350cf5684ce6a4538e13394000200000000000000000059",
  //   Aura_Pool_ID: 16,
  //   poolType: POOL_TYPES.WeightedPool,
  // },
];
const TOKENS = {
  "0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252": {
    address: "0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252",
    chainId: CHAIN_ID,
    name: "WBTC",
    symbol: "WBTC",
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    decimals: 8,
  },
  "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1": {
    address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    chainId: CHAIN_ID,
    name: "WETH",
    symbol: "WETH",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    decimals: 18,
  },
  "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb": {
    address: "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb",
    chainId: CHAIN_ID,
    name: "GNO",
    symbol: "GNO",
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6810e776880C02933D47DB1b9fc05908e5386b96/logo.png",
    decimals: 18,
  },
  "0x6C76971f98945AE98dD7d4DFcA8711ebea946eA6": {
    address: "0x6C76971f98945AE98dD7d4DFcA8711ebea946eA6",
    chainId: CHAIN_ID,
    name: "wstETH",
    symbol: "wstETH",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0.png",
    decimals: 18,
  },
  "0x1509706a6c66CA549ff0cB464de88231DDBe213B": {
    address: "0x1509706a6c66CA549ff0cB464de88231DDBe213B",
    chainId: CHAIN_ID,
    name: "AURA",
    symbol: "AURA",
    icon: "https://app.aura.finance/assets/aura-362899d2.png",
    decimals: 18,
  },
  "0xaBEf652195F98A91E490f047A5006B71c85f058d": {
    address: "0xaBEf652195F98A91E490f047A5006B71c85f058d",
    chainId: CHAIN_ID,
    name: "crvUSD",
    symbol: "crvUSD",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xabef652195f98a91e490f047a5006b71c85f058d.png",
    decimals: 18,
  },
  "0xaf204776c7245bF4147c2612BF6e5972Ee483701": {
    address: "0xaf204776c7245bF4147c2612BF6e5972Ee483701",
    chainId: CHAIN_ID,
    name: "sDAI",
    symbol: "sDAI",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x83f20f44975d03b1b09e64809b757c47f942beea.png",
    decimals: 18,
  },
  "0x2086f52651837600180dE173B09470F54EF74910": {
    address: "0x2086f52651837600180dE173B09470F54EF74910",
    chainId: CHAIN_ID,
    name: "staBAL3",
    symbol: "staBAL3",
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    decimals: 18,
  },
  "0x7eF541E2a22058048904fE5744f9c7E4C57AF717": {
    address: "0x7eF541E2a22058048904fE5744f9c7E4C57AF717",
    chainId: CHAIN_ID,
    name: "BAL",
    symbol: "BAL",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xba100000625a3754423978a60c9317c58a424e3d.png",
    decimals: 18,
  },
  "0x4ECaBa5870353805a9F068101A40E0f32ed605C6": {
    address: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
    chainId: CHAIN_ID,
    name: "USDT",
    symbol: "USDT",
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    decimals: 6,
  },
  "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83": {
    address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    chainId: CHAIN_ID,
    name: "USDC",
    symbol: "USDC",
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    decimals: 6,
  },
  "0x177127622c4A00F3d409B75571e12cB3c8973d3c": {
    address: "0x177127622c4A00F3d409B75571e12cB3c8973d3c",
    chainId: CHAIN_ID,
    name: "COW",
    symbol: "COW",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab.png",
    decimals: 18,
  },
  "0xcB444e90D8198415266c6a2724b7900fb12FC56E": {
    address: "0xcB444e90D8198415266c6a2724b7900fb12FC56E",
    chainId: CHAIN_ID,
    name: "EURe",
    symbol: "EURe",
    icon: "https://assets.coingecko.com/coins/images/23354/large/eur.png?1643926562",
    decimals: 18,
  },
  "0x004626A008B1aCdC4c74ab51644093b155e59A23": {
    address: "0x004626A008B1aCdC4c74ab51644093b155e59A23",
    chainId: CHAIN_ID,
    name: "stEUR",
    symbol: "stEUR",
    icon: "https://assets.coingecko.com/coins/images/32036/large/stEUR-x4.png",
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

const initList = POOLS.map((item) => ({ ...item, stakedAmount: 0, reward: 0 }));
const { toast } = props;
State.init({
  currentTab: "TAB_POOL",
  chainId: "", // current chain
  account: "", // current wallet address
  poolsList: initList, //
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
  let getBalanceArray = [];
  let getPoolTokensArray = [];
  let getRewardsArray = [];
  let getRewardsTotalSupplyArray = [];
  let getBPTArray = [];
  let getBPTTotalSupplyArray = [];

  for (let i = 0; i < state.poolsList.length; i++) {
    const item = state.poolsList[i];
    getBalanceArray.push(getBalance(item));
    getPoolTokensArray.push(getPoolTokens(item));
    getRewardsArray.push(getRewards(item));
    getBPTArray.push(getBPTBalance(item));
    getBPTTotalSupplyArray.push(getBPTTotalSupply(item));
    getRewardsTotalSupplyArray.push(getRewardTotalSupply(item));
    getRewardRate(item);
  }

  Promise.allSettled(getBalanceArray).then((res) => {
    const temp = [...state.poolsList];
    for (let i = 0; i < res.length; i++) {
      if (res[i].status === "fulfilled") {
        temp[i].stakedAmount = res[i].value;
      } else {
        temp[i].stakedAmount = 0;
      }
    }
    State.update({
      poolsList: temp,
      fresh: state.fresh + 1,
    });
  });

  Promise.allSettled(getPoolTokensArray).then((res) => {
    const temp = [...state.poolsList];
    for (let i = 0; i < res.length; i++) {
      if (res[i].status === "fulfilled") {
        const addrArray = res[i].value[0];
        const tokenBalArray = res[i].value[1];
        temp[i].tokenAssets = addrArray;
        temp[i].tokenBalance = tokenBalArray;
        temp[i].tokens = addrArray
          ? addrArray.map((addr) => TOKENS[addr].symbol)
          : [];
      } else {
        temp[i].tokenAssets = [];
        temp[i].tokens = [];
      }
    }
    State.update({
      poolsList: temp,
      fresh: state.fresh + 1,
    });
  });

  Promise.allSettled(getRewardsArray).then((res) => {
    const temp = [...state.poolsList];
    for (let i = 0; i < res.length; i++) {
      if (res[i].status === "fulfilled") {
        temp[i].reward = res[i].value;
      } else {
        temp[i].reward = 0;
      }
    }
    State.update({
      poolsList: temp,
      fresh: state.fresh + 1,
    });
  });
  Promise.allSettled(getBPTArray).then((res) => {
    const temp = [...state.poolsList];
    for (let i = 0; i < res.length; i++) {
      if (res[i].status === "fulfilled") {
        temp[i].bptAmount = res[i].value;
      } else {
        temp[i].bptAmount = 0;
      }
    }
    State.update({
      poolsList: temp,
      fresh: state.fresh + 1,
    });
  });

  Promise.allSettled(getBPTTotalSupplyArray).then((res) => {
    const temp = [...state.poolsList];
    for (let i = 0; i < res.length; i++) {
      if (res[i].status === "fulfilled") {
        temp[i].bptTotalSupply = res[i].value;
      } else {
        temp[i].bptTotalSupply = 0;
      }
    }
    State.update({
      poolsList: temp,
      fresh: state.fresh + 1,
    });
  });
  Promise.allSettled(getRewardsTotalSupplyArray).then((res) => {
    const temp = [...state.poolsList];
    for (let i = 0; i < res.length; i++) {
      if (res[i].status === "fulfilled") {
        temp[i].rewardTotalSupply = res[i].value;
      } else {
        temp[i].rewardTotalSupply = 0;
      }
    }
    State.update({
      poolsList: temp,
      fresh: state.fresh + 1,
    });
  });
}

function getPoolTokens(pool) {
  // https://gnosisscan.io/address/0xba12222222228d8ba445958a75a0704d566bf2c8#readContract
  const PoolContract = new ethers.Contract(
    PoolContractWrapper,
    PoolContractABI,
    Ethers.provider()
  );
  return PoolContract.getPoolTokens(pool.Balancer_Pool_ID)
    .then((res) => {
      console.info(
        pool.poolName,
        res,
        res[1].map((item) => ethers.utils.formatUnits(item)),
        res[2].toString()
      );
      return res;
    })
    .catch((err) => {
      console.log("getPoolTokens_error:", err);
    });
}

function getBPTBalance(pool) {
  const PoolContract = new ethers.Contract(
    pool.LP_token_address,
    LPTokenABI,
    Ethers.provider()
  );
  return PoolContract.balanceOf(account)
    .then((res) => {
      // console.info(
      //   pool.poolName,
      //   "BPT: ",
      //   res,
      //   ethers.utils.formatUnits(res),
      //   res.toString()
      // );
      return ethers.utils.formatUnits(res);
    })
    .catch((err) => {
      console.log("getBPTBalance_error:", err);
    });
}
function getBPTTotalSupply(pool) {
  const PoolContract = new ethers.Contract(
    pool.LP_token_address,
    LPTokenABI,
    Ethers.provider()
  );
  return PoolContract.getActualSupply()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("getBPTBalance_error:", err);
    });
}
// function testpp() {
//   const ep = Big(404145240482690656857139).times(1.09);
//   const r = Big(296420101889362424737222)
//     .times(1.11)
//     .plus(ep)
//     .div(699663148517080204980206);
//   const a = r.times(Big(260806212218232372369741));
//   console.log(111111, a, a.toFixed(), a.toString());
// }
function getBalance(pool) {
  const BalanceContract = new ethers.Contract(
    pool.Rewards_contract_address,
    RewardsContractABI,
    Ethers.provider()
  );
  return BalanceContract.balanceOf(account)
    .then((res) => {
      // console.log(
      //   "getBalance: ",
      //   res,
      //   res.toString(),
      //   Big(ethers.utils.formatUnits(res)).toFixed(2)
      // );
      return Big(ethers.utils.formatUnits(res)).toFixed(2);
    })
    .catch((err) => {
      console.log("getBalance_error:", err);
    });
}
function getRewardRate(pool) {
  const RewardContract = new ethers.Contract(
    pool.Rewards_contract_address,
    RewardsContractABI,
    Ethers.provider()
  );
  return RewardContract.rewardRate()
    .then((res) => {
      // console.log(
      //   111111111,
      //   pool.poolName,
      //   res,
      //   ethers.utils.formatUnits(res),
      //   ethers.utils.formatUnits(res) * (86_400 * 365) * 11.44
      // );
    })
    .catch((err) => {
      console.log("getBalance_error:", err);
    });
}
function getRewardTotalSupply(pool) {
  const RewardContract = new ethers.Contract(
    pool.Rewards_contract_address,
    RewardsContractABI,
    Ethers.provider()
  );
  return RewardContract.totalSupply()
    .then((res) => {
      console.log(pool.poolName, "totalSupply", res, res.toString());
      // console.log(
      //   "getBalance: ",
      //   res,
      //   res.toString(),
      //   Big(ethers.utils.formatUnits(res)).toFixed(2)
      // );
      // return Big(ethers.utils.formatUnits(res)).toFixed(2);
      return res;
    })
    .catch((err) => {
      console.log("getBalance_error:", err);
    });
}

const getRewards = (pool) => {
  const RewardsContract = new ethers.Contract(
    pool.Rewards_contract_address,
    RewardsContractABI,
    Ethers.provider()
  );
  return RewardsContract.rewards(account)
    .then((res) => {
      return Big(ethers.utils.formatUnits(res)).toFixed(2);
    })
    .catch((err) => {
      console.log("currentRewards_err:", err);
    });
};

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

function calcTVL() {
  const temp = [...state.poolsList];
  for (let i = 0; i < temp.length; i++) {
    const tokens = temp[i].tokens;
    const tokenBalance = temp[i].tokenBalance;

    if (tokens && tokenBalance && state.tokenPrices) {
      try {
        const sum = tokens?.reduce((total, cur, j) => {
          if (cur) {
            const tokenId = COINGECKO_IDS[cur];
            const price = state.tokenPrices[tokenId]?.usd || 0;

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

        const bptPriceUsd = Big(sum).div(Big(temp[i].bptTotalSupply));
        temp[i].poolValueUsd = sum;
        temp[i].bptPriceUsd = bptPriceUsd;
        temp[i].TVL = Big(temp[i].rewardTotalSupply)
          .times(bptPriceUsd)
          .toString();
      } catch (error) {
        console.log("calcTVL_error", error);
      }
    }
  }

  const tvls = temp.map((item) => ({
    Aura_Pool_ID: item.Aura_Pool_ID,
    TVL: item.TVL,
  }));
  State.update({
    TVLS: tvls,
  });
}

useEffect(() => {
  State.update({ account });
  if (account) {
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
  console.log("POOLS_LIST: ", state, state.poolsList, state.tokenPrices);
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

  calcTVL();

  State.update({
    totalDepositAmount,
    totalRewardsAmount,
    myPoolsList: temp,
  });
}, [state.poolsList, state.fresh, state.tokenPrices]);

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
  return (
    <Widget
      src="dapdapbos.near/widget/UI.AvatarGroup"
      props={{
        icons,
        size: 26,
      }}
    />
  );
};

const switchChain = () => {
  Ethers.send("wallet_switchEthereumChain", [
    { chainId: `0x${Number(CHAIN_ID).toString(16)}` },
  ]);
};

const handleClaim = (address) => {
  State.update({
    isClaiming: true,
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
          State.update({
            isClaiming: false,
          });
        });
    })
    .catch((err) => {
      console.log("getPoolTokens_error:", err);
      State.update({
        isClaiming: false,
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
                  chainId: state.chainId,
                  account: state.account,
                  TOKENS,
                  CHAIN_ID,
                  RewardPoolDepositWrapper,
                  RewardPoolDepositABI,
                  switchChain,
                  tokenIcons: getPoolIcon(item.tokenAssets),
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
                  type: "primary",
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
                        {renderPoolIcon(item.tokenAssets)}

                        <span style={{ marginLeft: 20 }}>{item.poolName}</span>
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
                      <Widget
                        src="dapdapbos.near/widget/UI.Button"
                        props={{
                          text: "Claim",
                          type: "primary",
                          style: { width: 118 },
                          loading: state.isClaiming,
                          onClick: () => {
                            handleClaim(item.Rewards_contract_address);
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
