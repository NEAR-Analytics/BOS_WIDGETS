const CHAIN_LIST = [
  {
    chainId: 1,
    chainName: "Ethereum",
  },
  {
    chainId: 42161,
    chainName: "Arbitrum",
  },
  {
    chainName: "Optimisim",
    chainId: 10,
  },
  {
    chainName: "Polygon",
    chainId: 137,
  },
  {
    chainName: "Base",
    chainId: 8453,
  },
  {
    chainName: "BSC",
    chainId: 56,
  },

  {
    chainName: "Celo",
    chainId: 42220,
  },

  {
    chainName: "Avalanche",
    chainId: 43114,
  },
];

const chainIdList = CHAIN_LIST.map((item) => item.chainId);

const DEFAULT_CHAIN_ID = 1;

const account = Ethers.send("eth_requestAccounts", [])[0];

const { CHAIN_ID } = state;

const TokensEthereum = {
  native: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },

  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
    chainId: CHAIN_ID,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": {
    chainId: CHAIN_ID,
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0xdAC17F958D2ee523a2206206994597C13D831ec7": {
    chainId: CHAIN_ID,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0x6B175474E89094C44Da98b954EedeAC495271d0F": {
    chainId: CHAIN_ID,
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },

  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": {
    chainId: CHAIN_ID,
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  "0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8": {
    chainId: CHAIN_ID,
    address: "0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8",
    decimals: 18,
    symbol: "agEUR",
    name: "agEUR",
    icon: "https://ipfs.near.social/ipfs/bafkreihbld7bpsqjnh5uvnosgdwhyc6bze4vbf62rs5vg7xku77ecga4o4",
  },

  "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd": {
    chainId: CHAIN_ID,
    address: "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd",
    decimals: 2,
    symbol: "GUSD",
    name: "GUSD",
    icon: "https://ipfs.near.social/ipfs/bafkreihbld7bpsqjnh5uvnosgdwhyc6bze4vbf62rs5vg7xku77ecga4o4",
  },

  "0x5f98805a4e8be255a32880fdec7f6728c6568ba0": {
    chainId: CHAIN_ID,
    address: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0",
    decimals: 18,
    symbol: "LUSD",
    name: "LUSD",
    icon: "https://ipfs.near.social/ipfs/bafkreihbwhrsi447phga5fya4eb4nprudswmh4n5togvpyy4gowntcei5e",
  },

  "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c": {
    chainId: CHAIN_ID,
    address: "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c",
    decimals: 6,
    symbol: "EUROC",
    name: "EUROC",
    icon: "https://ipfs.near.social/ipfs/bafkreiczg7i6ywatgdzt37fiik2yg7y6ik536l7z3qkp53l26h75hjpmt4",
  },

  "0x70e8dE73cE538DA2bEEd35d14187F6959a8ecA96": {
    chainId: CHAIN_ID,
    address: "0x70e8dE73cE538DA2bEEd35d14187F6959a8ecA96",
    decimals: 6,
    symbol: "XSGD",
    name: "XSGD",
    icon: "https://ipfs.near.social/ipfs/bafkreie3xewmom7u6kvy76sznyfujuarcls3ifsv6dp2v7ab47snkdayhq",
  },
};

