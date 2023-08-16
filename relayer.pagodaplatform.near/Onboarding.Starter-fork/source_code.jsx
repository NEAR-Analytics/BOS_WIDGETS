const wallet = fetch(
  "https://raw.githubusercontent.com/test1883/walley/main/build/contracts/contracts/Wallet.sol/Wallet.json"
);

State.init({
  contract: undefined,
  chainId: undefined,
});

if (!wallet.ok) {
  return "Loading";
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
  console.log("address: ", wallet);
}
if (state.chainId !== undefined && state.chainId !== 11155111) {
  return <p>Switch to Ethereum Sepolia</p>;
}
const iface = new ethers.utils.Interface(wallet.body);

return (
  <>
    <p>{state.chainId}</p>
  </>
);
