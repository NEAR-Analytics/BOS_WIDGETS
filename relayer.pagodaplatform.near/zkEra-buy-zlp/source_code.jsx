/// Layout
const DaisyUIWrapper = ({ children }) => {
  return (
    <Widget
      src="igris.near/widget/DaisyUIWrapper"
      props={{
        children,
        daisyUiTheme: "forest",
      }}
    />
  );
};

/// Assets
const IconETH = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24.002"
      viewBox="0 0 24 24.002"
      width="24"
    >
      <path d="m0 .003h24v24h-24z" fill="none" />
      <path
        d="m23.64 14.905a12 12 0 1 1 -8.74-14.545 12 12 0 0 1 8.74 14.545z"
        fill="#fff"
        transform="translate(0 -.001)"
      />
      <g transform="translate(6.858 3.628)">
        <path
          d="m383.612 0-.112.382v11.075l.112.112 5.141-3.039z"
          fill="#343434"
          transform="translate(-378.471)"
        />
        <path d="m5.141 0-5.141 8.53 5.141 3.039z" fill="#8c8c8c" />
        <path
          d="m387.3 727.927-.063.077v3.945l.063.185 5.144-7.245z"
          fill="#3c3c3b"
          transform="translate(-382.162 -715.385)"
        />
        <path
          d="m5.141 732.135v-4.207l-5.141-3.038z"
          fill="#8c8c8c"
          transform="translate(0 -715.385)"
        />
        <path
          d="m392.07 477.706 5.141-3.039-5.141-2.337z"
          fill="#141414"
          transform="translate(-386.929 -466.137)"
        />
        <path
          d="m0 474.667 5.141 3.039v-5.376z"
          fill="#393939"
          transform="translate(0 -466.137)"
        />
      </g>
    </svg>
  );
};