const TokensArbitrum = {
  native: {
    chainId: 42161,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },

  "0xaf88d065e77c8cC2239327C5EDb3A432268e5831": {
    chainId: 42161,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1": {
    chainId: 42161,
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": {
    chainId: 42161,
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1": {
    chainId: 42161,
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },

  "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f": {
    chainId: 42161,
    address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  "0xFA5Ed56A203466CbBC2430a43c66b9D8723528E7": {
    chainId: 42161,
    address: "0xFA5Ed56A203466CbBC2430a43c66b9D8723528E7",
    decimals: 18,
    symbol: "agEUR",
    name: "agEUR",
    icon: "https://ipfs.near.social/ipfs/bafkreihbld7bpsqjnh5uvnosgdwhyc6bze4vbf62rs5vg7xku77ecga4o4",
  },

  "0x93b346b6BC2548dA6A1E7d98E9a421B42541425b": {
    chainId: 42161,
    address: "0x93b346b6BC2548dA6A1E7d98E9a421B42541425b",
    decimals: 18,
    symbol: "LUSD",
    name: "LUSD",
    icon: "https://ipfs.near.social/ipfs/bafkreihbwhrsi447phga5fya4eb4nprudswmh4n5togvpyy4gowntcei5e",
  },
};

const TokensOptimisim = {
  native: {
    chainId: 10,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },

  "0x0b2c639c533813f4aa9d7837caf62653d097ff85": {
    chainId: 10,
    address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x4200000000000000000000000000000000000006": {
    chainId: 10,
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58": {
    chainId: 10,
    address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1": {
    chainId: 10,
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },

  "0x68f180fcCe6836688e9084f035309E29Bf0A2095": {
    chainId: 10,
    address: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  "0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED": {
    chainId: 10,
    address: "0x9485aca5bbBE1667AD97c7fE7C4531a624C8b1ED",
    decimals: 18,
    symbol: "agEUR",
    name: "agEUR",
    icon: "https://ipfs.near.social/ipfs/bafkreihbld7bpsqjnh5uvnosgdwhyc6bze4vbf62rs5vg7xku77ecga4o4",
  },

  "0xc40F949F8a4e094D1b49a23ea9241D289B7b2819": {
    chainId: 10,
    address: "0xc40F949F8a4e094D1b49a23ea9241D289B7b2819",
    decimals: 18,
    symbol: "LUSD",
    name: "LUSD",
    icon: "https://ipfs.near.social/ipfs/bafkreihbwhrsi447phga5fya4eb4nprudswmh4n5togvpyy4gowntcei5e",
  },
};

const TokensPolygon = {
  native: {
    chainId: 137,
    address: "native",
    decimals: 18,
    symbol: "MATIC",
    name: "MATIC",
    icon: "https://ipfs.near.social/ipfs/bafkreihhijqfwysk3ck524rx7ult2pmuxs6tsfz5mvq2nlsq2mginak7wm",
  },

  "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174": {
    chainId: 137,
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": {
    chainId: 137,
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0xc2132D05D31c914a87C6611C10748AEb04B58e8F": {
    chainId: 137,
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063": {
    chainId: 137,
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },

  "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6": {
    chainId: 137,
    address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  "0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4": {
    chainId: 137,
    address: "0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4",
    decimals: 18,
    symbol: "agEUR",
    name: "agEUR",
    icon: "https://ipfs.near.social/ipfs/bafkreihbld7bpsqjnh5uvnosgdwhyc6bze4vbf62rs5vg7xku77ecga4o4",
  },

  "0x23001f892c0C82b79303EDC9B9033cD190BB21c7": {
    chainId: 137,
    address: "0x23001f892c0C82b79303EDC9B9033cD190BB21c7",
    decimals: 18,
    symbol: "LUSD",
    name: "LUSD",
    icon: "https://ipfs.near.social/ipfs/bafkreihbwhrsi447phga5fya4eb4nprudswmh4n5togvpyy4gowntcei5e",
  },

  "0xDC3326e71D45186F113a2F448984CA0e8D201995": {
    chainId: 137,
    address: "0xDC3326e71D45186F113a2F448984CA0e8D201995",
    decimals: 6,
    symbol: "XSGD",
    name: "XSGD",
    icon: "https://ipfs.near.social/ipfs/bafkreie3xewmom7u6kvy76sznyfujuarcls3ifsv6dp2v7ab47snkdayhq",
  },
};

const TokensBase = {
  native: {
    chainId: 8453,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },

  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913": {
    chainId: 8453,
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x4200000000000000000000000000000000000006": {
    chainId: 8453,
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb": {
    chainId: 8453,
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },

  "0xA61BeB4A3d02decb01039e378237032B351125B4": {
    chainId: 8453,
    address: "0xA61BeB4A3d02decb01039e378237032B351125B4",
    decimals: 18,
    symbol: "agEUR",
    name: "agEUR",
    icon: "https://ipfs.near.social/ipfs/bafkreihbld7bpsqjnh5uvnosgdwhyc6bze4vbf62rs5vg7xku77ecga4o4",
  },
};

const TokensBSC = {
  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8": {
    chainId: 56,
    address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    decimals: 18,
    symbol: "ETH",
    name: "Ethereum Token",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },

  "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d": {
    chainId: 56,
    address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    decimals: 18,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x4DB5a66E937A9F4473fA95b1cAF1d1E1D62E29EA": {
    chainId: 56,
    address: "0x4DB5a66E937A9F4473fA95b1cAF1d1E1D62E29EA",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0x55d398326f99059fF775485246999027B3197955": {
    chainId: 56,
    address: "0x55d398326f99059fF775485246999027B3197955",
    decimals: 18,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },

  "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3": {
    chainId: 56,
    address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },

  "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c": {
    chainId: 56,
    address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    decimals: 18,
    symbol: "BTC.b",
    name: "BTCB Token",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  "0x12f31B73D812C6Bb0d735a218c086d44D5fe5f89": {
    chainId: 56,
    address: "0x12f31B73D812C6Bb0d735a218c086d44D5fe5f89",
    decimals: 18,
    symbol: "agEUR",
    name: "agEUR",
    icon: "https://ipfs.near.social/ipfs/bafkreihbld7bpsqjnh5uvnosgdwhyc6bze4vbf62rs5vg7xku77ecga4o4",
  },
};

const TokensCelo = {
  "0x66803FB87aBd4aaC3cbB3fAd7C3aa01f6F3FB207": {
    chainId: 42220,
    address: "0x66803FB87aBd4aaC3cbB3fAd7C3aa01f6F3FB207",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },

  "0x37f750B7cC259A2f741AF45294f6a16572CF5cAd": {
    chainId: 42220,
    address: "0x37f750B7cC259A2f741AF45294f6a16572CF5cAd",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x2DEf4285787d58a2f811AF24755A8150622f4361": {
    chainId: 42220,
    address: "0x2DEf4285787d58a2f811AF24755A8150622f4361",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0xd71Ffd0940c920786eC4DbB5A12306669b5b81EF": {
    chainId: 42220,
    address: "0xd71Ffd0940c920786eC4DbB5A12306669b5b81EF",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73": {
    chainId: 42220,
    address: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73",
    decimals: 18,
    symbol: "CEUR",
    name: "Celo Euro",
    icon: "https://ipfs.near.social/ipfs/bafkreia3bcvbgzxdlhkkq4hm2n4nhwqayezmg76ump6ivyzhjvdkb3q63q",
  },
};

const TokensAvalanche = {
  native: {
    chainId: 43114,
    address: "native",
    decimals: 18,
    symbol: "AVAX",
    name: "AVAX",
    icon: "https://ipfs.near.social/ipfs/bafkreibc6odn7prkqm2l3yb35dil4psf5zhjjui5omzrqd7qa4jlv6ndeu",
  },

  "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E": {
    chainId: 43114,
    address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB": {
    chainId: 43114,
    address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },
  "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7": {
    chainId: 43114,
    address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },
  "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70": {
    chainId: 43114,
    address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },

  "0x50b7545627a5162f82a992c33b87adc75187b218": {
    chainId: 43114,
    address: "0x50b7545627a5162f82a992c33b87adc75187b218",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },
  "0xAEC8318a9a59bAEb39861d10ff6C7f7bf1F96C57": {
    chainId: 43114,
    address: "0xAEC8318a9a59bAEb39861d10ff6C7f7bf1F96C57",
    decimals: 18,
    symbol: "agEUR",
    name: "agEUR",
    icon: "https://ipfs.near.social/ipfs/bafkreihbld7bpsqjnh5uvnosgdwhyc6bze4vbf62rs5vg7xku77ecga4o4",
  },
  "0xC891EB4cbdEFf6e073e859e987815Ed1505c2ACD": {
    chainId: 43114,
    address: "0xC891EB4cbdEFf6e073e859e987815Ed1505c2ACD",
    decimals: 6,
    symbol: "EUROC",
    name: "EUROC",
    icon: "https://ipfs.near.social/ipfs/bafkreiczg7i6ywatgdzt37fiik2yg7y6ik536l7z3qkp53l26h75hjpmt4",
  },
};

const ChainTokensConfig = {
  1: {
    tokens: TokensEthereum,
    wethAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    routerAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    quoterAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
  },
  42161: {
    tokens: TokensArbitrum,
    wethAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    routerAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    quoterAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
  },
  10: {
    tokens: TokensOptimisim,
    wethAddress: "0x4200000000000000000000000000000000000006",
    routerAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    quoterAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
  },
  137: {
    tokens: TokensPolygon,
    wethAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    routerAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    quoterAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
  },
  56: {
    tokens: TokensBSC,
    wethAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    routerAddress: "0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2",
    quoterAddress: "0x78D78E420Da98ad378D7799bE8f4AF69033EB077",
  },

  42220: {
    tokens: TokensCelo,
    wethAddress: "0x2DEf4285787d58a2f811AF24755A8150622f4361",
    routerAddress: "0x5615CDAb10dc425a742d643d949a7F474C01abc4",
    quoterAddress: "0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8",
  },
  8453: {
    tokens: TokensBase,
    wethAddress: "0x4200000000000000000000000000000000000006",
    routerAddress: "0x2626664c2603336E57B271c5C0b26F421741e481",
    quoterAddress: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a",
  },
  43114: {
    tokens: TokensAvalanche,
    wethAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    routerAddress: "0xbb00FF08d01D300023C629E8fFfFcb65A5a578cE",
    quoterAddress: "0xbe0F5544EC67e9B3b2D979aaA43f18Fd87E6257F",
  },
};

if (!account) {
  State.update({
    CHAIN_ID: DEFAULT_CHAIN_ID,
  });
} else {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      if (!chainIdList.includes(chainId)) {
        State.update({
          CHAIN_ID: DEFAULT_CHAIN_ID,
          chainIdNotSupport: true,
        });
        return;
      }

      State.update({ CHAIN_ID: chainId });
    })
    .catch(() => {
      State.update({
        CHAIN_ID: DEFAULT_CHAIN_ID,
      });
    });
}

