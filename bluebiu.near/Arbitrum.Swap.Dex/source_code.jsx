const CHAIN_ID = 42161;
const Tokens = {
  native: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },
  "0x9483ab65847A447e36d21af1CaB8C87e9712ff93": {
    chainId: CHAIN_ID,
    address: "0x9483ab65847A447e36d21af1CaB8C87e9712ff93",
    decimals: 9,
    symbol: "wUSDRv3",
    name: "Wrapped USDR",
    icon: "https://ipfs.near.social/ipfs/bafkreibwds6fxcej7ioqbbl6k4x7o4m2kmvc2ryly2ghamkuuqaxvl56d4",
  },

  "0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65": {
    chainId: CHAIN_ID,
    address: "0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65",
    decimals: 6,
    symbol: "USD+",
    name: "USD+",
    icon: "https://ipfs.near.social/ipfs/bafkreiccxz5kzr7fnbbnlzpe5e25zuxuhwp2mtf6rdqvcjtmz4jvi33zgu",
  },

  "0x15b2fb8f08E4Ac1Ce019EADAe02eE92AeDF06851": {
    chainId: CHAIN_ID,
    address: "0x15b2fb8f08E4Ac1Ce019EADAe02eE92AeDF06851",
    decimals: 18,
    symbol: "CHR",
    name: "CHRONOS",
    icon: "https://ipfs.near.social/ipfs/bafkreifchhzjooclf3qnimmciuonqgkxkkmy327dbcsxx3aolrszq5hjaq",
  },

  "0xeb8E93A0c7504Bffd8A8fFa56CD754c63aAeBFe8": {
    chainId: CHAIN_ID,
    address: "0xeb8E93A0c7504Bffd8A8fFa56CD754c63aAeBFe8",
    decimals: 18,
    symbol: "DAI+",
    name: "DAI+",
    icon: "https://ipfs.near.social/ipfs/bafkreidjdnhf4q4fwzio7utmlrfq53fsmfcvtmsixdm2ixzefy5bvjj6vu",
  },

  "0x912CE59144191C1204E64559FE8253a0e49E6548": {
    chainId: CHAIN_ID,
    address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    decimals: 18,
    symbol: "ARB",
    name: "Arbitrum",
    icon: "https://ipfs.near.social/ipfs/bafkreid7njdklgdliaqs57sth2ixfrxpss6xe5vjprcgcp6rwqcb4zl3me",
  },
  "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8": {
    chainId: CHAIN_ID,
    address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    decimals: 6,
    symbol: "USDC.e",
    name: "Bridged USDC",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0xaf88d065e77c8cC2239327C5EDb3A432268e5831": {
    chainId: CHAIN_ID,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": {
    chainId: CHAIN_ID,
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },
  "0x6dD963C510c2D2f09d5eDdB48Ede45FeD063Eb36": {
    chainId: CHAIN_ID,
    address: "0x6dD963C510c2D2f09d5eDdB48Ede45FeD063Eb36",
    decimals: 18,
    symbol: "FCTR",
    name: "Factor",
    icon: "https://ipfs.near.social/ipfs/bafkreih6tw7de5m56hq4fkzywsjzaktat2jjipxszkw7uzv67qlxn5lydu",
  },
  "0xD77B108d4f6cefaa0Cae9506A934e825BEccA46E": {
    chainId: CHAIN_ID,
    address: "0xD77B108d4f6cefaa0Cae9506A934e825BEccA46E",
    decimals: 18,
    symbol: "WINR",
    name: "WINR",
    icon: "https://ipfs.near.social/ipfs/bafkreieb2p7alvhsukpp67yupyz5yiu5mpwlp4yy2epwr3zsxtotc5lvoi",
  },
  "0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8": {
    chainId: CHAIN_ID,
    address: "0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8",
    decimals: 18,
    symbol: "PENDLE",
    name: "Pendle",
    icon: "https://ipfs.near.social/ipfs/bafkreigmom3zubq5otiuafmhrkg444q4higxd2oaa7ykq4zteyfqah5tz4",
  },
  "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a": {
    chainId: CHAIN_ID,
    address: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
    decimals: 18,
    symbol: "GMX",
    name: "GMX",
    icon: "https://ipfs.near.social/ipfs/bafkreicl37uzmlopck5vl22v3b2ju5mwyztjxamudxwwwykvdjtn3mbihm",
  },
  "0x982239D38Af50B0168dA33346d85Fb12929c4c07": {
    chainId: CHAIN_ID,
    address: "0x982239D38Af50B0168dA33346d85Fb12929c4c07",
    decimals: 18,
    symbol: "TROVE",
    name: "Arbitrove Governance Token",
    icon: "https://ipfs.near.social/ipfs/bafkreihsvhurpnozp52botgrcg2j673fvn3633y23bkx54dp6bfpov2zum",
  },
  "0x10393c20975cF177a3513071bC110f7962CD67da": {
    chainId: CHAIN_ID,
    address: "0x10393c20975cF177a3513071bC110f7962CD67da",
    decimals: 18,
    symbol: "JONES",
    name: "Jones DAO",
    icon: "https://ipfs.near.social/ipfs/bafkreibx6e6tsab3xxd6s7alev2tgvbjs4welhfndrrunsedvgopv2hmj4",
  },
  "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1": {
    chainId: CHAIN_ID,
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44": {
    chainId: CHAIN_ID,
    address: "0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44",
    decimals: 18,
    symbol: "DEUS",
    name: "DEUS",
    icon: "https://ipfs.near.social/ipfs/bafkreieunqohwvmd42bs4riistxw52cxt5pxrsnd7ipd4fsqvw33ej5nra",
  },

  "0x13aABC0a9A5d6865dA8fD0296080E172CF8BB958": {
    chainId: CHAIN_ID,
    address: "0x13aABC0a9A5d6865dA8fD0296080E172CF8BB958",
    decimals: 18,
    symbol: "FBA",
    name: "Firebird Aggregator",
    icon: "https://ipfs.near.social/ipfs/bafkreichwusk6u232gj54kdf2m3zbb4bbwwxfad2it6e3xfnsjiy4fdzpe",
  },

  "0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A": {
    chainId: CHAIN_ID,
    address: "0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A",
    decimals: 18,
    symbol: "alUSD",
    name: "Alchemix USD",
    icon: "https://ipfs.near.social/ipfs/bafkreiatqfw3xloh4btud42jsnzvliege2h7v3ptroxehngq32ryllxpfi",
  },

  "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d": {
    chainId: CHAIN_ID,
    address: "0x3F56e0c36d275367b8C502090EDF38289b3dEa0d",
    decimals: 18,
    symbol: "MAI",
    name: "Mai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreicgly7mfpvv4o32u6hpcei7z4le7a67gtfbdvhi5avf5dkpddy5pu",
  },

  "0x11F98c7E42A367DaB4f200d2fdc460fb445CE9a8": {
    chainId: CHAIN_ID,
    address: "0x11F98c7E42A367DaB4f200d2fdc460fb445CE9a8",
    decimals: 18,
    symbol: "SPARTA",
    name: "SPARTA",
    icon: "https://ipfs.near.social/ipfs/bafkreihe3hvj3bkgljgfwhgzz6r3unz447ccoegm2gkvfo5v3vpagt43ly",
  },
  "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f": {
    chainId: CHAIN_ID,
    address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },
  "0x580E933D90091b9cE380740E3a4A39c67eB85B4c": {
    chainId: CHAIN_ID,
    address: "0x580E933D90091b9cE380740E3a4A39c67eB85B4c",
    decimals: 18,
    symbol: "GSWIFT",
    name: "GameSwift",
    icon: "https://ipfs.near.social/ipfs/bafkreiftjoz65kgqbxrymhvyrcwiv6cklcynjflnq4xvukoeidahj6h7ta",
  },
  "0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8": {
    chainId: CHAIN_ID,
    address: "0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8",
    decimals: 18,
    symbol: "GRAIL",
    name: "Camelot token",
    icon: "https://ipfs.near.social/ipfs/bafkreibnsqc22kpgbax23sog6z5q6ep2ysajpexz53xdjrrcp64ns3nsue",
  },

  "0xAAA6C1E32C55A7Bfa8066A6FAE9b42650F262418": {
    chainId: CHAIN_ID,
    address: "0xAAA6C1E32C55A7Bfa8066A6FAE9b42650F262418",
    decimals: 18,
    symbol: "RAM",
    name: "Ramses",
    icon: "https://ipfs.near.social/ipfs/bafkreiapmufwi3jhpn3t2t7zcvlgwejuicp6ry557y6eh2znoh4r3p27he",
  },

  "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F": {
    chainId: CHAIN_ID,
    address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
    decimals: 18,
    symbol: "FRAX",
    name: "Frax",
    icon: "https://ipfs.near.social/ipfs/bafkreiaqcmuoe5foep73wpyakcsmypxasjecc2k43tqj2j3pvfntokxmiy",
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
  --dex-hover-bg-color: rgba(51, 84, 156, 0.1);
`;
return (
  <Container>
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.SwapConnector"
      props={{
        chainId: CHAIN_ID,
        chainName: "Arbitrum One",
        displayChainName: "Arbitrum",
        wethAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        connectProps: {
          // imgProps: {
          //   src: "https://ipfs.near.social/ipfs/bafkreifeitks2bp3vyy7v7iznq6lf67dutvjjplzzbiwv4j2dheqiqqbpi",
          //   style: {
          //     width: "179px",
          //     height: "143px",
          //     marginTop: "80px",
          //   },
          // },
          noAccountTips: "Arbitrum Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to Arbitrum One Chain.",
        },
        defalutDex: "Camelot",
        dexs: {
          Camelot: {
            name: "Camelot",
            logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOTkuNyAyMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5OS43IDIwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZBRkFGQTt9DQoJLnN0MXtmaWxsOiNGRkFGMUQ7fQ0KCS5zdDJ7ZmlsbDojMTYxNjE2O30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTE3LjEsMjAwdi04Mi4yYzE5LjYsMi4xLDMyLjksMTEuMSwzMi45LDExLjFsMTIuNS0xNC4xYy0yMC41LTE0LjYtNTAuOS0xNS4yLTUwLjktMTUuMmwtNS01NS4yDQoJYzMuMy0yLjIsNS41LTUuOSw1LjUtMTAuMmMwLTYuNy01LjUtMTIuMi0xMi4yLTEyLjJzLTEyLjIsNS41LTEyLjIsMTIuMmMwLDQuMywyLjIsOC4xLDUuNSwxMC4ybC01LDU1LjJjMCwwLTMwLjQsMC41LTUwLjksMTUuMg0KCWwxMi41LDE0LjFjMCwwLDEzLjMtOSwzMi45LTExLjFWMjAwQzYuMSwxNDMuMi0wLjIsNjAuNywwLDMzLjNjMC01LjcsMy40LTEwLjksOC42LTEzLjJDMjMuOSwxMy4zLDU4LjgsMCw5OS44LDANCgljNDEsMCw3NS45LDEzLjMsOTEuMiwyMC4xYzUuMiwyLjMsOC42LDcuNSw4LjYsMTMuMkMxOTkuOCw2MC43LDE5My41LDE0My4yLDExNy4xLDIwMHoiLz4NCjwvc3ZnPg0K",
            factoryAddress: "0x6EcCab422D763aC031210895C81787E87B43A652",
            routerAddress: "0xc873fEcbd354f5A56E00E710B90EF4201db2448d",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
            },
            tokens: [
              Tokens["native"],
              Tokens["0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8"],
              Tokens["0x912CE59144191C1204E64559FE8253a0e49E6548"],
              Tokens["0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"],
              Tokens["0xaf88d065e77c8cC2239327C5EDb3A432268e5831"],
              Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
              Tokens["0x6dD963C510c2D2f09d5eDdB48Ede45FeD063Eb36"],
              Tokens["0xD77B108d4f6cefaa0Cae9506A934e825BEccA46E"],
              Tokens["0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8"],
              Tokens["0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a"],
              Tokens["0x982239D38Af50B0168dA33346d85Fb12929c4c07"],
              Tokens["0x10393c20975cF177a3513071bC110f7962CD67da"],
            ],
          },
          Apeswap: {
            name: "Apeswap",
            logo: "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F4031390532-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MTJ1qyFf3rQZjewhth_%252Favatar-1615657020974.png%3Fgeneration%3D1615657021220196%26alt%3Dmedia",
            factoryAddress: "0xCf083Be4164828f00cAE704EC15a36D711491284",
            routerAddress: "0x7d13268144adcdbEBDf94F654085CC15502849Ff",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
            },
            tokens: [
              Tokens["native"],
              Tokens["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"],
              Tokens["0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"],
              Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
            ],
          },
          Spartadex: {
            name: "Spartadex",
            logo: "https://spartadex.io/images/logo.svg",
            factoryAddress: "0xFe8EC10Fe07A6a6f4A2584f8cD9FE232930eAF55",
            routerAddress: "0x89AE36E3B567b914a5E97E6488C6EB5b9C5d0231",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
            },
            tokens: [
              Tokens["native"],
              Tokens["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"],
              Tokens["0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"],
              Tokens["0x11F98c7E42A367DaB4f200d2fdc460fb445CE9a8"],
              Tokens["0x912CE59144191C1204E64559FE8253a0e49E6548"],
              Tokens["0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f"],
              Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
              Tokens["0x580E933D90091b9cE380740E3a4A39c67eB85B4c"],
            ],
          },
          "Ramses V2": {
            name: "Ramses V2",
            logo: "https://ipfs.near.social/ipfs/bafkreidgayoqzg4kqxz6eag4eridejkx3rszflfwbnitfqfohlmpk54w3i",
            factoryAddress: "0xAA2cd7477c451E703f3B9Ba5663334914763edF8",
            routerAddress: "0xAA23611badAFB62D37E7295A682D21960ac85A90",
            quoterAddress: "0xAA20EFF7ad2F523590dE6c04918DaAE0904E3b20",
            uniType: "v3",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
            },
            tokens: [
              Tokens["native"],
              Tokens["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"],
              Tokens["0xaf88d065e77c8cC2239327C5EDb3A432268e5831"],
              Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
              Tokens["0x912CE59144191C1204E64559FE8253a0e49E6548"],
              Tokens["0xAAA6C1E32C55A7Bfa8066A6FAE9b42650F262418"],
              Tokens["0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F"],
            ],
          },
          "Chronos V1": {
            name: "Chronos V1",
            logo: "https://ipfs.near.social/ipfs/bafkreieikyrqroy4j272w2w3cwa2ehswvpmmcmdyf6yyfjzaqnynsqh64a",
            factoryAddress: "0xCe9240869391928253Ed9cc9Bcb8cb98CB5B0722 ",
            routerAddress: "0xE708aA9E887980750C040a6A2Cb901c37Aa34f3b",
            uniType: "solidly",
            defaultCurrencies: {
              input: Tokens["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"],
              output: Tokens["0xaf88d065e77c8cC2239327C5EDb3A432268e5831"],
            },
            tokens: [
              Tokens["0x9483ab65847A447e36d21af1CaB8C87e9712ff93"],
              Tokens["0xaf88d065e77c8cC2239327C5EDb3A432268e5831"],
              Tokens["0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F"],
              Tokens["0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65"],
              Tokens["0x15b2fb8f08E4Ac1Ce019EADAe02eE92AeDF06851"],
              Tokens["0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"],
              Tokens["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"],
              Tokens["0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44"],
              Tokens["0x912CE59144191C1204E64559FE8253a0e49E6548"],
              Tokens["0xeb8E93A0c7504Bffd8A8fFa56CD754c63aAeBFe8"],
            ],
          },

          "Ramses V1": {
            name: "Ramses V1",
            logo: "https://ipfs.near.social/ipfs/bafkreiczb5evv63erkpwoozxb6qmbwat63ywebt2pdlctc6gey4cqp2ln4",
            factoryAddress: "0xAAA35aaEa18B0187E82A3A7f2996C9ee7Bad9696",
            routerAddress: "0xAAA87963EFeB6f7E0a2711F397663105Acb1805e",
            uniType: "solidly",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"],
            },
            tokens: [
              Tokens["0x13aABC0a9A5d6865dA8fD0296080E172CF8BB958"],
              Tokens["0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"],
              Tokens["0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F"],
              Tokens["0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A"],
              Tokens["0x3F56e0c36d275367b8C502090EDF38289b3dEa0d"],
              Tokens["0xeb8E93A0c7504Bffd8A8fFa56CD754c63aAeBFe8"],
              Tokens["native"],
              Tokens["0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        quoterV3: "bluebiu.near/widget/Arbitrum.Swap.QuoterV3",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
        handlerV3: "bluebiu.near/widget/Arbitrum.Swap.HandlerV3",
        QuoterSolidly: "bluebiu.near/widget/Arbitrum.Swap.QuoterSolidly",
        handlerSolidly: "bluebiu.near/widget/Arbitrum.Swap.handlerSolidly",
        ...props,
      }}
    />
  </Container>
);
