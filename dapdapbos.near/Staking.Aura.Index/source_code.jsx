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

const POOL_TYPES = {
  WeightedPool: "WeightedPool",
  ComposableStablePool: "ComposableStablePool",
  StablePool: "StablePool",
};
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
  {
    poolName: "wstETH-COW",
    Rewards_contract_address: "0x85298595d4f6f8fa91f8658ba9c10f9a85b17f62",
    Rewards_depositor_contract_address:
      "0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76",
    LP_token_address: "0x4cdabe9e07ca393943acfb9286bbbd0d0a310ff6",
    Balancer_Gauge: "0xce18a3d0d928ab8883f355b5009d2de07d5c1d83",
    Aura_Stash: "0x918a3d87ddb20f225647e1560f4f66f8e0590311",
    Balancer_Pool_ID:
      "0x4cdabe9e07ca393943acfb9286bbbd0d0a310ff600020000000000000000005c",
    Aura_Pool_ID: 20,
    poolType: POOL_TYPES.WeightedPool,
  },
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
    chainId,
    name: "WBTC",
    symbol: "WBTC",
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    decimals: 8,
  },
  "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1": {
    address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    chainId,
    name: "WETH",
    symbol: "WETH",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    decimals: 18,
  },
  "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb": {
    address: "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb",
    chainId,
    name: "GNO",
    symbol: "GNO",
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6810e776880C02933D47DB1b9fc05908e5386b96/logo.png",
    decimals: 18,
  },
  "0x6C76971f98945AE98dD7d4DFcA8711ebea946eA6": {
    address: "0x6C76971f98945AE98dD7d4DFcA8711ebea946eA6",
    chainId,
    name: "wstETH",
    symbol: "wstETH",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0.png",
    decimals: 18,
  },
  "0x1509706a6c66CA549ff0cB464de88231DDBe213B": {
    address: "0x1509706a6c66CA549ff0cB464de88231DDBe213B",
    chainId,
    name: "AURA",
    symbol: "AURA",
    icon: "https://app.aura.finance/assets/aura-362899d2.png",
    decimals: 18,
  },
  "0xaBEf652195F98A91E490f047A5006B71c85f058d": {
    address: "0xaBEf652195F98A91E490f047A5006B71c85f058d",
    chainId,
    name: "crvUSD",
    symbol: "crvUSD",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xabef652195f98a91e490f047a5006b71c85f058d.png",
    decimals: 18,
  },
  "0xaf204776c7245bF4147c2612BF6e5972Ee483701": {
    address: "0xaf204776c7245bF4147c2612BF6e5972Ee483701",
    chainId,
    name: "sDAI",
    symbol: "sDAI",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0x83f20f44975d03b1b09e64809b757c47f942beea.png",
    decimals: 18,
  },
  "0x2086f52651837600180dE173B09470F54EF74910": {
    address: "0x2086f52651837600180dE173B09470F54EF74910",
    chainId,
    name: "staBAL3",
    symbol: "staBAL3",
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    decimals: 18,
  },
  "0x7eF541E2a22058048904fE5744f9c7E4C57AF717": {
    address: "0x7eF541E2a22058048904fE5744f9c7E4C57AF717",
    chainId,
    name: "BAL",
    symbol: "BAL",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xba100000625a3754423978a60c9317c58a424e3d.png",
    decimals: 18,
  },
  "0x4ECaBa5870353805a9F068101A40E0f32ed605C6": {
    address: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
    chainId,
    name: "USDT",
    symbol: "USDT",
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    decimals: 6,
  },
  "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83": {
    address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    chainId,
    name: "USDC",
    symbol: "USDC",
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    decimals: 6,
  },
  "0x177127622c4A00F3d409B75571e12cB3c8973d3c": {
    address: "0x177127622c4A00F3d409B75571e12cB3c8973d3c",
    chainId,
    name: "COW",
    symbol: "COW",
    icon: "https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab.png",
    decimals: 18,
  },
  "0xcB444e90D8198415266c6a2724b7900fb12FC56E": {
    address: "0xcB444e90D8198415266c6a2724b7900fb12FC56E",
    chainId,
    name: "EURe",
    symbol: "EURe",
    icon: "https://assets.coingecko.com/coins/images/23354/large/eur.png?1643926562",
    decimals: 18,
  },
  "0x004626A008B1aCdC4c74ab51644093b155e59A23": {
    address: "0x004626A008B1aCdC4c74ab51644093b155e59A23",
    chainId,
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

function initPoolList() {
  for (let i = 0; i < state.poolsList.length; i++) {
    const item = state.poolsList[i];

    getMultiLPToken(item, i);

    getMultiRewards(item, i);
  }

  getMultiPoolTokens();
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
  multiCallV2({
    abi: RewardsContractABI,
    calls,
    options: {},
    multicallAddress,
  })
    .then((res) => {
      console.log("getMultiRewards_res", res);
      const temp = [...state.poolsList];
      const [[balance], [rewardRate], [totalSupply], [rewards]] = res;

      temp[index].rewardRate = rewardRate;
      temp[index].stakedAmount = Big(
        ethers.utils.formatUnits(balance || 0)
      ).toFixed(2);
      temp[index].rewardTotalSupply = totalSupply;
      temp[index].reward = Big(ethers.utils.formatUnits(rewards || 0)).toFixed(
        2
      );
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

  multiCallV2({ abi: LPTokenABI, calls, options: {}, multicallAddress })
    .then((res) => {
      console.log("getMultiLPToken res:", res);
      const temp = [...state.poolsList];
      const [[balance], [totalSupply], [swapFeePer]] = res;

      temp[index].bptAmount = ethers.utils.formatUnits(balance);
      temp[index].bptTotalSupply = totalSupply;
      temp[index].swapFee = Big(ethers.utils.formatUnits(swapFeePer))
        .mul(100)
        .toFixed();

      State.update({
        poolsList: temp,
        flag2: true,
      });
    })
    .catch((err) => {
      console.log("getMultiLPToken_error", err);
    });
}

function multiCallV2({ abi, calls, options, multicallAddress }) {
  const MULTICALL_ABI = [
    {
      inputs: [
        { internalType: "bool", name: "requireSuccess", type: "bool" },
        {
          components: [
            { internalType: "address", name: "target", type: "address" },
            { internalType: "bytes", name: "callData", type: "bytes" },
          ],
          internalType: "struct Multicall2.Call[]",
          name: "calls",
          type: "tuple[]",
        },
      ],
      name: "tryAggregate",
      outputs: [
        {
          components: [
            { internalType: "bool", name: "success", type: "bool" },
            { internalType: "bytes", name: "returnData", type: "bytes" },
          ],
          internalType: "struct Multicall2.Result[]",
          name: "returnData",
          type: "tuple[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const MulticallContract = new ethers.Contract(
    multicallAddress,
    MULTICALL_ABI,
    Ethers.provider().getSigner()
  );

  const { requireSuccess, ...overrides } = options || {};
  const itf = new ethers.utils.Interface(abi);
  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));
  return MulticallContract.callStatic
    .tryAggregate(requireSuccess || true, calldata, overrides)
    .then((res) => {
      const temp = res.map((call, i) => {
        const [result, data] = call;
        return result && data !== "0x"
          ? itf.decodeFunctionResult(calls[i].name, data)
          : null;
      });
      return temp;
    })
    .catch((err) => {
      console.log(55555, err);
      // onError?.(err);
    });
}
function getMultiPoolTokens() {
  const ids = state.poolsList.map((item) => item.Balancer_Pool_ID);

  const calls = ids.map((id) => ({
    address: PoolContractWrapper,
    name: "getPoolTokens",
    params: [id],
  }));

  // https://gnosisscan.io/address/0xba12222222228d8ba445958a75a0704d566bf2c8#readContract
  multiCallV2({
    abi: PoolContractABI,
    calls,
    options: {},
    multicallAddress,
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

        temp[i].BAL_APR = rewardPerYearUsd.div(TVL).times(100).toFixed(2);
      } catch (error) {
        console.log("calcTVL_error", error);
      }
    }
  }
}

function getAuraMintAmount(balEarned, global) {
  const reductionPerCliff = BigNumber.from(global.auraReductionPerCliff);
  const maxSupply = BigNumber.from(global.auraMaxSupply);
  const totalSupply = BigNumber.from(global.auraTotalSupply);
  const totalCliffs = BigNumber.from(global.auraTotalCliffs);
  const minterMinted = BigNumber.from(0);

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
    let amount = simpleToExact(balEarned).mul(reduction).div(totalCliffs);

    // e.g. amtTillMax = 5e25 - 1e25 = 4e25
    const amtTillMax = maxSupply.sub(emissionsMinted);
    if (amount.gt(amtTillMax)) {
      amount = amtTillMax;
    }

    return amount;
  }

  return BigNumber.from(0);
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

      calcTVL();
      State.update({
        totalDepositAmount,
        totalRewardsAmount,
        myPoolsList: temp,
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

const renderPoolIcon = () => {
  const icons = getPoolIcon(tokenAssets);
  if (icons) {
    return icons.map((addr, index) => {
      if (TOKENS[addr]) {
        return (
          <span key={index} style={{ marginRight: -12 }}>
            <Widget
              src="dapdapbos.near/widget/UI.Avatar"
              props={{ src: TOKENS[addr].icon }}
            />
          </span>
        );
      }
      return null;
    });
  }
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
                    <div className="title-secondary">%</div>
                    <div className="title-sub">proj. %</div>
                  </GridItem>
                  <GridItem>
                    <div className="title-secondary">${item.stakedAmount}</div>
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
          // theme: dexConfig.theme?.button,
        }}
      />
    )}
  </Wrapper>
);
