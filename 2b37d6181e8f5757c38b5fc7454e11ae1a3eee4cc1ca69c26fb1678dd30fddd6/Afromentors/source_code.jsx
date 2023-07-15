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
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Inter",
          fontSize: "40px",
          color: "#333",
          fontWeight: "bold",
          letterSpacing: "-1px",
        }}
      >
        Afromentors
      </h1>
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
        Connecting members of the Afropolitan community with relevant teachers,
        mentors, and seminars, <br /> Afromentors gives Afropolitan NFT holders
        tight-knit learning and networking opportunities <br /> while letting
        teachers earn compensation for their expertise.
      </p>
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
      src="2b37d6181e8f5757c38b5fc7454e11ae1a3eee4cc1ca69c26fb1678dd30fddd6/widget/Mentor_Widget_1"
      props={{
        alchemyApiKey: "uB5QD-LyGRGbOa5--7aWs-dyqxjb3z24",
        address: "0x8842da19ef17d1a10875e0ebddb6981e178b90d2",
        tokenId: 250,
      }}
    />
    <hr />
    <Widget
      src="2b37d6181e8f5757c38b5fc7454e11ae1a3eee4cc1ca69c26fb1678dd30fddd6/widget/Mentor_Widget_2"
      props={{
        alchemyApiKey: "uB5QD-LyGRGbOa5--7aWs-dyqxjb3z24",
        address: "0x8842DA19Ef17D1a10875E0ebddb6981e178B90d2",
        tokenId: 250,
      }}
    />
    <hr />
    <Widget
      src="2b37d6181e8f5757c38b5fc7454e11ae1a3eee4cc1ca69c26fb1678dd30fddd6/widget/Mentor_Widget_3"
      props={{
        alchemyApiKey: "uB5QD-LyGRGbOa5--7aWs-dyqxjb3z24",
        address: "0x8842DA19Ef17D1a10875E0ebddb6981e178B90d2",
        tokenId: 250,
      }}
    />
    <Widget
      src="2b37d6181e8f5757c38b5fc7454e11ae1a3eee4cc1ca69c26fb1678dd30fddd6/widget/RentNFT"
      props={{
        alchemyApiKey: "uB5QD-LyGRGbOa5--7aWs-dyqxjb3z24",
        address: "0x8842da19ef17d1a10875e0ebddb6981e178b90d2",
        tokenId: 250,
      }}
    />
    <hr />
  </div>
);
