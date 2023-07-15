let { address, tokenId } = props;

let currentTime = new Date().getTime() / 1000;

State.init({
  tokenId: props.tokenId,
  owner: props.owner,
  balance: props.balance,
  expires: currentTime,
  transaction: null,
  loading: false,
  error: null,
});

const getBalanceOf = () => {
  const nftABI = fetch(
    "https://raw.githubusercontent.com/atilatech/together/f69d581b5f6d14b1d9f0d85dbd488f6d7ebce01b/src/artifacts/contracts/RentableNFT.sol/RentableNFT.json"
  );

  const signer = Ethers.provider().getSigner();

  const contractAbi = JSON.parse(nftABI.body);
  console.log({ signer, contractAbi });
  const nftContract = new ethers.Contract(address, contractAbi.abi, signer);
  console.log({ nftContract });

  nftContract["ownerOf(uint256)"](Number.parseInt(tokenId))
    .then((owner) => {
      console.log({ owner });
      State.update({ loading: true });
      State.update({ owner: owner });

      //   var inputElement = document.getElementById("owner_address");
      //   Change the value of the input element
      //   inputElement.value = "New Value";

      //   console.log(ownerInput);
    })
    .catch((error) => {
      console.log("error", error);
      State.update({ error: error.reason || "Error occured in transaction" });
    });
};

const transferButton = (
  <button
    className="btn btn-primary m-3"
    onClick={() => getBalanceOf()}
    disabled={state.loading}
  >
    Get your Balance
  </button>
);

const setOwner = (value) => {
  console.log({ value });
  State.update({ owner: value });
};
const setTokenId = (value) => {
  State.update({ tokenId: value });
};

return (
  <div className="EventDetail container card shadow my-5 p-5">
    <h3 className="text-center mb-3">Find Owner of Given TokenId</h3>
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <label className="mb-1">TokenId</label>
          <input
            type="text"
            placeholder="Enter TokenId"
            value={props.owner}
            onChange={(e) => setTokenId(e.target.value)}
            className="form-control mb-3"
          />
          <label className="mb-1">
            Owner of tokenId: {tokenId} is {props.owner || "<Owner Address>"}
          </label>
          <input
            type="text"
            id="owner_address"
            placeholder="Owner Address"
            value={props.balance}
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