const IconZLP = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      viewBox="0 0 100 100"
      fill="none"
    >
      <g clip-path="url(#clip0_252_8935)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M50 88C70.9868 88 88 70.9868 88 50C88 29.0132 70.9868 12 50 12C29.0132 12 12 29.0132 12 50C12 70.9868 29.0132 88 50 88ZM80 65.8182L50 88L20 65.8182V27L35 38.0909V57.5L50 68.5909L65 57.5V38.0909L80 27V65.8182ZM50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM50 24L60 41.5L50 59L40 41.5L50 24Z"
          fill="#ADADAD"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M50 88C70.9868 88 88 70.9868 88 50C88 29.0132 70.9868 12 50 12C29.0132 12 12 29.0132 12 50C12 70.9868 29.0132 88 50 88ZM80 65.8182L50 88L20 65.8182V27L35 38.0909V57.5L50 68.5909L65 57.5V38.0909L80 27V65.8182ZM50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM50 24L60 41.5L50 59L40 41.5L50 24Z"
          fill="url(#paint0_linear_252_8935)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_252_8935"
          x1="80"
          y1="8.7"
          x2="22.5"
          y2="91"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.296875" stop-color="#43F574" />
          <stop offset="1" stop-color="#2F0461" />
        </linearGradient>
        <clipPath id="clip0_252_8935">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const LogoZkEra = () => {
  return (
    <svg
      width="85"
      height="31"
      viewBox="0 0 85 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_257_433)">
        <path d="M14 14V0.5L11 10L6 14H14Z" fill="#ADADAD" />
        <path
          d="M14 14V0.5L11 10L6 14H14Z"
          fill="url(#paint0_linear_257_433)"
        />
        <path d="M16 16.5V29.5L19 20.5L24 16.5H16Z" fill="#ADADAD" />
        <path
          d="M16 16.5V29.5L19 20.5L24 16.5H16Z"
          fill="url(#paint1_linear_257_433)"
        />
        <path d="M19 11L16 0.5L17 13L24 14L19 11Z" fill="#ADADAD" />
        <path
          d="M19 11L16 0.5L17 13L24 14L19 11Z"
          fill="url(#paint2_linear_257_433)"
        />
        <path
          d="M11 19L14 29.5L13 17L6 16L11 19Z"
          fill="url(#paint3_linear_257_433)"
        />
      </g>
      <g clip-path="url(#clip1_257_433)">
        <path
          d="M36.3401 13.583H32.2106V10.8296H39.7884V13.4361L35.2402 21.3072H39.7884V24.0606H32V21.454L36.3401 13.583Z"
          fill="white"
        />
        <path
          d="M45.3402 15.7735H45.3897L48.1865 10.7341H51.9692L48.7736 16.0451L52.6455 24.0631H48.8628L46.2469 19.031L45.3402 20.2009V24.0631H41.9043V10.7341H45.3402V15.7735Z"
          fill="white"
        />
        <path
          d="M75.0168 14.5669C75.0168 13.7959 75.1407 13.1522 75.3909 12.6358C75.6411 12.1194 75.9755 11.7009 76.3991 11.3827C76.8228 11.0621 77.3206 10.8345 77.8929 10.695C78.4651 10.5555 79.0746 10.4869 79.7235 10.4869C80.7516 10.4869 81.5814 10.5848 82.2131 10.7831C82.8448 10.9789 83.3329 11.2579 83.6821 11.6201C84.0315 11.9799 84.2668 12.4106 84.3906 12.9124C84.5145 13.4117 84.5765 13.9575 84.5765 14.5473V21.5079C84.5765 22.132 84.6061 22.6142 84.6632 22.9593C84.7201 23.3043 84.834 23.6739 85 24.0655H81.7153C81.5988 23.8526 81.5121 23.6274 81.4526 23.39C81.3932 23.1526 81.3412 22.9201 81.2916 22.69H81.2421C80.8433 23.3778 80.3825 23.8256 79.8598 24.0312C79.3371 24.2368 78.6608 24.3396 77.831 24.3396C77.2339 24.3396 76.7261 24.2368 76.3124 24.0312C75.8962 23.8256 75.5668 23.5442 75.3166 23.1819C75.0688 22.8222 74.8855 22.4159 74.7691 21.9655C74.6527 21.5152 74.5957 21.0674 74.5957 20.6244C74.5957 20.0027 74.6626 19.4642 74.7939 19.0139C74.9277 18.5635 75.1308 18.1769 75.4033 17.8587C75.6783 17.5381 76.025 17.2738 76.4487 17.0584C76.8722 16.8455 77.3826 16.657 77.9796 16.493L79.9218 15.9767C80.437 15.8444 80.7937 15.6658 80.9919 15.4357C81.1901 15.2057 81.2916 14.8704 81.2916 14.4274C81.2916 13.9183 81.1702 13.5218 80.93 13.2354C80.6897 12.9491 80.2785 12.8047 79.6988 12.8047C79.1686 12.8047 78.7698 12.9613 78.5048 13.2722C78.2397 13.583 78.1059 14.0015 78.1059 14.5253V14.8948H75.0194V14.5742L75.0168 14.5669ZM80.5436 17.8758C80.2785 17.9836 80.0381 18.0594 79.8226 18.1084C79.1266 18.2552 78.6286 18.5024 78.3289 18.8451C78.0291 19.1902 77.8805 19.6576 77.8805 20.2474C77.8805 20.7565 77.9796 21.1897 78.1802 21.552C78.3784 21.9117 78.7104 22.0928 79.1761 22.0928C79.409 22.0928 79.6492 22.0562 79.8969 21.9827C80.1446 21.9093 80.3726 21.7894 80.5807 21.6254C80.7887 21.4614 80.9572 21.2485 81.091 20.9865C81.2247 20.7247 81.2891 20.4139 81.2891 20.0517V17.4451C81.0563 17.6262 80.8086 17.7682 80.5436 17.8758Z"
          fill="white"
        />
        <path
          d="M72.2823 10.4845V10.5016C71.715 10.5555 71.222 10.7415 70.8058 11.0621C70.3079 11.4488 69.8843 11.9603 69.535 12.5991H69.4855V10.8271H66.1982V24.0581H69.6341V16.1162C69.6341 15.6732 69.7084 15.3011 69.8571 14.9976C70.0057 14.6941 70.2063 14.4494 70.454 14.2609C70.7018 14.0725 70.9768 13.9379 71.2765 13.8547C71.554 13.7788 71.8314 13.7396 72.1089 13.7347V13.7421H73.6794V10.4869H72.2798L72.2823 10.4845Z"
          fill="white"
        />
        <path
          d="M57.4159 21.1232L54.0791 18.2307V23.9535H64.2605V21.1232H57.4159Z"
          fill="white"
        />
        <path
          d="M54.0791 6.5V9.33029H57.6636H64.0103V6.5H54.0791Z"
          fill="white"
        />
        <path
          d="M54.2031 11.2171V16.4061H57.7876H63.7602V13.5757H57.5399L54.2031 11.2171Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_257_433"
          x1="10"
          y1="0.5"
          x2="10"
          y2="30.3929"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.343851" stop-color="#43F574" />
          <stop offset="1" stop-color="#2F0461" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_257_433"
          x1="13"
          y1="32.5"
          x2="26.9531"
          y2="12.6162"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2F0461" />
          <stop offset="0.730907" stop-color="#43F574" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_257_433"
          x1="20"
          y1="0.5"
          x2="20"
          y2="30.3929"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.353222" stop-color="#43F574" />
          <stop offset="1" stop-color="#2F0461" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_257_433"
          x1="12"
          y1="30"
          x2="19"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2F0461" />
          <stop offset="0.964704" stop-color="#43F574" />
        </linearGradient>
        <clipPath id="clip0_257_433">
          <rect y="0.5" width="30" height="30" rx="15" fill="white" />
        </clipPath>
        <clipPath id="clip1_257_433">
          <rect
            width="53"
            height="18"
            fill="white"
            transform="translate(32 6.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

// PYTH

const PYTH_CONFIG = {
  [ZKSYNC_MAINNET]: {
    PythEndpoint: "https://xc-mainnet.pyth.network",
    EthPriceFeedId:
      "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    UsdcPriceFeedId:
      "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
    BtcPriceFeedId:
      "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  },
  [ZKSYNC_TESTNET]: {
    PythEndpoint: "https://hermes-beta.pyth.network", // https://xc-testnet.pyth.network
    EthPriceFeedId:
      "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
    UsdcPriceFeedId:
      "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
    BtcPriceFeedId:
      "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
  },
  [GOERLI]: {
    PythEndpoint: "https://hermes-beta.pyth.network",
    EthPriceFeedId:
      "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
    UsdcPriceFeedId:
      "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
    BtcPriceFeedId:
      "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
  },
  [BSC_TESTNET]: {
    PythEndpoint: "https://hermes-beta.pyth.network",
    EthPriceFeedId:
      "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
    UsdcPriceFeedId:
      "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
    BtcPriceFeedId:
      "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
  },
};

/// CONSTANTS

const ZKSYNC_MAINNET = 324;
const ZKSYNC_TESTNET = 280;
const ZKSYNC_MAINNET_CHAIN_ID_HEX = "0x144";
const ZKSYNC_TESTNET_CHAIN_ID_HEX = "0x118";
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const USD_DECIMALS = 30;

const CONFIG = {
  [ZKSYNC_MAINNET]: {
    CHAIN_ID: ZKSYNC_MAINNET,
    GMX_PRICE_ORACLE_URL: "https://arbitrum-api.gmxinfra.io",
    GMX_ROUTER_ADDRESS: "0x7C68C7866A64FA2160F78EEaE12217FFbf871fa8",
    ETH_ORDERVAULT_ADDRESS: "0x31eF83a530Fde1B38EE9A18093A333D8Bbbc40D5",
    WETH_TOKEN_ADDRESS: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    GMX_MARKET_TOKEN_ADDRESS: "0x70d95587d40A2caf56bd97485aB3Eec10Bee6336",
    SWAP_PATH: ["0x70d95587d40A2caf56bd97485aB3Eec10Bee6336"],
    NETWORK_INFO: {
      blockExplorerUrls: ["https://explorer.zksync.io/"],
      iconUrls: ["https://zksync.io/favicon-32x32.png"],
      rpcUrls: ["https://mainnet.era.zksync.io"],
      chainId: ZKSYNC_MAINNET_CHAIN_ID_HEX,
      chainName: "zkSync Era Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
    },
  },
  [ZKSYNC_TESTNET]: {
    CHAIN_ID: ZKSYNC_TESTNET,
    GMX_PRICE_ORACLE_URL:
      "https://gmx-synthetics-api-arb-goerli-4vgxk.ondigitalocean.app",
    GMX_ROUTER_ADDRESS: "0xFE98518C9c8F1c5a216E999816c2dE3199f295D2",
    ETH_ORDERVAULT_ADDRESS: "0x82aFd2590814a7Ce3d7ea6b63F80481F8b227bA9",
    WETH_TOKEN_ADDRESS: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    GMX_MARKET_TOKEN_ADDRESS: "0x1529876A9348D61C6c4a3EEe1fe6CbF1117Ca315",
    SWAP_PATH: [
      "0x72349b00768601D9598084220224948CE5b6Ebdd",
      "0xbdf85AaF3c63CcE42ee2f18d75f9fd8Aca4D5923",
      "0x1012DAa9ee5C90136FD3e105b63094Aa81a0A64C",
    ],
    NETWORK_INFO: {
      blockExplorerUrls: ["https://goerli.explorer.zksync.io/"],
      iconUrls: ["https://zksync.io/favicon-32x32.png"],
      rpcUrls: ["https://testnet.era.zksync.dev"],
      chainId: ZKSYNC_TESTNET_CHAIN_ID_HEX,
      chainName: "zkSync Era Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
    },
  },
};

// TOKENS

const TOKENS = {
  [ZKSYNC_MAINNET]: [
    {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000000",
      isNative: true,
      coingeckoUrl: "https://www.coingecko.com/en/coins/ethereum",
      imageUrl:
        "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      isTrading: "PYTH:ETHUSD",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
      isStable: true,
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      imageUrl:
        "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    },
    {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      decimals: 8,
      address: "0xBBeB516fb02a01611cBBE0453Fe3c580D7281011",
      coingeckoUrl: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      imageUrl:
        "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744",
      isTrading: "PYTH:BTCUSD",
    },
  ],
  [ZKSYNC_TESTNET]: [
    {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000000",
      isNative: true,
      coingeckoUrl: "https://www.coingecko.com/en/coins/ethereum",
      zkSyncUrl: "https://assets.zksync.io/era/favicon.svg",
      imageUrl:
        "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
      isTrading: "PYTH:ETHUSD",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xbb30022950dc346136b4286628C1a6bcf93C1AAb",
      isStable: true,
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      zkSyncUrl: "https://assets.zksync.io/era/favicon.svg",
      imageUrl:
        "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    },
    {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      decimals: 8,
      address: "0x5796F3E984eCF25C2Da3601D27830fA6131Cfded",
      coingeckoUrl: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      imageUrl:
        "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744",
      isTrading: "PYTH:BTCUSD",
    },
  ],
};

// CONTRACTS

const CONTRACTS = {
  [ZKSYNC_MAINNET]: {
    RewardRouter: "0xf05bd35Ab2Ce4Ab1639D5a895B6E5563c7c6d254",
    ZKE: "0x7b3e1236c39ddD2e61cF6Da6ac6D11193238ccB0",
    EsZKE: "0xa27f240028de1af4c08fbd220f310ea5769aE3aD",
    ZLP: "0x9e5a36eE37925325FEf6FF62171Cd675c0F9fDc2",
    StakedZkeTracker: "0xA258D1CfeCaDD96C763dfa50284525f1529cfB35",
    StakedZlpTracker: "0xB13a8400e0a75aDa3d6393CedbD7f6AC723Ac6Da",
    ZKEVester: "0x2F71B856E99C36eAF6daBece012e857741255536",
    ZLPVester: "0xc157F0732c9d5403d3Ab59Ce2b4b93Eea5d6ccf8",
    BnZKE: "0xb05603B0636DcAb5a025Fa300aA54da9AC9c5191",
    BonusZkeTracker: "0x02C3c24739022135Dd0Bf26E2260C46E8D3faEC0",
    FeeZkeTracker: "0xBD5e034b37c696F3E1E46ab7fb52672fcbFd06fb",
    FeeZlpTracker: "0x2dF5B3bdDf75bF4aE6dd825092f67372f66551cb",
    Reader: "0xb46d1A66941a755649c240D447598BB43F1c3514",
    RewardReader: "0x7e94820D7a4161c5d2F79D6A0Bd32B6B307432a1",
    ZLPManager: "0x76FC5695b0D310151f9c9363C537a7456Cb114b5",
    Vault: "0xBC918775C20959332c503d51a9251C2405d9cF88",
    NativeToken: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
    StakedZkeDistributor: "0xDa6f18361088F8250Fd8F391519666D7Ff0b0491",
    StakedZlpDistributor: "0x07E96A6259EDf90325d0DbaD95a853f3652ed4f0",
    USDG: "0x5f90c37eC885fca36fBBd035650eb6B3DF10c55c",
    PositionRouter: "0x33d339e9922cc296Cbc52BB8BEd1165ab628Bc06",
    Router: "0x086Ba5bE16Ce53Ce8a9FDCd9C16735569FC07E99",
    OrderBook: "0xFd262bE6BA3D5144ea2BFdDB26fDFC630c72387e",
    OrderBookReader: "0x0eFE2191A99042C9676442F3e74D194d8f723025",
    USDC: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    Pyth: "0xf087c864AEccFb6A2Bf1Af6A0382B0d0f6c5D834",
    PythReader: "0x439B5A74C44E33f2C95fe77F8330496cC1a4a676",
    WBTC: "0xBBeB516fb02a01611cBBE0453Fe3c580D7281011",
  },
  [ZKSYNC_TESTNET]: {
    RewardRouter: "0xC16d813fA94526a40160893002A03d4BbC70FaB7",
    ZKE: "0x5ef18ab13506Fbdbe9470c61A4A3c226A3F90baC",
    EsZKE: "0x7BA5fb8970228d344e4dD96600A1bEfE9Ba377C7",
    ZLP: "0x58E0E14E4E5F909C07b39CaE8C2d226550e99Ba1",
    StakedZkeTracker: "0x3FBC6FB8D2D78C442bd6E5DF993920F431996a40",
    StakedZlpTracker: "0x2ae067eEDB90738072bbE71b07DA6932ffDB253C",
    ZKEVester: "0x1EE061702D70a6e1b7E053d8DAd3eAdFeA42188E",
    ZLPVester: "0x8305adb48392B62A2693687023455736d64EbD9E",
    BnZKE: "0x6202fd4Bbb5F073ACc740aCA7580b11Be03FFe63",
    BonusZkeTracker: "0x061854e75da80aF0670BdC2b40532309c3e2335f",
    FeeZkeTracker: "0x9bd1c38bc5A8e68304789176876Acaa9Cd98AC7c",
    FeeZlpTracker: "0x99F3251beF877EF2a11c29b943534940f074493d",
    Reader: "0x45F4d76009D8C89bA688329145E89364300b19bb",
    RewardReader: "0xC8bfc1559afc3e27b747a88D3a83C5D29519CFF2",
    ZLPManager: "0x0c22158E9D537b2ad8E2F7BA177c4ff06c7B88E8",
    Vault: "0xaB597d260C868770867A2d1dBb960075C291aF7F",
    NativeToken: "0xc023d6bAE4DbA3E2cB0575be2A5C2Ba6571DFfcf",
    StakedZkeDistributor: "0xc853C98dc75De47dDc7a1885857c3B38dB7fB8e4",
    StakedZlpDistributor: "0x52D20584b3FcD3076A28ee1c03de8c58B00de8a7",
    USDG: "0xaAEfAC305118Bbe4292d534f96DF12431318353D",
    PositionRouter: "0xbf46e3D1005f19c3428EC132ebDEc5975CB0DF69",
    Router: "0x50B0f4f4DAaF18b43Def9EA5E176C1652DE52843",
    OrderBook: "0x7e43226C7C71f9399E8f9f387cE53B2D700b4FbB",
    OrderBookReader: "0x29Bd88b6827c683cD583FFd7a3339Ab8e9C4Dd18",
    USDC: "0xbb30022950dc346136b4286628C1a6bcf93C1AAb",
    Pyth: "0xC38B1dd611889Abc95d4E0a472A667c3671c08DE",
    PythReader: "0x84476f650B7C5e06cDa8E7eCc85aC3ccd6fDa8A1",
    WBTC: "0x5796F3E984eCF25C2Da3601D27830fA6131Cfded",
  },
};

/// UTILS

function formatUsd(num) {
  return num / Math.pow(10, 12);
}

function getTokens(chainId) {
  if (!chainId) chainId = ZKSYNC_MAINNET;
  return TOKENS[chainId];
}

function getContract(chainId, name) {
  if (!chainId) chainId = ZKSYNC_MAINNET;
  return CONTRACTS[chainId][name];
}

// calculate price with slippage of 0.5%
function calculatePriceWithSlippage() {
  if (isLong) {
    return ethers.BigNumber.from(maxPrice).mul(1010).div(1000);
  } else {
    return ethers.BigNumber.from(minPrice).mul(990).div(1000);
  }
}

// STATE

State.init({
  payAmount: "",
  payTokenData: undefined,
  isLong: true,
  sender: undefined,
  balance: undefined,
  network: undefined,
  chainId: undefined,
  showSettings: false,
  tokenBalances: undefined,
});
const {
  payAmount,
  payTokenData,
  isLong,
  sender,
  balance,
  network,
  chainId,
  showSettings,
  tokenBalances,
} = state;

// RECONNECT TO WALLET
if (sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
}

// CONNECTION

function getConfig(chainId, name) {
  if (!chainId) {
    chainId = 280;
  }
  return PYTH_CONFIG[chainId][name];
}

function getEndpointEvmPriceService(chainId) {
  return getConfig(chainId, "PythEndpoint");
}

// const connection = new EvmPriceServiceConnection(
//   getEndpointEvmPriceService(chainId)
// );

// FETCH ABI

const readerAbiResponse = fetch(
  "https://gist.githubusercontent.com/af4n/e1b6c199110dd1885107cadb02563fc0/raw/c809ee9754a20bc4b6542cfd27ef54f278bb87e5/reader.json"
);

if (!readerAbiResponse.ok) "Loading ABI...";

const readerAbi = readerAbiResponse.body;

// DATA

const tokens = getTokens(chainId);
const tokenAddresses = tokens.map((token) => token.address);

const readerAddress = getContract(chainId, "Reader");

const contract = new ethers.Contract(
  readerAddress,
  readerAbi,
  Ethers.provider().getSigner()
);

contract
  .getTokenBalances(sender, tokenAddresses, {
    value: 0,
  })
  .then((result) => {
    State.update({ tokenBalances: result });
  });

console.log("tokenBalances", tokenBalances);

const { maxPrice, minPrice, tokenSymbol } = payTokenData;

const currentConfig = CONFIG[chainId] || CONFIG[ZKSYNC_TESTNET];

const entryPrice = payTokenData && formatUsd(isLong ? maxPrice : minPrice);
const entryPriceDisplay =
  entryPrice &&
  "$" +
    entryPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

const payValue = payAmount && payAmount * entryPrice;
const payValueDisplay =
  payValue > 0 &&
  ": $" +
    payValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

const receiveAmount = payAmount && payAmount * 1;

// FETCH DATA
const gmxPriceOracleResponse = fetch(
  currentConfig.GMX_PRICE_ORACLE_URL + "/prices/tickers"
);
if (!gmxPriceOracleResponse.ok) {
  throw new Error("Error fetching ETH price.");
}
const gmxPriceData = gmxPriceOracleResponse.body;
const ethTokenData = gmxPriceData.find((item) => item.tokenSymbol === "ETH");
State.update({
  payTokenData: ethTokenData,
});

const primaryButtonText =
  chainId === "unsupported"
    ? "Switch network"
    : payAmount <= 0
    ? "Enter an amount"
    : Number(payAmount) > Number(balance)
    ? "Insufficient ETH balance"
    : isLong
    ? "Long ETH"
    : "Short ETH";
const primaryButtonDisabled =
  chainId === "unsupported"
    ? false
    : Number(payAmount) > Number(balance) || payAmount <= 0;

// FETCH WALLET BALANCE
if (sender && balance === undefined) {
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(12) });
    });

  Ethers.provider()
    .getNetwork()
    .then((network) => {
      if (network.chainId === ZKSYNC_MAINNET) {
        State.update({ chainId: network.chainId });
      } else if (network.chainId === ZKSYNC_TESTNET) {
        State.update({ chainId: network.chainId });
      } else {
        State.update({ chainId: "unsupported" });
      }
    });
}

/// FUNCTIONS
function multicall(calls, value) {
  const gmxRouterContract = new ethers.Contract(
    currentConfig.GMX_ROUTER_ADDRESS,
    GMX_ROUTER_ABI,
    Ethers.provider().getSigner()
  );
  const encodedCalls = calls.map((call) =>
    gmxRouterContract.interface.encodeFunctionData(call.method, call.params)
  );
  return gmxRouterContract["multicall"](encodedCalls, { value: value });
}

/// HANDLERS

function handleClickSubmitOrder() {
  const sizeDeltaUsd = 1;

  const calls = [
    {
      method: "sendWnt",
      params: [
        currentConfig.ETH_ORDERVAULT_ADDRESS,
        ethers.utils.parseUnits(payAmount, 18),
      ],
    },
    {
      method: "createOrder",
      params: [
        {
          addresses: {
            receiver: sender,
            initialCollateralToken: currentConfig.WETH_TOKEN_ADDRESS,
            callbackContract: ADDRESS_ZERO,
            market: currentConfig.GMX_MARKET_TOKEN_ADDRESS,
            swapPath: currentConfig.SWAP_PATH,
            uiFeeReceiver: ADDRESS_ZERO,
          },
          numbers: {
            sizeDeltaUsd: sizeDeltaUsd,
            initialCollateralDeltaAmount: {
              type: "BigNumber",
              hex: "0x00",
            },
            triggerPrice: {
              type: "BigNumber",
              hex: "0x00",
            },
            acceptablePrice: {
              type: "BigNumber",
              hex: "0x00",
            },
            executionFee: {
              type: "BigNumber",
              hex: "0x02ee5547f09000",
            },
            callbackGasLimit: {
              type: "BigNumber",
              hex: "0x00",
            },
            minOutputAmount: {
              type: "BigNumber",
              hex: "0x00",
            },
          },
          orderType: 2,
          decreasePositionSwapType: 0,
          isLong: isLong,
          shouldUnwrapNativeToken: true,
          referralCode:
            "0x0000000000000000000000000000000000000000000000000000000000000000",
        },
      ],
    },
  ];

  multicall(calls, ethers.utils.parseUnits(payAmount, 18));
}

function handleClickMax() {
  State.update({
    payAmount: (balance * 0.95).toFixed(4) || "0.0",
  });
}

function handleClickSwitchNetwork(chainId) {
  const chainIdHex = CONFIG[chainId].NETWORK_INFO.chainId;
  try {
    Ethers.send("wallet_switchEthereumChain", [{ chainId: chainIdHex }]);
  } catch (e) {
    console.log("error switching network", e);
  }
  try {
    Ethers.send("wallet_addEthereumChain", [CONFIG[chainId].NETWORK_INFO]);
  } catch (e) {
    console.log("error adding new network", e);
  }
}

function handleChangePayAmount(e) {
  if (e.target.value === "." && !payAmount) {
    State.update({
      payAmount: "0.",
    });
  }
  if (isNaN(e.target.value)) {
    return;
  }

  State.update({
    payAmount: e.target.value,
  });
}

return (
  <DaisyUIWrapper>
    <div class="card max-w-2xl mx-auto bg-gray-900 text-white">
      <div class="px-4 pt-4">
        <div class="relative flex justify-center">
          <LogoZkEra />
          {chainId && (
            <button
              class="btn btn-xs btn-outline absolute right-0 top-0 text-white hover:bg-gray-900"
              style={{ "border-color": "#43f574" }}
              onClick={() => {
                State.update({ showSettings: !state.showSettings });
              }}
            >
              {chainId === "unsupported"
                ? "Unsupported network"
                : CONFIG[chainId].NETWORK_INFO.chainName}
            </button>
          )}

          {/* settings menu */}
          {state.showSettings && (
            <div class="absolute right-0 top-8 bg-gray-900 rounded p-3">
              <div class="flex flex-col gap-2">
                <button
                  class={`btn btn-xs btn-outline${
                    chainId === ZKSYNC_MAINNET ? " pointer-events-none" : ""
                  }`}
                  onClick={() => {
                    chainId === ZKSYNC_MAINNET
                      ? State.update({ showSettings: false })
                      : handleClickSwitchNetwork(chainId);
                  }}
                >
                  {CONFIG[chainId].NETWORK_INFO.chainName}
                </button>
                <button
                  class={`btn btn-xs btn-outline${
                    chainId === ZKSYNC_TESTNET ? " pointer-events-none" : ""
                  }`}
                  onClick={() => {
                    chainId === ZKSYNC_TESTNET
                      ? State.update({ showSettings: false })
                      : handleClickSwitchNetwork(chainId);
                  }}
                >
                  {CONFIG[chainId].NETWORK_INFO.chainName}
                </button>
              </div>
            </div>
          )}
        </div>

        <label class="label">
          <span class="label-text text-lg text-white">Buy ZLP</span>
        </label>

        <div class="bg-gray-800 rounded p-2 mb-2">
          <label class="label pl-4">
            <span class="label-text text-gray-400">Pay{payValueDisplay}</span>
            <span class="label-text text-gray-400">
              Balance:
              <span class="text-white">{Number(balance || 0).toFixed(4)}</span>
            </span>
          </label>
          <div class="flex">
            <input
              class="input w-full bg-gray-800 text-2xl focus:outline-none"
              onChange={(e) => handleChangePayAmount(e)}
              value={payAmount}
              placeholder="0.0"
            />
            <div class="flex items-center space-x-1">
              {balance > 0 && (
                <button
                  style={{ background: "#43f574" }}
                  class="btn btn-sm border-none font-normal rounded-4 px-2 mx-1 hover:bg-green-600 focus:bg-green-600 text-black"
                  onClick={handleClickMax}
                >
                  MAX
                </button>
              )}
              <IconETH />
              <select class="select-ghost bg-gray-800 text-2xl">
                {tokens.map((token) => (
                  <option>{token.symbol}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded p-2">
          <label class="label pl-4 pr-2">
            <span class="label-text text-gray-400">Receive</span>
            <span class="label-text">
              <span class="label-text text-gray-400">
                Balance:
                <span class="text-white">0.0000</span>
              </span>
            </span>
          </label>
          <div class="flex">
            <input
              class="input w-full bg-gray-800 text-2xl focus:outline-none"
              value={receiveAmount && `~${receiveAmount}`}
              placeholder="0.0"
            />
            <div class="flex items-center space-x-1 ">
              <IconZLP />
              <span class="text-2xl pl-1 pr-2">ZLP</span>
            </div>
          </div>
        </div>

        <label class="label pt-3">
          <span class="label-text text-gray-400">Fees</span>
          <span class="label-text">-</span>
        </label>
      </div>

      <div class="px-4 pb-4">
        {sender ? (
          <button
            style={{ background: "#43f574" }}
            class={`btn w-full hover:bg-green-600 focus:bg-green-600 mt-2 text-black ${
              primaryButtonDisabled && "cursor-not-allowed"
            }`}
            onClick={
              chainId === "unsupported"
                ? () => handleClickSwitchNetwork(ZKSYNC_TESTNET)
                : !primaryButtonDisabled && handleClickSubmitOrder
            }
          >
            {primaryButtonText}
          </button>
        ) : (
          <button
            disabled={sender && payAmount <= 0}
            style={{ background: "#43f574" }}
            class="relative btn w-full hover:bg-green-600 focus:bg-green-600 mt-2 text-black"
          >
            Connect Wallet
            <Web3Connect
              className="opacity-0 absolute w-full h-full"
              connectLabel="Connect with Web3"
            />
          </button>
        )}
      </div>
    </div>
  </DaisyUIWrapper>
);
