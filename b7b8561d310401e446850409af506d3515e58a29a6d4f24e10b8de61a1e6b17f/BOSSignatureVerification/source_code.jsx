State.init({
  chainId: 96, // For Ethereum Mainnet, for instance
  baseUrl: "https://api.yourapp.com",
  safeAddress: "0x1234567890abcdef1234567890abcdef12345678",
  sender: "0xabcdef1234567890abcdef1234567890abcdef12",
  signature: "",
  hashMessage: "",
  scenarios: [
    {
      scenario: "User offer sell NFT",
      isSell: true,
      nftAddress: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      tokenId: 1,
      tokenAddress: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      price: 40000000,
      expiry: 86400,
      nonce: 42,
    },
    {
      scenario: "Users offer buy NFT",
      isSell: false,
      nftAddress: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      tokenId: 2,
      tokenAddress: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      price: 40000000,
      expiry: 86400,
      nonce: 43,
    },
  ],
  transactions: [
    {
      safeTxHash:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc1",
      data: null,
      to: "0xabcdef1234567890abcdef1234567890abcdef34",
      value: "1000000000000000000", // 1 ETH in Wei
    },
    {
      safeTxHash:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc2",
      data: {
        method: "transfer",
        dataDecoded: {
          parameters: [
            { value: "0x1234567890abcdef1234567890abcdef12345678" },
            { value: "500000000000000000" }, // 0.5 ETH in Wei
          ],
        },
      },
      to: "",
      value: "0",
    },
  ],
  selectedTransaction: null,
});

// connect account
if (state.sender === null) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  const checksummedAddr = ethers.utils.getAddress(accounts[0]);
  if (accounts.length) {
    State.update({ sender: checksummedAddr });

    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        if (chainIdData?.chainId == 1) {
          State.update({
            chainId: "mainnet",
          });
        } else if (chainIdData?.chainId == 5) {
          State.update({
            chainId: "goerli",
          });
        } else if (chainIdData?.chainId == 100) {
          State.update({
            chainId: "gnosis-chain",
          });
        }
      });
  }
}

//EIP712
const domain = {
  name: "MyApp",
  version: "1.0",
  chainId: 96,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
};

const types = {
  Offer: [
    { name: "isSell", type: "bool" },
    { name: "nftAddress", type: "address" },
    { name: "tokenId", type: "uint256" },
    { name: "tokenAddress", type: "address" },
    { name: "price", type: "uint256" },
    { name: "expiry", type: "uint256" },
    { name: "nonce", type: "uint256" },
  ],
};

// choose relevant transaction to sign and confirm
const selectTransaction = (tx) => {
  State.update({ selectedTransaction: tx });
};

const createEIP712Message = (transaction) => {
  return {
    isSell: transaction.isSell,
    nftAddress: transaction.nftAddress,
    tokenId: transaction.tokenId,
    tokenAddress: transaction.tokenAddress,
    price: transaction.price,
    expiry: transaction.expiry,
    nonce: transaction.nonce,
  };
};

const signTransaction = () => {
  if (state.selectedTransaction) {
    const selectedTxHash = state.selectedTransaction.safeTxHash;
    const selectedTxHash2 = ethers.utils.arrayify(selectedTxHash);
    console.log(ethers.utils.arrayify(selectedTxHash));
    const signer = Ethers.provider().getSigner();
    signer
      .signMessage(ethers.utils.hexDataSlice(selectedTxHash2, 0, 64))
      .then((sig) => {
        const setV = ethers.utils.hexDataSlice(sig, 0, 64);
        console.log(setV);

        const url =
          state.baseUrl +
          `/v1/multisig-transactions/${selectedTxHash}/confirmations/`;
        const params = JSON.stringify({ signature: setV });
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: params,
        };

        //   post confirmed sig with set V to gnosis API backend
        asyncFetch(url, options).then((res) => {
          console.log(res);
        });
      });
  } else {
    console.log("Please select a transaction to sign.");
  }
};

