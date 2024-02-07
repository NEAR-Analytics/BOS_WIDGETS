const Layout = styled.div`
  background: #1e202e;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 728px) {
    padding-bottom: 80px;
  }

  .flex-grow {
    flex-grow: 1;
  }
  .contentOut {
    width: 100%;
  }
  .contentOut p {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #ffffff;
  }
  @media (max-width: 728px) {
    display: grid;
    .contentOut {
      padding: 0;
      margin: 0 0 36px 0;
    }
    .contentOut p {
      display: none;
    }
  }
`;

const ContainerToast = styled.div`
  .ToastViewport {
    --viewport-padding: 25px;
    position: fixed;
    bottom: 0;
    right: left;
    display: flex;
    flex-direction: column;
    padding: var(--viewport-padding);
    gap: 10px;
    width: 390px;
    max-width: 100vw;
    margin: 0;
    list-style: none;
    z-index: 2147483647;
    outline: none;
  }

  .ToastRoot {
    background-color: #323345;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    padding: 15px;
    display: grid;
    grid-template-areas: "title action" "description action";
    grid-template-columns: auto max-content;
    column-gap: 15px;
    align-items: center;
  }
  .ToastRoot[data-state="open"] {
    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ToastRoot[data-state="closed"] {
    animation: hide 100ms ease-in;
  }
  .ToastRoot[data-swipe="move"] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }
  .ToastRoot[data-swipe="cancel"] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }
  .ToastRoot[data-swipe="end"] {
    animation: swipeOut 100ms ease-out;
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(calc(100% + var(--viewport-padding)));
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes swipeOut {
    from {
      transform: translateX(var(--radix-toast-swipe-end-x));
    }
    to {
      transform: translateX(calc(100% + var(--viewport-padding)));
    }
  }

  .ToastTitle {
    display: flex;
    align-items: center;
    gap: 10px;
    grid-area: title;
    margin-bottom: 5px;
    font-weight: 500;
    color: white;
    font-size: 15px;
  }

  .ToastDescription {
    grid-area: description;
    margin-left: 5px;
    color: #888baf;
    font-size: 14px;
    line-height: 20px;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  .IconButton {
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .ToastAction {
    grid-area: action;
  }

  .Button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-weight: 500;
  }
  .Button.small {
    font-size: 12px;
    padding: 0 10px;
    line-height: 25px;
    height: 25px;
  }
  .Button.large {
    font-size: 15px;
    padding: 0 15px;
    line-height: 35px;
    height: 35px;
  }

  .toast-close-button {
    background: none;
    border: none;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .toast-close-button span {
    display: inline-block;
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
`;

const MenuContainer = styled.div`
  margin-right: 35px;
  display: flex;
  justify-content: flex-end;

  .alignCenter {
    display: flex;
    align-items: center;

    @media (max-width: 728px) {
      display: none;
    }
  }

  .connectWallet {
    background-color: #00ec97;
    display: flex;
    color: #373a53;
    border: none;
    border-radius: 4px;
    &:hover,
    &:focus {
      opacity: 0.8;
      background-color: #00ec97;
      color: #373a53;
      border: none;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 728px) {
      display: none;
    }
  }

  .switchWallet {
    background-color: #00ec97;
    display: flex;
    color: #373a53;
    border: none;
    border-radius: 4px;
    padding: 6px;
    &:hover,
    &:focus {
      opacity: 0.8;
      background-color: #00ec97;
      color: #373a53;
      border: none;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 728px) {
      display: none;
    }
  }
  .switchButton {
    display: none;
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;
    border: none;
    background: #4a4e67;
    width: 100%;
    border-radius: 8px;
    height: 50px;
    text-align: center;
    &:hover,
    &:focus {
      opacity: 0.8;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 728px) {
      display: flex;
      align-self: center;
      align-items: center;
      justify-content: center;
      margin-top: 5px;
    }
  }

  .connectWalletContainer {
    display: flex;

    .connectWallet2 {
      display: none;
      font-weight: 500;
      font-size: 18px;
      color: #ffffff;
      cursor: pointer;
      border: none;
      background: #4a4e67;
      width: 100%;
      height: 50px;

      &:hover,
      &:focus {
        opacity: 0.8;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      @media (max-width: 728px) {
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
      }
    }
  }

  .item,
  .connectTab {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 40px;
    width: 180px;
    height: 64px;
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;
    margin-bottom: 2px;
    border-right: "none";
    transition: 0.5s;
    border-radius: 16px;
    transition: opacity 0.3s ease;
    :hover {
      opacity: 0.7;
    }
  }
  .item.active,
  .connectTab.active {
    text-decoration: underline;
  }
  .item.disable,
  .connectTab.disable {
    cursor: not-allowed;
  }
  .iconWallet {
    display: none;
    width: 24px;
    margin-right: 10px;
    @media (max-width: 728px) {
      display: flex;
    }
  }
  .icon {
    width: 24px;
    margin-right: 10px;
  }

  @media (max-width: 728px) {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    background: #222436;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 0 16px;

    .item,
    .connectTab {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: auto;
      padding: 0;
      height: 76px;
      text-align: center;
      align-items: center;
    }
    .item.active,
    .connectTab.active {
      background-image: none;
      border-color: transparent;
    }
    .connectTab {
      display: flex;
    }
    .alignCenter {
      display: flex;
    }
  }
`;

