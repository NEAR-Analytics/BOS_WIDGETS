const authorId = "manzanal.near";
const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";
const ETH_CHAINID = 1;
State.init({
  network: null,
  networkIsLoaded: false,
});

console.log("ethers", ethers);
if (!state.networkIsLoaded) {
  if (!ethers !== undefined && Ethers.send("eth_requestAccounts", [])[0]) {
    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        console.log("chainId", chainIdData.chainId);
        if (chainIdData.chainId === ETH_CHAINID) {
          // ETH
          State.update({ network: NETWORK_ETH, networlIsLoaded: true });
        } else {
          State.update({ network: NETWORK_NEAR, networlIsLoaded: true });
        }
      });
  } else {
    // ethers not supported on this gateway
    State.update({ network: NETWORK_NEAR, networlIsLoaded: true });
  }
}
const getContent = {
  NETWORK_NEAR: (
    <Widget src={`${authorId}/widget/TokenWrapper.v2.NearWrapper`} props={{}} />
  ),
  NETWORK_ETH: (
    <Widget src={`${authorId}/widget/TokenWrapper.v2.EthWrapper`} props={{}} />
  ),
}[state.network];

console.log("NETWORK", state.network);
if (!state.networkIsLoaded) return <>Loading</>;
return <>{getContent}</>;
