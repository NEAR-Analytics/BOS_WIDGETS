const nftAddress = "0xb7d25d9ff6bec0072ca60e4ce2cf9ce822c19635";
const NFTManagerABI = JSON.parse(
  fetch("https://raw.githubusercontent.com/test1883/files/main/NFTManager.json")
    .body
);
const walleyAddress = "0x3b218f8d01e3acfed2bd2e5ad3246d03f4375715";
const WalleyABI = JSON.parse(
  fetch("https://raw.githubusercontent.com/test1883/files/main/Walley.json")
    .body
);
State.init({
  general: {
    chainId: undefined,
    balance: 0,
  },
  store: {
    stores: [],
    storeName: "",
    storeAddress: "",
    isStore: false,
    storePendingTransactions: [],
    storeImages: {},
  },
  user: {
    userPendingTransactions: [],
  },
  homeInputs: {
    storeName: "",
    amount: 0,
    name: "",
    password: "",
  },
  storeInputs: {
    storeName: "",
    storeAddress: "",
    image: "",
  },
  storeName: "",
  view: "home",
  loading: true,
  loadingMsg: "Fetching Data",
});

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
).body;

const Root = styled.div`
    width: 100%;
    display: flex;
    font-family: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    flex-direction: column;
    padding: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const WalleyTitle = styled.div`
    text-align: left;
    font-weight: 900;
    width: 100%;
    font-size: 30px;
    margin: 0px;
    padding: 5px;
    color: #000D1A; 
    media screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

const WalleyIndexContainer = styled.div`
    
    box-shadow: 12px 0px 0px 5px #000D1A;
    background: linear-gradient( to bottom, orange 0%, orange 50%, #FFF5F5 50%, #FFF5F5 100% );
    color: #000D1A;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-betweeen;
`;

const WalleyIndexTop = styled.div`
    margin-top: 20px;
    color: #000D1A;
    font-weight: 600;
    font-size: 40px;
    height: 100%;
    padding-bottom: 10px;
    @media screen and (max-width: 600px) {
        font-size: 25px;
        font-weight: 700;
    }
`;

const WalleyIndexBottom = styled.div`
    position: relative;
    top: 50%;
    height: 350px;
    background-color: white;
    font-weight: 500;
    width: 400px;
    text-align: left;
    box-shadow: 12px 0px 0px 5px #000D1A;
    @media screen and (max-width: 600px) {
        width: 100%;
        box-shadow: none;
        border: 1px solid #DBDED7;
        border-radius: 20px;
    }
    &>button {
        border: none;
        background: orange;
        color: white;
    }
`;

const WalleyHomeContainer = styled.div`
    box-shadow: 12px 0px 0px 5px #000D1A;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const WalleyHomeHeader = styled.div`
    background-color: orange;
    width: 100%;
    height: 70px;
    font-size: 20px;
    font-weight: 900;
    padding: 10px;
    position: relative;
    top: 0px;

`;

const WalleyHomeMain = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: space-between;
`;

const WalleyNavbar = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    position: relative;
    left: 0px;
`;

const WalleyNavbarButton = styled.button`
    border: none;
    border-bottom: 1px solid #000D1A;
    text-align: center;
    background: white;
    color: #000D1A;
`;

const WalleyHomeBody = styled.div`
  width: 75%;
`;

const WalleyBalance = styled.p`
  font-weight: 700;
`;

const WalleyLoading = styled.div`
  width: 100%;
  font-weight: 700;
`;

const WalleyButton = styled.button`
  background-color: ${props.bg};
  color: ${props.color};
  display: block;
  border: none;
`;

const WalleyHomeForm = styled.div`
  width: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const WalleyStoreForm = styled.div`
  width: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const WalleyStoreImage = styled.img`
  width: 100px;
  height: 100px;
  text-align: center;
`;

const WalleyInput = styled.input`
  display: block;
`;

const WalleyLabel = styled.p`
  width: 100%;
`;

const WalleyStoreButton = styled.button`
  border: none;
  background: none;
  color: black;
  display: block;
