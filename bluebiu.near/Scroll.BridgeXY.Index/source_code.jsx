const Theme = styled.div`
  --button-color: #277eec;
  --button-text-color: #fff;
  --dialog-bg-color: #373a53;
  --chain-name-color: #fff;
  --spe-text-color: #fff;
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
        amountOutFn: "bluebiu.near/widget/Scroll.BridgeXY.AmountOut",
        handlerSwap: "bluebiu.near/widget/Scroll.BridgeXY.HandlerSwap",
        showFee: true,
        getTxStatus: (tx) => {
          const BASE_API = 'https://open-api.xy.finance/v1'
          return asyncFetch(`${BASE_API}/crossChainStatus?srcChainId=${tx.fromChainId}&transactionHash=${tx.hash}`)
          .then(res => {
            console.log('status', res)
            return res.body.status === 'Done'
          })
        },
        ...props,
        addAction: (params) => {
          props.addAction({
            ...params,
            template: "XY Bridge",
            source: 'dapp'
          })
        }
      }}
    />
  </Theme>
);
