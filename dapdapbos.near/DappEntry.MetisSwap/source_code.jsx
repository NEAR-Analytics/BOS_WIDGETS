const CHAIN_ID = 1088;
const { defaultDex } = props;

const Tokens = {
  "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000": {
    chainId: CHAIN_ID,
    address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
    decimals: 18,
    symbol: "METIS",
    name: "Metis Token",
    icon: "https://assets.coingecko.com/coins/images/15595/small/metis.jpeg?1660285312",
  },

  "0x420000000000000000000000000000000000000A": {
    chainId: CHAIN_ID,
    address: "0x420000000000000000000000000000000000000A",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
  },

  "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC": {
    chainId: CHAIN_ID,
    address: "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC",
    decimals: 6,
    symbol: "m.USDT",
    name: "USDT Token",
    icon: "https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663",
  },
  "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21": {
    chainId: CHAIN_ID,
    address: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
    decimals: 6,
    symbol: "m.USDC",
    name: "USDC Token",
    icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
  },
  "0x72c232D56542Ba082592DEE7C77b1C6CFA758BCD": {
    chainId: CHAIN_ID,
    address: "0x72c232D56542Ba082592DEE7C77b1C6CFA758BCD",
    decimals: 9,
    symbol: "MAIA",
    name: "Maia",
    icon: "https://assets.coingecko.com/coins/images/22502/small/whiteicon.4a79cf8b.png?1641953707",
  },
  "0x6f05709bc91bad933346f9e159f0d3fdbc2c9dce": {
    chainId: CHAIN_ID,
    address: "0x6f05709bc91bad933346f9e159f0d3fdbc2c9dce",
    decimals: 18,
    symbol: "HERA",
    name: "Hera Token",
    icon: "https://ipfs.near.social/ipfs/bafkreiezixu7e3kc2vv6di6dnqzept5rhstmoofl3ky5cvokqe3t2cbc3u",
  },
  "0x90fE084F877C65e1b577c7b2eA64B8D8dd1AB278": {
    chainId: CHAIN_ID,
    address: "0x90fE084F877C65e1b577c7b2eA64B8D8dd1AB278",
    decimals: 18,
    symbol: "NETT",
    name: "Netswap Token",
    icon: "https://ipfs.near.social/ipfs/bafkreiejwiiaoamvnjfu5fxvkm6x4sweu3hpk5zpf2eaas7cx4qslghxlq",
  },
  "0x1f5550a0f5f659e07506088a7919a88dff37218f": {
    chainId: CHAIN_ID,
    address: "0x1f5550a0f5f659e07506088a7919a88dff37218f",
    decimals: 18,
    symbol: "PEAK",
    name: "PEAK",
    icon: "https://ipfs.near.social/ipfs/bafkreibpv24wawd4uedvnypxphowyvcw6dbayvvwzxgjrditilvihoq2s4",
  },
  "0x721532bc0da5ffaeb0a6a45fb24271e8098629a7": {
    chainId: CHAIN_ID,
    address: "0x721532bc0da5ffaeb0a6a45fb24271e8098629a7",
    decimals: 18,
    symbol: "BYTE",
    name: "BinaryDAO Token",
    icon: "https://ipfs.near.social/ipfs/bafkreidaoktium64c2ozdf3knal5pfmrisngngs5em36hvflgmqsqb3z64",
  },
};

const Container = styled.div`
  --text-color: #00dacc;
  --button-color: #00dacc;
  --border-color: #113735;
  --input-border-color: #2c4a4b;
  --input-select-bg-color: #113735;
  --secondary-text-color: white;
  --thirdary-text-color: #4f7375;
  --dex-active-text-color: #000;
  --button-text-color: #000;
  --dex-hover-bg-color: rgba(0, 218, 204, 0.1);
`;

return (
  <Container>
    <Widget
      src="dapdapbos.near/widget/Swap.SwapConnector"
      props={{
        ...props,
        chainId: CHAIN_ID,
        chainName: "Metis",
        displayChainName: "Metis",
        wethAddress: "0x420000000000000000000000000000000000000A",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreiagxyvsm2q6xidcki7t2nvb72n5li2qc72oaswbrbbzfu5y2v7eeu",
            style: {
              width: "179px",
              height: "143px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Metis Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to Metis Chain.",
        },
        defalutDex: defaultDex || "Maia V3",
        dexs: {
          "Maia V3": {
            name: "Maia V3",
            logo: "https://ipfs.near.social/ipfs/bafkreidd6jb57eubtntolotq3f5gzmhy252d5rq2jmg6glr7nuijon3dr4",
            factoryAddress: "0xf5fd18Cd5325904cC7141cB9Daca1F2F964B9927",
            routerAddress: "0x07Da720AD5E434971dbe77C7fC85b7b44d5aC704",
            quoterAddress: "0x2db8b665CE6928F9D1a7f83F4C6aCEA64Af6a6f6",
            uniType: "v3",
            defaultCurrencies: {
              input: Tokens["0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"],
              output: Tokens["0xEA32A96608495e54156Ae48931A7c20f0dcc1a21"],
            },
            tokens: [
              Tokens["0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"],
              Tokens["0x420000000000000000000000000000000000000A"],
              Tokens["0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC"],
              Tokens["0xEA32A96608495e54156Ae48931A7c20f0dcc1a21"],
              Tokens["0x72c232D56542Ba082592DEE7C77b1C6CFA758BCD"],
            ],
          },
          Netswap: {
            name: "Netswap",
            logo: "https://ipfs.near.social/ipfs/bafkreicczubd47v7zr2cln7l3xts66ek77d4m3neqp3j7dl2cjhjcwphwa",
            factoryAddress: "0x70f51d68D16e8f9e418441280342BD43AC9Dff9f",
            routerAddress: "0x1E876cCe41B7b844FDe09E38Fa1cf00f213bFf56",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"],
              output: Tokens["0x90fE084F877C65e1b577c7b2eA64B8D8dd1AB278"],
            },
            tokens: [
              Tokens["0x6f05709bc91bad933346f9e159f0d3fdbc2c9dce"],
              Tokens["0xEA32A96608495e54156Ae48931A7c20f0dcc1a21"],
              Tokens["0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC"],
              Tokens["0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"],
              Tokens["0x420000000000000000000000000000000000000A"],
              Tokens["0x90fE084F877C65e1b577c7b2eA64B8D8dd1AB278"],
              Tokens["0x1f5550a0f5f659e07506088a7919a88dff37218f"],
              Tokens["0x721532bc0da5ffaeb0a6a45fb24271e8098629a7"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
        handlerV3: "bluebiu.near/widget/Metis.Swap.HandlerV3",
        handlerV2: "bluebiu.near/widget/Metis.Swap.HandlerV2",
        quoterV3: "bluebiu.near/widget/Metis.Swap.QuoterV3",
      }}
    />
  </Container>
);
