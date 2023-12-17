const action = props.action ? props.action : "feed";
const actionList = [
  {
    name: "play",
    uri: "https://coral-logical-booby-193.mypinata.cloud/ipfs/QmZLs6fvrUjMKarRcH2v55eyqaxEJshpHuVLhPcYaDoAwp/ball.gif",
  },
  {
    name: "feed",
    uri: "https://coral-logical-booby-193.mypinata.cloud/ipfs/QmZLs6fvrUjMKarRcH2v55eyqaxEJshpHuVLhPcYaDoAwp/food.gif",
  },
];

const selectedAction = actionList.find((ac) => ac.name === action);

return (
  <>
    <img src={selectedAction.uri} />
  </>
);
