const CHAIN_ID = 324;

const { defaultDex } = props;

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

  "0x85D84c774CF8e9fF85342684b0E795Df72A24908": {
    chainId: CHAIN_ID,
    address: "0x85D84c774CF8e9fF85342684b0E795Df72A24908",
    decimals: 18,
    symbol: "VC",
    name: "VC",
    icon: "https://ipfs.near.social/ipfs/bafkreia2pgyfxypmylp7f4ypoqagctrjg63akkoc4zvamy3ugfqamqpnmq",
  },

  "0xA4E4d9984366e74713737Cb5d646bbA0B7E070A4": {
    chainId: CHAIN_ID,
    address: "0xA4E4d9984366e74713737Cb5d646bbA0B7E070A4",
    decimals: 18,
    symbol: "WAIFU",
    name: "WAIFU",
    icon: "https://ipfs.near.social/ipfs/bafkreibaxkkmqu5rnogicxaliozhi5vjbzzoisncrhgwe3g2s7q6rchjty",
  },

  "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91": {
    chainId: CHAIN_ID,
    address: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
  },

  "0xe8f5fbedd89c756a97de655b8d06a5b5cc3452ed": {
    chainId: CHAIN_ID,
    address: "0xe8f5fbedd89c756a97de655b8d06a5b5cc3452ed",
    decimals: 18,
    symbol: "ZCH",
    name: "ZilchToken",
    icon: "https://ipfs.near.social/ipfs/bafkreifquhaltsucnz2heyboy66nhklqrzopqk65o5x66s764za6nzbqou",
  },

  "0x4a57dA213A589F305B8411f15f64fb8c5724e7CE": {
    chainId: CHAIN_ID,
    address: "0x4a57dA213A589F305B8411f15f64fb8c5724e7CE",
    decimals: 18,
    symbol: "keyVC",
    name: "ZilchToken",
    icon: "https://ipfs.near.social/ipfs/bafkreidx3ep2qhq6kdxey4yae5umjsufyymntblhbji7yoyabp2bd7hcou",
  },

  "0x458A2E32eAbc7626187E6b75f29D7030a5202bD4": {
    chainId: CHAIN_ID,
    address: "0x458A2E32eAbc7626187E6b75f29D7030a5202bD4",
    decimals: 18,
    symbol: "LSD",
    name: "LSD",
    icon: "https://ipfs.near.social/ipfs/bafkreigeq5rmi74c4reudxe23hmu4udtee7im3gwdjh72uyav7d2ayhxoi",
  },

  "0xdb89D7b0Dccd0C0e5aC3571133A9aa1a037945cb": {
    chainId: CHAIN_ID,
    address: "0xdb89D7b0Dccd0C0e5aC3571133A9aa1a037945cb",
    decimals: 18,
    symbol: "USX",
    name: "USX",
    icon: "https://ipfs.near.social/ipfs/bafkreidhsn7jgwtcgvwboxwfkwj5sv6ndgqxmlkf7n72o2uoyggcatdsba",
  },

  "0xfc7e56298657b002b3e656400e746b7212912757": {
    chainId: CHAIN_ID,
    address: "0xfc7e56298657b002b3e656400e746b7212912757",
    decimals: 6,
    symbol: "zkUSD",
    name: "zkUSD Dollar",
    icon: "https://ipfs.near.social/ipfs/bafkreifa4v5buq5zlt6prqlqeyfm45gtbdhyg5sfhc3jgtdasemp3qtxjq",
  },

  "0xbbd1ba24d589c319c86519646817f2f153c9b716": {
    chainId: CHAIN_ID,
    address: "0xbbd1ba24d589c319c86519646817f2f153c9b716",
    decimals: 18,
    symbol: "DVF",
    name: "DeversiFi Token",
    icon: "https://ipfs.near.social/ipfs/bafkreigb3eo2jkoid4bouqjhfqlde5zlhugdwu6jvzd6avxtphqfygl7ua",
  },

  "0x1382628e018010035999A1FF330447a0751aa84f": {
    chainId: CHAIN_ID,
    address: "0x1382628e018010035999A1FF330447a0751aa84f",
    decimals: 18,
    symbol: "iUSD",
    name: "iZUMi Bond USD",
    icon: "https://ipfs.near.social/ipfs/bafkreiabjt25div73chcsnfhfqlfxj62j5fp2fvnl427qv3mlicx2bwanq",
  },

  "0x496d88D1EFc3E145b7c12d53B78Ce5E7eda7a42c": {
    chainId: CHAIN_ID,
    address: "0x496d88D1EFc3E145b7c12d53B78Ce5E7eda7a42c",
    decimals: 18,
    symbol: "slUSDT",
    name: "Shared-liquidity USDT",
    icon: "https://ipfs.near.social/ipfs/bafkreibxvxdhd7go2rtgwmbpxhmm5cmdrkh3oeenuys2nc5lucs44anwam",
  },

  "0x503234F203fC7Eb888EEC8513210612a43Cf6115": {
    chainId: CHAIN_ID,
    address: "0x503234F203fC7Eb888EEC8513210612a43Cf6115",
    decimals: 18,
    symbol: "LUSD",
    name: "LUSD Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreihbwhrsi447phga5fya4eb4nprudswmh4n5togvpyy4gowntcei5e",
  },

  "0x32fd44bb869620c0ef993754c8a00be67c464806": {
    chainId: CHAIN_ID,
    address: "0x32fd44bb869620c0ef993754c8a00be67c464806",
    decimals: 18,
    symbol: "rETH",
    name: "Rocket Pool ETH",
    icon: "https://ipfs.near.social/ipfs/bafkreiev6hgtqtg5wleen3wtnk7cejxpdmj5ee2ngkaswphvcwwv5xcsyy",
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
      src="dapdapbos.near/widget/Swap.SwapConnector"
      props={{
        ...props,
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
        defalutDex: defalutDex || "SpaceFi",
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
          "Velocore V1": {
            name: "Velocore V1",
            logo: "https://ipfs.near.social/ipfs/bafkreiavgtnnawec2d3xyum2osccpaotv4ivp6k77nuyaun5b6cp646viy",
            factoryAddress: "0xE140EaC2bB748c8F456719a457F26636617Bb0E9",
            routerAddress: "0xF29Eb540eEba673f8Fb6131a7C7403C8e4C3f143",
            uniType: "solidly",
            defaultCurrencies: {
              input: Tokens["0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91"],
              output: Tokens["0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"],
            },
            tokens: [
              Tokens["0x85D84c774CF8e9fF85342684b0E795Df72A24908"],
              Tokens["0xA4E4d9984366e74713737Cb5d646bbA0B7E070A4"],
              Tokens["0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91"],
              Tokens["0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"],
              Tokens["0xe8f5fbedd89c756a97de655b8d06a5b5cc3452ed"],
              Tokens["0x4a57dA213A589F305B8411f15f64fb8c5724e7CE"],
              Tokens["0x458A2E32eAbc7626187E6b75f29D7030a5202bD4"],
              Tokens["0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181"],
            ],
          },

          veSync: {
            name: "veSync",
            logo: "https://ipfs.near.social/ipfs/bafkreig3pzndzzb7zl7nrftklr2mxamzg5h76tcfth2aj3bwle7l44ylx4",
            factoryAddress: "0x529Bd7Fc43285B96f1e8d5158626d1F15bb8A834",
            routerAddress: "0x6C31035D62541ceba2Ac587ea09891d1645D6D07",
            uniType: "solidly",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"],
            },
            tokens: [
              Tokens["native"],
              Tokens["0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"],
              Tokens["0xdb89D7b0Dccd0C0e5aC3571133A9aa1a037945cb"],
              Tokens["0x1382628e018010035999A1FF330447a0751aa84f"],
              Tokens["0x496d88D1EFc3E145b7c12d53B78Ce5E7eda7a42c"],
              Tokens["0x493257fD37EDB34451f62EDf8D2a0C418852bA4C"],
              Tokens["0x503234F203fC7Eb888EEC8513210612a43Cf6115"],
              Tokens["0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181"],
            ],
          },

          Syncswap: {
            name: "Syncswap",
            logo: "https://ipfs.near.social/ipfs/bafkreiemiwcf4pvz6ijo7tcxfobp5oftqj5mf7vszse33ziud3walq4pqy",
            factoryAddress: "0xbB05918E9B4bA9Fe2c8384d223f0844867909Ffb",
            classicPoolAddres: "0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb",
            stablePoolAddress: "0x5b9f21d407F35b10CbfDDca17D5D84b129356ea3",
            routerAddress: "0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295",
            uniType: "Syncswap",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"],
            },
            tokens: [
              Tokens["0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"],
              Tokens["native"],
              Tokens["0x493257fd37edb34451f62edf8d2a0c418852ba4c"],
              Tokens["0xBBeB516fb02a01611cBBE0453Fe3c580D7281011"],
              Tokens["0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181"],
              Tokens["0xfc7e56298657b002b3e656400e746b7212912757"],
              Tokens["0xbbd1ba24d589c319c86519646817f2f153c9b716"],
              Tokens["0x503234F203fC7Eb888EEC8513210612a43Cf6115"],
              Tokens["0x32fd44bb869620c0ef993754c8a00be67c464806"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
        QuoterSolidly: "bluebiu.near/widget/Arbitrum.Swap.QuoterSolidly",
        handlerSolidly: "bluebiu.near/widget/Arbitrum.Swap.handlerSolidly",
        QuoterSyncswap: "bluebiu.near/widget/Linea.Swap.QuoterSyncswap",
        handleSyncswap: "bluebiu.near/widget/Linea.Swap.handleSyncswap",
      }}
    />
  </Container>
);
