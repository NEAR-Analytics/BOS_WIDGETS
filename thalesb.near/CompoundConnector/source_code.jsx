const { marketsContracts, assets, networks, networkTabs } = props;

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
    z-index: 9999;
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
          network={state.chainId}
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
  Storage.privateGet("cachedActiveMenu") || props.defaultTab || "Markets";

function changeTab(menu) {
  Storage.privateSet("cachedActiveMenu", menu);
}

const activeTab = Storage.privateGet("activeTab");

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

const [items, setItems] = useState(assets);

//To get the first asset as the default selected item
const defaultSelectedItem = assets[0][Object.keys(assets[0])[0]][0];

const [selectedItem, setSelectedItem] = useState(
  activeTab ? activeTab : defaultSelectedItem
);
useEffect(() => {
  if (activeTab && activeTab !== selectedItem) {
    setSelectedItem(activeTab);
  }
}, [activeTab]);

/**
 * Generates a unique ID for a toast.
 * @returns {string} The generated unique ID.
 */
const generateUniqueId = () => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Adds a new toast to the list of toasts.
 * @param {string} message - The message content of the toast.
 * @param {string} type - The type of the toast.
 */

const addToast = (message, type) => {
  const newToast = { id: generateUniqueId(), message, type };
  setToasts((prevToasts) => [...prevToasts, newToast]);

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
  const network = networks.find((n) => n.name === networkName);
  if (network) {
    Ethers.send("wallet_switchEthereumChain", [network.params]);
  } else {
    console.error("Network not found");
  }
};

/**
 * Updates the selected item in the network.
 *
 * @param {string} network - The network name.
 * @param {number} index - The index of the selected item.
 */
const updateSelectedItem = (network, index) => {
  const selectedNetwork = items[0][network.toLowerCase()][index];
  console.log(selectedNetwork, "estranhooo", network);
  Storage.privateSet("activeTab", selectedNetwork);
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
              network={state.chainId}
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
              network={state.chainId}
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
                    networkTabs: networkTabs,
                  }}
                  src="thalesb.near/widget/CompoundDashboard"
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
