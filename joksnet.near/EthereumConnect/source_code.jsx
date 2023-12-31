const signer = Ethers.send("eth_requestAccounts")[0];

console.log("signer", signer);

if (!state.chainId && signer) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

function isConnected() {
  const accounts = Ethers.send("eth_requestAccounts", []);
  console.log("accounts", accounts);
  if (!accounts || accounts.length === 0) {
    State.update({
      error: "Could not connect to wallet",
    });
  } else {
    const account = accounts[0];
    State.update({ account });
  }
}

function connectWallet() {
  if (window.ethereum) {
    ethereum.enable().then(isConnected);
  } else {
    isConnected();
  }
}

function retry() {
  State.update({ error: undefined });
}

if (state.error) {
  return (
    <>
      <p style={{ backgroundColor: "red", color: "white" }}>
        Something happen: {state.error}
      </p>
      <button onClick={retry}>Retry</button>
    </>
  );
}

if (!state.chainId || !signer) {
  return (
    <p>
      <button onClick={connectWallet}>Connect Wallet</button>
    </p>
  );
}
if (state.chainId !== 100) {
  return <p>Switch to Gnosis</p>;
}

return (
  <p>
    Chain: {state.chainId} | Account: {sender}
  </p>
);
