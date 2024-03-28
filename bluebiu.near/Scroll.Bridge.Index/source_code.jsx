const Theme = styled.div`
  --bg-color: #181a27;
  --border-color: rgb(44, 74, 75);
  --label-color: rgb(0, 255, 224);
  --chain-name-color: #fff;
  --input-border-color: #2c394b;
  --button-color: #00ffe0;
  --button-text-color: #000;
  --thirdary-text-color: #5a7e93;
  --arrow-color: #00ffe0;
  --swap-icon-color: #82a7ff;
  --tx-button-color: #3b6bdc;
  --processing-color: #5a7e93;
  --success-color: #1abd00;
  --dialog-bg-color: #373a53;
  --dialog-info-color: #ff61d3;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);
`;

const CHAIN_ID = 534352;
const CHAIN_NAME = "scroll";
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
      }}
    />
  </Theme>
);
