const Theme = styled.div`
  --bg-color: #181a27;
  --border-color: #2c334b;
  --label-color: #7794d3;
  --chain-name-color: #fff;
  --input-border-color: #2c334b;
  --button-color: #33549c;
  --button-text-color: #fff;
  --thirdary-text-color: #4f5375;
  --arrow-color: #7794d3;
  --swap-icon-color: #7794d3;
  --tx-button-color: #7794d3;
  --processing-color: #7794d3;
  --success-color: #1abd00;
  --dialog-bg-color: #373a53;
  --dialog-info-color: #ff61d3;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);
`;

const CHAIN_ID = 42161;
const CHAIN_NAME = "Arbitrum";
const Tokens = [
  {
    address: "0x82CbeCF39bEe528B5476FE6d1550af59a9dB6Fc0",
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
  {
    address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
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
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    name: "USDT",
    symbol: "USDT",
    icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    decimals: 6,
    poolId: 2,
    targetPoolId: 2,
    targetDecimals: 6,
    targetAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
    name: "Frax",
    symbol: "FRAX",
    icon: "https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png?1696513182",
    decimals: 18,
    poolId: 7,
    targetPoolId: 7,
    targetDecimals: 18,
    targetAddress: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
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
  {
    address: "0x93b346b6BC2548dA6A1E7d98E9a421B42541425b",
    name: "LUSD Stablecoin",
    symbol: "LUSD",
    icon: "https://assets.coingecko.com/coins/images/14666/standard/Group_3.png?1696514341",
    decimals: 18,
    poolId: 15,
    targetPoolId: 15,
    targetDecimals: 18,
    targetAddress: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
  },
];

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Base.Bridge.Index"
      props={{
        connectProps: {
          // imgProps: {
          //   src: "https://ipfs.near.social/ipfs/bafkreifeitks2bp3vyy7v7iznq6lf67dutvjjplzzbiwv4j2dheqiqqbpi",
          //   style: {
          //     width: "179px",
          //     height: "143px",
          //     marginTop: "80px",
          //   },
          // },
          noAccountTips: "Arbitrum Bridge",
          wrongNetworkTips: "To proceed, kindly switch to Arbitrum Chain.",
        },
        chain: {
          id: CHAIN_ID,
          dstId: 110,
          name: CHAIN_NAME,
          logo: "/images/chains/42161.png",
          explorer: "https://arbiscan.io",
          routerEthAddress: "0xbf22f0f184bCcbeA268dF387a49fF5238dD23E40",
          routerAddress: "0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614",
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
