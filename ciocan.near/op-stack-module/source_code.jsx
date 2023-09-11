const tokens = [
  // eth testnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 5,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    extensions: {
      optimismBridgeAddress: "0xc92470D7Ffa21473611ab6c6e2FcFB8637c8f330",
    },
  },
  {
    chainId: 5,
    address: "0xc1dC2d65A2243c22344E725677A3E3BEBD26E604",
    symbol: "MNT",
    decimals: 18,
    logoURI: "https://token-list.mantle.xyz/data/Mantle/logo.svg",
    extensions: {
      optimismBridgeAddress: "0xc92470D7Ffa21473611ab6c6e2FcFB8637c8f330",
    },
  },
  {
    address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    chainId: 5,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    extensions: {
      optimismBridgeAddress: "0xc92470D7Ffa21473611ab6c6e2FcFB8637c8f330",
    },
  },
  // eth mainnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    extensions: {
      optimismBridgeAddress: "0x95fC37A27a2f68e3A647CDc081F0A89bb47c3012",
    },
  },
  {
    chainId: 1,
    address: "0x3c3a81e81dc49a522a592e7622a7e711c06bf354",
    name: "Mantle",
    symbol: "MNT",
    decimals: 18,
    logoURI: "https://token-list.mantle.xyz/data/Mantle/logo.svg",
    extensions: {
      optimismBridgeAddress: "0x95fC37A27a2f68e3A647CDc081F0A89bb47c3012",
    },
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainId: 1,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    extensions: {
      optimismBridgeAddress: "0x95fC37A27a2f68e3A647CDc081F0A89bb47c3012",
    },
  },
  // mantle testnet assets
  {
    chainId: 5001,
    address: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://token-list.mantle.xyz/data/ETH/logo.svg",
    extensions: {
      optimismBridgeAddress: "0x4200000000000000000000000000000000000010",
    },
  },
  {
    chainId: 5001,
    address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
    symbol: "MNT",
    decimals: 18,
    logoURI: "https://token-list.mantle.xyz/data/Mantle/logo.svg",
    extensions: {
      optimismBridgeAddress: "0x4200000000000000000000000000000000000010",
    },
  },
  {
    chainId: 5001,
    address: "0x2ED3c15eC59CE827c4aBBabfF76d37562558437D",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    logoURI: "https://token-list.mantle.xyz/data/USDC/logo.png",
    extensions: {
      optimismBridgeAddress: "0x4200000000000000000000000000000000000010",
    },
  },
  // mantle assets
  {
    chainId: 5000,
    address: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://token-list.mantle.xyz/data/ETH/logo.svg",
    extensions: {
      optimismBridgeAddress: "0x4200000000000000000000000000000000000010",
    },
  },
  {
    chainId: 5000,
    address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
    name: "Mantle",
    symbol: "MNT",
    decimals: 18,
    logoURI: "https://token-list.mantle.xyz/data/Mantle/logo.svg",
    extensions: {
      optimismBridgeAddress: "0x4200000000000000000000000000000000000010",
    },
  },
  {
    chainId: 5000,
    address: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
    symbol: "USDC",
    decimals: 6,
    logoURI: "https://token-list.mantle.xyz/data/USDC/logo.png",
    extensions: {
      optimismBridgeAddress: "0x4200000000000000000000000000000000000010",
    },
  },
];

const walletChains = {
  5001: {
    chainId: `0x1389`,
    chainName: "Mantle Testnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.testnet.mantle.xyz/"],
  },
  5000: {
    chainId: `0x1388`,
    chainName: "Mantle Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.mantle.xyz"],
  },
};

return { tokens, walletChains };
