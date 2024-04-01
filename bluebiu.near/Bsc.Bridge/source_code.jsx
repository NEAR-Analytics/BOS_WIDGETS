const Theme = styled.div`
  --bg-color: #181a27;
  --border-color: #352e24;
  --label-color: #8a7133;
  --chain-name-color: #fff;
  --input-border-color: #4b3f2c;
  --button-color: #f3ba2f;
  --button-text-color: #000;
  --thirdary-text-color: #6a624b;
  --arrow-color: #f3ba2f;
  --swap-icon-color: #f3ba2f;
  --tx-button-color: #8a7133;
  --processing-color: #8a7133;
  --success-color: #1abd00;
  --dialog-bg-color: #373a53;
  --dialog-info-color: #ff61d3;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);
`;

const CHAIN_ID = 56;
const CHAIN_NAME = "BNB";
const Tokens = [
  {
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    symbol: "USDT",
    icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    decimals: 18,
    poolId: 2,
    targetPoolId: 2,
    targetDecimals: 6,
    targetAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    address: "0xd17479997F34dd9156Deef8F95A52D81D265be9c",
    name: "Decentralized USD",
    symbol: "USDD",
    icon: "https://assets.coingecko.com/coins/images/25380/standard/UUSD.jpg?1696524513",
    decimals: 18,
    poolId: 11,
    targetPoolId: 11,
    targetDecimals: 18,
    targetAddress: "0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6",
  },
  {
    address: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d",
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
          //   src: "https://ipfs.near.social/ipfs/bafkreiajfajinsydy3ewmc3elgnpahc3n3v4cophn6ip5bzr3ym7ypn5vm",
          //   style: {
          //     width: "282px",
          //     height: "167px",
          //     marginTop: "80px",
          //   },
          // },
          noAccountTips: "BNB Chain Bridge",
          wrongNetworkTips: "To proceed, kindly switch to BNB Chain.",
        },
        chain: {
          id: CHAIN_ID,
          dstId: 102,
          name: CHAIN_NAME,
          logo: "https://ipfs.near.social/ipfs/bafkreibtexscwwgqupgb7anrseqdpogvt4cckyv4kavr7o3jgtcqzjkx5m",
          explorer: "https://bscscan.com",
          routerAddress: "0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8",
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
