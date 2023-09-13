State.init({
  address: undefined,
  chainId: 0,
  balance: undefined,
});

if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner();

  signer.getAddress().then((address) => {
    State.update({ address });

    if (state.balance === undefined) {
      Ethers.provider()
        .getBalance(address)
        .then((balance) => {
          State.update({
            balance: balance.toString(),
          });
        });
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

return (
  <div>
    <Web3Connect />
    <hr />
    <h1>Your Wallet Info</h1>
    <p>address: {state.address} </p>
    <p>network id: {state.chainId} </p>
    <p>balance: {state.balance} </p>
  </div>
);
