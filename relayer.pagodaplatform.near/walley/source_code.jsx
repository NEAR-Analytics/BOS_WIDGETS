const nftAddress = "0x2e0f4a4123d0072f46bf67127270a80114541d86";
const NFTManagerABI = JSON.parse(
  fetch("https://raw.githubusercontent.com/test1883/files/main/NFTManager.json")
    .body
);
const walleyAddress = "0x8ae53c3a6bf7762db9cc7603a290d769020e4e77";
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
    storePastTransactions: [],
    storeImages: {},
    openModal: 0,
    approvePassword: "",
    bill: { uploading: false, cid: null },
    totalAmount: 0,
  },
  user: {
    userPendingTransactions: [],
    userPastTransactions: [],
    openModal: 0,
    cancelPassword: "",
    openReceipt: 0,
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
    color: #fff; 
    media screen and (max-width: 600px) {
        font-size: 20px;
    }
`;

const WalleyIndexContainer = styled.div`
    background: url("https://img.freepik.com/free-vector/abstract-black-shapes-background-design_1017-31904.jpg?w=826&t=st=1692784084~exp=1692784684~hmac=640a88623947cac46d90337f2d03281af01efcdcd5aa64901719774754bd75b3");
    background-size: cover;
    height: 100vh;
    color: #fff;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const WalleyIndexBody = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 500px;
`;

const WalleyIndexDesc = styled.div`
    color: #fff;
    font-weight: 600;
    font-size: 60px;
    padding-bottom: 10px;
    @media screen and (max-width: 600px) {
        font-size: 25px;
        font-weight: 700;
    }
`;

const WalleyIndexMain = styled.div`
    font-weight: 500;
    &>button {
        border: none;
        background: orange;
        color: white;
        margin-left: 20px;
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

const WalleyTransactions = styled.div`
`;

const TransactionCard = styled.div`
`;

const WalleyStoreBody = styled.div`
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
        <WalleyIndexBody>
          <WalleyIndexDesc>Highly Secured NFT-based Wallet.</WalleyIndexDesc>
          <WalleyIndexMain>
            Get Started -
            <Web3Connect connectLabel="Connect Wallet" />
          </WalleyIndexMain>
        </WalleyIndexBody>
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
//get stores data
if (state.store.stores.length === 0 && nftContract && sender) {
  walleyContract.getToken().then((tokenId) => {
    console.log(tokenId);
  });
  State.update({ loading: true, loadingMsg: "Fetching Stores" });
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
          State.update({
            loading: true,
            loadingMsg: "Fetching Store Transactions",
          });
          nftContract.getStoreTransactions(store[1]).then((transactions) => {
            storeState.storePendingTransactions = [];
            storeState.storePastTransactions = [];
            transactions.map((txn) => {
              if (txn[8] === false) {
                storeState.storePendingTransactions.push(txn);
              } else {
                storeState.storePastTransactions.push(txn);
              }
            });
          });
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
  nftContract.getMyTransactions({ from: sender }).then((transactions) => {
    const st = [];
    transactions.map((txn) => {
      if (txn[8] === false) st.push(txn);
    });
    State.update({
      user: { ...state.user, userPendingTransactions: st },
      loading: false,
      loadingMsg: "",
    });
  });
};

const onTxPastClick = () => {
  State.update({
    view: "txPast",
    loading: true,
    loadingMsg: "Fetching past transactions",
  });
  nftContract.getMyTransactions({ from: sender }).then((transactions) => {
    const st = [];
    transactions.map((txn) => {
      if (txn[8] === true) st.push(txn);
    });
    State.update({
      user: { ...state.user, userPastTransactions: st },
      loading: false,
      loadingMsg: "",
    });
  });
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
  nftContract.addStore(storeName, storeAddress, image.cid).then((t) => {
    console.log(t);
    t.wait().then((r) => {
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
  });
};

const getStoreAddress = (storeName) => {
  const t = [];
  state.store.stores.map((store) => {
    if (store[0] === storeName) t.push(store[1]);
  });
  return t[0];
};

const initTransaction = () => {
  State.update({
    loading: true,
    loadingMsg: "Minting your NFT - Please Pay the gas price",
  });
  const { storeName, amount, name, password } = state.homeInputs;
  console.log(password);
  walleyContract
    .mint(password, { from: sender })
    .then((tx) => {
      State.update({ loadingMsg: "Waiting for confirmation" });
      tx.wait().then((r) => {
        const tokenId = parseInt(r.logs[2].data, 16);
        State.update({
          loadingMsg:
            "Creating your transaction - Please pay the amount you entered + gas",
        });
        nftContract
          .initTransaction(
            walleyAddress,
            name,
            tokenId,
            `${amount * Math.pow(10, 18)}`,
            getStoreAddress(storeName),
            storeName,
            {
              from: sender,
              value: ethers.utils.parseUnits(`${amount}`, 18),
            }
          )
          .then((txInit) => {
            console.log(txInit);
            State.update({ loadingMsg: "Waiting for the final confirmation" });
            txInit.wait().then((res) => {
              console.log(res);
              State.update({
                loading: false,
                loadingMsg: "",
                userInput: {
                  storeName: "",
                  name: "",
                  amount: "",
                  password: "",
                },
              });
            });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
};

const cancelTransaction = (tokenId) => {
  walleyContract.returnPass(tokenId).then((password) => {
    if (state.user.cancelPassword === password) {
      State.update({
        loading: true,
        loadingMsg: "Cancelling your transaction - Pay for the gas",
      });
      nftContract
        .cancelTransaction(walleyAddress, tokenId, { from: sender })
        .then((tx) => {
          State.update({ loadingMsg: "Refunding your amount" });
          tx.wait().then((r) => {
            const tmp = [];
            state.store.userPendingTransactions.map((trans) => {
              if (parseInt(trans[1], 16) !== tokenId) {
                tmp.push(trans);
              }
            });
            State.update({
              loading: false,
              loadingMsg: "",
              user: {
                ...state.user,
                userPendingTransactions: tmp,
                cancelPassword: "",
                openModal: 0,
              },
            });
          });
        });
    } else {
      console.log("Please re-check the password");
    }
  });
};

// const billOnChange = (files) => {
//   if (files) {
//     console.log(files[0]);
//     State.update({
//       store: { ...state.store, bill: { uploading: true, amount: null } },
//     });
//     let reader = new FileReader();
//     reader.onloadend = () => {
//       let formdata = new FormData();
//       formdata.append("language", "eng");
//       formdata.append("isOverlayRequired", "false");
//       formdata.append("base64Image", reader.result);
//       formdata.append("iscreatesearchablepdf", "false");
//       formdata.append("scale", "true");
//       formdata.append("isTable", "true");
//       formdata.append("issearchablepdfhidetextlayer", "false");
//       formdata.append("OCREngine", "3");

//       let requestOptions = {
//         method: "POST",
//         headers: { apikey: "K82213475788957" },
//         body: formdata,
//         redirect: "follow",
//       };

//       fetch("https://api.ocr.space/parse/image", requestOptions)
//         .then((response) => response.json())
//         .then((result) => parseReceipt(result))
//         .catch((error) => console.log("error", error));
//     };
//     reader.readAsDataURL(files[0]);
//   }
// };

// const parseReceipt = (receiptObject) => {
//   console.log(receiptObject);
//   console.log(typeof receiptObject);
//   if (typeof receiptObject === "object") {
//     const receiptDetails = receiptObject.ParsedResults[0];
//     const receiptLines = receiptDetails.TextOverlay.Lines;
//     parseReceiptText(receiptDetails.ParsedText);
//   } else if (typeof receiptObject == "string") {
//     console.log(receipt);
//   }
// };
// const parseReceiptText = (receiptText) => {
//   // extremely reliant on this one receipt
//   let receiptContent = receiptText.split("\t\r\n").map((element) => {
//     return element.toLowerCase().replace("\t", " ");
//   });

//   const receiptTotal = receiptContent[21].replace(/\D/g, "");
//   const subTotal = receiptContent[
//     receiptContent.findIndex((v) => v.includes("subtotal"))
//   ].replace(/\D/g, "");
//   const VAT = receiptContent[20].replace(/\D/g, "");
//   const receipt = {
//     store: receiptContent[0].split("\t")[1],
//     date: receiptContent[6].split(" ")[0],
//     subtotal:
//       subTotal.substring(0, subTotal.length - 2) +
//       "." +
//       subTotal.substring(subTotal.length - 2),
//     total:
//       receiptTotal.substring(0, receiptTotal.length - 2) +
//       "." +
//       receiptTotal.substring(receiptTotal.length - 2),
//     vat: VAT.substring(0, VAT.length - 2) + "." + VAT.substring(VAT.length - 2),
//   };
//   console.log(receipt);
// };

const approveTransaction = (tokenId) => {
  State.update({
    loading: true,
    loadingMsg: "Checking the password",
  });
  walleyContract.returnPass(tokenId).then((password) => {
    console.log(password);
    if (state.store.approvePassword === password) {
      State.update({
        loadingMsg: "Approving your transaction - Pay for the gas",
      });
      nftContract
        .approveTransaction(
          walleyAddress,
          tokenId,
          `${state.store.totalAmount * Math.pow(10, 18)}`,
          state.store.bill.cid,
          {
            from: sender,
          }
        )
        .then((tx) => {
          State.update({
            loadingMsg: "Waiting for confirmation - Refunding the change",
          });
          tx.wait().then((res) => {
            const tmp = [];
            const tmpAct = [];
            state.store.storePendingTransactions.map((trans) => {
              if (parseInt(trans[1], 16) !== tokenId) {
                tmp.push(trans);
              } else {
                tmpAct.push(trans);
                tmpAct[0][7] = state.store.bill.cid;
                tmpAct[0][8] = true;
                tmpAct[0][9] = state.store.totalAmount;
              }
            });
            State.update({
              store: {
                ...state.store,
                storePendingTransactions: tmp,
                storePastTransactions: [
                  ...state.store.storePastTransactions,
                  tmpAct,
                ],
                openModal: 0,
                approvePassword: "",
                bill: { uploading: false, amount: null },
                totalAmount: 0,
              },
              loadingMsg: "",
              loading: false,
            });
          });
        });
    } else {
      console.log("Please re-check the password");
      State.update({ loading: false, loadingMsg: "" });
    }
  });
};

return (
  <WalleyHomeContainer>
    <WalleyHomeHeader>
      <p>Walley.</p>
      <WalleyBalance>Your Balance - {state.balance}</WalleyBalance>
    </WalleyHomeHeader>
    <WalleyHomeMain>
      {!state.loading ? (
        !state.store.isStore ? (
          <>
            <WalleyNavbar>
              <WalleyNavbarButton
                onClick={() => State.update({ view: "home" })}
              >
                Home
              </WalleyNavbarButton>
              <WalleyNavbarButton onClick={onTxClick}>
                Your Store NFTs
              </WalleyNavbarButton>
              <WalleyNavbarButton onClick={onTxPastClick}>
                Receipts
              </WalleyNavbarButton>
              <WalleyNavbarButton
                onClick={() => State.update({ view: "addSt" })}
              >
                Add a store
              </WalleyNavbarButton>
            </WalleyNavbar>
            <WalleyHomeBody>
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
                    onChange={(e) =>
                      homeInputUpdates(e.target.value, "password")
                    }
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
                <WalleyTransactions>
                  {state.user.userPendingTransactions.length !== 0
                    ? state.user.userPendingTransactions.map((tx) => (
                        <TransactionCard>
                          <WalleyStoreImage
                            src={`https://ipfs.near.social/ipfs/${
                              state.store.storeImages[tx[6]]
                            }`}
                            alt={tx[6]}
                          />
                          <p>Name - {tx[2]}</p>
                          <p>Store name - {tx[6]} </p>
                          <p>Amount - {Big(tx[5]).toFixed(5)}</p>
                          {state.user.openModal === parseInt(tx[1], 16) ? (
                            <>
                              <WalleyLabel>
                                Enter the transacation password
                              </WalleyLabel>
                              <WalleyInput
                                type="password"
                                value={state.user.cancelPassword}
                                onChange={(e) =>
                                  State.update({
                                    user: {
                                      ...state.user,
                                      cancelPassword: e.target.value,
                                    },
                                  })
                                }
                              />
                              <WalleyButton
                                color="#white"
                                bg="blue"
                                onClick={() =>
                                  State.update({
                                    user: {
                                      ...state.user,
                                      openModal: 0,
                                      cancelPassword: "",
                                    },
                                  })
                                }
                              >
                                Close
                              </WalleyButton>
                              <WalleyButton
                                color="#white"
                                bg="red"
                                onClick={() =>
                                  cancelTransaction(parseInt(tx[1], 16))
                                }
                              >
                                Cancel
                              </WalleyButton>
                            </>
                          ) : (
                            <WalleyButton
                              color="#white"
                              bg="red"
                              onClick={() =>
                                State.update({
                                  user: {
                                    ...state.user,
                                    openModal: parseInt(tx[1], 16),
                                    cancelPassword: "",
                                  },
                                })
                              }
                            >
                              Cancel
                            </WalleyButton>
                          )}
                        </TransactionCard>
                      ))
                    : "No pending transactions"}
                </WalleyTransactions>
              ) : state.view === "txPast" ? (
                <WalleyTransactions>
                  {state.user.userPastTransactions.length !== 0
                    ? state.user.userPastTransactions.map((tx) => (
                        <TransactionCard>
                          <WalleyStoreImage
                            src={`https://ipfs.near.social/ipfs/${
                              state.store.storeImages[tx[6]]
                            }`}
                            alt={tx[6]}
                          />
                          <p>Name - {tx[2]}</p>
                          <p>Store name - {tx[6]} </p>
                          <p>Max Amount - {Big(tx[5]).toFixed(5)}</p>
                          <p>Total Bill Amount - {Big(tx[9]).toFixed(5)}</p>
                          {state.user.openReceipt === Big(tx[1]).toFixed(0) ? (
                            <>
                              <WalleyStoreImage
                                src={`https://ipfs.near.social/ipfs/${tx[7]}`}
                                alt={tx[7]}
                              />
                              <WalleyButton
                                color="#000D1A"
                                bg="orange"
                                onClick={() =>
                                  State.update({
                                    user: {
                                      ...state.user,
                                      openReceipt: 0,
                                    },
                                  })
                                }
                              >
                                Close Receipt
                              </WalleyButton>
                            </>
                          ) : (
                            <WalleyButton
                              color="#000D1A"
                              bg="orange"
                              onClick={() =>
                                State.update({
                                  user: {
                                    ...state.user,
                                    openReceipt: Big(tx[1]).toFixed(0),
                                  },
                                })
                              }
                            >
                              Show Receipt
                            </WalleyButton>
                          )}
                        </TransactionCard>
                      ))
                    : "No past transactions found"}
                </WalleyTransactions>
              ) : (
                <WalleyStoreForm>
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
            </WalleyHomeBody>
          </>
        ) : (
          <>
            <WalleyNavbar>
              <WalleyNavbarButton
                onClick={() => State.update({ view: "home" })}
              >
                Home
              </WalleyNavbarButton>
              <WalleyNavbarButton
                onClick={() => State.update({ view: "txPast" })}
              >
                Receipts
              </WalleyNavbarButton>
            </WalleyNavbar>
            <WalleyStoreBody>
              <WalleyTransactions>
                {state.view === "home"
                  ? state.store.storePendingTransactions.length !== 0
                    ? state.store.storePendingTransactions.map((tx) => (
                        <TransactionCard>
                          <WalleyStoreImage
                            src={`https://ipfs.near.social/ipfs/${
                              state.store.storeImages[tx[6]]
                            }`}
                            alt={tx[6]}
                          />
                          <p>Name - {tx[2]}</p>
                          <p>Store name - {tx[6]} </p>
                          <p>Max amount - {Big(tx[5]).toFixed(5)}</p>
                          {state.store.openModal === parseInt(tx[1], 16) ? (
                            <>
                              <WalleyLabel>Please scan the bill - </WalleyLabel>
                              <IpfsImageUpload image={state.store.bill} />
                              {/*<Files
                            multiple={false}
                            accepts={["image/*"]}
                            minFileSize={1}
                            clickable
                            className="btn btn-outline-primary"
                            onChange={billOnChange}
                          >
                            {state.store.bill.uploading ? (
                              <> Scanning </>
                            ) : (
                              "Scan the bill"
                            )}
                          </Files>*/}
                              <WalleyLabel>Total Bill Amount</WalleyLabel>
                              <WalleyInput
                                value={state.store.totalAmount}
                                onChange={(e) =>
                                  State.update({
                                    store: {
                                      ...state.store,
                                      totalAmount: e.target.value,
                                    },
                                  })
                                }
                              />
                              <WalleyLabel>Transaction Password</WalleyLabel>
                              <WalleyInput
                                type="password"
                                value={state.store.approvePassword}
                                onChange={(e) =>
                                  State.update({
                                    store: {
                                      ...state.store,
                                      approvePassword: e.target.value,
                                    },
                                  })
                                }
                              />
                              <WalleyButton
                                color="#white"
                                bg="blue"
                                onClick={() => {
                                  State.update({
                                    store: {
                                      ...state.store,
                                      approvePassword: "",
                                      bill: { uploading: false, cid: "" },
                                      totalAmount: null,
                                      openModal: 0,
                                    },
                                  });
                                }}
                              >
                                Close
                              </WalleyButton>
                              <WalleyButton
                                color="#white"
                                bg="blue"
                                onClick={() => {
                                  console.log(state.store.bill.cid);
                                  if (state.store.bill.cid) {
                                    approveTransaction(parseInt(tx[1], 16));
                                  } else {
                                    console.log("Please Upload the bill");
                                  }
                                }}
                              >
                                Approve
                              </WalleyButton>
                            </>
                          ) : (
                            <WalleyButton
                              color="#white"
                              bg="blue"
                              onClick={() =>
                                State.update({
                                  store: {
                                    ...state.store,
                                    approvePassword: "",
                                    bill: { uploading: false, amount: null },
                                    totalAmount: null,
                                    openModal: parseInt(tx[1], 16),
                                  },
                                })
                              }
                            >
                              Approve
                            </WalleyButton>
                          )}
                        </TransactionCard>
                      ))
                    : "No pending transactions"
                  : state.store.storePastTransactions.length !== 0
                  ? state.store.storePastTransactions.map((tx) => (
                      <TransactionCard>
                        <WalleyStoreImage
                          src={`https://ipfs.near.social/ipfs/${
                            state.store.storeImages[tx[6]]
                          }`}
                          alt={tx[6]}
                        />
                        <p>Name - {tx[2]}</p>
                        <p>Store name - {tx[6]} </p>
                        <p>Max Amount - {Big(tx[5]).toFixed(5)}</p>

                        <p>Total Bill Amount - {Big(tx[9]).toFixed(5)}</p>
                        {state.user.openReceipt === Big(tx[1]).toFixed(0) ? (
                          <>
                            <WalleyStoreImage
                              src={`https://ipfs.near.social/ipfs/${tx[7]}`}
                              alt={tx[7]}
                            />
                            <WalleyButton
                              color="#000D1A"
                              bg="orange"
                              onClick={() =>
                                State.update({
                                  user: {
                                    ...state.user,
                                    openReceipt: 0,
                                  },
                                })
                              }
                            >
                              Close Receipt
                            </WalleyButton>
                          </>
                        ) : (
                          <WalleyButton
                            color="#000D1A"
                            bg="orange"
                            onClick={() =>
                              State.update({
                                user: {
                                  ...state.user,
                                  openReceipt: Big(tx[1]).toFixed(0),
                                },
                              })
                            }
                          >
                            Show Receipt
                          </WalleyButton>
                        )}
                      </TransactionCard>
                    ))
                  : "No past transactions found"}
              </WalleyTransactions>
            </WalleyStoreBody>
          </>
        )
      ) : (
        <WalleyLoading>{state.loadingMsg}</WalleyLoading>
      )}
    </WalleyHomeMain>
  </WalleyHomeContainer>
);
