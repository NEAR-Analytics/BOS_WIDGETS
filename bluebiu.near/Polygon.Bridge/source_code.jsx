const Theme = styled.div`
  --bg-color: #181a27;
  --border-color: #332c4b;
  --label-color: #8c7ebd;
  --chain-name-color: #fff;
  --input-border-color: #332c4b;
  --button-color: #794fdd;
  --button-text-color: #fff;
  --thirdary-text-color: rgba(255, 255, 255, 0.3);
  --arrow-color: #8c7ebd;
  --swap-icon-color: #8c7ebd;
  --tx-button-color: #8c7ebd;
  --processing-color: #8c7ebd;
  --success-color: #1abd00;
  --dialog-bg-color: #373a53;
  --dialog-info-color: #ff61d3;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);
`;

const CHAIN_ID = 137;
const CHAIN_NAME = "Polygon";
const Tokens = [
  {
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
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
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
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
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    name: "Dai Stablecoin",
    symbol: "DAI",
    icon: "https://assets.coingecko.com/coins/images/9956/standard/Badge_Dai.png?1696509996",
    decimals: 18,
    poolId: 3,
    targetPoolId: 3,
    targetDecimals: 18,
    targetAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  {
    address: "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1",
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
          // imgProps: {
          //   src: "https://ipfs.near.social/ipfs/bafkreihcujrphf3k3zgfl4wdnxbz5btydas43uwdmvjgrs5mavbubvrpyq",
          //   style: {
          //     width: "282px",
          //     height: "222px",
          //     marginTop: "80px",
          //   },
          // },
          noAccountTips: "Polygon Bridge",
          wrongNetworkTips: "To proceed, kindly switch to Polygon Chain.",
        },
        chain: {
          id: CHAIN_ID,
          dstId: 109,
          name: CHAIN_NAME,
          logo: "/images/chains/137.png",
          explorer: "https://polygonscan.com",
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
