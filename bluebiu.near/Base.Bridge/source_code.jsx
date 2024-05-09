const Theme = styled.div`
  --bg-color: #181a27;
  --border-color: #2c334b;
  --label-color: #82a7ff;
  --chain-name-color: #fff;
  --input-border-color: #332c4b;
  --button-color: #004bfc;
  --button-text-color: #fff;
  --thirdary-text-color: #7c7f96;
  --arrow-color: #82a7ff;
  --swap-icon-color: #787da1;
  --tx-button-color: #64b5ff;
  --processing-color: #979abe;
  --success-color: #1abd00;
  --dialog-bg-color: #373a53;
  --dialog-info-color: #ff61d3;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);
`;

const CHAIN_ID = 8453;
const CHAIN_NAME = "Base";
const Tokens = [
  {
    address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
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
    address: "0x224D8Fd7aB6AD4c6eb4611Ce56EF35Dec2277F03",
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
          //   src: "https://ipfs.near.social/ipfs/bafkreigkxrlezj5i7jk3sfm4rmv2kui7oxz4skngjyiopl5rvbvvllnnja",
          //   style: {
          //     width: "404px",
          //     height: "220px",
          //     marginTop: "60px",
          //   },
          // },
          noAccountTips: "Base Bridge",
          wrongNetworkTips: "To proceed, kindly switch to Base Chain.",
        },
        chain: {
          id: 8453,
          dstId: 184,
          name: CHAIN_NAME,
          logo: "https://ipfs.near.social/ipfs/bafkreie5bhns75smpybjndl3utvzpaftrlrwqrblwg44ntzjsnit6lajzm",
          explorer: "https://basescan.org/",
          routerEthAddress: "0x50B6EbC2103BFEc165949CC946d739d5650d7ae4",
          routerAddress: "0x45f1A95A4D3f3836523F5c83673c797f4d4d263B",
        },
        mainnet: {
          id: 1,
          dstId: 101,
          name: "Ethereum",
          logo: "https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a",
          explorer: "https://etherscan.io",
          routerEthAddress: "0x150f94B44927F078737562f0fcF3C95c01Cc2376",
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
