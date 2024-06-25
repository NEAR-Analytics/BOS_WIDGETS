const Theme = styled.div`
  --bg-color: #181a27;
  --button-color: #FCFC03;
  --button-text-color: #181a27;
  --dialog-bg-color: #373a53;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);
  .spe {
    font-weight: 700;
  }
`;

const CHAIN_ID = 34443;
const CHAIN_NAME = "Mode";

const nativeToken = {
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
}

const MainTokens = [
  nativeToken,
  {
    address: "0xd988097fb8612cc24eeC14542bC03424c656005f",
    name: "USDC",
    symbol: "USDC",
    icon: "https://blast.io/icons/usdc-color.svg",
    decimals: 6,
    poolId: 13,
    targetPoolId: 13,
    targetDecimals: 6,
    targetAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    isNative: false,
  },

];


State.init({
  tokens: MainTokens,
})

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Base.Bridge.Index"
      props={{
        connectProps: {
          noAccountTips: `${CHAIN_NAME} Bridge`,
          wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
        },
        chain: {
          id: CHAIN_ID,
          dstId: CHAIN_ID,
          name: CHAIN_NAME,
          logo: "/images/chains/mode_white.svg",
          explorer: "https://explorer.mode.network",
          routerEthAddress: "0x4200000000000000000000000000000000000010",
          routerAddress: "0x4200000000000000000000000000000000000010",
        },
        mainnet: {
          id: 1,
          dstId: 1,
          name: "Ethereum",
          logo: "https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a",
          explorer: "https://etherscan.io",
          routerEthAddress: "0x735aDBbE72226BD52e818E7181953f42E3b0FF21",
          routerAddress: "0x735aDBbE72226BD52e818E7181953f42E3b0FF21",
        },
        tokens: state.tokens,
        amountOutFn: "bluebiu.near/widget/Mode.BridgeAuthority.AmountOut",
        handlerSwap: "bluebiu.near/widget/Mode.BridgeAuthority.HandlerSwap",
        handlerClaim: 'bluebiu.near/widget/Mode.BridgeAuthority.HandlerClaim',
        bridgeStorageKey: 'mode_claim_txs',
        ...props,
        addAction: (params) => {
          props.addAction({
            ...params,
            template: "Mode Bridge",
            source: 'dapp'
          })
        }
      }}
    />
  </Theme>
);
