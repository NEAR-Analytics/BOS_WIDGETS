if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 1) {
  return <p>Switch to Ethereum Mainnet</p>;
}

return (
  <div>
    <h1> Composability ftw </h1>
    <Widget src="zavodil.near/widget/swap-styled" />
    <Widget src="zavodil.near/widget/Lido" />
  </div>
);
