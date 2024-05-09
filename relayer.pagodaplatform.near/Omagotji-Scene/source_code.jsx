const scene = props.scene ? props.scene : "necromancer-lab";
const width = props.width ? props.width : 800;
const height = props.height ? props.height : 800;
const sceneList = [
  {
    name: "arena",
    uri: "https://coral-logical-booby-193.mypinata.cloud/ipfs/QmZLs6fvrUjMKarRcH2v55eyqaxEJshpHuVLhPcYaDoAwp/arena.png",
  },
  {
    name: "necromancer-lab",
    uri: "https://coral-logical-booby-193.mypinata.cloud/ipfs/QmZLs6fvrUjMKarRcH2v55eyqaxEJshpHuVLhPcYaDoAwp/necromancer-lab.png",
  },
  {
    name: "city-square",
    uri: "https://coral-logical-booby-193.mypinata.cloud/ipfs/QmZLs6fvrUjMKarRcH2v55eyqaxEJshpHuVLhPcYaDoAwp/city-square.png",
  },
  {
    name: "forest",
    uri: "https://coral-logical-booby-193.mypinata.cloud/ipfs/QmZLs6fvrUjMKarRcH2v55eyqaxEJshpHuVLhPcYaDoAwp/forest.png",
  },
  {
    name: "magical-forest",
    uri: "https://coral-logical-booby-193.mypinata.cloud/ipfs/QmZLs6fvrUjMKarRcH2v55eyqaxEJshpHuVLhPcYaDoAwp/magical-forest.png",
  },
];

const selectedScene = sceneList.find((sc) => sc.name === scene);

const Container = styled.div`
  width: ${width}px;
  height: ${height}px;
  background: url("${selectedScene.uri}") no-repeat center;
  background-size: cover;
`;

return <Container></Container>;
