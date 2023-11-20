State.init({
  // Assuming chainId is a numeric ID of the blockchain being used
  chainId: 1, // For Ethereum Mainnet, for instance

  // Base URL could be your API endpoint or a relevant URL for your app's backend
  baseUrl: "https://api.yourapp.com",

  // Mock a safe address, typically in Ethereum address format
  safeAddress: "0x1234567890abcdef1234567890abcdef12345678",

  // Mock a sender address, similar to safeAddress
  sender: "0xabcdef1234567890abcdef1234567890abcdef12",

  // Mock an array of transactions
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
    // ... more mock transactions ...
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

// choose relevant transaction to sign and confirm
const selectTransaction = (tx) => {
  State.update({ selectedTransaction: tx });
};

// sign relevant transaction
const signTransaction = () => {
  if (state.selectedTransaction) {
    const selectedTxHash = state.selectedTransaction.safeTxHash;
    const signer = Ethers.provider().getSigner();
    signer.signMessage(ethers.utils.arrayify(selectedTxHash)).then((sig) => {
      const setV = ethers.utils.hexDataSlice(sig, 0, 64) + "1f";

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

// I don't know any CSS so please forgive the following fuckery
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
