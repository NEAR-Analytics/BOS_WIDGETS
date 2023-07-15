let { address, tokenId } = props;

let currentTime = new Date().getTime() / 1000;

State.init({
  destination: props.destination,
  expires: currentTime,
  transaction: null,
  loading: false,
  error: null,
});

const mintNFT = () => {
  const nftABI = fetch(
    "https://raw.githubusercontent.com/atilatech/together/f69d581b5f6d14b1d9f0d85dbd488f6d7ebce01b/src/artifacts/contracts/RentableNFT.sol/RentableNFT.json"
  );

  console.log("nftABI", nftABI);

  const signer = Ethers.provider().getSigner();

  const contractAbi = JSON.parse(nftABI.body);
  console.log("signer, contractAbi", { signer, contractAbi });
  const nftContract = new ethers.Contract(address, contractAbi.abi, signer);
  console.log({ nftContract });
  console.log("state.destination", state.destination);
  nftContract["mint()"]()
    .then((transaction) => {
      console.log("Transaction Hash:", transaction);
      State.update({ loading: true });
      transaction.wait().then(() => {
        console.log("NFT rented successfully!");
        State.update({ transaction: transaction, loading: false });
        console.log(
          "Transaction URL:",
          `https://goerli.etherscan.io/tx/${transaction.hash}`
        );
      });
    })
    .catch((error) => {
      console.log("error", error);
      State.update({ error: error.reason || "Error occured in transaction" });
    });
};

const transferButton = (
  <button
    className="btn btn-primary m-3"
    onClick={() => mintNFT()}
    disabled={state.loading}
  >
    Mint NFT
  </button>
);

const setDestinationAddress = (value) => {
  State.update({ destination: value });
};

return (
  <div className="EventDetail container card shadow my-5 p-5">
    <h3 className="text-center mb-3">Mint NFT</h3>
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <label className="mb-1">Destination Address</label>
          <input
            type="text"
            placeholder="Enter Destination Address"
            value={state.destination}
            onChange={(e) => setDestinationAddress(e.target.value)}
            className="form-control mb-3"
          />
          {expiresSection}
          {transferButton}
          {state.loading && (
            <>
              <p className="text-primary">Loading transaction...</p>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </>
          )}
          {state.transaction && (
            <p className="text-success">
              Rental was succesful!
              <a
                href={`https://goerli.etherscan.io/tx/${state.transaction.hash}`}
                target="_blank"
                rel="noreferrer"
              >
                View Transaction
              </a>
            </p>
          )}
          {state.error && <p className="text-danger">{state.error}</p>}
        </div>
      </div>
    </div>
  </div>
);
