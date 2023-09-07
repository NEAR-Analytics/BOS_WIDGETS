const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  gap: 8px;
  .invalid-pool-tip {
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: center;
    color: #ff61d3;
    padding-bottom: 5px;
  }
  .dapp-list-title {
    font-family: Gantari;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    text-align: left;
    color: #00ffe0;
    padding-left: 4px;
    padding-bottom: 8px;
  }

  @media (max-width: 900px) {
    .select-dex-title {
      display: none;
    }
    padding-top: 0px;
    flex-direction: column;

    .dapp-list-title {
      font-family: Gantari;
      font-size: 15px;
      font-weight: 500;
      line-height: 22px;
      text-align: left;
      color: #00ffe0;
      padding-left: 4px;
      padding-bottom: 4px;
    }
  }

  .frcs {
    display: flex;
    align-items: start;
    justify-content: center;
  }

  .frcc {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .frcb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rate {
    color: #4f7375;
    font-family: Gantari;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: right;
    padding: 16px 0px 20px 0px;
  }
`;

const DappList = styled.div`
  border-radius: 16px;
  padding: 16px;
  z-index: 10;
  font-size: 18px;
  width: 251px;
  height: 292px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: linear-gradient(0deg, #181a27, #181a27),
    linear-gradient(0deg, #2c4a4b, #2c4a4b);
  border: 1px solid #2c4a4b;
  overflow: hidden;

  @media (max-width: 900px) {
    border: none;
    background: none;
    height: auto;
    flex-direction: row;
    overflow: auto;
    width: 100%;
    padding: 8px;
  }
`;

const exchangeIcon = (
  <svg
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_142_586" fill="white">
      <path d="M5.79546 15.303L5.79546 0.173912C5.79546 0.127788 5.7775 0.0835524 5.74553 0.0509374C5.71356 0.0183224 5.67021 -4.01692e-07 5.625 -4.09794e-07L4.34591 -4.65705e-07C4.25318 -4.69758e-07 4.17682 0.0779124 4.17682 0.173912L4.17682 13.3301L0.276822 10.1941C0.251562 10.1742 0.221368 10.1619 0.189626 10.1585C0.157884 10.1551 0.125848 10.1608 0.0971074 10.175C0.0683675 10.1891 0.0440593 10.2112 0.0269084 10.2386C0.00975659 10.2661 0.000440147 10.2979 2.40947e-06 10.3304L2.34056e-06 11.9068C-0.000173138 11.9595 0.0113978 12.0116 0.0338406 12.059C0.0562825 12.1065 0.0890097 12.1482 0.129548 12.1809L4.69227 15.8497C4.79285 15.9304 4.91363 15.9806 5.04083 15.9945C5.16802 16.0084 5.29649 15.9856 5.41156 15.9286C5.52663 15.8715 5.62365 15.7826 5.69154 15.672C5.75942 15.5614 5.79543 15.4335 5.79546 15.303ZM10.8245 15.8261L10.8245 2.6713L14.7232 5.8087C14.7486 5.82874 14.7791 5.8411 14.811 5.84437C14.843 5.84764 14.8753 5.84169 14.9041 5.82719C14.9329 5.8127 14.9572 5.79025 14.9742 5.76238C14.9911 5.73452 15.0001 5.70236 15 5.66957L15 4.09322C15.0002 4.0405 14.9886 3.98844 14.9662 3.94095C14.9437 3.89347 14.911 3.85181 14.8705 3.81913L10.3077 0.15026C10.2072 0.0696705 10.0866 0.0195196 9.95951 0.00552893C9.83244 -0.00846178 9.70407 0.0142711 9.58905 0.0711344C9.47403 0.127998 9.37699 0.216701 9.30901 0.327126C9.24102 0.43755 9.20482 0.565248 9.20455 0.695652L9.20455 15.8261C9.20455 15.8722 9.2225 15.9164 9.25447 15.9491C9.28644 15.9817 9.32979 16 9.375 16L10.6541 16C10.6993 16 10.7427 15.9817 10.7746 15.9491C10.8066 15.9164 10.8245 15.8722 10.8245 15.8261Z" />
    </mask>
    <path
      d="M5.79546 15.303L7.79546 15.3033L7.79546 15.303L5.79546 15.303ZM5.625 -4.09794e-07L5.625 -2L5.625 -4.09794e-07ZM4.17682 0.173912L2.17682 0.173912L2.17682 0.173912L4.17682 0.173912ZM4.17682 13.3301L2.92353 14.8887L6.17682 17.5047L6.17682 13.3301L4.17682 13.3301ZM0.276822 10.1941L1.53011 8.63547L1.52238 8.62926L1.51459 8.62312L0.276822 10.1941ZM2.40947e-06 10.3304L-1.99982 10.3036L-2 10.317L-2 10.3304L2.40947e-06 10.3304ZM2.34056e-06 11.9068L2 11.9134L2 11.9068L2.34056e-06 11.9068ZM0.129548 12.1809L-1.12575 13.7379L-1.12373 13.7395L0.129548 12.1809ZM4.69227 15.8497L3.43899 17.4084L3.44095 17.4099L4.69227 15.8497ZM10.8245 15.8261L12.8245 15.8261L10.8245 15.8261ZM10.8245 2.6713L12.0784 1.11318L8.82454 -1.50536L8.82454 2.6713L10.8245 2.6713ZM14.7232 5.8087L13.4693 7.36682L13.4774 7.37335L13.4856 7.3798L14.7232 5.8087ZM15 5.66957L13 5.66957L13 5.6737L15 5.66957ZM15 4.09322L13 4.08656L13 4.09322L15 4.09322ZM14.8705 3.81913L16.1258 2.26214L16.1237 2.26051L14.8705 3.81913ZM10.3077 0.15026L11.561 -1.40836L11.5591 -1.40993L10.3077 0.15026ZM9.20455 0.695652L7.20455 0.691386L7.20455 0.695652L9.20455 0.695652ZM9.20455 15.8261L7.20455 15.8261L9.20455 15.8261ZM9.375 16L9.375 18L9.375 16ZM7.79546 15.303L7.79546 0.173913L3.79546 0.173912L3.79546 15.303L7.79546 15.303ZM7.79546 0.173913C7.79546 -0.389833 7.57634 -0.938374 7.17388 -1.349L4.31719 1.45088C3.97866 1.10548 3.79546 0.645409 3.79546 0.173912L7.79546 0.173913ZM7.17388 -1.349C6.77007 -1.761 6.21375 -2 5.625 -2L5.625 2C5.12667 2 4.65706 1.79765 4.31719 1.45088L7.17388 -1.349ZM5.625 -2L4.34591 -2L4.34591 2L5.625 2L5.625 -2ZM4.34591 -2C3.10061 -2 2.17682 -0.978034 2.17682 0.173912L6.17682 0.173913C6.17682 1.13386 5.40576 2 4.34591 2L4.34591 -2ZM2.17682 0.173912L2.17682 13.3301L6.17682 13.3301L6.17682 0.173912L2.17682 0.173912ZM5.43011 11.7715L1.53011 8.63547L-0.976464 11.7527L2.92353 14.8887L5.43011 11.7715ZM1.51459 8.62312C1.19575 8.3719 0.81045 8.21324 0.401238 8.1697L-0.0219846 12.1473C-0.367714 12.1105 -0.692624 11.9765 -0.96095 11.765L1.51459 8.62312ZM0.401238 8.1697C-0.008098 8.12615 -0.419804 8.20012 -0.786616 8.3808L0.980831 11.9691C0.6715 12.1215 0.323866 12.184 -0.0219846 12.1473L0.401238 8.1697ZM-0.786616 8.3808C-1.15304 8.56128 -1.45725 8.83947 -1.66941 9.17913L1.72322 11.2981C1.54537 11.5829 1.28977 11.817 0.980831 11.9691L-0.786616 8.3808ZM-1.66941 9.17913C-1.88134 9.51845 -1.9945 9.90773 -1.99982 10.3036L1.99982 10.3573C1.99538 10.688 1.90085 11.0137 1.72322 11.2981L-1.66941 9.17913ZM-2 10.3304L-2 11.9068L2 11.9068L2 10.3304L-2 10.3304ZM-1.99999 11.9001C-2.00115 12.2495 -1.92455 12.5959 -1.77436 12.9137L1.84204 11.2044C1.94735 11.4272 2.0008 11.6695 1.99999 11.9134L-1.99999 11.9001ZM-1.77436 12.9137C-1.62412 13.2316 -1.4033 13.5141 -1.12575 13.7379L1.38485 10.6239C1.58132 10.7823 1.73668 10.9815 1.84204 11.2044L-1.77436 12.9137ZM-1.12373 13.7395L3.43899 17.4084L5.94555 14.2911L1.38283 10.6222L-1.12373 13.7395ZM3.44095 17.4099C3.83591 17.7267 4.31456 17.9269 4.82297 17.9826L5.25869 14.0064C5.5127 14.0342 5.74978 14.1341 5.9436 14.2895L3.44095 17.4099ZM4.82297 17.9826C5.33148 18.0383 5.84363 17.9466 6.29973 17.7205L4.52339 14.1366C4.74936 14.0246 5.00456 13.9786 5.25869 14.0064L4.82297 17.9826ZM6.29973 17.7205C6.75544 17.4947 7.13388 17.1455 7.39618 16.718L3.98689 14.626C4.11342 14.4198 4.29781 14.2484 4.52339 14.1366L6.29973 17.7205ZM7.39618 16.718C7.65827 16.2909 7.79537 15.8008 7.79546 15.3033L3.79546 15.3026C3.7955 15.0662 3.86057 14.8318 3.98689 14.626L7.39618 16.718ZM12.8245 15.8261L12.8245 2.6713L8.82454 2.6713L8.82454 15.8261L12.8245 15.8261ZM9.57066 4.22943L13.4693 7.36682L15.9771 4.25057L12.0784 1.11318L9.57066 4.22943ZM13.4856 7.3798C13.8067 7.63278 14.1953 7.79183 14.6076 7.83399L15.0145 3.85474C15.3629 3.89036 15.6905 4.0247 15.9608 4.23759L13.4856 7.3798ZM14.6076 7.83399C15.0201 7.87617 15.4344 7.79907 15.8023 7.61418L14.006 4.04021C14.3161 3.8843 14.6659 3.8191 15.0145 3.85474L14.6076 7.83399ZM15.8023 7.61418C16.1697 7.42949 16.4733 7.14628 16.6828 6.80183L13.2655 4.72294C13.4411 4.43421 13.6962 4.19591 14.006 4.04021L15.8023 7.61418ZM16.6828 6.80183C16.8922 6.45771 17.0008 6.06412 17 5.66543L13 5.6737C12.9993 5.3406 13.0901 5.01133 13.2655 4.72294L16.6828 6.80183ZM17 5.66957L17 4.09322L13 4.09322L13 5.66957L17 5.66957ZM17 4.09987C17.0011 3.75052 16.9246 3.40408 16.7744 3.08632L13.158 4.79559C13.0527 4.57279 12.9992 4.33048 13 4.08656L17 4.09987ZM16.7744 3.08632C16.6241 2.76842 16.4033 2.4859 16.1257 2.26214L13.6152 5.37612C13.4187 5.21773 13.2633 5.01852 13.158 4.79559L16.7744 3.08632ZM16.1237 2.26051L11.561 -1.40836L9.05445 1.70888L13.6172 5.37775L16.1237 2.26051ZM11.5591 -1.40993C11.1644 -1.72642 10.6863 -1.92654 10.1784 -1.98246L9.74064 1.99352C9.48688 1.96558 9.25005 1.86576 9.0564 1.71045L11.5591 -1.40993ZM10.1784 -1.98246C9.67036 -2.03839 9.15862 -1.94713 8.70269 -1.72173L10.4754 1.864C10.2495 1.97568 9.99452 2.02147 9.74064 1.99352L10.1784 -1.98246ZM8.70269 -1.72173C8.24716 -1.49652 7.86863 -1.14813 7.60592 -0.721441L11.0121 1.37569C10.8854 1.58153 10.7009 1.75252 10.4754 1.864L8.70269 -1.72173ZM7.60592 -0.721441C7.34342 -0.295086 7.20561 0.194361 7.20455 0.691386L11.2045 0.699918C11.204 0.936136 11.1386 1.17019 11.0121 1.37569L7.60592 -0.721441ZM7.20455 0.695652L7.20455 15.8261L11.2045 15.8261L11.2045 0.695652L7.20455 0.695652ZM7.20455 15.8261C7.20455 16.3898 7.42364 16.9384 7.82612 17.349L10.6828 14.5491C11.0214 14.8945 11.2045 15.3546 11.2045 15.8261L7.20455 15.8261ZM7.82612 17.349C8.22992 17.761 8.78624 18 9.375 18L9.375 14C9.87334 14 10.3429 14.2024 10.6828 14.5491L7.82612 17.349ZM9.375 18L10.6541 18L10.6541 14L9.375 14L9.375 18ZM10.6541 18C11.2428 18 11.7992 17.761 12.203 17.349L9.34627 14.5491C9.68614 14.2024 10.1557 14 10.6541 14L10.6541 18ZM12.203 17.349C12.6054 16.9384 12.8245 16.3898 12.8245 15.8261L8.82454 15.8261C8.82454 15.3546 9.00773 14.8945 9.34627 14.5491L12.203 17.349Z"
      fill="#13DDC8"
      mask="url(#path-1-inside-1_142_586)"
    />
  </svg>
);

const DappListWrapper = styled.div`
  .dapp-list-title {
    font-family: Gantari;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    text-align: left;
    color: #00ffe0;
    padding-left: 4px;
    padding-bottom: 4px;
  }
`;

const DappItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 12px;
  width: 100%;
  border-radius: 12px;
  opacity: 0.5;
  cursor: pointer;

  @media (max-width: 900px) {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  img {
    border: 1px solid #007777;
    padding: 4px;
    background: linear-gradient(0deg, #000000, #000000);
    height: 30px;
    width: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .network-name {
    font-family: Gantari;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;

    @media (max-width: 900px) {
      white-space: nowrap;
      font-size: 15px;
    }
  }
  .network-dex {
    font-family: Gantari;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    @media (max-width: 900px) {
      white-space: nowrap;
      font-size: 13px;
    }
  }

  &:hover {
    background: #00ffe0;
    opacity: 1;
    .network-name {
      color: black;
    }
    .network-dex {
      color: black;
    }
  }
`;

const SwapContainer = styled.div`
  width: 560px;
  /* min-height: 466px; */
  border-radius: 16px;
  border: 1px solid #2c4a4b;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 900px) {
    width: 100%;

    padding: 18px 14px;
  }

  .swap-direction {
    color: #ccdfdd;
    font-family: Gantari;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

const Erc20Abi = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const MANTLE_MAINNET_CHAIN_ID = 5000;

const MAINTLE_NAME = "Mantle";

const defaultDex = "Agni Finance";

const sender = Ethers.send("eth_requestAccounts", [])[0];

const Button = styled.div`
  background: #00ffe0;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  color: #0f1126;
  cursor: pointer;
  font-weight: 500;

  @media (max-width: 900px) {
    height: 40px;
  }
`;

const config = {
  dapps: [
    {
      name: "Agni Finance",
      factory: "0x25780dc8Fc3cfBD75F33bFDAB65e969b603b2035",
      swapRouter: "0x319B69888b0d11cEC22caA5034e25FfFBDc88421",
      quoter: "0x9488C05a7b75a6FefdcAE4f11a33467bcBA60177",
      iconSrc:
        "https://ipfs.near.social/ipfs/bafkreihkerekcdjd3cgxzklknlx6ai7zxil24sdcji6fahtlpueqsids6u",
    },
    {
      name: "FusionX V3",
      factory: "0x530d2766D1988CC1c000C8b7d00334c14B69AD71",
      swapRouter: "0x5989FB161568b9F133eDf5Cf6787f5597762797F",
      quoter: "0x90f72244294E7c5028aFd6a96E18CC2c1E913995",
      iconSrc:
        "https://ipfs.near.social/ipfs/bafkreifiphkr4bvatimqrz2lty4fgygb2awpvbcsri2bny23w47dactnly",
    },
    {
      name: "iZiSwap",
      quoter: "0x032b241De86a8660f1Ae0691a4760B426EA246d7",
      swapRouter: "0x25C030116Feb2E7BbA054b9de0915E5F51b03e31",
      iconSrc:
        "https://ipfs.near.social/ipfs/bafkreifsgwu2zd6y2n5alekr5qgdhzoivlkl5wujtq3z7gnm5pw4jy7sgi",
    },
    {
      name: "Ammos Finance",
      factory: "0x636eA278699A300d3A849aB2cE36c891C4eE3Da0",
      swapRouter: "0xBa68D459210Fc667a97245F71719a479CAFeB571",
      quoter: "0x42cE770b8B765938De04984e006c1B54F1A567f8",
      iconSrc:
        "https://ipfs.near.social/ipfs/bafkreicwvufboezdhcjnvmwmy5ctbd7d4zimdivuaawn5g3bs2hxb567ra",
    },
  ],
  tokens: [
    {
      address: "0x0000000000000000000000000000000000000000",
      chainId: MANTLE_MAINNET_CHAIN_ID,
      symbol: "MNT",
      decimals: 18,
      icon: "https://assets.coingecko.com/coins/images/30980/small/token-logo.png?1689320029",
      onDexes: ["Agni Finance", "FusionX V3", "iZiSwap", "Ammos Finance"],
    },
    {
      address: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
      chainId: MANTLE_MAINNET_CHAIN_ID,
      symbol: "USDC",
      decimals: 6,
      icon: "https://ethereum-optimism.github.io/data/USDC/logo.png",
      onDexes: ["Agni Finance", "FusionX V3", "iZiSwap", "Ammos Finance"],
    },
    {
      address: "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",
      chainId: MANTLE_MAINNET_CHAIN_ID,
      symbol: "USDT",
      decimals: 6,
      icon: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
      onDexes: ["Agni Finance", "FusionX V3", "iZiSwap", "Ammos Finance"],
    },
    {
      address: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
      chainId: MANTLE_MAINNET_CHAIN_ID,
      symbol: "WETH",
      decimals: 18,
      icon: "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
      onDexes: ["Agni Finance", "FusionX V3", "iZiSwap", "Ammos Finance"],
    },
    {
      address: "0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2",
      chainId: MANTLE_MAINNET_CHAIN_ID,
      symbol: "WBTC",
      decimals: 8,
      icon: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
      onDexes: ["FusionX V3", "iZiSwap", "Ammos Finance"],
    },

    {
      address: "0xAfAF32C57659BC9992b43bc6840A9d997632a0F5",
      chainId: MANTLE_MAINNET_CHAIN_ID,
      symbol: "DAI",
      decimals: 18,
      icon: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508",
      onDexes: ["Ammos Finance"],
    },
    {
      address: "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8",
      chainId: MANTLE_MAINNET_CHAIN_ID,
      symbol: "WMNT",
      decimals: 18,
      icon: "https://assets.coingecko.com/coins/images/30983/small/mantle.jpeg?1689416644",
      onDexes: ["FusionX V3", "iZiSwap", "Ammos Finance"],
    },
  ],
  defaultDex,
  MAINTLE_NAME,
  MANTLE_MAINNET_CHAIN_ID,
  NATIVE_TOKEN_SYMBOL: "MNT",
  WRAP_NATIVE_TOKEN_SYMBOL: "WMNT",
  WRAP_NATIVE_TOKEN_ADDRESS: "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8",
};

const defaultTokenIn = config.tokens[0];

const defaultTokenOut = config.tokens[1];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ selectedChainId: chainId });
    })
    .catch(() => {});
  State.update({ sender });
}

State.init({
  selectedDex: defaultDex,
  tokenIn: defaultTokenIn,
  tokenOut: defaultTokenOut,
  tokenInAmount: "1",
  tokenInAmountDebounce: "1",
  hasPool: true,
  tokenInBalance: "",
  tokenOutBalance,
});

if (
  state.tokenIn &&
  state.tokenOut &&
  !state.tokenIn.onDexes.includes(state.selectedDex) &&
  !state.tokenOut.onDexes.includes(state.selectedDex)
) {
  const newTokenIn = config.tokens.find((token) => {
    return (
      token.onDexes.includes(state.selectedDex) &&
      token.symbol !== state.tokenOut.symbol
    );
  });

  const newTokenOut = config.tokens.find((token) => {
    return (
      token.onDexes.includes(state.selectedDex) &&
      token.symbol !== newTokenIn.symbol
    );
  });

  State.update({
    tokenIn: newTokenIn,
    tokenOut: newTokenOut,
  });
}

if (
  state.tokenIn &&
  state.tokenOut &&
  !state.tokenIn.onDexes.includes(state.selectedDex)
) {
  const newTokenIn = config.tokens.find((token) => {
    return (
      token.onDexes.includes(state.selectedDex) &&
      token.symbol !== state.tokenOut.symbol
    );
  });

  State.update({
    tokenIn: newTokenIn,
  });
}

if (
  state.tokenIn &&
  state.tokenOut &&
  !state.tokenOut.onDexes.includes(state.selectedDex)
) {
  const newTokenOut = config.tokens.find((token) => {
    return (
      token.onDexes.includes(state.selectedDex) &&
      token.symbol !== state.tokenIn.symbol
    );
  });

  State.update({
    tokenOut: newTokenOut,
  });
}

const selectedDex = state.selectedDex;

const switchNetwork = (chainId, dex) => {
  Ethers.send("wallet_switchEthereumChain", [
    { chainId: `0x${chainId.toString(16)}` },
  ]);

  State.update({
    selectedDex: dex,
    tokenIn: state.tokenIn || defaultTokenIn,
    tokenOut: state.tokenOut || defaultTokenOut,
    tokenInAmount: "1",
    tokenInAmountDebounce: "1",
  });
};

const DappSelector = config.dapps.map((dapp) => {
  const light = selectedDex === dapp.name;

  return (
    <DappItem
      onClick={() => {
        switchNetwork(MANTLE_MAINNET_CHAIN_ID, dapp.name ?? "");
      }}
      onMouseEnter={() => {
        State.update({
          hoverOnChain: chainKey,
        });
      }}
      onMouseLeave={() => {
        State.update({
          hoverOnChain: "",
        });
      }}
      key={chainKey}
      style={{
        background: light ? "#00FFE0" : "",
        opacity: light ? 1 : "",
      }}
    >
      <img className="" src={dapp.iconSrc} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: light ? "black" : "white",
          gap: "-4px",
        }}
      >
        <div className="network-name">Mantle</div>

        <div className="network-dex">{dapp.name}</div>
      </div>
    </DappItem>
  );
});

if (!state.sender || state.selectedChainId !== 5000) {
  const title = !state.sender
    ? "Mantle Swap Collection"
    : ` To proceed, kindly switch to Mantle.`;

  if (!!state.sender && state.selectedChainId !== 5000) {
    switchNetwork(5000, defaultDex);
  }

  return (
    <Widget
      src="guessme.near/widget/ZKEVMSwap.zkevm-connect"
      props={{
        title: title,
        src: "https://ipfs.near.social/ipfs/bafkreiajvwzt4jfhveovrctyojmcabm5x2nkpho6n2mrlg4c5b6nht3v3a",
        imgStyle: {
          width: "538px",
          height: "203px",
        },
      }}
    />
  );
}
const signer = Ethers.provider().getSigner();

const onChangePair = () => {
  State.update({
    tokenIn: state.tokenOut,
    tokenOut: state.tokenIn,
    tokenInAmount: "1",
    tokenInAmountDebounce: "1",
  });
};

function debounce(fn, wait) {
  let timer = state.timer;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, wait);
    State.update({ timer });
  };
}

const onChangeDebounceAmount = () => {
  State.update({
    tokenInAmountDebounce: state.tokenInAmount,
  });
};

const debounceAmountQuote = debounce(onChangeDebounceAmount, 500);

const loadApprove = (data) => {
  State.update({
    isApproved: data.isApproved,
    handleApprove: data.handleApprove,
  });
};

const onButtonClick = () => {
  if (!state.isApproved) {
    return state.handleApprove(state.tokenInAmount, tokenIn.decimals);
  } else {
    return state.swapCaller(state.fee);
  }
};

const canSwap =
  !!state.sender &&
  Number(state.tokenInAmount || 0) > 0 &&
  Number(state.tokenInBalance || "0") > Number(state.tokenInAmount || 0) > 0 &&
  state.tokenOut.address !== state.tokenIn.address;

const insufficientBalance =
  state.tokenInBalance !== "" &&
  Number(state.tokenInBalance || 0) < Number(state.tokenInAmount || 0) &&
  state.tokenIn.address !== state.tokenOut.address &&
  !!state.sender &&
  Number(state.tokenInAmount || 0) > 0;

return (
  <Wrapper>
    <div>
      <div className="dapp-list-title">Chain & Dapp</div>

      <DappList>{DappSelector}</DappList>
    </div>

    <div>
      <div className="dapp-list-title select-dex-title">
        {state.selectedDex}
      </div>

      <SwapContainer>
        <div className="swap-direction">Swap From</div>

        <Widget
          src="bluebiu.near/widget/Mantle.TokenInput"
          props={{
            ...state,
            curToken: state.tokenIn,
            amount: state.tokenInAmount || "",
            config,
            onTokenSelect: (token) => {
              State.update({
                tokenIn: token,
              });
            },
            onChangeAmount: (amount) => {
              const targetValue = amount;
              if (targetValue !== "" && !targetValue.match(/^\d*(\.\d*)?$/)) {
                return;
              }

              let tokenInAmount = targetValue.replace(/^0+/, "0"); // remove prefix 0

              State.update({
                tokenInAmount: tokenInAmount,
              });

              debounceAmountQuote();
            },
            loadInputBalance: (balance) => {
              State.update({
                tokenInBalance: balance,
              });
            },
          }}
        />

        <div
          className="frcc"
          style={{
            padding: "10px",
          }}
        >
          <div
            onClick={onChangePair}
            style={{
              cursor: "pointer",
            }}
          >
            {exchangeIcon}
          </div>
        </div>

        <div className="swap-direction">To</div>

        <Widget
          src="bluebiu.near/widget/Mantle.TokenInput"
          props={{
            ...state,
            curToken: state.tokenOut,
            config,
            amount: state.tokenOutAmount || "",
            readOnly: true,
            onTokenSelect: (token) => {
              State.update({
                tokenOut: token,
              });
            },
          }}
        />

        <div className="rate">
          {`1${state.tokenIn.symbol}≈${
            !state.tokenInAmount ||
            Number(state.tokenInAmount) === 0 ||
            !state.tokenOutAmount ||
            !state.hasPool
              ? "-"
              : Big(state.tokenOutAmount || "0")
                  .div(Big(state.tokenInAmount))
                  .toFixed(6)
          }${state.tokenOut.symbol}`}
        </div>

        {!state.hasPool &&
          state.tokenIn.address !== state.tokenOut.address &&
          !!state.quoteDone && (
            <div className="invalid-pool-tip">
              {`No pool available to make a swap from ${state.tokenIn.symbol}-> ${state.tokenOut.symbol} for the amount ${state.tokenInAmount}`}
            </div>
          )}

        <Button
          className="frcc"
          onClick={() => {
            if (insufficientBalance) return;

            onButtonClick();
          }}
          disable={insufficientBalance}
          style={{
            background: insufficientBalance ? "#FF61D3" : "#00ffe0",
            cursor: insufficientBalance ? "not-allowed" : "pointer",
            opacity: insufficientBalance ? 0.5 : 1,
          }}
        >
          {insufficientBalance
            ? "Insufficient Balance"
            : !state.isApproved
            ? "Approve"
            : "Swap"}
        </Button>
      </SwapContainer>
    </div>

    <Widget
      src="bluebiu.near/widget/Mantle.Quoter"
      props={{
        amountIn: state.tokenInAmountDebounce,
        tokenIn:
          state.tokenIn.symbol === config.NATIVE_TOKEN_SYMBOL
            ? config.tokens.find(
                (token) => token.symbol === config.WRAP_NATIVE_TOKEN_SYMBOL
              )
            : state.tokenIn,
        tokenOut:
          state.tokenOut.symbol === config.NATIVE_TOKEN_SYMBOL
            ? config.tokens.find(
                (token) => token.symbol === config.WRAP_NATIVE_TOKEN_SYMBOL
              )
            : state.tokenOut,
        config,
        selectedDex: state.selectedDex,
        loadAmountOut: (data) => {
          State.update({
            tokenOutAmount: data.amountOut,
            fee: data.fee,
            hasPool: data.success,
            quoteDone: data.quoteDone,
            quoting: data.quoting,
          });
        },
      }}
    />

    <Widget
      src="bluebiu.near/widget/Mantle.CheckApprove"
      props={{
        amountIn: state.tokenInAmount,
        tokenIn: state.tokenIn,
        tokenOut: state.tokenOut,
        config,
        selectedDex: state.selectedDex,
        sender: state.sender,
        forceReload: state.forceReload,
        outAllowance: state.isApproved,
        loadApprove: (data) =>
          State.update({
            isApproved: data.isApproved,
            handleApprove: data.handleApprove,
          }),
      }}
    />

    <Widget
      src="bluebiu.near/widget/Mantle.SwapCaller"
      props={{
        amountIn: state.tokenInAmount,
        tokenIn: state.tokenIn,
        tokenOut: state.tokenOut,
        config,
        selectedDex: state.selectedDex,
        sender: state.sender,
        onSwapCallBack: () => {
          State.update({
            forceReload: !state.forceReload,
          });
        },
        onLoadSwapCall: ({ callSwap }) => {
          State.update({
            swapCaller: callSwap,
          });
        },
      }}
    />
  </Wrapper>
);
