const GameButton = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 10px;
  padding: 0.5em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  &:hover {
    background: white;
    color: palevioletred;
  }
`;

// Styling for the Wrapper
const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

if (!accountId) {
  return (
    <div>
      <p>Please connect your NEAR wallet or create a new one:</p>
      <a href="https://near.org/signup" target="_blank" rel="noreferrer">
        <GameButton>Create NEAR Wallet</GameButton>
      </a>
    </div>
  );
}

function initialChainState() {
  return {
    chainId: 0,
    newId: 0,
  };
}

State.init(initialChainState());

// Function to fetch and set the current chainId from the network
function getCurrentChainId() {
  Ethers.provider()
    .getNetwork()
    .then((chainData) => {
      const chainId = chainData.chainId;
      State.update({ chainId });
    });
}

// Call the function to set the current chainId
getCurrentChainId();

// Function to switch to zkEVM testnet
function switchToTestnet() {
  Ethers.send("wallet_switchEthereumChain", [{ chainId: "0x5a2" }]).then(() => {
    getCurrentChainId(); // You should call the function to update the chainId
  });
}

// Function to switch to zkEVM mainnet
function switchToMainnet() {
  Ethers.send("wallet_switchEthereumChain", [{ chainId: "0x44D" }]).then(() => {
    getCurrentChainId(); // You should call the function to update the chainId
  });
}

if (
  State.get().chainId === undefined &&
  ethers !== undefined &&
  Ethers.getSigner()
) {
  Ethers.provider()
    .getNetwork()
    .then((data) => {
      const chainId = data?.chainId;
      State.update({ chainId, isChainSupported: true });
    })
    .catch((error) => {
      console.error("Failed to get network:", error);
    });
}

return (
  <Wrapper>
    <div>
      <h2>Welcome to The People's Place</h2>
      <p style={{ whiteSpace: "pre-line" }}>{accountId}</p>
      <h1>Current Chain ID: {State.get().chainId}</h1>
      {State.get().chainId === "0x44D" ? (
        <div>
          <p>On Polygon zkEVM Mainnet</p>
          <button onClick={switchToTestnet}>Switch to zkEVM Testnet</button>
        </div>
      ) : (
        <div>
          {State.get().chainId === "0x5A2" ? (
            <div>
              <p>On Polygon zkEVM Testnet</p>
              <button onClick={switchToMainnet}>Switch to zkEVM Mainnet</button>
            </div>
          ) : (
            <div>
              <p>Please switch to Polygon zkEVM</p>
              <button onClick={switchToTestnet}>Switch to zkEVM Testnet</button>
              <button onClick={switchToMainnet}>Switch to zkEVM Mainnet</button>
            </div>
          )}
        </div>
      )}
    </div>
  </Wrapper>
);
