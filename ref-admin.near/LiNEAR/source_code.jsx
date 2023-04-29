/** common lib start */
const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
const NEAR_DECIMALS = 24;
const BIG_ROUND_DOWN = 0;

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}
/** common lib end */

// Config for LiNEAR app
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "ref-admin.near",
        contractId: "linear-protocol.near",
        nodeUrl: "https://rpc.mainnet.near.org",
        appUrl: "https://app.linearprotocol.org",
      };
    case "testnet":
      return {
        ownerId: "juaner.testnet",
        contractId: "linear-protocol.testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        appUrl: "https://testnet.linearprotocol.org",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);
const { tabName } = state;
State.init({
  tabName: "stake", // stake | unstake
});

const Main = styled.div`
  position: relative;
`;

const updateTabName = (tabName) =>
  State.update({
    tabName,
  });

return (
  <Main>
    {state.tabName === "stake" && (
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Stake`}
        props={{ config, updateTabName }}
      />
    )}
    {state.tabName === "unstake" && (
      <Widget
        src={`${config.ownerId}/widget/LiNEAR.Unstake`}
        props={{ config, updateTabName }}
      />
    )}
  </Main>
);
