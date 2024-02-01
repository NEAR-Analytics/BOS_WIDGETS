const Layout = styled.div`
  background: #1e202e;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

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

    @media (max-width: 728px) {
      display: none;
    }
  }

  .connectWallet {
    background-color: #00ec97;
    display: flex;
    color: #373a53;
    border: none;
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

  .connectWallet2 {
    display: none;
    font-weight: 500;
    font-size: 22px;
    color: #ffffff;
    cursor: pointer;
    border: none;
    &:hover,
    &:focus {
      opacity: 0.8;
      background-color: transparent;

      border: none;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 728px) {
      display: flex;
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
    font-size: 22px;
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
    grid-template-columns: repeat(3, 1fr); // Update for three tabs
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
      // Styles for the mobile view connect button
      display: flex; // Ensure it's displayed in the grid
    }
    .alignCenter {
      display: flex; // Optionally make it visible again if needed in another context
    }
  }
`;

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
    width="24"
    height="24"
    viewBox="0 0 24 24"
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
if (state.chainId !== undefined && state.chainId !== 137) {
  return (
    <button onClick={() => switchNetwork()}>Switch to Polygon Mainnet</button>
  );
}

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

return (
  <Layout>
    <Container>
      <MenuContainer>
        <div
          onClick={() => {
            //TODO: we need to evaluate if it's worth making our own wallet connect button
            // Because the user can't click on the Icon to login
          }}
          className={`connectTab ${
            /* Condition to make active if necessary */ ""
          }`}
        >
          <span className="iconWallet">{WalletIcon}</span>
          <Web3Connect
            className="connectWallet2"
            connectLabel="Connect"
            disconnectLabel="Disconnect"
            connectingLabel="Connecting..."
            style={{ display: "none" }}
          />
        </div>
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

        <div>
          <div className="alignCenter">
            <Web3Connect
              className="connectWallet"
              connectLabel="Connect Wallet"
              disconnectLabel="Disconnect Wallet"
              connectingLabel="Connecting..."
              style={{ display: "none" }}
            />
          </div>
        </div>
      </MenuContainer>
      <div className="flex-grow contentOut">
        {activeMenu == "Dashboard" ? (
          <>
            {!!state.sender ? (
              <Widget
                props={{
                  address: state.sender,
                }}
                src="thalesb.near/widget/DashboardLayout"
              />
            ) : (
              <div>Please Connect Your Wallet</div>
            )}
          </>
        ) : null}
        {activeMenu == "Markets" ? <>Building...</> : null}
      </div>
    </Container>
  </Layout>
);
