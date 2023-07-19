const authorId = "manzanal.near";
const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";
const NETWORK_POLYGON = "POLYGON";
const ETH_CHAINID = 1;
const POLYGON_CHAINID = 137;
State.init({
  network: null,
  networkIsLoaded: false,
  error: null,
  sender: null,
});

const getEVMAccountId = () => {
  if (ethers !== undefined) {
    return Ethers.send("eth_requestAccounts", [])[0] ?? "";
  }
  return "";
};

if (state.sender === undefined) {
  return State.update({
    sender: getEVMAccountId(),
  });
}

console.log("ethers", ethers);
if (!state.networkIsLoaded) {
  if (state.sender) {
    console.log("ethers is loading network");
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
        } else if (chainIdData.chainId === POLYGON_CHAINID) {
          // POLYGON
          State.update({
            network: NETWORK_POLYGON,
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
    <Widget
      src={`${authorId}/widget/TokenWrapper.v2.EthWrapper`}
      props={{ sender: state.sender }}
    />
  ),
  POLYGON: (
    <Widget
      src={`${authorId}/widget/TokenWrapper.v2.MaticWrapper`}
      props={{}}
    />
  ),
}[state.network];

const Container = styled.div`
  width: 100%;

  * {
    margin: 0;
  }
`;
return <Container>{getContent}</Container>;
