const { defaultDex } = props;

const CHAIN_ID = 59144;
const Tokens = {
  native: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "ETH",
    icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  },
  "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f": {
    chainId: CHAIN_ID,
    address: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
  },

  "0xEB466342C4d449BC9f53A865D5Cb90586f405215": {
    chainId: CHAIN_ID,
    address: "0xEB466342C4d449BC9f53A865D5Cb90586f405215",
    decimals: 6,
    symbol: "axlUSDC",
    name: "Axelar Wrapped USDC",
    icon: "https://assets.coingecko.com/coins/images/26476/small/uausdc_D_3x.png?1690776252",
  },
  "0x7f5373AE26c3E8FfC4c77b7255DF7eC1A9aF52a6": {
    chainId: CHAIN_ID,
    address: "0x7f5373AE26c3E8FfC4c77b7255DF7eC1A9aF52a6",
    decimals: 6,
    symbol: "axlUSDT",
    name: "Axelar Wrapped USDT",
    icon: "https://assets.coingecko.com/coins/images/31002/small/uusdt_D_3x.png?1689648389",
  },

  "0x0B1A02A7309dFbfAD1Cd4adC096582C87e8A3Ac1": {
    chainId: CHAIN_ID,
    address: "0x0B1A02A7309dFbfAD1Cd4adC096582C87e8A3Ac1",
    decimals: 18,
    symbol: "HZN",
    name: "Horizon",
    icon: "https://assets.coingecko.com/coins/images/31156/small/Circle_logo_black_%281%29.png?1691040942",
  },

  "0x176211869cA2b568f2A7D4EE941E073a821EE1ff": {
    chainId: CHAIN_ID,
    address: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
    decimals: 6,
    symbol: "USDC",
    name: "USDC.e",
    icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
  },

  "0x7d43AABC515C356145049227CeE54B608342c0ad": {
    chainId: CHAIN_ID,
    address: "0x7d43AABC515C356145049227CeE54B608342c0ad",
    decimals: 18,
    symbol: "BUSD",
    name: "Binance USD",
    icon: "https://assets.coingecko.com/coins/images/9576/small/BUSD.png?1568947766",
  },

  "0xf5C6825015280CdfD0b56903F9F8B5A2233476F5": {
    chainId: CHAIN_ID,
    address: "0xf5C6825015280CdfD0b56903F9F8B5A2233476F5",
    decimals: 18,
    symbol: "BNB",
    name: "Binance Coin",
    icon: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850",
  },

  "0xA219439258ca9da29E9Cc4cE5596924745e12B93": {
    chainId: CHAIN_ID,
    address: "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD ",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5": {
    chainId: CHAIN_ID,
    address: "0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin ",
    icon: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508",
  },

  "0x265B25e22bcd7f10a5bD6E6410F10537Cc7567e8": {
    chainId: CHAIN_ID,
    address: "0x265B25e22bcd7f10a5bD6E6410F10537Cc7567e8",
    decimals: 18,
    symbol: "MATIC",
    name: "Matic Token",
    icon: "https://ipfs.near.social/ipfs/bafkreihhijqfwysk3ck524rx7ult2pmuxs6tsfz5mvq2nlsq2mginak7wm",
  },

  "0x60D01EC2D5E98Ac51C8B4cF84DfCCE98D527c747": {
    chainId: CHAIN_ID,
    address: "0x60D01EC2D5E98Ac51C8B4cF84DfCCE98D527c747",
    decimals: 18,
    symbol: "iZi",
    name: "izumi Token",
    icon: "https://assets.coingecko.com/coins/images/21791/small/izumi-logo-symbol.png?1640053924",
  },

  "0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4": {
    chainId: CHAIN_ID,
    address: "0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744",
  },
};

const Container = styled.div`
  --text-color: #56daff;
  --button-color: #56daff;
  --border-color: #2c394b;
  --input-border-color: #2c394b;
  --input-select-bg-color: #222436;
  --secondary-text-color: white;
  --thirdary-text-color: #5a7e93;
  --dex-active-text-color: #000;
  --button-text-color: #000;
  --dex-hover-bg-color: rgba(86, 218, 255, 0.1);
`;

