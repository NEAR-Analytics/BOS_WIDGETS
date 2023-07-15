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

  const message = `Access Afropolitan token gated event with token ${address} and tokenId ${tokenId}}`;
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
  <img src={state.token.media[0].gateway} width={200} alt={state.token.title} />
);

const lockedImage = "https://cdn-icons-png.flaticon.com/512/44/44594.png";
const unlockedImage =
  "https://cdn3.vectorstock.com/i/1000x1000/90/12/stylish-black-man-programmer-sitting-vector-20219012.jpg";

return (
  <div className="EventDetail container card shadow my-5 p-5">
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3
            style={{
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "30px",
              color: "#333",
              fontWeight: "bold",
              letterSpacing: "-1px",
            }}
          >
            Jason Sun: Software Career Paths
          </h3>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "18px",
              color: "#777",
              fontWeight: "normal",
              letterSpacing: "0",
            }}
          >
            7/16/2023 <br /> 4:00 - 5:30 PM EST <br /> Mentorship, Career Paths{" "}
            <br /> Jason Sun, Senior Software Architect at Google, offers an
            advising session about opportunities in the software landscape,
            navigating big tech hiring, and the future of computer science jobs.
          </p>
          <img
            src={state.eventUnlocked ? unlockedImage : lockedImage}
            width={200}
            alt={state.token.title}
          />
          {unlockButton}

          {state.eventUnlocked && (
            <a href="https://google.com" target="_blank">
              <p>Event Unlocked - Access Here</p>
            </a>
          )}

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
