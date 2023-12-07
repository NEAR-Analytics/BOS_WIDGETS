const CHAIN_ID = 137;
const Tokens = {
  native: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "Matic",
    name: "Matic",
    icon: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
  },
  "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": {
    chainId: CHAIN_ID,
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
  },

  "0x40379a439D4F6795B6fc9aa5687dB461677A2dBa": {
    chainId: CHAIN_ID,
    address: "0x40379a439D4F6795B6fc9aa5687dB461677A2dBa",
    decimals: 9,
    symbol: "USDR",
    name: "Real USD",
    icon: "https://ipfs.near.social/ipfs/bafkreieocxobsqxkoopzh26huz5zjx4j5cpljzuufuipkmiiwopmym3ave",
  },

  "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6": {
    chainId: CHAIN_ID,
    address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744",
  },

  "0x1FA2F83BA2DF61c3d370071d61B17Be01e224f3a": {
    chainId: CHAIN_ID,
    address: "0x1FA2F83BA2DF61c3d370071d61B17Be01e224f3a",
    decimals: 18,
    symbol: "HNY",
    name: "HONEY",
    icon: "https://assets.coingecko.com/coins/images/12895/small/hnys.png?1614100588",
  },

  "0x37D1EbC3Af809b8fADB45DCE7077eFc629b2B5BB": {
    chainId: CHAIN_ID,
    address: "0x37D1EbC3Af809b8fADB45DCE7077eFc629b2B5BB",
    decimals: 18,
    symbol: "pCOMB",
    name: "Polygon Native Comb",
    icon: "https://polygonscan.com/token/images/1hiveofc_32.png",
  },

  "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1": {
    chainId: CHAIN_ID,
    address: "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1",
    decimals: 18,
    symbol: "miMATIC",
    name: "miMATIC",
    icon: "https://assets.coingecko.com/coins/images/15264/small/mimatic-red.png?1620281018",
  },

  "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063": {
    chainId: CHAIN_ID,
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    decimals: 18,
    symbol: "Dai",
    name: "Dai Stablecoin",
    icon: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508",
  },

  "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270": {
    chainId: CHAIN_ID,
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    decimals: 18,
    symbol: "WMATIC",
    name: "Wrapped Matic",
    icon: "https://assets.coingecko.com/coins/images/14073/small/matic.png?1628852392",
  },

  "0x5D066D022EDE10eFa2717eD3D79f22F949F8C175": {
    chainId: CHAIN_ID,
    address: "0x5D066D022EDE10eFa2717eD3D79f22F949F8C175",
    decimals: 18,
    symbol: "CASH",
    name: "CASH",
    icon: "https://assets.coingecko.com/coins/images/27558/small/cash.png?1677063931",
  },

  "0x00e8c0E92eB3Ad88189E7125Ec8825eDc03Ab265": {
    chainId: CHAIN_ID,
    address: "0x00e8c0E92eB3Ad88189E7125Ec8825eDc03Ab265",
    decimals: 9,
    symbol: "wUSDR",
    name: "Wrapped USDR",
    icon: "https://ipfs.near.social/ipfs/bafkreidij65snn5t2w2fbdgd7pluauudbtvgemvkx2wdk7kpoi5l2fqg4y",
  },

  "0x6AE96Cc93331c19148541D4D2f31363684917092": {
    chainId: CHAIN_ID,
    address: "0x6AE96Cc93331c19148541D4D2f31363684917092",
    decimals: 18,
    symbol: "CVR",
    name: "CAVIAR",
    icon: "https://ipfs.near.social/ipfs/bafkreiae66wm5kvk523gr2ogu3zf2soggysw73kyvkw2poaq6nicuttbxq",
  },

  "0x7238390d5f6F64e67c3211C343A410E2A3DEc142": {
    chainId: CHAIN_ID,
    address: "0x7238390d5f6F64e67c3211C343A410E2A3DEc142",
    decimals: 18,
    symbol: "PEARL",
    name: "Pearl",
    icon: "https://ipfs.near.social/ipfs/bafkreieo7d2tqvpszlcvkltb6et2kmxz7n7yuw5ae5w37wzigzlht6i6zu",
  },

  "0xc2132D05D31c914a87C6611C10748AEb04B58e8F": {
    chainId: CHAIN_ID,
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663",
  },

  "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174": {
    chainId: CHAIN_ID,
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
  },

  "0xBFA35599c7AEbb0dAcE9b5aa3ca5f2a79624D8Eb": {
    chainId: CHAIN_ID,
    address: "0xBFA35599c7AEbb0dAcE9b5aa3ca5f2a79624D8Eb",
    decimals: 18,
    symbol: "RETRO",
    name: "RETRO",
    icon: "https://assets.coingecko.com/coins/images/31136/small/retro.png?1690885867",
  },
};

const Container = styled.div`
  --text-color: #783bf0;
  --button-color: #783bf0;
  --border-color: #332c4b;
  --input-border-color: #332c4b;
  --input-select-bg-color: #222436;
  --secondary-text-color: #5843a4;
  --thirdary-text-color: #4f5375;
  --dex-active-text-color: white;
  --button-text-color: #ffffff;
  --dex-hover-bg-color: rgba(120, 59, 240, 0.1);
`;

