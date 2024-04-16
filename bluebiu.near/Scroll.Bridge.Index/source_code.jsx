const Theme = styled.div`
  --button-color: #ff684b;
  --button-text-color: #fff;
  --dialog-bg-color: #373a53;
`;

const CHAIN_ID = 534352;
const CHAIN_NAME = "Scroll";
const Tokens = [
  {
    address: "native",
    name: "ETH",
    symbol: "ETH",
    icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
    decimals: 18,
    poolId: 13,
    targetPoolId: 13,
    targetDecimals: 18,
    targetAddress: "0x72E2F4830b9E45d52F80aC08CB2bEC0FeF72eD9c",
    isNative: true,
  },
];

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Base.Bridge.Index"
      props={{
        connectProps: {
          // imgProps: {
          //   src: "https://ipfs.near.social/ipfs/bafkreihqshwscu7pagkjl2dwx3exjhfktuxuzjss6m6gjs6aicu3t3ns2m",
          //   style: {
          //     width: "437px",
          //     height: "310px",
          //     marginTop: "80px",
          //   },
          // },
          noAccountTips: `${CHAIN_NAME} Bridge`,
          wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
        },
        chain: {
          id: CHAIN_ID,
          dstId: CHAIN_ID,
          name: CHAIN_NAME,
          logo: "https://www.dapdap.net/images/chains/scroll_white.svg",
          explorer: "https://scrollscan.com",
          routerEthAddress: "0x8731d54E9D02c286767d56ac03e8037C07e01e98",
          routerAddress: "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590",
        },
        mainnet: {
          id: 1,
          dstId: 1,
          name: "Ethereum",
          logo: "https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a",
          explorer: "https://etherscan.io",
          routerEthAddress: "0x150f94B44927F078737562f0fcF3C95c01Cc2376",
          routerAddress: "0x8731d54E9D02c286767d56ac03e8037C07e01e98",
        },
        tokens: Tokens,
        amountOutFn: "bluebiu.near/widget/Scroll.Bridge.AmountOut",
        handlerSwap: "bluebiu.near/widget/Scroll.Bridge.HandlerSwap",
        ...props,
        bridgeImg: 'https://docs.orbiter.finance/~gitbook/image?url=https:%2F%2F1544475235-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MY5Qy9GjDHXTy9ppyql%252Fuploads%252Fgit-blob-b16af9e363681b512ac66b1252db42b4bf5e1d27%252Ficon-2.png%3Falt=media&width=768&dpr=1&quality=100&sign=f310d82dfe92acd8c780bdb140c1e5c4b5dbaaa842016dbc028bfa76e408fa31'
      }}
    />
  </Theme>
);
