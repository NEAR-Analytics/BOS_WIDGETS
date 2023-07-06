let { title, description, image, address, tokenId, destination } = props;

const transferNFT = () => {
  const nftABI = fetch(
    "https://raw.githubusercontent.com/atilatech/together/master/src/artifacts/contracts/NFT.sol/NFT.json"
  );

  console.log("nftABI", nftABI);

  const sender = Ethers.send("eth_requestAccounts");
  console.log("sender", sender);
  if (!sender) {
    console.log("Please login first");
    // window.ethereum.send("eth_requestAccounts");
    console.log(" window.ethereum.send");
  }

  const signer = Ethers.provider().getSigner();

  console.log("sender, signer", { sender, signer });
  const nftContract = new ethers.Contract(address, nftABI.body, signer);
  console.log({ nftContract });

  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  nftContract.submit(address, { value: amount }).then((transactionHash) => {
    console.log("NFT transferred successfully!");

    console.log("Transaction Hash:", transactionHash);
    console.log(
      "Transaction URL:",
      `https://goerli.etherscan.io/tx/${transactionHash}`
    );
  });
};

return (
  <div className="EventDetail container card shadow my-5 p-5">
    <h1 className="text-center mb-3">{title} abc</h1>
    <div className="container">
      <div className="card shadow-sm">
        <img src={image} width={300} alt={title} />

        <div className="card-body">
          <p className="card-text">{description}</p>

          <input
            type="text"
            placeholder="Enter Destination Address"
            value={destination}
            onChange={(e) => setDestinationAddress(e.target.value)}
            className="form-control mb-3"
          />

          <button className="btn btn-primary m-3" onClick={() => transferNFT()}>
            Transfer NFT
          </button>
        </div>
      </div>
    </div>
  </div>
);
