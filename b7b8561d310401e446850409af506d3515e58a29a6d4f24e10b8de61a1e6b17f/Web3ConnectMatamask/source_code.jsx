State.init({
  chainId: 1, // For Ethereum Mainnet, for instance
  baseUrl: "https://api.yourapp.com",
  safeAddress: "0x1234567890abcdef1234567890abcdef12345678",
  sender: "0xabcdef1234567890abcdef1234567890abcdef12",
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
      to: "0x1234567890abcdef1234567890abcdef12345678",
      value: "0",
    },
  ],

  // Mock a selected transaction, could be null initially
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
  chainId: 1,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
};

const types = {
  Transaction: [
    { name: "to", type: "address" },
    { name: "value", type: "uint256" },
    { name: "data", type: "bytes" },
  ],
};

// choose relevant transaction to sign and confirm
const selectTransaction = (tx) => {
  State.update({ selectedTransaction: tx });
};

const createEIP712Message = (transaction) => {
  let formattedData;
  if (transaction.data && transaction.data.dataDecoded) {
    formattedData = ethers.utils.defaultAbiCoder.encode(
      ["string", "address", "uint256"],
      [
        transaction.data.method,
        transaction.data.dataDecoded.parameters[0].value,
        transaction.data.dataDecoded.parameters[1].value,
      ]
    );
  } else {
    formattedData = "0x";
  }

  return {
    to: transaction.to,
    value: transaction.value,
    data: formattedData,
  };
};

const signTransaction = () => {
  if (state.selectedTransaction) {
    // Assuming createEIP712Message is defined as shown previously
    const message = createEIP712Message(state.selectedTransaction);
    console.log(message);
    const signer = Ethers.provider().getSigner();

    // Use _signTypedData for EIP-712 compliant signing
    signer._signTypedData(domain, types, message).then((signature) => {
      // Process and send the signature as you did previously
      // You might need to adjust how you handle the signature based on your backend's requirements

      const selectedTxHash = state.selectedTransaction.safeTxHash;
      const url = `${state.baseUrl}/v1/multisig-transactions/${selectedTxHash}/confirmations/`;
      const params = JSON.stringify({ signature: signature });
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

const Selection = styled.button`
    background: ${(tx) =>
      state.selectedTransaction == tx ? "palevioletred" : "white"};
    color: ${(props) => (props.primary ? "white" : "palevioletred")};
  
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 10px;
  `;

return (
  <div>
    <input
      value={state.safeAddress}
      onChange={(e) => State.update({ safeAddress: e.target.value })}
      placeholder="Enter Safe address to view txs"
      label="SafeAddressInput"
    />
    <p>Queued transactions:</p>
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
    <button onClick={() => signTransaction()} label="SignButton">
      <span>Sign Selected Transaction</span>
    </button>
    <Web3Connect className="web3-connect" connectLabel="Connect Wallet" />
  </div>
);