return (
  <Container>
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.SwapConnector"
      props={{
        chainId: CHAIN_ID,
        chainName: "Polygon",
        displayChainName: "Polygon",
        wethAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreihcujrphf3k3zgfl4wdnxbz5btydas43uwdmvjgrs5mavbubvrpyq",
            style: {
              width: "282px",
              height: "222px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Polygon Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to Polygon Chain.",
        },
        defalutDex: "Retro",
        dexs: {
          Retro: {
            name: "Retro",
            logo: "https://ipfs.near.social/ipfs/bafkreiaqpbeth37uxmbe6iwqduoad76dncozbuoa3bwgcbcxcmputkuzfu",
            factoryAddress: "0x91e1B99072f238352f59e58de875691e20Dc19c1",
            routerAddress: "0x1891783cb3497Fdad1F25C933225243c2c7c4102",
            quoterAddress: "0xddc9Ef56c6bf83F7116Fad5Fbc41272B07ac70C1",
            uniType: "v3",
            defaultCurrencies: {
              input: Tokens["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
              output: Tokens["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
            },
            tokens: [
              Tokens["0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"],
              Tokens["0xa3Fa99A148fA48D14Ed51d610c367C61876997F1"],
              Tokens["0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"],
              Tokens["0x5D066D022EDE10eFa2717eD3D79f22F949F8C175"],
              Tokens["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
              Tokens["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
              Tokens["0xBFA35599c7AEbb0dAcE9b5aa3ca5f2a79624D8Eb"],
            ],
          },

          Apeswap: {
            name: "Apeswap",
            logo: "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F4031390532-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MTJ1qyFf3rQZjewhth_%252Favatar-1615657020974.png%3Fgeneration%3D1615657021220196%26alt%3Dmedia",
            factoryAddress: "0xCf083Be4164828f00cAE704EC15a36D711491284",
            routerAddress: "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
              output: Tokens["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
            },
            tokens: [
              Tokens["0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"],
              Tokens["native"],
              Tokens["0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"],
              Tokens["0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"],
              Tokens["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
              Tokens["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
            ],
          },

          Honeyswap: {
            name: "Honeyswap",
            logo: "https://ipfs.near.social/ipfs/bafkreigpb3scxgcvddqzongudv3m77bh363rzyxidzuudk6wx32qa6vgia",
            factoryAddress: "0x03DAa61d8007443a6584e3d8f85105096543C19c",
            routerAddress: "0xaD340d0CD0B117B0140671E7cB39770e7675C848",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
              output: Tokens["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
            },
            tokens: [
              Tokens["0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"],
              Tokens["0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6"],

              Tokens["0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"],
              Tokens["0x37D1EbC3Af809b8fADB45DCE7077eFc629b2B5BB"],
              Tokens["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
              Tokens["0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"],
              Tokens["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
            ],
          },
          QuickSwap: {
            name: "QuickSwap",
            logo: "https://ipfs.near.social/ipfs/bafkreida55shh44tqd4ingcunnu6u34g5bm3jugoaasy7a365kutoomjru",
            factoryAddress: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32",
            routerAddress: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
              output: Tokens["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
            },
            tokens: [
              Tokens["0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"],
              Tokens["0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6"],

              Tokens["0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"],

              Tokens["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
              Tokens["0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"],
              Tokens["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
            ],
          },
          PearlFi: {
            name: "PearlFi",
            logo: "https://ipfs.near.social/ipfs/bafkreidtzrrtkb7xbr6trlgir7mg3icshyeho2y374hosn76fszwuullti",
            factoryAddress: "0xd541Bc203Cc2B85810d9b8E6a534eed1615528E2",
            routerAddress: "0xcC25C0FD84737F44a7d38649b69491BBf0c7f083",
            uniType: "solidly",
            defaultCurrencies: {
              input: Tokens["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
              output: Tokens["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
            },
            tokens: [
              Tokens["0x40379a439D4F6795B6fc9aa5687dB461677A2dBa"],
              Tokens["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"],
              Tokens["0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"],
              Tokens["0xc2132D05D31c914a87C6611C10748AEb04B58e8F"],
              Tokens["0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"],
              Tokens["0x00e8c0E92eB3Ad88189E7125Ec8825eDc03Ab265"],
              Tokens["native"],
              Tokens["0x6AE96Cc93331c19148541D4D2f31363684917092"],
              Tokens["0x7238390d5f6F64e67c3211C343A410E2A3DEc142"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
        handlerV3: "bluebiu.near/widget/Metis.Swap.HandlerV3",
        quoterV3: "bluebiu.near/widget/Polygon.Swap.QuoterV3",
        QuoterSolidly: "bluebiu.near/widget/Arbitrum.Swap.QuoterSolidly",
        handlerSolidly: "bluebiu.near/widget/Arbitrum.Swap.handlerSolidly",
        ...props,
      }}
    />
  </Container>
);
