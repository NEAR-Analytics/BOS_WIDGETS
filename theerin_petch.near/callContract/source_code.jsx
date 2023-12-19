if (state.sender == undefined && Ethers.provider()) {
  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length) {
        // save sender address to the state
        State.update({ sender: accounts[0] });
      }
    });
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

if (state.sender) {
  if (state.chainId !== 25925) {
    return (
      <div>
        <h3>Wrong Network - We currently support bitkub chain</h3>
      </div>
    );
  }
  return (
    <>
      <Widget src="teama.near/widget/AllPages" />
    </>
  );
} else {
  // output connect button for anon user
  return <Web3Connect />;
}
