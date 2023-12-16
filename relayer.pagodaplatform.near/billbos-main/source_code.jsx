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

return <div>{JSON.stringify(context)}</div>;
