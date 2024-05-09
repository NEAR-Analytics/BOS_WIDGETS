const Theme = styled.div`
  --bg-color: #181a27;
  --button-color: #ff684b;
  --button-text-color: #fff;
  --dialog-bg-color: #373a53;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);
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
    targetAddress: "native",
    isNative: true,
  },
  {
    address: "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    name: "USDC",
    symbol: "USDC",
    icon: "https://scroll-tech.github.io/token-list/data/USDC/logo.svg",
    decimals: 6,
    poolId: 13,
    targetPoolId: 13,
    targetDecimals: 6,
    targetAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    isNative: false,
  },
  {
    address: "0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32",
    name: "wstETH",
    symbol: "wstETH",
    icon: "https://scroll-tech.github.io/token-list/data/wstETH/logo.svg",
    decimals: 18,
    poolId: 13,
    targetPoolId: 13,
    targetDecimals: 18,
    targetAddress: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
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
          routerEthAddress: "0x4C0926FF5252A435FD19e10ED15e5a249Ba19d79",
          routerAddress: "0x4C0926FF5252A435FD19e10ED15e5a249Ba19d79",
        },
        mainnet: {
          id: 1,
          dstId: 1,
          name: "Ethereum",
          logo: "https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a",
          explorer: "https://etherscan.io",
          routerEthAddress: "0xF8B1378579659D8F7EE5f3C929c2f3E332E41Fd6",
          routerAddress: "0xF8B1378579659D8F7EE5f3C929c2f3E332E41Fd6",
        },
        tokens: Tokens,
        amountOutFn: "bluebiu.near/widget/Scroll.BridgeAuthority.AmountOut",
        handlerSwap: "bluebiu.near/widget/Scroll.BridgeAuthority.HandlerSwap",
        handlerClaim: 'bluebiu.near/widget/Scroll.BridgeAuthority.HandlerClaim',
        bridgeStorageKey: 'claim_txs',
        ...props,
        addAction: (params) => {
          props.addAction({
            ...params,
            template: "Scroll Bridge",
            source: 'dapp'
          })
        }
      }}
    />
  </Theme>
);
