const Theme = styled.div`
  --bg-color: #181a27;
  --border-color: #113735;
  --label-color: #ccdfdd;
  --chain-name-color: #fff;
  --input-border-color: #2c4a4b;
  --button-color: #00dacc;
  --button-text-color: #000;
  --thirdary-text-color: #4f7375;
  --arrow-color: #00dacc;
  --swap-icon-color: #00dacc;
  --tx-button-color: #00dacc;
  --processing-color: #ccdfdd;
  --success-color: #1abd00;
  --dialog-bg-color: #373a53;
  --dialog-info-color: #ff61d3;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);
`;

const CHAIN_ID = 1088;
const CHAIN_NAME = "Metis";
const Tokens = [
  {
    address: "0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc",
    name: "USDT Token",
    symbol: "USDT",
    icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    decimals: 6,
    poolId: 19,
    targetPoolId: 2,
    targetDecimals: 6,
    targetAddress: "0x72E2F4830b9E45d52F80aC08CB2bEC0FeF72eD9c",
  },
];

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Base.Bridge.Index"
      props={{
        connectProps: {
          // imgProps: {
          //   src: "https://ipfs.near.social/ipfs/bafkreiagxyvsm2q6xidcki7t2nvb72n5li2qc72oaswbrbbzfu5y2v7eeu",
          //   style: {
          //     width: "179px",
          //     height: "143px",
          //     marginTop: "80px",
          //   },
          // },
          noAccountTips: "Metis Bridge",
          wrongNetworkTips: "To proceed, kindly switch to Metis Chain.",
        },
        chain: {
          id: CHAIN_ID,
          dstId: 151,
          name: CHAIN_NAME,
          logo: "https://ipfs.near.social/ipfs/bafkreibye3shfb7bmpnsqw3yscb7yxd4kjsbnszeyluivnrslobvrcd2ci",
          explorer: "https://andromeda-explorer.metis.io",
          routerAddress: "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590",
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
