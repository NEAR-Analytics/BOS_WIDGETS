const { defaultDex } = props;

const CHAIN_ID = 5000;
const Tokens = {
  native: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "MNT",
    name: "MNT",
    icon: "https://ipfs.near.social/ipfs/bafkreibmrdi5ww5rk657jqglnaek5nptc6ze3kljferdsdewcirx4jijhe",
  },

  "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111": {
    address: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
    chainId: CHAIN_ID,
    symbol: "WETH",
    decimals: 18,
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9": {
    address: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
    chainId: CHAIN_ID,
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE": {
    address: "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",
    chainId: CHAIN_ID,
    symbol: "USDT",
    decimals: 6,
    name: "Tether USD",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2": {
    address: "0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2",
    chainId: CHAIN_ID,
    symbol: "WBTC",
    decimals: 8,
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  "0xAfAF32C57659BC9992b43bc6840A9d997632a0F5": {
    address: "0xAfAF32C57659BC9992b43bc6840A9d997632a0F5",
    chainId: CHAIN_ID,
    symbol: "DAI",
    decimals: 18,
    name: "Dai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },

  "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8": {
    address: "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8",
    chainId: CHAIN_ID,
    symbol: "WMNT",
    decimals: 18,
    icon: "https://ipfs.near.social/ipfs/bafkreibmrdi5ww5rk657jqglnaek5nptc6ze3kljferdsdewcirx4jijhe",
  },
};

const Container = styled.div`
  --text-color: #7794d3;
  --button-color: #33549c;
  --border-color: #2c334b;
  --input-border-color: #2c334b;
  --input-select-bg-color: #222436;
  --secondary-text-color: #7794d3;
  --thirdary-text-color: #4f5375;
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(51, 84, 156, 0.2);
`;
return (
  <Container>
    <Widget
      src="dapdapbos.near/widget/Swap.SwapConnector"
      props={{
        ...props,
        chainId: CHAIN_ID,
        chainName: "Mantle",
        displayChainName: "Mantle",
        wethAddress: "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreifeitks2bp3vyy7v7iznq6lf67dutvjjplzzbiwv4j2dheqiqqbpi",
            style: {
              width: "179px",
              height: "143px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Mantle Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to Mantle Chain.",
        },
        defalutDex: defaultDex || "Agni Finance",
        dexs: {
          "Agni Finance": {
            name: "Agni Finance",
            logo: "https://ipfs.near.social/ipfs/bafkreihkerekcdjd3cgxzklknlx6ai7zxil24sdcji6fahtlpueqsids6u",
            factoryAddress: "0x25780dc8Fc3cfBD75F33bFDAB65e969b603b2035",
            routerAddress: "0x319B69888b0d11cEC22caA5034e25FfFBDc88421",
            quoterAddress: "0x9488C05a7b75a6FefdcAE4f11a33467bcBA60177",
            uniType: "v3",
            handler: "dapdapbos.near/widget/DappEntry.agniHandler",
            defaultCurrencies: {
              input: Tokens["0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"],
              output: Tokens["0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9"],
            },
            tokens: [
              Tokens["0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"],
              Tokens["0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9"],
              Tokens["native"],
              Tokens["0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE"],
            ],
          },
          "FusionX V3": {
            name: "FusionX V3",
            logo: "https://ipfs.near.social/ipfs/bafkreifiphkr4bvatimqrz2lty4fgygb2awpvbcsri2bny23w47dactnly",
            factoryAddress: "0x530d2766D1988CC1c000C8b7d00334c14B69AD71",
            routerAddress: "0x5989FB161568b9F133eDf5Cf6787f5597762797F",
            quoterAddress: "0x90f72244294E7c5028aFd6a96E18CC2c1E913995",
            uniType: "v3",
            handler: "dapdapbos.near/widget/DappEntry.ammosHandler",
            defaultCurrencies: {
              input: Tokens["0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"],
              output: Tokens["0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9"],
            },
            tokens: [
              Tokens["0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"],
              Tokens["0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9"],
              Tokens["native"],
              Tokens["0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE"],
              Tokens["0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2"],
              Tokens["0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8"],
            ],
          },
          iZiSwap: {
            name: "iZiSwap",
            logo: "https://ipfs.near.social/ipfs/bafkreifsgwu2zd6y2n5alekr5qgdhzoivlkl5wujtq3z7gnm5pw4jy7sgi",

            factoryAddress: "0x530d2766D1988CC1c000C8b7d00334c14B69AD71",
            routerAddress: "0x25C030116Feb2E7BbA054b9de0915E5F51b03e31",
            quoterAddress: "0x032b241De86a8660f1Ae0691a4760B426EA246d7",
            uniType: "v3",
            handler: "dapdapbos.near/widget/DappEntry.iziSwapHandler",
            defaultCurrencies: {
              input: Tokens["0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"],
              output: Tokens["0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9"],
            },
            tokens: [
              Tokens["0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"],
              Tokens["0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9"],
              Tokens["native"],
              Tokens["0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE"],
              Tokens["0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2"],
              Tokens["0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8"],
            ],
          },
          "Ammos Finance": {
            name: "Ammos Finance",
            logo: "https://ipfs.near.social/ipfs/bafkreicwvufboezdhcjnvmwmy5ctbd7d4zimdivuaawn5g3bs2hxb567ra",
            factoryAddress: "0x636eA278699A300d3A849aB2cE36c891C4eE3Da0",
            routerAddress: "0xBa68D459210Fc667a97245F71719a479CAFeB571",
            quoterAddress: "0x42cE770b8B765938De04984e006c1B54F1A567f8",
            uniType: "v3",
            handler: "dapdapbos.near/widget/DappEntry.ammosHandler",
            defaultCurrencies: {
              input: Tokens["0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"],
              output: Tokens["0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9"],
            },
            tokens: [
              Tokens["0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"],
              Tokens["0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9"],
              Tokens["native"],
              Tokens["0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE"],
              Tokens["0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2"],
              Tokens["0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8"],
              Tokens["0xAfAF32C57659BC9992b43bc6840A9d997632a0F5"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        quoterV3: "dapdapbos.near/widget/DappEntry.mantleQuoter",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
        handlerV3: "bluebiu.near/widget/Arbitrum.Swap.HandlerV3",
      }}
    />
  </Container>
);
