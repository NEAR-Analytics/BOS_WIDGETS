const CHAIN_ID = 324;
const Tokens = {
  native: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "ETH",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },
  "0xBBeB516fb02a01611cBBE0453Fe3c580D7281011": {
    chainId: CHAIN_ID,
    address: "0xBBeB516fb02a01611cBBE0453Fe3c580D7281011",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },
  "0x47260090cE5e83454d5f05A0AbbB2C953835f777": {
    chainId: CHAIN_ID,
    address: "0x47260090cE5e83454d5f05A0AbbB2C953835f777",
    decimals: 18,
    symbol: "SPACE",
    name: "SPACE",
    icon: "https://ipfs.near.social/ipfs/bafkreibem7ts37qyb22pwn6qwdl2ocbye52oza2hdpjvxpxslwb6jfi2vm",
  },
  "0x7400793aad94c8ca801aa036357d10f5fd0ce08f": {
    chainId: CHAIN_ID,
    address: "0x7400793aad94c8ca801aa036357d10f5fd0ce08f",
    decimals: 18,
    symbol: "ceBNB",
    name: "Celer Network BNB",
    icon: "https://ipfs.near.social/ipfs/bafkreiaeq6ca67je5ocago6vk2efwxiqurxgemputx7p2nt6n2p3zo65xq",
  },
  "0x493257fd37edb34451f62edf8d2a0c418852ba4c": {
    chainId: CHAIN_ID,
    address: "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },
  "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4": {
    chainId: CHAIN_ID,
    address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181": {
    chainId: CHAIN_ID,
    address: "0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181",
    decimals: 18,
    symbol: "ceBUSD",
    name: "Celer Network BUSD",
    icon: "https://ipfs.near.social/ipfs/bafkreibp36dfkfjzgnnbb7u4jxh57gpjmfjerc6pefmyzhueulz5ovd5xy",
  },
};
const Container = styled.div`
  --text-color: #7896ff;
  --button-color: #3b6bdc;
  --border-color: #2c334b;
  --input-border-color: #332c4b;
  --input-select-bg-color: #222436;
  --secondary-text-color: #9fb4ff;
  --thirdary-text-color: #4f5375;
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(59, 107, 220, 0.1);
`;
return (
  <Container>
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.SwapConnector"
      props={{
        chainId: CHAIN_ID,
        chainName: "zkSync",
        displayChainName: "zkSync",
        wethAddress: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreifaf3lxmrla2dgdug5fjbl535tuxj4xg23q2x3nlwe6u3e63anqym",
            style: {
              width: "174px",
              height: "213px",
              marginTop: "80px",
            },
          },
          noAccountTips: "zkSync Swap Collection",
          wrongNetworkTips: "To proceed, kindly switch to zkSync Chain.",
        },
        defalutDex: "SpaceFi",
        dexs: {
          SpaceFi: {
            name: "SpaceFi",
            logo: "	https://ipfs.near.social/ipfs/bafkreifjliccmtazc7sfzf3b45jyxpuabbhyqf4rt4ylensgbzc2nlbsru",
            factoryAddress: "0x0700Fb51560CfC8F896B2c812499D17c5B0bF6A7",
            routerAddress: "0xbE7D1FD1f6748bbDefC4fbaCafBb11C6Fc506d1d",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x47260090cE5e83454d5f05A0AbbB2C953835f777"],
            },
            tokens: [
              Tokens["native"],
              Tokens["0xBBeB516fb02a01611cBBE0453Fe3c580D7281011"],
              Tokens["0x47260090cE5e83454d5f05A0AbbB2C953835f777"],
              Tokens["0x7400793aad94c8ca801aa036357d10f5fd0ce08f"],
              Tokens["0x493257fd37edb34451f62edf8d2a0c418852ba4c"],
              Tokens["0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"],
              Tokens["0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
      }}
    />
  </Container>
);