`;

const sender = Ethers.send("eth_requestAccounts", [])[0];
const updateBalance = (balance) => {
  State.update({ balance });
};
if (!sender) {
  return (
    <Root>
      <WalleyIndexContainer>
        <WalleyTitle>Walley.</WalleyTitle>
        <WalleyIndexTop>Go Phoneless</WalleyIndexTop>
        <WalleyIndexBottom>
          Get Started
          <Web3Connect connectLabel="Connect Wallet" />
        </WalleyIndexBottom>
      </WalleyIndexContainer>
    </Root>
  );
}
if (state.chainId === undefined && ethers !== undefined && sender) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      console.log(balance);
      updateBalance(Big(balance).div(Big(10).pow(18)).toFixed(5));
    });
}
if (state.chainId !== undefined && state.chainId !== 11155111) {
  return <p>Switch to Ethereum Sepolia</p>;
}
const nftIface = new ethers.utils.Interface(NFTManagerABI);
const nftContract = new ethers.Contract(
  nftAddress,
  NFTManagerABI,
  Ethers.provider().getSigner()
);
const walleyIface = new ethers.utils.Interface(WalleyABI);
const walleyContract = new ethers.Contract(
  walleyAddress,
  WalleyABI,
  Ethers.provider().getSigner()
);
console.log(walleyContract);
//get stores data
if (state.store.stores.length === 0 && nftContract && sender) {
  State.update({ loadingMsg: "Fetching Stores" });
  nftContract.getAllStores().then((stores) => {
    if (stores.length === 0) {
      State.update({ loading: false, loadingMsg: "" });
    } else {
      const storeState = state.store;
      storeState.stores = stores;
      let store;
      for (let i = 0; i < stores.length; i++) {
        store = stores[i];
        storeState.storeImages[store[0]] = store[2];
        if (store[1].toLowerCase() === sender) {
          storeState.isStore = true;
          storeState.storeName = store[0];
          storeState.storeAddress = store[1].toLowerCase();
          State.update({ loadingMsg: "Fetching Store Transactions" });
          nftContract
            .getStoreActiveTransactions(store[1])
            .then(
              (transactions) =>
                (storeState.storePendingTransactions = transactions)
            );
        }
        if (i === stores.length - 1)
          State.update({ store: storeState, loading: false, loadingMsg: "" });
      }
      console.log(state.store);
    }
  });
}

const onTxClick = () => {
  State.update({
    view: "tx",
    loading: true,
    loadingMsg: "Fetching transactions",
  });
  nftContract.getMyActiveTransactions({ from: sender }).then((transactions) =>
    State.update({
      user: { userPendingTransactions: transactions },
      loading: false,
      loadingMsg: "",
    })
  );
};

const widgetOptions = () => {
  const options = [];
  for (let i = 0; i < state.store.stores.length; i++)
    options.push({
      text: state.store.stores[i][0],
      value: state.store.stores[i][0],
    });
  console.log(options);
  return options;
};

const homeInputUpdates = (value, field) => {
  const homeInputs = state.homeInputs;
  homeInputs[field] = value;
  State.update({ homeInputs });
};
const storeInputUpdates = (value, field) => {
  const storeInputs = state.storeInputs;
  console.log(storeInputs);
  storeInputs[field] = value;
  console.log(storeInputs);
  State.update({ storeInputs });
};

const addStore = () => {
  State.update({ loading: true, loadingMsg: "Creating a new store" });
  const stateT = state;
  const { storeName, storeAddress, image } = stateT.storeInputs;
  nftContract
    .addStore(storeName, storeAddress, image.cid)
    .then((t) => {
      console.log(t);
      t.wait();
    })
    .then(() => {
      stateT.store.stores.push([
        storeName,
        storeAddress.toLowerCase(),
        image.cid,
      ]);
      stateT.store.storeImages[storeName] = image.cid;

      stateT.storeInputs = {
        storeName: "",
        storeAddress: "",
        image: "",
      };
      stateT.loading = false;
      stateT.loadingMsg = "";
      if (storeAddress.toLowerCase() === sender) {
        // alert(
        //   "Warning - If you have any pending transactions, you won't be able to see them. But they can be completed at the store!"
        // );
        stateT.store.isStore = true;
        stateT.store.storeAddress = storeAddress.toLowerCase();
        stateT.store.storeName = storeName;
      }
      State.update(stateT);
    });
};

const initTransaction = () => {
  State.update({ loading: true, loadingMsg: "Minting your NFT" });
  const { storeName, amount, name, password } = state.userInputs;
  console.log(password);
  walleyContract
    .mint(password, { from: sender })
    .then((t) => {
      console.log("hhhee");
      t.wait();
    })
    .then((r) => {
      console.log(r);
      State.update({ loading: false, loadingMsg: "" });
    })
    .catch((err) => console.log(err));
};

return (
  <WalleyHomeContainer>
    <WalleyHomeHeader>Walley.</WalleyHomeHeader>
    <WalleyHomeMain>
      <WalleyNavbar>
        <WalleyNavbarButton onClick={() => State.update({ view: "home" })}>
          Home
        </WalleyNavbarButton>
        <WalleyNavbarButton onClick={onTxClick}>
          Your Store NFTs
        </WalleyNavbarButton>
        <WalleyNavbarButton onClick={() => State.update({ view: "addSt" })}>
          Add a store
        </WalleyNavbarButton>
      </WalleyNavbar>
      <WalleyHomeBody>
        {!state.loading ? (
          <WalleyBalance>
            Your Balance - {state.balance}
            {state.view === "home" ? (
              <WalleyHomeForm>
                <Widget
                  src="near/widget/Select"
                  props={{
                    value: state.homeInputs.storeName,
                    noLabel: true,
                    placeholder:
                      state.store.stores.length !== 0
                        ? "Select a store"
                        : "No Store Available",
                    options: [...widgetOptions()],
                    onChange: (value) => {
                      homeInputUpdates(value.text, "storeName");
                    },
                  }}
                />
                <WalleyLabel>
                  Enter the maximum amount you'd like to spend(in INR)
                </WalleyLabel>
                <WalleyInput
                  value={state.homeInputs.amount}
                  type="number"
                  onChange={(e) => homeInputUpdates(e.target.value, "amount")}
                  placeholder="Amount(in INR)"
                />
                <WalleyLabel>Name(will be asked at the store)</WalleyLabel>
                <WalleyInput
                  value={state.homeInputs.name}
                  type="text"
                  onChange={(e) => homeInputUpdates(e.target.value, "name")}
                  placeholder="Name"
                />
                <WalleyLabel>
                  Set a password for the transaction(will be asked during
                  checkout)
                </WalleyLabel>
                <WalleyInput
                  value={state.homeInputs.password}
                  type="password"
                  onChange={(e) => homeInputUpdates(e.target.value, "password")}
                  placeholder="Password"
                />
                <WalleyButton
                  color="#000D1A"
                  bg="#FFA500"
                  onClick={initTransaction}
                >
                  Buy The Store NFT
                </WalleyButton>
              </WalleyHomeForm>
            ) : state.view === "tx" ? (
              <p>helloob</p>
            ) : (
              <WalleyStoreForm>
                {state.storeInputs.image.uploading ? <p>loading</p> : ""}
                {state.storeInputs.image.cid ? (
                  <WalleyStoreImage
                    src={`https://ipfs.near.social/ipfs/${state.storeInputs.image.cid}`}
                    alt="uploaded"
                  />
                ) : (
                  ""
                )}
                <WalleyLabel>Store Name</WalleyLabel>
                <WalleyInput
                  value={state.storeInputs.storeName}
                  type="text"
                  onChange={(e) => {
                    storeInputUpdates(e.target.value, "storeName");
                  }}
                  placeholder="Enter the Store Name"
                />
                <WalleyLabel>Store Address</WalleyLabel>
                <WalleyInput
                  value={state.storeInputs.storeAddress}
                  type="text"
                  onChange={(e) =>
                    storeInputUpdates(e.target.value, "storeAddress")
                  }
                  placeholder="Enter the Store Address"
                />
                <WalleyStoreButton
                  onClick={() => storeInputUpdates(sender, "storeAddress")}
                >
                  Use current address(convert this account into a store)
                </WalleyStoreButton>
                <WalleyLabel>Add Cover Image</WalleyLabel>
                <IpfsImageUpload image={state.storeInputs.image} />
                <WalleyButton color="#000D1A" bg="orange" onClick={addStore}>
                  Add Store
                </WalleyButton>
              </WalleyStoreForm>
            )}
          </WalleyBalance>
        ) : (
          <WalleyLoading>{state.loadingMsg}</WalleyLoading>
        )}
      </WalleyHomeBody>
    </WalleyHomeMain>
  </WalleyHomeContainer>
);
