const nftAddress = "0x81e45a0a35d95b52a237a92f07686d6bca4107a7";
const NFTManagerABI = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "storeAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "store",
        type: "string",
      },
    ],
    name: "NFTListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "storeAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "store",
        type: "string",
      },
    ],
    name: "NFTSold",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "store",
        type: "string",
      },
      {
        internalType: "address",
        name: "storeAddress",
        type: "address",
      },
    ],
    name: "addStore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approveTransaction",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllStores",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "storeName",
            type: "string",
          },
          {
            internalType: "address",
            name: "storeAddress",
            type: "address",
          },
        ],
        internalType: "struct NFTManager.storeDetails[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyActiveTransactions",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "storeAddress",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "store",
            type: "string",
          },
        ],
        internalType: "struct NFTManager.NFT[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "storeAddress",
        type: "address",
      },
    ],
    name: "getStoreActiveTransactions",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "storeAddress",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "store",
            type: "string",
          },
        ],
        internalType: "struct NFTManager.NFT[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_storeAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "store",
        type: "string",
      },
    ],
    name: "initTransaction",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "stores",
    outputs: [
      {
        internalType: "string",
        name: "storeName",
        type: "string",
      },
      {
        internalType: "address",
        name: "storeAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const walleyAddress = "0x77b554ea3feff230884fc9e73e9119014e17a246";
const WalleyABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_marketplaceContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "NFTMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
State.init({
  chainId: undefined,
  balance: 0,
  stores: [],
  isStore: false,
  storeName: "",
  storeAddress: "",
  storeNames: [],
  storePendingTransactions: [],
  userPendingTransactions: [],
  amount: 0,
  name: "",
  widgetOptions: [],
});
const sender = Ethers.send("eth_requestAccounts", [])[0];
const updateBalance = (balance) => {
  State.update({ balance });
};
if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;
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
  // console.log(sender);
}
if (state.chainId !== undefined && state.chainId !== 11155111) {
  return <p>Switch to Ethereum Sepolia</p>;
}
// console.log(NFTManagerABI);
const nftIface = new ethers.utils.Interface(NFTManagerABI);
// console.log("hehe");
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

if (state.stores.length == 0) {
  console.log("hee");
  nftContract
    .getAllStores()
    .then((stores) => {
      console.log(stores);
      State.update({
        stores,
      });
    })
    .then(() => {
      state.stores.map((store) => {
        console.log(store);
        console.log(sender);
        if (store[1].toLowerCase() === sender) {
          console.log("827");
          State.update({
            isStore: true,
            storeName: store[0],
            storeAddress: store[1],
          });
          return;
        }
      });
      State.update({
        storeNames: getStoreNames(),
      });
      // console.log(state.stores);
    });
}
// console.log(state.isStore);
// if (
//   state.stores.length !== 0 &&
//   state.storeAddress !== "" &&
//   state.isStore === true &&
//   state.storePendingTransactions.length === 0
// ) {
//   console.log("herehehehe");
//   nftContract
//     .getStoreActiveTransactions(state.storeAddress)
//     .then((transactions) => {
//       console.log(transactions);
//       State.update({
//         storePendingTransactions: transactions,
//       });
//     })
//     .catch((err) => console.log(err));
// }

// if (
//   sender &&
//   state.isStore === false &&
//   state.userPendingTransactions.length === 0
// ) {
//   nftContract.getMyActiveTransactions({ from: sender }).then((transactions) => {
//     console.log(transactions);
//     State.update({
//       userPendingTransactions: transactions,
//     }).catch((err) => console.log(err));
//   });
// }

const initTransaction = () => {
  walleyContract
    .mint({ from: sender })
    .then((t) => {
      console.log(t);
      console.log("minted");
      // List the NFT
      console.log(state.storeName);
      walleyContract.getToken().then((tokenId) => {
        console.log(Big(tokenId).toFixed(0));
        nftContract
          .initTransaction(
            walleyAddress,
            state.name,
            Big(tokenId).toFixed(0),
            `${state.amount * Math.pow(10, 18)}`,
            state.storeAddress,
            state.storeName,
            {
              from: sender,
              value: ethers.utils.parseUnits(`${state.amount}`, 18),
            }
          )
          .then(() => console.log("done"))
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log("hhhh"));
};

const approveTransaction = (tokenId, totalAmount, amount) => {
  console.log(amount - totalAmount);
  console.log(
    ethers.utils.parseUnits(`${amount.toFixed(5) - totalAmount.toFixed(5)}`, 18)
  );
  nftContract
    .approveTransaction(
      walleyAddress,
      tokenId,
      `${totalAmount * Math.pow(10, 18)}`,
      {
        from: sender,
        value: ethers.utils.parseUnits(
          `${amount.toFixed(5) - totalAmount.toFixed(5)}`,
          18
        ),
      }
    )
    .then(() => {
      const tmp = state.storePendingTransactions.filter(
        (trans) => Big(trans[1]).toFixed(0) !== tokenId
      );
      State.update({ storePendingTransactions: tmp });
    });
};

const addStore = (name, address) => {
  nftContract.addStore(name, address).then((t) => {
    console.log(t);
    const tmp = [...state.stores, [name, address]];
    State.update({ stores: tmp });
  });
};

const getStoreNames = () => {
  const op = [];
  state.stores.map((store) => {
    op.push(store[0]);
  });
  console.log(op);
  return op;
};

const widgetOptions = () => {
  const options = [];
  for (let i = 0; i < state.storeNames.length; i++)
    options.push({ text: state.storeNames[i], value: state.storeNames[i] });
  console.log(options);
  return options;
};

return (
  <>
    <p>{state.chainId}</p>
    <p>{state.balance}</p>
    {state.isStore === false ? (
      <div>
        {state.stores.length !== 0 ? (
          <Widget
            src="near/widget/Select"
            props={{
              value: state.storeName,
              noLabel: true,
              placeholder: "Select a store",
              options: [...widgetOptions()],
              onChange: (value) => {
                console.log(value);
                state.stores.map((store) => {
                  if (store[0] === value.text) {
                    State.update({
                      storeName: value.text,
                      storeAddress: store[1],
                    });
                  }
                });
              },
            }}
          />
        ) : (
          ""
        )}
        <input
          type="number"
          value={state.amount}
          onChange={(e) => State.update({ amount: e.target.value })}
        />
        <input
          type="text"
          value={state.name}
          onChange={(e) => State.update({ name: e.target.value })}
        />
        <button onClick={initTransaction}>init</button>
        <button
          onClick={() => {
            State.update({ addStore: true });
          }}
        >
          add store
        </button>
        {state.addStore ? (
          <div>
            <input
              type="text"
              onChange={(e) => {
                State.update({ storeName: e.target.value });
              }}
              value={state.storeName}
            />
            <input
              type="text"
              onChange={(e) => {
                State.update({ storeAddress: e.target.value });
              }}
              value={state.storeAddress}
            />
            <button
              onClick={() => {
                State.update({ storeAddress: sender });
              }}
            >
              Use current address
            </button>
            <button
              onClick={() => addStore(state.storeName, state.storeAddress)}
            >
              Add
            </button>
          </div>
        ) : (
          ""
        )}
        Your Store NFTs -
        {/*state.userPendingTransactions.length !== 0
          ? state.userPendingTransactions.map((trans) => (
              <div>
                <p>{trans[6]}</p>
                <p>{trans[2]}</p>
                <p>{Big(trans[5]).div(Big(10).pow(18)).toFixed(20)} ether</p>
              </div>
            ))
          : "No pending transactions!"*/}
      </div>
    ) : (
      <div>
        {state.storePendingTransactions.map((trans) => (
          <div>
            <p>{trans[6]}</p>
            <p>{trans[2]}</p>
            <p>{Big(trans[5]).div(Big(10).pow(18)).toFixed(20)} ether</p>
            <input
              type="number"
              value={state.amount}
              onChange={(e) => State.update({ amount: e.target.value })}
            />
            <button
              onClick={() =>
                approveTransaction(
                  Big(trans[1]).toFixed(0),
                  state.amount,
                  Big(trans[5]).div(Big(10).pow(18)).toFixed(20)
                )
              }
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    )}
  </>
);