const signTransaction712 = () => {
  if (state.selectedTransaction) {
    const message = createEIP712Message(state.selectedTransaction);
    console.log("message", message);
    const signer = Ethers.provider().getSigner();
    signer._signTypedData(domain, types, message).then((signature) => {
      const messageHash = ethers.utils.id(message);
      console.log("messageHash", messageHash);
      const selectedTxHash = state.selectedTransaction.scenario;
      const url = `${state.baseUrl}/v1/multisig-scenarios/${selectedTxHash}/confirmations/`;
      const params = JSON.stringify({ signature: signature });
      console.log("signature", signature);
      State.update({ signature: signature });
      console.log(params);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: params,
      };
      // Post confirmed signature to the backend
      asyncFetch(url, options).then((res) => {
        console.log(res);
      });
    });
  } else {
    console.log("Please select a transaction to sign.");
  }
};

function createListItems(transaction) {
  return Object.entries(transaction).map(([key, value]) => {
    // Check if value is a BigNumber object
    if (value && typeof value.toString === "function") {
      value = value.toString();
    }

    if (value !== undefined && value !== null) {
      return <li key={key}>{`${key}: ${value}`}</li>;
    }
    return null;
  });
}

const verifySignature = async (originalMessage, signature) => {
  const signerAddress = ethers.utils.verifyMessage(originalMessage, signature);
  console.log("originalMessage", originalMessage);
  console.log("signature", signature);
  console.log("signerAddress", signerAddress);
  return signerAddress;
};

// const Selection = styled.button`
//     background: ${(props) => {
//       console.log(
//         "Current state in styled component:",
//         props.tx,
//         state.selectedTransaction
//       );
//       return state.selectedTransaction &&
//         state.selectedTransaction.scenario === props.tx.scenario
//         ? "palevioletred"
//         : "white";
//     }};

//     color: ${(props) => {
//       console.log(
//         "Current state in styled component:",
//         props.tx,
//         state.selectedTransaction
//       );
//       return state.selectedTransaction &&
//         state.selectedTransaction.scenario === props.tx.scenario
//         ? "white"
//         : "palevioletred";
//     }};
//     font-size: 1em;
//     margin: 1em;
//     padding: 0.25em 1em;
//     border: 2px solid palevioletred;
//     border-radius: 10px;
//     text-align: left;
// `;

const Selection = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 10px;
    text-align: left;
`;

return (
  <div>
    <ul>
      {state.transactions.map((tx, index) => (
        <li key={index} onClick={() => selectTransaction(tx)}>
          <Selection>
            <span>
              From Safe Address: {state.safeAddress}
              <br />
              Type:
              {tx.data
                ? `ERC20 ${tx.dataDecoded.method} 
                  To: ${tx.dataDecoded.parameters[0].value} 
                  Value: ${tx.dataDecoded.parameters[1].value}`
                : `Native Currency Transfer 
                  To: ${tx.to} 
                  Value: ${tx.value} 
                  `}
              <br />
              {
                state.selectedTransaction.safeTxHash == tx.safeTxHash
                  ? "!!!!!!THIS ONE IS SELECTED RIGHT NOW!!!!!!"
                  : "" /** Again I don't know css */
              }
            </span>
          </Selection>
        </li>
      ))}
    </ul>
    <ul>
      {state.scenarios.map((tx, index) => (
        <li key={index} onClick={() => selectTransaction(tx)}>
          <Selection>
            <span>
              <ul>{createListItems(tx)}</ul>
              {state.selectedTransaction.scenario == tx.scenario
                ? `!!!!!!THIS ONE IS SELECTED RIGHT NOW!!!!!!
                  )}`
                : ""}
            </span>
          </Selection>
        </li>
      ))}
    </ul>
    <div>signature : {state.signature}</div>
    <button onClick={() => signTransaction()} label="SignButton">
      <span>Sign Selected Transaction</span>
    </button>
    <button onClick={() => signTransaction712()} label="SignButton">
      <span>Sign Selected Transaction With EIP712</span>
    </button>
    <Web3Connect className="web3-connect" connectLabel="Connect Wallet" />
    <button
      onClick={() =>
        verifySignature(JSON.stringify(state.hashMessage), state.signature)
      }
      label="SignButton"
    >
      <span> Verify Signature </span>
    </button>
  </div>
);