if (!state.CHAIN_ID || !state) {
  return "";
}

const Tokens = Object.values(ChainTokensConfig[CHAIN_ID].tokens);

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
      src="dapdapbos.near/widget/Uniswap.Swap.SwapConnector"
      props={{
        chainId: CHAIN_ID,
        chainName: "Ethereum",
        displayChainName: "Ethereum",
        chainIdNotSupport: state.chainIdNotSupport,
        CHAIN_LIST,
        wethAddress: ChainTokensConfig[CHAIN_ID].wethAddress,
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreifeitks2bp3vyy7v7iznq6lf67dutvjjplzzbiwv4j2dheqiqqbpi",
            style: {
              width: "179px",
              height: "143px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Uniswap",
          wrongNetworkTips: "To proceed, kindly switch to Ethereum.",
        },
        defalutDex: "UniSwap",
        dexs: {
          UniSwap: {
            name: "UniSwap",
            logo: "https://ipfs.near.social/ipfs/bafkreigrdrkqfoxu7f24er3aznyqnirvd67u4fdwexzp4dy46lf33t4ev4",
            powerByIcon:
              "https://ipfs.near.social/ipfs/bafkreic4fd4txraypt5jxhfpnma3oubkul3bkcqag35oxckpfbzlz2mloq",
            routerAddress: ChainTokensConfig[CHAIN_ID].routerAddress,
            quoterAddress: ChainTokensConfig[CHAIN_ID].quoterAddress,
            uniType: "v3",
            defaultCurrencies: {
              input: Tokens[0],
              output: Tokens[1],
            },
            tokens: Tokens,
          },
        },
        amountOutFn: "dapdapbos.near/widget/Uniswap.Swap.QuoterV3UniApi",
        handlerV3: "dapdapbos.near/widget/Uniswap.Swap.HandlerV3",
      }}
    />
  </Container>
);
