const Theme = styled.div`
  --bg-color: #181a27;
  --border-color: #382426;
  --label-color: #ff96a2;
  --chain-name-color: #fff;
  --input-border-color: #382426;
  --button-color: #ea3431;
  --button-text-color: #fff;
  --thirdary-text-color: #5e5555;
  --arrow-color: #ff96a2;
  --swap-icon-color: #ff96a2;
  --tx-button-color: #ff96a2;
  --processing-color: #ff96a2;
  --success-color: #1abd00;
  --dialog-bg-color: #373a53;
  --dialog-info-color: #ff61d3;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);
`;

const CHAIN_ID = 43114;
const CHAIN_NAME = "Avalanche";
const Tokens = [
  {
    address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    name: "USDC",
    symbol: "USDC",
    icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    decimals: 6,
    poolId: 1,
    targetPoolId: 1,
    targetDecimals: 6,
    targetAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    name: "USDT",
    symbol: "USDT",
    icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    decimals: 6,
    poolId: 2,
    targetPoolId: 2,
    targetDecimals: 6,
    targetAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    address: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
    name: "Frax",
    symbol: "FRAX",
    icon: "https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png?1696513182",
    decimals: 18,
    poolId: 7,
    targetPoolId: 7,
    targetDecimals: 18,
    targetAddress: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
  },
  {
    address: "0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b",
    name: "Mai Stablecoin",
    symbol: "MAI",
    icon: "https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916",
    decimals: 18,
    poolId: 16,
    targetPoolId: 16,
    targetDecimals: 18,
    targetAddress: "0x8D6CeBD76f18E1558D4DB88138e2DeFB3909fAD6",
  },
];

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Base.Bridge.Index"
      props={{
        connectProps: {
          imgProps: {
            src: "",
            style: {
              width: "283px",
              height: "187px",
              marginTop: "60px",
            },
          },
          noAccountTips: "Avalanche Bridge",
          wrongNetworkTips: "To proceed, kindly switch to Avalanche Chain.",
        },
        chain: {
          id: CHAIN_ID,
          dstId: 106,
          name: CHAIN_NAME,
          logo: "/images/chains/43114.png",
          explorer: "https://snowtrace.io",
          routerAddress: "0x45A01E4e04F14f7A4a6702c74187c5F6222033cd",
        },
        mainnet: {
          id: 1,
          dstId: 101,
          name: "Ethereum",
          logo: "https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a",
          explorer: "https://etherscan.io",
          routerAddress: "0x8731d54E9D02c286767d56ac03e8037C07e01e98",
        },
        tokens: Tokens,
        amountOutFn: "bluebiu.near/widget/Base.Bridge.AmountOut",
        handlerSwap: "bluebiu.near/widget/Base.Bridge.HandlerSwap",
        ...props,
      }}
    />
  </Theme>
);
