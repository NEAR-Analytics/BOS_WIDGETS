const ALL_DATA_URL = "https://wire2.gamma.xyz/lynex/linea/hypervisors/allData";

const USER_DATA_BASE = "https://wire2.gamma.xyz/lynex/linea/user/";

const CHAIN_CONFIG = {
  chainName: "Linea",
  nativeCurrency: {
    name: "Linea",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.linea.build"],
  blockExplorerUrls: ["https://lineascan.build/"],
};

const MAINNET_CHAIN_ID = 59144;

const addresses = {
  USDC: "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
  WETH: "0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f",
  BUSD: "0x7d43aabc515c356145049227cee54b608342c0ad",
  USDT: "0xa219439258ca9da29e9cc4ce5596924745e12b93",
  MATIC: "0x265b25e22bcd7f10a5bd6e6410f10537cc7567e8",
  WBTC: "0x3aab2285ddcddad8edf438c1bab47e1a9d05a9b4",

  "WBTC-WETH-0": "0x8a9570ec97534277ade6e46d100939fbce4968f0",
  "USDC-WETH-0": "0xc0766ff871c6c8e72c110100d0120829dc017d38",
  "USDT-WETH-0": "0xf3b1125c8505f038503e002e61a78253610d4f60",
  "MATIC-WETH-0": "0x8421c6102ee8a147facc01977df3b159f7921d54",
  "USDC-BUSD-0": "0xd6cc4a33da7557a629e819c68fb805ddb225f517",
  "BUSD-USDT-0": "0x32e27ff479454e32868ff67ee9f06bafdc1e908f",
  "BUSD-WETH-0": "0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c",

  // "N USDC-BUSD": "0x0b15a5e3ca0d4b492c3b476d0f807535f9b72079",
  // "S BUSD-USDT-0": "0x32e27ff479454e32868ff67ee9f06bafdc1e908f",
  // "N BUSD-WETH-0": "0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c",
  // "N MATIC-WETH-0": "0x8421c6102ee8a147facc01977df3b159f7921d54",
  // "N WBTC-WETH-0": "0x8a9570ec97534277ade6e46d100939fbce4968f0",
  // "S USDC-BUSD-0": "0xd6cc4a33da7557a629e819c68fb805ddb225f517",
  // "N USDT-WETH-0": "0xf3b1125c8505f038503e002e61a78253610d4f60",
};

const pairs = [
  {
    id: "WBTC-WETH-0",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "WBTC",
    token1: "WETH",
    decimals0: 8,
    decimals1: 18,
  },
  {
    id: "USDC-WETH-0",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDC",
    token1: "WETH",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "USDT-WETH-0",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDT",
    token1: "WETH",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "MATIC-WETH-0",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "MATIC",
    token1: "WETH",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "USDC-BUSD-0",
    strategy: "Dynamic",
    strategy2: "Stable",
    token0: "USDC",
    token1: "BUSD",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "BUSD-USDT-0",
    strategy: "Dynamic",
    strategy2: "Stable",
    token0: "BUSD",
    token1: "USDT",
    decimals0: 18,
    decimals1: 6,
  },

  {
    id: "BUSD-WETH-0",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "BUSD",
    token1: "WETH",
    decimals0: 18,
    decimals1: 18,
  },
];

const proxyAddress = "0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621";

const defaultPair = {
  id: "USDC-WETH-0",
  strategy: "Dynamic",
  strategy2: "Narrow",
  token0: "USDC",
  token1: "WETH",
  decimals0: 6,
  decimals1: 18,
};

const ThemeContainer = styled.div`
  --button-text-color: #000;
  --button-color: #56daff;
`;

return (
  <ThemeContainer>
    <Widget
      src="bluebiu.near/widget/Linea.Liquidity.GAMMA.GAMMAConnector"
      props={{
        addresses,
        pairs,
        proxyAddress,
        defaultPair,
        CHAIN_CONFIG,
        ALL_DATA_URL,
        USER_DATA_BASE,
        MAINNET_CHAIN_ID,
        ...props,
      }}
    />
  </ThemeContainer>
);
