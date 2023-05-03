const sender = Ethers.send("eth_requestAccounts", [])[0];
// const provider = Ethers.provider();
// const senders = Ethers.listAccounts()[0];

// console.log(ethers);
// if (!sender) return "Please login first";
if (!sender) {
  return <Web3Connect />;
}

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

return (
  <div>
    <p>Account: {sender}</p>
    <p>ChainId: {state.chainId}</p>
    <Web3Connect />
  </div>
);
