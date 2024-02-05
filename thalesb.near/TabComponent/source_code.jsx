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
    /* padding-top: 25px;
    margin-left: 35px; */
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
    border-radius:8px;
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

const Container1 = styled.div`
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
    <Container1>
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
    </Container1>
  );
};

const activeMenu =
  Storage.privateGet("zksyncCachedActiveMenu") || props.defaultTab || "Markets";

function changeTab(menu) {
  Storage.privateSet("zksyncCachedActiveMenu", menu);
}

const bridgeIcon = (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_1328_7364"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="18"
      height="18"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.7684 3.3323C16.5569 2.49226 15.0859 2 13.5 2C9.35786 2 6 5.35786 6 9.5C6 13.6421 9.35786 17 13.5 17C13.9539 17 14.3984 16.9597 14.8302 16.8824C13.3983 17.5946 11.7518 18 10 18C4.47715 18 0 13.9706 0 9C0 4.02944 4.47715 0 10 0C13.1361 0 15.935 1.29925 17.7684 3.3323Z"
        fill="currentColor"
      />
    </mask>
    <g mask="url(#mask0_1328_7364)">
      <rect width="19" height="11" fill="currentColor" />
    </g>
    <mask
      id="mask1_1328_7364"
      maskUnits="userSpaceOnUse"
      x="8"
      y="4"
      width="11"
      height="13"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.99975 5.42751C9.28439 5.37792 9.5772 5.35206 9.87604 5.35206C12.6763 5.35206 14.9463 7.62209 14.9463 10.4223C14.9463 13.1425 12.8042 15.3623 10.1149 15.487C10.9532 15.9225 11.9057 16.1686 12.9157 16.1686C16.276 16.1686 19 13.4446 19 10.0843C19 6.72403 16.276 4 12.9157 4C11.4242 4 10.058 4.5367 8.99975 5.42751Z"
        fill="currentColor"
      />
    </mask>
    <g mask="url(#mask1_1328_7364)">
      <rect
        width="9.99974"
        height="6.66649"
        transform="matrix(-1 0 0 1 19 4)"
        fill="currentColor"
      />
    </g>
  </svg>
);

const WalletIcon = (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="react-icons/bi/BiWallet">
      <path id="Vector" d="M16 12H18V16H16V12Z" fill="#888BAF" />
      <path
        id="Vector_2"
        d="M20 7V5C20 3.897 19.103 3 18 3H5C3.346 3 2 4.346 2 6V18C2 20.201 3.794 21 5 21H20C21.103 21 22 20.103 22 19V9C22 7.897 21.103 7 20 7ZM5 5H18V7H5C4.74252 6.98848 4.49941 6.87809 4.32128 6.69182C4.14315 6.50554 4.04373 6.25774 4.04373 6C4.04373 5.74226 4.14315 5.49446 4.32128 5.30818C4.49941 5.12191 4.74252 5.01152 5 5ZM20 19H5.012C4.55 18.988 4 18.805 4 18V8.815C4.314 8.928 4.647 9 5 9H20V19Z"
        fill="#888BAF"
      />
    </g>
  </svg>
);

const MarketsIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="heroicons-mini/building-storefront">
      <g id="Union">
        <path
          d="M3.45432 8.54529C4.8602 9.95118 7.1396 9.95118 8.54549 8.54529C8.71825 8.37254 8.86978 8.18659 9.00008 7.99069C9.64505 8.96056 10.7478 9.59975 11.9999 9.59975C13.2521 9.59975 14.355 8.96039 15 7.9903C15.1304 8.18636 15.282 8.37245 15.4549 8.54534C16.8607 9.95122 19.1401 9.95122 20.546 8.54534C21.9519 7.13945 21.9519 4.86006 20.546 3.45417L20.1948 3.10297C19.7447 2.65288 19.1343 2.40002 18.4978 2.40002H5.50253C4.86601 2.40002 4.25556 2.65288 3.80548 3.10297L3.45432 3.45413C2.04843 4.86001 2.04843 7.13941 3.45432 8.54529Z"
          fill="#00FAA0"
        />
        <path
          d="M3.5999 10.8387C5.31349 11.6888 7.38462 11.5728 9.00058 10.4905C9.85789 11.0641 10.8896 11.3997 11.9999 11.3997C13.1103 11.3997 14.1421 11.064 14.9995 10.4903C16.6153 11.5727 18.6863 11.6889 20.3999 10.839V19.8H20.6999C21.197 19.8 21.5999 20.203 21.5999 20.7C21.5999 21.1971 21.197 21.6 20.6999 21.6H15.2999C14.8028 21.6 14.3999 21.1971 14.3999 20.7V16.5C14.3999 16.003 13.997 15.6 13.4999 15.6H10.4999C10.0028 15.6 9.5999 16.003 9.5999 16.5V20.7C9.5999 21.1971 9.19696 21.6 8.6999 21.6H3.2999C2.80285 21.6 2.3999 21.1971 2.3999 20.7C2.3999 20.203 2.80285 19.8 3.2999 19.8H3.5999V10.8387Z"
          fill="#00FAA0"
        />
      </g>
    </g>
  </svg>
);

const MarketsDisabledIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="heroicons-mini/building-storefront">
      <g id="Union">
        <path
          d="M3.45432 8.54529C4.8602 9.95118 7.1396 9.95118 8.54549 8.54529C8.71825 8.37254 8.86978 8.18659 9.00008 7.99069C9.64505 8.96056 10.7478 9.59975 11.9999 9.59975C13.2521 9.59975 14.355 8.96039 15 7.9903C15.1304 8.18636 15.282 8.37245 15.4549 8.54534C16.8607 9.95122 19.1401 9.95122 20.546 8.54534C21.9519 7.13945 21.9519 4.86006 20.546 3.45417L20.1948 3.10297C19.7447 2.65288 19.1343 2.40002 18.4978 2.40002H5.50253C4.86601 2.40002 4.25556 2.65288 3.80548 3.10297L3.45432 3.45413C2.04843 4.86001 2.04843 7.13941 3.45432 8.54529Z"
          fill="#888BAF"
        />
        <path
          d="M3.5999 10.8387C5.31349 11.6888 7.38462 11.5728 9.00058 10.4905C9.85789 11.0641 10.8896 11.3997 11.9999 11.3997C13.1103 11.3997 14.1421 11.064 14.9995 10.4903C16.6153 11.5727 18.6863 11.6889 20.3999 10.839V19.8H20.6999C21.197 19.8 21.5999 20.203 21.5999 20.7C21.5999 21.1971 21.197 21.6 20.6999 21.6H15.2999C14.8028 21.6 14.3999 21.1971 14.3999 20.7V16.5C14.3999 16.003 13.997 15.6 13.4999 15.6H10.4999C10.0028 15.6 9.5999 16.003 9.5999 16.5V20.7C9.5999 21.1971 9.19696 21.6 8.6999 21.6H3.2999C2.80285 21.6 2.3999 21.1971 2.3999 20.7C2.3999 20.203 2.80285 19.8 3.2999 19.8H3.5999V10.8387Z"
          fill="#888BAF"
        />
      </g>
    </g>
  </svg>
);

const DashboardIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.0999 2.40002C3.60873 2.40002 2.3999 3.60886 2.3999 5.10002V8.10002C2.3999 9.59119 3.60873 10.8 5.0999 10.8H8.0999C9.59107 10.8 10.7999 9.59119 10.7999 8.10002V5.10002C10.7999 3.60886 9.59107 2.40002 8.0999 2.40002H5.0999ZM5.0999 13.2C3.60873 13.2 2.3999 14.4089 2.3999 15.9V18.9C2.3999 20.3912 3.60873 21.6 5.0999 21.6H8.0999C9.59107 21.6 10.7999 20.3912 10.7999 18.9V15.9C10.7999 14.4089 9.59107 13.2 8.0999 13.2H5.0999ZM15.8999 2.40002C14.4087 2.40002 13.1999 3.60886 13.1999 5.10002V8.10002C13.1999 9.59119 14.4087 10.8 15.8999 10.8H18.8999C20.3911 10.8 21.5999 9.59119 21.5999 8.10002V5.10002C21.5999 3.60886 20.3911 2.40002 18.8999 2.40002H15.8999ZM15.8999 13.2C14.4087 13.2 13.1999 14.4089 13.1999 15.9V18.9C13.1999 20.3912 14.4087 21.6 15.8999 21.6H18.8999C20.3911 21.6 21.5999 20.3912 21.5999 18.9V15.9C21.5999 14.4089 20.3911 13.2 18.8999 13.2H15.8999Z"
      fill="#00FAA0"
    />
  </svg>
);

const DashboardDisabledIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.0999 2.40002C3.60873 2.40002 2.3999 3.60886 2.3999 5.10002V8.10002C2.3999 9.59119 3.60873 10.8 5.0999 10.8H8.0999C9.59107 10.8 10.7999 9.59119 10.7999 8.10002V5.10002C10.7999 3.60886 9.59107 2.40002 8.0999 2.40002H5.0999ZM5.0999 13.2C3.60873 13.2 2.3999 14.4089 2.3999 15.9V18.9C2.3999 20.3912 3.60873 21.6 5.0999 21.6H8.0999C9.59107 21.6 10.7999 20.3912 10.7999 18.9V15.9C10.7999 14.4089 9.59107 13.2 8.0999 13.2H5.0999ZM15.8999 2.40002C14.4087 2.40002 13.1999 3.60886 13.1999 5.10002V8.10002C13.1999 9.59119 14.4087 10.8 15.8999 10.8H18.8999C20.3911 10.8 21.5999 9.59119 21.5999 8.10002V5.10002C21.5999 3.60886 20.3911 2.40002 18.8999 2.40002H15.8999ZM15.8999 13.2C14.4087 13.2 13.1999 14.4089 13.1999 15.9V18.9C13.1999 20.3912 14.4087 21.6 15.8999 21.6H18.8999C20.3911 21.6 21.5999 20.3912 21.5999 18.9V15.9C21.5999 14.4089 20.3911 13.2 18.8999 13.2H15.8999Z"
      fill="#888BAF"
    />
  </svg>
);

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
const switchNetwork = () => {
  Ethers.send("wallet_addEthereumChain", [
    {
      chainId: "0x89",
      chainName: "Matic Mainnet",
      nativeCurrency: {
        name: "Matic",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
      blockExplorerUrls: ["https://explorer.matic.network/"],
    },
  ]);
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

const ContainerToast = styled.div`
  .ToastViewport {
    --viewport-padding: 25px;
    position: fixed;
    bottom: 0;
    right: 0;
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
    display: flex; /* Use Flexbox */
    align-items: center; /* Vertically center the flex items */
    gap: 10px; /* Space between the flex items */

    /* Keep your previous styles */
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
  .Button.violet {
    background-color: white;
    color: var(--violet-11);
    box-shadow: 0 2px 10px var(--black-a7);
  }
  .Button.violet:hover {
    background-color: var(--mauve-3);
  }

  .Button.violet:focus {
    box-shadow: 0 0 0 2px black;
  }
  .Button.green {
    background-color: var(--green-2);
    color: var(--green-11);
    box-shadow: inset 0 0 0 1px var(--green-7);
  }
  .Button.green:hover {
    box-shadow: inset 0 0 0 1px var(--green-8);
  }
  .Button.green:focus {
    box-shadow: 0 0 0 2px var(--green-8);
  }

  .toast-close-button {
    background: none; /* Remove default button background */
    border: none; /* Remove default button border */
    margin-bottom: 5px;
    cursor: pointer; /* Optional: Ensure it looks clickable */
  }

  /* Style the span inside Toast.Close for the "×" appearance */
  .toast-close-button span {
    display: inline-block;
    color: white; /* Or any color you prefer */
    font-size: 24px; /* Adjust size as needed */
    font-weight: bold; /* Optional: makes the "×" bolder */
  }
`;
const SuccessIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM15.6103 10.1859C15.8511 9.84887 15.773 9.38046 15.4359 9.1397C15.0989 8.89894 14.6305 8.97701 14.3897 9.31407L11.1543 13.8436L9.53033 12.2197C9.23744 11.9268 8.76256 11.9268 8.46967 12.2197C8.17678 12.5126 8.17678 12.9874 8.46967 13.2803L10.7197 15.5303C10.8756 15.6862 11.0921 15.7656 11.3119 15.7474C11.5316 15.7293 11.7322 15.6153 11.8603 15.4359L15.6103 10.1859Z"
      fill="#35CC00"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM10.2803 9.21967C9.98744 8.92678 9.51256 8.92678 9.21967 9.21967C8.92678 9.51256 8.92678 9.98744 9.21967 10.2803L10.9393 12L9.21967 13.7197C8.92678 14.0126 8.92678 14.4874 9.21967 14.7803C9.51256 15.0732 9.98744 15.0732 10.2803 14.7803L12 13.0607L13.7197 14.7803C14.0126 15.0732 14.4874 15.0732 14.7803 14.7803C15.0732 14.4874 15.0732 14.0126 14.7803 13.7197L13.0607 12L14.7803 10.2803C15.0732 9.98744 15.0732 9.51256 14.7803 9.21967C14.4874 8.92678 14.0126 8.92678 13.7197 9.21967L12 10.9393L10.2803 9.21967Z"
      fill="#FF4242"
    />
  </svg>
);

const [open, setOpen] = useState(false);
const [toasts, setToasts] = useState([]);

const [items, setItems] = useState({
  ethereum: [
    {
      name: "USDC",
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      networkImage:
        "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png",
      image:
        "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
      network: "Ethereum",
      contractInfo: {
        network: "Polygon Mainnet",
        address: "0xF25212E676D1F7F89Cd72fFEe66158f541246445",
        chainId: 137,
        httpRpcUrl: "https://polygon-rpc.com/",
        borrowAssetCoingeckoId: "usdc",
      },
      collateralItems: [
        //TODO: O primeiro asset tem que dar uma olhada pq parece que ele usa
        // A funcao de bulk ao inves do contrato...matic, eth.
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
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      networkImage:
        "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png",
      image:
        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      network: "Ethereum",
      contractInfo: {
        network: "Polygon Mainnet",
        address: "0xF25212E676D1F7F89Cd72fFEe66158f541246445",
        chainId: 137,
        httpRpcUrl: "https://polygon-rpc.com/",
        borrowAssetCoingeckoId: "usdc",
      },
      collateralItems: [
        //TODO: O primeiro asset tem que dar uma olhada pq parece que ele usa
        // A funcao de bulk ao inves do contrato...matic, eth.
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
      name: "USDC",
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      networkImage:
        "https://raw.githubusercontent.com/sushiswap/list/master/logos/native-currency-logos/matic.svg",
      image:
        "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
      network: "Polygon",
      contractInfo: {
        network: "Polygon Mainnet",
        address: "0xF25212E676D1F7F89Cd72fFEe66158f541246445",
        chainId: 137,
        httpRpcUrl: "https://polygon-rpc.com/",
        borrowAssetCoingeckoId: "usdc",
      },
      collateralItems: [
        //TODO: O primeiro asset tem que dar uma olhada pq parece que ele usa
        // A funcao de bulk ao inves do contrato...matic, eth.
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
});
const [selectedItem, setSelectedItem] = useState(items.ethereum[0]); // Default to the first item

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

// Function to update the selected item based on a network and an index
const updateSelectedItem = (network, index) => {
  setSelectedItem(items[network.toLowerCase()][index]);
};

return (
  <Layout>
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
          {state.chainId !== undefined && state.chainId !== 137 ? (
            <div className="switchButton" onClick={() => switchNetwork()}>
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
          {state.chainId !== undefined && state.chainId !== 137 ? (
            <button className="switchWallet" onClick={() => switchNetwork()}>
              Switch to Polygon
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
        {!!state.sender ? (
          <>
            {activeMenu == "Dashboard" ? (
              <>
                <Widget
                  props={{
                    addToast: addToast,
                    address: state.sender,
                    selectedItem: selectedItem,
                    updateSelectedItem: updateSelectedItem,
                  }}
                  src="thalesb.near/widget/DashboardLayout"
                />
              </>
            ) : null}
            {activeMenu == "Markets" ? (
              <Widget
                props={{
                  contracts: [
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
                  ],
                }}
                src="umulamahri.near/widget/CompoundMarkets"
              />
            ) : null}
          </>
        ) : (
          <ConnectWallet />
        )}
      </div>
    </Container>
    <ContainerToast>
      <Toast.Provider swipeDirection="right">
        {toasts.map((toast) => (
          <Toast.Root key={toast.id} className="ToastRoot" open={true}>
            <Toast.Title className="ToastTitle">
              {toast.type === "error" ? <ErrorIcon /> : <SuccessIcon />}
              {toast.type === "error" ? "Error" : "Success"}
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
