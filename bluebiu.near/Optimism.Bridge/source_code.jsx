const Theme = styled.div`
  --bg-color: #181a27;
  --border-color: #382426;
  --label-color: #ff96a2;
  --chain-name-color: #fff;
  --input-border-color: #382426;
  --button-color: #ea3431;
  --button-text-color: #fff;
  --thirdary-text-color: #5e5555;
  --arrow-color: #ff96a2;
  --swap-icon-color: #ff96a2;
  --tx-button-color: #ff96a2;
  --processing-color: #ff96a2;
  --success-color: #1abd00;
  --dialog-bg-color: #373a53;
  --dialog-info-color: #ff61d3;
  --token-list-hover-color: rgba(24, 26, 39, 0.3);
`;

const CHAIN_ID = 10;
const CHAIN_NAME = "Optimism";
const Tokens = [
  {
    address: "0xb69c8CBCD90A39D8D3d3ccf0a3E968511C3856A0",
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
    address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
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
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    name: "Dai Stablecoin",
    symbol: "DAI",
    icon: "https://assets.coingecko.com/coins/images/9956/standard/Badge_Dai.png?1696509996",
    decimals: 18,
    poolId: 3,
    targetPoolId: 3,
    targetDecimals: 18,
    targetAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  {
    address: "0x2E3D870790dC77A83DD1d18184Acc7439A53f475",
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
    address: "0xdFA46478F9e5EA86d57387849598dbFB2e964b02",
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
    address: "0xc40F949F8a4e094D1b49a23ea9241D289B7b2819",
    name: "LUSD Stablecoin",
    symbol: "LUSD",
    icon: "https://assets.coingecko.com/coins/images/14666/standard/Group_3.png?1696514341",
    decimals: 18,
    poolId: 15,
    targetPoolId: 15,
    targetDecimals: 18,
    targetAddress: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
  },
  {
    address: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
    name: "Synth sUSD",
    symbol: "sUSD",
    icon: "https://assets.coingecko.com/coins/images/5013/standard/sUSD.png?1696505546",
    decimals: 18,
    poolId: 14,
    targetPoolId: 14,
    targetDecimals: 18,
    targetAddress: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
  },
];

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Base.Bridge.Index"
      props={{
        connectProps: {
          imgProps: {
            style: {
              width: "282px",
              height: "167px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Optimism Bridge",
          wrongNetworkTips: "To proceed, kindly switch to Optimism Chain.",
        },
        chain: {
          id: CHAIN_ID,
          dstId: 111,
          name: CHAIN_NAME,
          logo: "https://ipfs.near.social/ipfs/bafkreia4smb3wz4f3jozeuatdtvtxcxk2orwx4jdxzt3nx42f6rw57d27y",
          explorer: "https://optimistic.etherscan.io/",
          routerEthAddress: "0xB49c4e680174E331CB0A7fF3Ab58afC9738d5F8b",
          routerAddress: "0xB0D502E938ed5f4df2E681fE6E419ff29631d62b",
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
