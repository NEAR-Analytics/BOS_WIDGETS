const { contractAddress, contractABI } = fetch(
  "https://raw.githubusercontent.com/test1883/walley/main/build/contracts/contracts/Wallet.sol/Wallet.json"
).body;

State.init({
  contract: undefined,
  chainId: undefined,
});

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
  console.log("here");
} else {
  console.log("hehe");
}
if (state.chainId !== undefined && state.chainId !== 11155111) {
  return <p>Switch to Ethereum Sepolia</p>;
}

return (
  <>
    <p>{state.chainId}</p>
  </>
);
