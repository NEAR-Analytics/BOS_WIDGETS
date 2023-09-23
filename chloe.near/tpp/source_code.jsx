const accountId = props.accountId || context.accountId;

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

// This state variable holds the current chainId
const [chainId, setChainId] = useState(null);

// Styling for the Wrapper
const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

// Function to fetch and set the current chainId from the network
const getCurrentChainId = () => {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      setChainId(chainId);
    })
    .catch((error) => {
      console.error("Failed to get chainId:", error);
    });
};

// Function to switch to zkEVM mainnet
const switchToMainnet = () => {
  Ethers.send("wallet_switchEthereumChain", [{ chainId: "0x44D" }])
    .then(() => {
      setChainId(1101);
    })
    .catch((error) => {
      console.error("Failed to switch to mainnet:", error);
    });
};

function switchEthereumChain(chainId) {
  const chainIdHex = `0x${chainId.toString(16)}`;
  const res = Ethers.send("wallet_switchEthereumChain", [
    { chainId: chainIdHex },
  ]);
  // If `res` === `undefined`, it means switch chain failed, which is very weird but it works.
  // If `res` is `null` the function is either not called or executed successfully.
  if (res === undefined) {
    console.log(
      `Failed to switch chain to ${chainId}. Add the chain to wallet`
    );
    const config = getNetworkConfig(chainId);
    Ethers.send("wallet_addEthereumChain", [
      {
        chainId: chainIdHex,
        chainName: config.chainName,
        nativeCurrency: config.nativeCurrency,
        rpcUrls: [config.rpcUrl],
      },
    ]);
  }
}

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((data) => {
      const chainId = data?.chainId;
      const config = getNetworkConfig(chainId);
      if (!config) {
        console.log(`Unsupport chain, chainId: ${chainId}`);
        State.update({ isChainSupported: false });
        switchEthereumChain(DEFAULT_CHAIN_ID);
      } else {
        State.update({ chainId, isChainSupported: true });
      }
    });
}

// Call the function to set the current chainId
getCurrentChainId();

return (
  <Wrapper>
    <div>
      <h2>Welcome to The People's Place</h2>
      <h3 style={{ whiteSpace: "pre-line" }}>{accountId}</h3>
      <h1>Current Chain ID: {chainId}</h1>
      {chainId === 1101 ? (
        <h3>On Polygon</h3>
      ) : (
        <p>Please switch to Polygon zkEVM</p>
      )}
    </div>
    {chainId !== 1101 && (
      <div>
        <button onClick={switchToMainnet}>Switch to zkEVM Mainnet</button>
      </div>
    )}
  </Wrapper>
);
