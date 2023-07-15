const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "You need to login first";
const { nftCollectionAddress } = props;
const nftCollectionABI = [
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const getNftContract = async () => {
  const signer = Ethers.provider().getSigner();
  const nftContract = new ethers.Contract(
    nftCollectionAddress,
    nftCollectionABI,
    signer
  );
  nftContract
    .balanceOf(sender)
    .then((res) => {
      console.log(parseInt(res["_hex"], 16));
    })
    .catch((error) => console.log(error));
};

return (
  <div>
    <h1>NFT Gateway</h1>
    <p>You are logged in as : {sender}</p>
    <button onClick={getNftContract}>Login to DAO</button>
  </div>
);
