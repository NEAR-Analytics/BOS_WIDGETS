let { address, tokenId } = props;
State.init({
  showLogin: false,
  destination: props.destination,
  transaction: null,
  loading: false,
  error: null,
  eventUnlocked: false,
});

const checkNFT = () => {
  const sender = Ethers.send("eth_requestAccounts")[0];
  console.log("sender", sender);
  if (!sender) {
    State.update({ error: "Please login first", showLogin: true });
    return;
  } else {
    State.update({ error: "" });
  }

  const message = `Access Eden's Afropolitan token gated event with token ${address} and tokenId ${tokenId}}`;
  const signer = Ethers.provider().getSigner();
  signer.signMessage(message).then((signature) => {
    console.log({ message, signature, ethers });
    console.log(
      "ethers.utils.verifyMessage(message, signature)",
      ethers.utils.verifyMessage(message, signature)
    );
    const signerAddress = ethers.utils.verifyMessage(message, signature);
    console.log({ signerAddress, sender });
    if (signerAddress.toLowerCase() !== sender.toLowerCase()) {
      State.update({ error: "Signing address doesn't match user address" });
    } else {
      checkNFTOwnership(sender);
    }
  });
};

const checkNFTOwnership = (sender) => {
  // check that this address is the owner of the token or is the userOf the token
  const nftABI = fetch(
    "https://raw.githubusercontent.com/atilatech/together/f69d581b5f6d14b1d9f0d85dbd488f6d7ebce01b/src/artifacts/contracts/RentableNFT.sol/RentableNFT.json"
  );

  const contractAbi = JSON.parse(nftABI.body);
  const nftContract = new ethers.Contract(
    address,
    contractAbi.abi,
    Ethers.provider().getSigner()
  );
  console.log("sender, contractAbi, nftContract", {
    sender,
    contractAbi,
    nftContract,
  });

  nftContract["ownerOf(uint256)"](Number.parseInt(tokenId)).then((owner) => {
    console.log({ owner });
    if (owner.toLowerCase() === sender.toLowerCase()) {
      State.update({ eventUnlocked: true });
      return;
    }
    nftContract["userOf(uint256)"](Number.parseInt(tokenId)).then((user) => {
      console.log({ user });
      if (user.toLowerCase() === sender.toLowerCase()) {
        State.update({ eventUnlocked: true });
      } else {
        State.update({ error: "You are not the owner or user of this NFT" });
      }
    });
  });
};

const unlockButton = state.eventUnlocked ? (
  <button className="btn btn-success m-3" disabled={state.loading}>
    Access Event
  </button>
) : (
  <button
    className="btn btn-primary m-3"
    onClick={() => checkNFT()}
    disabled={state.loading}
  >
    Verify Ownership
  </button>
);

const setDestinationAddress = (value) => {
  State.update({ destination: value });
};

const loginButton = (
  <Web3Connect
    className="FormSubmitContainer"
    connectLabel={web3connectLabel}
    onConnect={(provider) => {
      console.log("provider", provider);
      State.update({ provider });
    }}
  />
);

const lockedEventImage = (
  <img src={state.token.media[0].gateway} width={300} alt={state.token.title} />
);

const lockedImage = "https://i.imgur.com/EsThDIl.jpg";
const unlockedImage = "https://i.imgur.com/6qyuwCf.jpg";

return (
  <div className="EventDetail container card shadow my-5 p-5">
    <h3 className="text-center mb-3">Eden Token Gated Event</h3>
    <p className="text-center">
      This event is gated by a token. You must own or be renting the token to be
      able to attend.
    </p>
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <img
            src={state.eventUnlocked ? unlockedImage : lockedImage}
            width={300}
            alt={state.token.title}
          />
          {unlockButton}

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
              Transfer was succesful!
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
          <hr />
          {state.showLogin && loginButton}
        </div>
      </div>
    </div>
  </div>
);