const ContainerConnect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding: 36px;
  margin-top: 30px;

  @media (max-width: 728px) {
    margin-top: 20px;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .image {
    width: 100%;
    height: 650px;
    @media (max-width: 728px) {
      display: none;
    }
  }
  .connectWallet {
    background-color: #00ec97;
    display: flex;
    color: #373a53;
    border: none;
    border-radius: 4px;
    min-width: 470px;
    align-items: center;
    justify-content: center;
    text-align: center;
    &:hover,
    &:focus {
      opacity: 0.8;
      background-color: #00ec97;
      color: #373a53;
      border: none;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 728px) {
      min-width: 100%;
    }
  }
`;

const Title = styled.span`
  color: white;
  font-size: 28px;
  font-weight: 700;
`;

const ConnectContainer = styled.div`
  background-color: #373a53;
  border-radius: 24px;
  display: flex;
  heigh: 150px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  text-align: center;
`;

const ConnectSubTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #888baf;
  margin-bottom: 20px;
`;

const ConnectButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #0f3460;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e94560;
  }
`;

const ConnectWallet = () => {
  return (
    <ContainerConnect>
      <ConnectContainer>
        <Title>CONNECT WALLET</Title>
        <ConnectSubTitle>
          You must be connected to see Dashboard & Markets information!
        </ConnectSubTitle>
        <Web3Connect
          className="connectWallet"
          connectLabel="Connect Wallet"
          disconnectLabel="Disconnect Wallet"
          connectingLabel="Connecting..."
        />
      </ConnectContainer>

      <img
        className="image"
        src="https://pali-images.s3.amazonaws.com/files/lock_bos.png"
      />
    </ContainerConnect>
  );
};

const activeMenu =
  Storage.privateGet("zksyncCachedActiveMenu") || props.defaultTab || "Markets";

function changeTab(menu) {
  Storage.privateSet("zksyncCachedActiveMenu", menu);
}

// DETECT SENDER

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

const {
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  WalletIcon,
  MarketsIcon,
  MarketsDisabledIcon,
  DashboardIcon,
  DashboardDisabledIcon,
  bridgeIcon,
} = VM.require("thalesb.near/widget/Icons");

const [open, setOpen] = useState(false);
const [toasts, setToasts] = useState([]);

const [items, setItems] = useState({
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
});

//TODO: adicionar outros assets
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

const activeTab = Storage.privateGet("activeTab");

const [selectedItem, setSelectedItem] = useState(
  activeTab ? activeTab : items.ethereum[0]
); // Default to the first item

/**
 * Adds a new toast to the list of toasts.
 * @param {string} message - The message content of the toast.
 * @param {string} type - The type of the toast.
 */
const addToast = (message, type) => {
  const newToast = { id: Date.now(), message, type };
  setToasts((prevToasts) => [...prevToasts, newToast]);

  // Automatically remove the toast after a delay
  setTimeout(() => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== newToast.id)
    );
  }, 5000);
};

/**
 * Switches the network based on the provided network name.
 * @param {string} networkName - The name of the network to switch to.
 */
const switchNetwork = (networkName) => {
  let params = {};

  if (networkName === "Ethereum") {
    params = {
      chainId: "0x1",
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://ethereum.publicnode.com"],
      blockExplorerUrls: ["https://etherscan.io"],
    };
  } else if (networkName === "Polygon") {
    params = {
      chainId: "0x89",
      chainName: "Matic Mainnet",
      nativeCurrency: {
        name: "Matic",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com"],
      blockExplorerUrls: ["https://explorer.matic.network/"],
    };
  } else if (networkName === "Base") {
    params = {
      chainId: "0x2105",
      chainName: "Base Mainnet",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.base.org"],
      blockExplorerUrls: ["https://basescan.org/"],
    };
  } else if (networkName === "Arbitrum") {
    params = {
      chainId: "0xa4b1",
      chainName: "Arbitrum One",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://arbitrum-mainnet.infura.io"],
      blockExplorerUrls: ["https://explorer.arbitrum.io"],
    };
  }
  Ethers.send("wallet_addEthereumChain", [params]);
};

/**
 * Updates the selected item in the network.
 *
 * @param {string} network - The network name.
 * @param {number} index - The index of the selected item.
 */
const updateSelectedItem = (network, index) => {
  const selectedNetwork = items[network.toLowerCase()][index];
  Storage.privateSet("activeTab", selectedNetwork);
  setSelectedItem(selectedNetwork);
  switchNetwork(network);
};

return (
  <Layout key="TabComponent">
    <Container>
      <MenuContainer>
        <div
          onClick={() => {
            changeTab("Dashboard");
          }}
          className={`item ${activeMenu == "Dashboard" ? "active" : ""}`}
        >
          <span className="icon">
            {activeMenu === "Dashboard" ? DashboardIcon : DashboardDisabledIcon}
          </span>
          Dashboard
        </div>
        <div className={`connectWalletContainer`}>
          {state.chainId !== undefined &&
          state.chainId !== selectedItem.chainId ? (
            <div
              className="switchButton"
              onClick={() => switchNetwork(selectedItem.network)}
            >
              Switch Network
            </div>
          ) : (
            <Web3Connect
              network={137}
              className="connectWallet2"
              connectLabel="Connect"
              disconnectLabel="Disconnect"
              connectingLabel="Connecting..."
            />
          )}
        </div>
        <div
          onClick={() => {
            changeTab("Markets");
          }}
          className={`item ${activeMenu == "Markets" ? "active" : ""}`}
        >
          <span className="icon">
            {activeMenu === "Dashboard" ? MarketsDisabledIcon : MarketsIcon}
          </span>
          Markets
        </div>

        <div className="alignCenter">
          {state.chainId !== undefined &&
          state.chainId !== selectedItem.chainId ? (
            <button
              className="switchWallet"
              onClick={() => switchNetwork(selectedItem.network)}
            >
              Switch to {selectedItem.network}
            </button>
          ) : (
            <Web3Connect
              className="connectWallet"
              connectLabel="Connect Wallet"
              disconnectLabel="Disconnect Wallet"
              connectingLabel="Connecting..."
            />
          )}
        </div>
      </MenuContainer>
      <div className="contentOut flex-grow">
        <>
          {activeMenu == "Dashboard" ? (
            <>
              {!!state.sender ? (
                <Widget
                  props={{
                    addToast: addToast,
                    address: state.sender,
                    selectedItem: selectedItem,
                    updateSelectedItem: updateSelectedItem,
                    switchNetwork: switchNetwork,
                  }}
                  src="thalesb.near/widget/DashboardLayout"
                />
              ) : (
                <ConnectWallet />
              )}
            </>
          ) : null}
          {activeMenu == "Markets" ? (
            <Widget
              props={{
                contracts: marketsContracts,
              }}
              src="thalesb.near/widget/CompoundMarkets"
            />
          ) : null}
        </>
      </div>
    </Container>
    <ContainerToast>
      <Toast.Provider swipeDirection="right">
        {toasts.map((toast) => (
          <Toast.Root key={toast.id} className="ToastRoot" open={true}>
            <Toast.Title className="ToastTitle">
              {toast.type === "error" ? (
                <ErrorIcon />
              ) : toast.type === "warning" ? (
                <WarningIcon />
              ) : (
                <SuccessIcon />
              )}
              {toast.type === "error"
                ? "Error"
                : toast.type === "warning"
                ? "Warning"
                : "Success"}
            </Toast.Title>
            <Toast.Description className="ToastDescription">
              {toast.message}
            </Toast.Description>
            <Toast.Close
              className="toast-close-button"
              aria-label="Close"
              onClick={() =>
                setToasts((currentToasts) =>
                  currentToasts.filter((t) => t.id !== toast.id)
                )
              }
            >
              <span aria-hidden>×</span>
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </ContainerToast>
  </Layout>
);
