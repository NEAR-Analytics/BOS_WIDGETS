const networkTabs = {
  Ethereum: {
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    tokens: [
      {
        name: "USDC",
        icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
      },
      {
        name: "ETH",
        icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
    ],
  },
  Polygon: {
    icon: "https://raw.githubusercontent.com/sushiswap/list/master/logos/native-currency-logos/matic.svg",
    tokens: [
      {
        name: "USDC.e",
        icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
      },
    ],
  },
  // Add other networks similarly
  // Base: {
  //   icon:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
  //   tokens: [
  //     { name: "ETH", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png" },
  //     { name: "USDbC", icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389" },
  //   ],
  // },
  // Arbitrum: {
  //   icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png" ,
  //   tokens: [
  //     { name: "USDC.e", icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389" },
  //     { name: "USDC", icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389" },
  //   ],
  // },
};

const networks = [
  {
    name: "Ethereum",
    params: {
      chainId: "0x1",
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://ethereum.publicnode.com"],
      blockExplorerUrls: ["https://etherscan.io"],
    },
  },
  {
    name: "Polygon",
    params: {
      chainId: "0x89",
      chainName: "Matic Mainnet",
      nativeCurrency: {
        name: "Matic",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com"],
      blockExplorerUrls: ["https://explorer.matic.network/"],
    },
  },
  {
    name: "Base",
    params: {
      chainId: "0x2105",
      chainName: "Base Mainnet",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.base.org"],
      blockExplorerUrls: ["https://basescan.org/"],
    },
  },
  {
    name: "Arbitrum",
    params: {
      chainId: "0xa4b1",
      chainName: "Arbitrum One",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://arbitrum-mainnet.infura.io"],
      blockExplorerUrls: ["https://explorer.arbitrum.io"],
    },
  },
];

const assets = [
  {
    ethereum: [
      {
        name: "USDC",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        bulkerAddress: "0x74a81F84268744a40FEBc48f8b812a1f188D80C3",
        networkImage:
          "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png",
        image:
          "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
        network: "Ethereum",
        decimals: 6,
        chainId: 1,
        contractInfo: {
          network: "Ethereum Mainnet",
          address: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
          chainId: 1,
          httpRpcUrl: "https://ethereum.publicnode.com",
          httpRpcUrlBorrow: "https://eth-pokt.nodies.app",
          borrowAssetCoingeckoId: "usdc",
        },
        collateralItems: [
          {
            name: "Ethereum",
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            decimals: 18,
            subLabel: "ETH",
            isBaseAsset: true,
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
            value: "28.00",
          },
          {
            name: "Chainlink",
            address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
            decimals: 18,
            subLabel: "LINK",
            image:
              "https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png?1696502009",
            value: "28.00",
          },
          {
            name: "Compound",
            address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
            decimals: 18,
            subLabel: "COMP",
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png",
            value: "28.00",
          },
          {
            name: "Uniswap",
            address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
            decimals: 18,
            subLabel: "UNI",
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
            value: "28.00",
          },
          {
            name: "Wrapped Bitcoin",
            address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
            decimals: 18,
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
            subLabel: "WBTC",
            value: "28.00",
          },
        ],
      },
      {
        name: "ETH",
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        isBaseAsset: true,
        bulkerAddress: "0xa397a8C2086C554B531c02E29f3291c9704B00c7",
        networkImage:
          "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png",
        image:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
        network: "Ethereum",
        decimals: 18,
        chainId: 1,

        contractInfo: {
          network: "Ethereum Mainnet",
          address: "0xA17581A9E3356d9A858b789D68B4d866e593aE94",
          chainId: 1,
          httpRpcUrl: "https://ethereum.publicnode.com",
          httpRpcUrlBorrow: "https://eth-pokt.nodies.app",
          borrowAssetCoingeckoId: "eth",
        },
        collateralItems: [
          {
            name: "Coinbase Wrapped Staked ETH",
            address: "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704",
            decimals: 18,
            subLabel: "cbETH",
            image:
              "https://assets.coingecko.com/coins/images/27008/standard/cbeth.png?1696526061",
            value: "28.00",
          },
          {
            name: "Lido Wrapped Staked ETH",
            address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
            decimals: 18,
            subLabel: "wstETH",
            image:
              "https://assets.coingecko.com/coins/images/13442/standard/steth_logo.png?1696513206",
            value: "28.00",
          },
          {
            name: "Rocket Pool ETH",
            address: "0xae78736Cd615f374D3085123A210448E74Fc6393",
            decimals: 18,
            subLabel: "rETH",
            image:
              "https://assets.coingecko.com/coins/images/20764/standard/reth.png?1696520159",
            value: "28.00",
          },
        ],
      },
    ],
    polygon: [
      {
        name: "USDC.e",
        address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
        bulkerAddress: "0x59e242D352ae13166B4987aE5c990C232f7f7CD6",
        networkImage:
          "https://raw.githubusercontent.com/sushiswap/list/master/logos/native-currency-logos/matic.svg",
        image:
          "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
        network: "Polygon",
        decimals: 6,
        chainId: 137,
        contractInfo: {
          network: "Polygon Mainnet",
          address: "0xF25212E676D1F7F89Cd72fFEe66158f541246445",
          chainId: 137,
          httpRpcUrl: "https://polygon-rpc.com/",
          httpRpcUrlBorrow: "https://polygon-bor.publicnode.com",
          borrowAssetCoingeckoId: "usdc",
        },
        collateralItems: [
          {
            name: "Matic",
            address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
            isBaseAsset: true,
            decimals: 18,
            subLabel: "MATIC",
            image:
              "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/matic.png",
            value: "28.00",
          },
          {
            name: "Wrapped Ethereum",
            address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            decimals: 18,
            subLabel: "WETH",
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
            value: "28.00",
          },
          {
            name: "Stader MaticX",
            address: "0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6",
            decimals: 18,
            image:
              "https://assets.coingecko.com/coins/images/25383/standard/maticx.png?1696524516",
            subLabel: "MaticX",
            value: "28.00",
          },
          {
            name: "Staked MATIC (PoS)",
            address: "0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4",
            decimals: 18,
            image:
              "https://assets.coingecko.com/coins/images/24185/standard/stMATIC.png?1696523373",
            subLabel: "stMATIC",
            value: "28.00",
          },
          {
            name: "Wrapped Bitcoin",
            address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
            decimals: 18,
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
            subLabel: "WBTC",
            value: "28.00",
          },
        ],
      },
    ],
    base: [
      {
        name: "ETH",
        address: "0x4200000000000000000000000000000000000006",
        bulkerAddress: "0x78D0677032A35c63D142a48A2037048871212a8C",
        networkImage:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
        image:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
        network: "Base",
        isBaseAsset: true,
        decimals: 18,
        chainId: 8453,
        contractInfo: {
          network: "Base Mainnet",
          address: "0x46e6b214b524310239732D51387075E0e70970bf",
          chainId: 8453,
          httpRpcUrl: "https://mainnet.base.org",
          httpRpcUrlBorrow: "https://base.llamarpc.com",
          borrowAssetCoingeckoId: "eth",
        },
        collateralItems: [
          {
            name: "Coinbase Wrapped Staked ETH",
            address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
            decimals: 18,
            subLabel: "cbETH",
            image:
              "https://assets.coingecko.com/coins/images/27008/standard/cbeth.png?1696526061",
            value: "28.00",
          },
        ],
      },
      {
        name: "USDbC",
        address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
        bulkerAddress: "0x78D0677032A35c63D142a48A2037048871212a8C",
        networkImage:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
        image:
          "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
        network: "Base",
        decimals: 6,
        chainId: 8453,
        contractInfo: {
          network: "Base Mainnet",
          address: "0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf",
          chainId: 8453,
          httpRpcUrl: "https://mainnet.base.org",
          httpRpcUrlBorrow: "https://base.llamarpc.com",
          borrowAssetCoingeckoId: "eth",
        },
        collateralItems: [
          {
            name: "Coinbase Wrapped Staked ETH",
            address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
            decimals: 18,
            subLabel: "cbETH",
            image:
              "https://assets.coingecko.com/coins/images/27008/standard/cbeth.png?1696526061",
            value: "28.00",
          },
          {
            name: "Ethereum",
            address: "0x4200000000000000000000000000000000000006",
            decimals: 18,
            subLabel: "ETH",
            isBaseAsset: true,
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
            value: "28.00",
          },
        ],
      },
    ],
    arbitrum: [
      {
        name: "USDC.e",
        address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        bulkerAddress: "0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d",
        networkImage:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
        image:
          "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
        network: "Arbitrum",
        decimals: 6,
        chainId: 42161,
        contractInfo: {
          network: "Arbitrum One",
          address: "0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA",
          chainId: 42161,
          httpRpcUrl: "https://arbitrum-mainnet.infura.io",
          httpRpcUrlBorrow: "https://arb-mainnet-public.unifra.io",
          borrowAssetCoingeckoId: "eth",
        },
        collateralItems: [
          {
            name: "Arbitrum",
            address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
            decimals: 18,
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
            subLabel: "ARB",
            value: "28.00",
          },
          {
            name: "Ether",
            address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
            decimals: 18,
            isBaseAsset: true,
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
            subLabel: "ETH",
            value: "28.00",
          },
          {
            name: "GMX",
            address: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
            decimals: 18,
            image:
              "https://assets.coingecko.com/coins/images/18323/small/arbit.png?163153246",
            subLabel: "GMX",
            value: "28.00",
          },
          {
            name: "Wrapped Bitcoin",
            address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
            decimals: 18,
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
            subLabel: "WBTC",
            value: "28.00",
          },
        ],
      },
      {
        name: "USDC",
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        bulkerAddress: "0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d",
        networkImage:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
        image:
          "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
        network: "Arbitrum",
        decimals: 6,
        chainId: 42161,
        contractInfo: {
          network: "Arbitrum One",
          address: "0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf",
          chainId: 42161,
          httpRpcUrl: "https://arbitrum-mainnet.infura.io",
          httpRpcUrlBorrow: "https://arb-mainnet-public.unifra.io",
          borrowAssetCoingeckoId: "eth",
        },
        collateralItems: [
          {
            name: "Arbitrum",
            address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
            decimals: 18,
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
            subLabel: "ARB",
            value: "28.00",
          },
          {
            name: "Ether",
            address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
            decimals: 18,
            isBaseAsset: true,
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
            subLabel: "ETH",
            value: "28.00",
          },
          {
            name: "GMX",
            address: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
            decimals: 18,
            image:
              "https://assets.coingecko.com/coins/images/18323/small/arbit.png?163153246",
            subLabel: "GMX",
            value: "28.00",
          },
          {
            name: "Wrapped Bitcoin",
            address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
            decimals: 18,
            image:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
            subLabel: "WBTC",
            value: "28.00",
          },
        ],
      },
    ],
  },
];

const marketsContracts = [
  {
    network: "Ethereum",
    address: "0xa17581a9e3356d9a858b789d68b4d866e593ae94",
    chainId: 1,
    httpRpcUrl: "https://ethereum.publicnode.com",
    borrowAssetCoingeckoId: "ethereum",
    borrowDecimals: 18,
    baseTokenName: "Ether",
    baseTokenSymbol: "ETH",
    networkIcon:
      "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/white/eth.png",
    baseCoinIcon:
      "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png",
    collateralAssets: [
      {
        name: "Coinbase Wrapped Staked ETH",
        address: "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704",
        decimals: 18,
        coingegkoId: "coinbase-wrapped-staked-eth",
        icon: "https://app.compound.finance/images/assets/asset_cbETH.svg",
      },
      {
        name: "Wrapped liquid staked Ether 2.0",
        address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
        decimals: 18,
        coingegkoId: "staked-ether",
        icon: "https://app.compound.finance/images/assets/asset_wstETH.svg",
      },
      {
        name: "Rocket Pool ETH",
        address: "0xae78736Cd615f374D3085123A210448E74Fc6393",
        decimals: 18,
        coingegkoId: "rocket-pool-eth",
        icon: "https://app.compound.finance/images/assets/asset_RETH.svg",
      },
    ],
  },
  {
    network: "Ethereum",
    address: "0xc3d688b66703497daa19211eedff47f25384cdc3",
    chainId: 1,
    httpRpcUrl: "https://ethereum.publicnode.com",
    borrowAssetCoingeckoId: "usd-coin",
    borrowDecimals: 6,
    baseTokenName: "USDC Coin",
    baseTokenSymbol: "USDC",
    networkIcon:
      "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/white/eth.png",
    baseCoinIcon:
      "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/usdc.png",
    collateralAssets: [
      {
        name: "Compound",
        address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
        decimals: 18,
        coingegkoId: "compound-governance-token",
      },
      {
        name: "Wrapped BTC",
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        decimals: 8,
        coingegkoId: "wrapped-bitcoin",
      },
      {
        name: "Wrapped Ether",
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18,
        coingegkoId: "ethereum",
      },
      {
        name: "Uniswap",
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        decimals: 18,
        coingegkoId: "uniswap",
      },
      {
        name: "Chainlink Token",
        address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        decimals: 18,
        coingegkoId: "chainlink",
      },
    ],
  },
  {
    network: "Polygon",
    address: "0xF25212E676D1F7F89Cd72fFEe66158f541246445",
    chainId: 137,
    httpRpcUrl: "https://polygon-rpc.com",
    borrowAssetCoingeckoId: "usd-coin",
    borrowDecimals: 6,
    baseTokenName: "USDC Coin (Bridged)",
    baseTokenSymbol: "USDC.e",
    networkIcon:
      "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/matic.png",
    baseCoinIcon:
      "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/usdc.png",
    collateralAssets: [
      {
        name: "Wrapped Ether",
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        decimals: 18,
        coingegkoId: "ethereum",
      },
      {
        name: "(PoS) Wrapped BTC (WBTC)",
        address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
        decimals: 8,
        coingegkoId: "wrapped-bitcoin",
      },
      {
        name: "Wrapped Matic",
        address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        decimals: 18,
        coingegkoId: "wmatic",
      },
      {
        name: "Liquid Staking Matic (PoS)",
        address: "0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6",
        decimals: 18,
        coingegkoId: "stader-maticx",
      },
      {
        name: "Staked MATIC",
        address: "0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4",
        decimals: 18,
        coingegkoId: "lido-staked-matic",
      },
    ],
  },
  // {
  //   network: "Base",
  //   address: "0x46e6b214b524310239732D51387075E0e70970bf",
  //   chainId: 8453,
  //   httpRpcUrl: "https://mainnet.base.org",
  //   borrowAssetCoingeckoId: "usd-coin",
  //   borrowDecimals: 18,
  //   baseTokenName: "ETH",
  //   baseTokenSymbol: "ETH",
  //   networkIcon:
  //     "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
  //   baseCoinIcon:
  //     "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  //   collateralAssets: [
  //     {
  //       name: "Coinbase Wrapped Staked ETH",
  //       address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
  //       decimals: 18,
  //       coingegkoId: "coinbase-wrapped-staked-eth",
  //       icon: "https://app.compound.finance/images/assets/asset_cbETH.svg",
  //     },
  //   ],
  // },
  // {
  //   network: "Base",
  //   address: "0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf",
  //   chainId: 8453,
  //   httpRpcUrl: "https://mainnet.base.org",
  //   borrowAssetCoingeckoId: "usd-coin",
  //   borrowDecimals: 6,
  //   baseTokenName: "ETH",
  //   baseTokenSymbol: "USDbC",
  //   networkIcon:
  //     "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
  //   baseCoinIcon:
  //     "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
  //   collateralAssets: [
  //     {
  //       name: "Coinbase Wrapped Staked ETH",
  //       address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
  //       decimals: 18,
  //       coingegkoId: "coinbase-wrapped-staked-eth",
  //       icon: "https://app.compound.finance/images/assets/asset_cbETH.svg",
  //     },
  //     {
  //       name: "Ethereum",
  //       address: "0x4200000000000000000000000000000000000006",
  //       decimals: 18,
  //       coingegkoId: "ethereum",
  //       icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  //     },
  //   ],
  // },
  // {
  //   network: "Arbitrum",
  //   address: "0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA",
  //   chainId: 42161,
  //   httpRpcUrl: "https://1rpc.io/arb",
  //   borrowAssetCoingeckoId: "arbitrum",
  //   borrowDecimals: 6,
  //   baseTokenName: "Arbitrum",
  //   baseTokenSymbol: "USDC.e",
  //   networkIcon:
  //     "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
  //   baseCoinIcon:
  //     "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
  //   collateralAssets: [
  //     {
  //       name: "Arbitrum",
  //       address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
  //       decimals: 18,
  //       coingegkoId: "arbitrum",
  //       icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
  //     },
  //     {
  //       name: "Ether",
  //       address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  //       decimals: 18,
  //       coingegkoId: "ethereum",
  //       icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  //     },
  //     {
  //       name: "GMX",
  //       address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  //       decimals: 18,
  //       coingegkoId: "gmx",
  //       icon: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?163153246",
  //     },
  //     {
  //       name: "Wrapped Bitcoin",
  //       address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
  //       decimals: 18,
  //       coingegkoId: "wrapped-bitcoin",
  //       icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
  //     },
  //   ],
  // },
  // {
  //   network: "Arbitrum",
  //   address: "0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf",
  //   chainId: 42161,
  //   httpRpcUrl: "https://1rpc.io/arb",
  //   borrowAssetCoingeckoId: "arbitrum",
  //   borrowDecimals: 6,
  //   baseTokenName: "Arbitrum",
  //   baseTokenSymbol: "USDC",
  //   networkIcon:
  //     "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
  //   baseCoinIcon:
  //     "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
  //   collateralAssets: [
  //     {
  //       name: "Arbitrum",
  //       address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
  //       decimals: 18,
  //       coingegkoId: "arbitrum",
  //       icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
  //     },
  //     {
  //       name: "Ether",
  //       address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  //       decimals: 18,
  //       coingegkoId: "ethereum",
  //       icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  //     },
  //     {
  //       name: "GMX",
  //       address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  //       decimals: 18,
  //       coingegkoId: "gmx",
  //       icon: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?163153246",
  //     },
  //     {
  //       name: "Wrapped Bitcoin",
  //       address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
  //       decimals: 18,
  //       coingegkoId: "wrapped-bitcoin",
  //       icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
  //     },
  //   ],
  // },
];

return (
  <Widget
    src="thalesb.near/widget/CompoundConnector"
    props={{
      marketsContracts,
      assets,
      networks,
      networkTabs,
      ...props,
    }}
  />
);
