const ALL_DATA_URL =
  "https://wire2.gamma.xyz/fusionx/mantle/hypervisors/allData";

const USER_DATA_BASE = "https://wire2.gamma.xyz/fusionx/mantle/user/";

const CHAIN_CONFIG = {
  chainName: "Mantle",
  nativeCurrency: {
    name: "Mantle",
    symbol: "MNT",
    decimals: 18,
  },
  rpcUrls: ["https://mantle-mainnet.public.blastapi.io"],
  blockExplorerUrls: ["https://explorer.mantle.xyz/"],
};

const MAINNET_CHAIN_ID = 5000;

const addresses = {
  USDT: "0x201eba5cc46d216ce6dc03f6a759e8e766e956ae",
  MINU: "0x51cfe5b1e764dc253f4c8c1f19a081ff4c3517ed",
  WMNT: "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8",
  WBTC: "0xcabae6f6ea1ecab08ad02fe02ce9a44f09aebfa2",
  USDC: "0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9",
  WETH: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",

  "N USDT-WMNT-500": "0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c",
  "W USDT-WMNT-500": "0x1ee3ae551188661553882fdc75f8f62eaa6726ad",

  "N MINU-WMNT-10000": "0xd6cc4a33da7557a629e819c68fb805ddb225f517",
  "W MINU-WMNT-10000": "0xf8a02496bd84bd7f7ab9f1a000044fc482d729ca",

  "N USDT-WETH-500": "0xde7421f870ffb2b99998d9ed07c4d9b22e783922",
  "W USDT-WETH-500": "0xfe4bb996926aca85c9747bbec886ec2a3f510c66",

  "N USDT-WBTC-500": "0x2e18b825b049c4994370b0db6c35d0100295b96c",
  "W USDT-WBTC-500": "0xa18d3073441b0774a1efa45ba9d2e7da3441da2f",

  "W USDC-USDT-100": "0x561f5cf838429586d1f8d3826526891b289270ee",
};

const pairs = [
  {
    id: "N USDT-WMNT-500",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDT",
    token1: "WMNT",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "W USDT-WMNT-500",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "USDT",
    token1: "WMNT",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "N MINU-WMNT-10000",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "MINU",
    token1: "WMNT",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "W MINU-WMNT-10000",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "MINU",
    token1: "WMNT",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "N USDT-WETH-500",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDT",
    token1: "WETH",
    decimals0: 6,
    decimals1: 18,
  },

  {
    id: "W USDT-WETH-500",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "USDT",
    token1: "WETH",
    decimals0: 6,
    decimals1: 18,
  },

  {
    id: "N USDT-WBTC-500",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDT",
    token1: "WBTC",
    decimals0: 6,
    decimals1: 8,
  },

  {
    id: "W USDT-WBTC-500",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "USDT",
    token1: "WBTC",
    decimals0: 6,
    decimals1: 8,
  },

  {
    id: "W USDC-USDT-100",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "USDC",
    token1: "USDT",
    decimals0: 6,
    decimals1: 6,
  },
];

const proxyAddress = "0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621";

const defaultPair = {
  id: "W USDT-WETH-500",
  strategy: "Dynamic",
  strategy2: "Wide",
  token0: "USDT",
  token1: "WETH",
  decimals0: 6,
  decimals1: 18,
};

const ThemeContainer = styled.div`
  --button-text-color: black;
  --button-color: rgb(0, 255, 224);
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
