State.init({
  chainId: 0,
});

if (Ethers.provider()) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId === 8217) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
} else {
  return (
    <>
      <Web3Connect connectLabel="Connect with Web3" />
    </>
  );
}

return <>ChainID: {state.chainId}</>;
