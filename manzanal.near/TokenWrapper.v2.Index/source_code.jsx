const authorId = "manzanal.near";
const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";
const ETH_CHAINID = 1;
State.init({
  network: null,
  networkIsLoaded: false,
  error: null,
});

console.log("ethers", ethers);
if (!state.networkIsLoaded) {
  if (ethers !== undefined) {
    console.log(
      "eth_requestAccounts",
      Ethers.send("eth_requestAccounts", [])[0]
    );
    if (Ethers.send("eth_requestAccounts", [])[0]) {
      Ethers.provider()
        .getNetwork()
        .then((chainIdData) => {
          console.log("chainId", chainIdData.chainId);
          if (chainIdData.chainId === ETH_CHAINID) {
            // ETH
            State.update({
              network: NETWORK_ETH,
              networkIsLoaded: true,
              error: null,
            });
          } else {
            State.update({
              network: null,
              networkIsLoaded: true,
              error: "Wrong network. Please connect to Ethereum mainnet",
            });
          }
        });
    } else {
      // ethers not supported on this gateway
      State.update({
        network: NETWORK_NEAR,
        networkIsLoaded: true,
        error: null,
      });
    }
  } else {
    // ethers not supported on this gateway
    State.update({ network: NETWORK_NEAR, networkIsLoaded: true, error: null });
  }
}

console.log("NETWORK", state.network);
if (!state.networkIsLoaded) return <>Loading</>;
if (state.error) return <>{state.error}</>;
const getContent = {
  NEAR: (
    <Widget src={`${authorId}/widget/TokenWrapper.v2.NearWrapper`} props={{}} />
  ),
  ETH: (
    <Widget src={`${authorId}/widget/TokenWrapper.v2.EthWrapper`} props={{}} />
  ),
}[state.network];

const Container = styled.div`
  width: 100%;

  * {
    margin: 0;
  }
`;
return <Container>{getContent}</Container>;
