const authorId = "manzanal.near";
const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";
const ETH_CHAINID = 1;
State.init({
  network: null,
  networkIsLoaded: false,
});

if (!state.networkIsLoaded) {
  if (!ethers !== undefined && Ethers.send("eth_requestAccounts", [])[0]) {
    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        console.log("chainId", chainIdData.chainId);
        if (chainIdData.chainId === ETH_CHAINID) {
          // ETH
          State.update({ network: NETWORK_ETH, networkIsLoaded: true });
        } else {
          State.update({ network: NETWORK_NEAR, networkIsLoaded: true });
        }
      });
  } else {
    // ethers not supported on this gateway
    State.update({ network: NETWORK_NEAR, networkIsLoaded: true });
  }
}

if (!state.networkIsLoaded) return <>Loading</>;
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
