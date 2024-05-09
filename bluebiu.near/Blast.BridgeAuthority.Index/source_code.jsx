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

const CHAIN_ID = 81457;
const CHAIN_NAME = "Blast";

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
    address: "0x4300000000000000000000000000000000000003",
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
  {
    address: "0x4300000000000000000000000000000000000003",
    name: "WETH",
    symbol: "WETH",
    icon: "https://blast.io/icons/weth-color.svg",
    decimals: 18,
    poolId: 13,
    targetPoolId: 13,
    targetDecimals: 18,
    targetAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    isNative: false,
  },
  {
    address: "0x4300000000000000000000000000000000000003",
    name: "DAI",
    symbol: "DAI",
    icon: "https://blast.io/icons/dai-color.svg",
    decimals: 18,
    poolId: 13,
    targetPoolId: 13,
    targetDecimals: 18,
    targetAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    isNative: false,
  },
  // {
  //   address: "0x4300000000000000000000000000000000000003",
  //   name: "USDB",
  //   symbol: "USDB",
  //   icon: "https://blast.io/icons/usdc-color.svg",
  //   decimals: 6,
  //   poolId: 13,
  //   targetPoolId: 13,
  //   targetDecimals: 6,
  //   targetAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  //   isNative: false,
  // },
];

const ChainTokens = [
  nativeToken,
  {
    address: "0x4300000000000000000000000000000000000003",
    name: "USDB",
    symbol: "USDB",
    icon: "https://blast.io/icons/usdb-color.svg",
    decimals: 18,
    poolId: 13,
    targetPoolId: 13,
    targetDecimals: 6,
    targetAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    isNative: false,
  },
]

State.init({
  tokens: props.currentChainId !== CHAIN_ID ? MainTokens : ChainTokens,
})

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
          logo: "/images/chains/blast_white.svg",
          explorer: "https://blastscan.io",
          routerEthAddress: "0x4300000000000000000000000000000000000005",
          routerAddress: "0x4300000000000000000000000000000000000005",
        },
        mainnet: {
          id: 1,
          dstId: 1,
          name: "Ethereum",
          logo: "https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a",
          explorer: "https://etherscan.io",
          routerEthAddress: "0x3a05E5d33d7Ab3864D53aaEc93c8301C1Fa49115",
          routerAddress: "0x3a05E5d33d7Ab3864D53aaEc93c8301C1Fa49115",
        },
        tokens: state.tokens,
        amountOutFn: "bluebiu.near/widget/Blast.BridgeAuthority.AmountOut",
        handlerSwap: "bluebiu.near/widget/Blast.BridgeAuthority.HandlerSwap",
        handlerClaim: 'bluebiu.near/widget/Blast.BridgeAuthority.HandlerClaim',
        bridgeStorageKey: 'blast_claim_txs',
        ...props,
        addAction: (params) => {
          props.addAction({
            ...params,
            template: "Blast Bridge",
            source: 'dapp'
          })
        }
      }}
    />
  </Theme>
);
