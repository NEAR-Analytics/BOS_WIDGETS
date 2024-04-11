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
    address: "0x2bbbdf97295f73175b12cc087cf446765931e1c3",
    name: "wstETH",
    symbol: "wstETH",
    icon: "https://icons-ckg.pages.dev/stargate-light/tokens/wsteth.png",
    decimals: 18,
    poolId: 13,
    targetPoolId: 13,
    targetDecimals: 18,
    targetAddress: "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
    isNative: false,
  },
  {
    address: "0x2b1d36f5b61addaf7da7ebbd11b35fd8cfb0de31",
    name: "ITP",
    symbol: "ITP",
    icon: "https://icons-ckg.pages.dev/stargate-light/tokens/itp.png",
    decimals: 18,
    poolId: 13,
    targetPoolId: 13,
    targetDecimals: 18,
    targetAddress: "0x2b1D36f5B61AdDAf7DA7ebbd11B35FD8cfb0DE31",
    isNative: false,
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
          routerEthAddress: "0x36d4686e19c052787D7f24E6913cEbC025714895",
          routerAddress: "0x36d4686e19c052787D7f24E6913cEbC025714895",
        },
        mainnet: {
          id: 1,
          dstId: 1,
          name: "Ethereum",
          logo: "https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a",
          explorer: "https://etherscan.io",
          routerEthAddress: "0x86355f02119bdbc28ed6a4d5e0ca327ca7730fff",
          routerAddress: "0x86355f02119bdbc28ed6a4d5e0ca327ca7730fff",
        },
        tokens: Tokens,
        amountOutFn: "bluebiu.near/widget/Scroll.Bridge.AmountOut",
        handlerSwap: "bluebiu.near/widget/Scroll.Bridge.HandlerSwap",
        ...props,
      }}
    />
  </Theme>
);