return (
  <Container>
    <Widget
      src="dapdapbos.near/widget/Swap.SwapConnector"
      props={{
        ...props,
        chainId: CHAIN_ID,
        chainName: "Linea",
        displayChainName: "Linea",
        wethAddress: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreihqshwscu7pagkjl2dwx3exjhfktuxuzjss6m6gjs6aicu3t3ns2m",
            style: {
              width: "437px",
              height: "310px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Linea Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to Linea Chain.",
        },
        defalutDex: defaultDex || "HorizonDEX",
        dexs: {
          HorizonDEX: {
            name: "HorizonDEX",
            logo: "https://ipfs.near.social/ipfs/bafkreiaqpbeth37uxmbe6iwqduoad76dncozbuoa3bwgcbcxcmputkuzfu",
            factoryAddress: "0x9Fe607e5dCd0Ea318dBB4D8a7B04fa553d6cB2c5",
            routerAddress: "0x272E156Df8DA513C69cB41cC7A99185D53F926Bb",
            quoterAddress: "0x07AceD5690e09935b1c0e6E88B772d9440F64718",
            uniType: "v3",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x176211869cA2b568f2A7D4EE941E073a821EE1ff"],
            },
            tokens: [
              Tokens["native"],
              Tokens["0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f"],
              Tokens["0xEB466342C4d449BC9f53A865D5Cb90586f405215"],
              Tokens["0x7f5373AE26c3E8FfC4c77b7255DF7eC1A9aF52a6"],
              Tokens["0x0B1A02A7309dFbfAD1Cd4adC096582C87e8A3Ac1"],
              Tokens["0x176211869cA2b568f2A7D4EE941E073a821EE1ff"],
              Tokens["0x7d43AABC515C356145049227CeE54B608342c0ad"],
              Tokens["0xf5C6825015280CdfD0b56903F9F8B5A2233476F5"],
            ],
          },

          iZiSwap: {
            name: "iZiSwap",
            logo: "https://ipfs.near.social/ipfs/bafkreifsgwu2zd6y2n5alekr5qgdhzoivlkl5wujtq3z7gnm5pw4jy7sgi",
            factoryAddress: "0x45e5F26451CDB01B0fA1f8582E0aAD9A6F27C218",
            routerAddress: "0x032b241De86a8660f1Ae0691a4760B426EA246d7",
            quoterAddress: "0xe6805638db944eA605e774e72c6F0D15Fb6a1347",
            uniType: "v3",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x176211869cA2b568f2A7D4EE941E073a821EE1ff"],
            },
            tokens: [
              Tokens["0x176211869cA2b568f2A7D4EE941E073a821EE1ff"],
              Tokens["0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f"],
              Tokens["0x60D01EC2D5E98Ac51C8B4cF84DfCCE98D527c747"],
              Tokens["native"],
              Tokens["0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4"],
              Tokens["0x7d43AABC515C356145049227CeE54B608342c0ad"],
            ],
          },

          Syncswap: {
            name: "Syncswap",
            logo: "https://ipfs.near.social/ipfs/bafkreiemiwcf4pvz6ijo7tcxfobp5oftqj5mf7vszse33ziud3walq4pqy",
            factoryAddress: "0x608Cb7C3168427091F5994A45Baf12083964B4A3",
            classicPoolAddres: "0x37BAc764494c8db4e54BDE72f6965beA9fa0AC2d",
            stablePoolAddress: "0xE4CF807E351b56720B17A59094179e7Ed9dD3727",
            routerAddress: "0x80e38291e06339d10AAB483C65695D004dBD5C69",
            uniType: "Syncswap",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x176211869cA2b568f2A7D4EE941E073a821EE1ff"],
            },
            tokens: [
              Tokens["0x176211869cA2b568f2A7D4EE941E073a821EE1ff"],
              Tokens["native"],
              Tokens["0xA219439258ca9da29E9Cc4cE5596924745e12B93"],
              Tokens["0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4"],
              Tokens["0x7d43AABC515C356145049227CeE54B608342c0ad"],
              Tokens["0x265B25e22bcd7f10a5bD6E6410F10537Cc7567e8"],
              Tokens["0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5"],
              Tokens["0xf5C6825015280CdfD0b56903F9F8B5A2233476F5"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
        handlerV3: "bluebiu.near/widget/Linea.Swap.HandlerV3",
        quoterV3: "bluebiu.near/widget/Linea.Swap.QuoterV3",
        QuoterSyncswap: "bluebiu.near/widget/Linea.Swap.QuoterSyncswap",
        handleSyncswap: "bluebiu.near/widget/Linea.Swap.handleSyncswap",
      }}
    />
  </Container>
);
