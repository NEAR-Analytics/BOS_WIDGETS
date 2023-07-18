const authorId = "manzanal.near";
const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";

const getContent = {
  NETWORK_NEAR: (
    <Widget src={`${authorId}/widget/TokenWrapper.v2.NearWrapper`} props={{}} />
  ),
  NETWORK_ETH: (
    <Widget src={`${authorId}/widget/TokenWrapper.v2.EthWrapper`} props={{}} />
  ),
}[state.network];

console.log("NETWORK", state.network);

return getContent;
