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

const chainId = undefined;

// Function to switch to zkEVM testnet
function switchToTestnet() {
  Ethers.send("wallet_switchEthereumChain", [{ chainId: "0x5a2" }]).then(() => {
    State.update({ chainId });
  });
}

// Function to switch to zkEVM mainnet
function switchToMainnet() {
  Ethers.send("wallet_switchEthereumChain", [{ chainId: "0x44D" }]).then(() => {
    State.update({ chainId });
  });
}

if (
  State.get().chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((data) => {
      const chainId = data?.chainId;
      State.update({ chainId });
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
      {State.get().newId === 1101 ? (
        <div>
          <p>On Polygon zkEVM Mainnet</p>
          <button onClick={switchToTestnet}>Switch to zkEVM Testnet</button>
        </div>
      ) : (
        <div>
          {State.get().newId === 1442 ? (
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
