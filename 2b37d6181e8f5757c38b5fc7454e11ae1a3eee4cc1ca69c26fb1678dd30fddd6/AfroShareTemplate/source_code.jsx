let { address, tokenId } = props;
State.init({
  loading: false,
  showLogin: true,
  token: {},
  error: null,
  signer: null,
});

const alchemyApiKey = props.alchemyApiKey || "docs-demo";

const loadNFT = () => {
  State.update({ loading: true });
  const options = { method: "GET", headers: { accept: "application/json" } };
  const nfts = fetch(
    `https://eth-goerli.g.alchemy.com/nft/v2/${alchemyApiKey}/getNFTsForCollection?contractAddress=${address}&withMetadata=true&startToken=${tokenId}&limit=1`,
    options
  );
  console.log("nft", nfts);
  if (nfts.status === 403) {
    State.update({ error: "Please add an Alchemy API key" });
  } else {
    State.update({ error: "" });
  }
  State.update({ token: nfts.body.nfts[0] });
  console.log("state.token", state.token);
  State.update({ loading: false });

  const signer = Ethers.send("eth_requestAccounts")[0];
  console.log("signer", signer);
  if (!signer) {
    State.update({ error: "Please login first", showLogin: true });
    return;
  } else {
    State.update({ error: "", signer: signer });
  }
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

loadNFT();

return (
  <div className="EventDetail container card shadow my-5 p-5">
    <div classname="random thing">
      <h1 className="text-center mb-3"> big text </h1>
      <head>
  <title>Mentorship Website</title>
  <style>
    /* Add some basic styles for the page */
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 0;
      padding: 0;
    }
    
    .container {
      padding: 20px;
    }
    
    h1 {
      color: #333;
    }
    
    .livestream-link {
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Mentorship Website</h1>
    <p>Join the livestream conferences with our talented teachers!</p>
    <div class="livestream-link">
      <a href="#" id="livestreamBtn">Join Livestream</a>
    </div>
  </div>

  <script>
    // Add an event listener to the "Join Livestream" button
    document.getElementById('livestreamBtn').addEventListener('click', function(event) {
      event.preventDefault();
      // Replace the '#' with the actual URL of the livestream platform
      var livestreamUrl = 'https://www.example.com/livestream';
      window.open(livestreamUrl, '_blank');
    });
  </script>
</body>
    </div>
    {state.loading && (
      <>
        <p className="text-primary">Loading NFT details...</p>
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
    {state.token && (
      <>
        <h3 className="text-center mb-3">{state.token.title}</h3>
        <div className="container">
          <div className="card shadow-sm">
            <img
              src={state.token.media[0].gateway}
              width={300}
              alt={state.token.title}
            />
            <div className="card-body">
              <p className="card-text">
                <a
                  href={`https://testnets.opensea.io/assets/goerli/${address}/${tokenId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View NFT on Opensea
                </a>
              </p>
            </div>
          </div>
        </div>
      </>
    )}
    {state.error && <p className="text-danger">{state.error}</p>}
    {state.showLogin && (
      <>
        <hr />
        {loginButton}
      </>
    )}
    <hr />{" "}
    <Widget
      src="tomiwa1a1.near/widget/RentNFT"
      props={{
        alchemyApiKey: "uB5QD-LyGRGbOa5--7aWs-dyqxjb3z24",
        address: "0x8842da19ef17d1a10875e0ebddb6981e178b90d2",
        tokenId: 250,
      }}
    />
    <hr />
    <Widget
      src="tomiwa1a1.near/widget/TokenGate"
      props={{
        alchemyApiKey: "uB5QD-LyGRGbOa5--7aWs-dyqxjb3z24",
        address: "0x8842da19ef17d1a10875e0ebddb6981e178b90d2",
        tokenId: 250,
      }}
    />
    <hr />
  </div>
);
