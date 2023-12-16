State.init({
  chainId: null,
  walletAddress: null,
  walletConnected: false,
});

function checkProvider() {
  const provider = Ethers.provider();
  if (provider) {
    State.update({ walletConnected: true });
  } else {
    State.update({ walletConnected: false });
  }
}
checkProvider();
return (
  <div>
    {JSON.stringify(state)}
    {state.walletConnected ? (
      <Widget src="porx-dev.near/widget/billbos-header" props={{}} />
    ) : (
      <Widget src="porx-dev.near/widget/billbos-authen" props={{}} />
    )}
  </div>
);
