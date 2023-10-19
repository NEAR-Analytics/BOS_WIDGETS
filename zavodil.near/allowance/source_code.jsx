const networks = {
  1: {
    name: "ETH",
    url: "https://eth.blockscout.com/api?module=account&action=txlist&address=%sender%",
  },
  137: { name: "Polygon" },
  324: { name: "ZkSync" },
};

const etherProviderEnabled = !!Ethers?.provider();

const dataLoadedFor = () => `${state.chainId}_${state.sender}`;
let approvals = [];

if (etherProviderEnabled) {
  Ethers.provider()
    .send("eth_chainId", [])
    .then((chainId) => {
      chainId = parseInt(chainId, 16);
      if (state.chainId !== chainId) {
        console.log("Set chainId", chainId);
        State.update({ chainId });
      }
    });

  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length && state.sender !== accounts[0]) {
        console.log("Set sender", accounts[0]);
        State.update({ sender: accounts[0] });
      }
    });

  if (
    state.chainId &&
    state.sender &&
    networks[state.chainId].url &&
    state.dataLoadedFor != dataLoadedFor()
  ) {
    const txData = fetch(
      networks[state.chainId].url.replace("%sender%", state.sender)
    ).body;

    if (!txData) return "";

    if (txData.status === "1") {
      State.update({ txData: txData.result, dataLoadedFor: dataLoadedFor() });
    } else {
      console.log("Service unavailable", txData.status);
    }
  }

  if (state.txData) {
    approvals = state.txData.filter((tx) => tx.input.startsWith("0x095ea7b3"));
  }
}

const switchNetwork = (chainId) => {
  if (etherProviderEnabled && chainId) {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: ethers.utils.hexValue(chainId) },
    ]);
  }
};

return (
  <div>
    {etherProviderEnabled && (
      <select
        onChange={(e) => switchNetwork(Number(e.target.value))}
        value={state.chainId}
      >
        {Object.keys(networks).map((networkId) => (
          <option value={networkId}>{networks[networkId].name}</option>
        ))}
      </select>
    )}

    <pre>{JSON.stringify(state.chainId)}</pre>
    <pre>{state.sender}</pre>
    {approvals.map((approval) => (
      <p>
        ${approval.from}_${approval.to}
      </p>
    ))}

    <Web3Connect />
  </div>
);
