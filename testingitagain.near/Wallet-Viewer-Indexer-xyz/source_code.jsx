initState({
  walletAddress: "",
  nftData: [],
});

const fetchData = () => {
  State.update({ nftData: [] });

  let data = fetch("https://api.indexer.xyz/graphql", {
    method: "POST",
    headers: {
      "x-api-user": "daniel-prod-V2",
      "x-api-key": "zLJkQsF.0624d9a07b804e068abe5c6c378bccb2",
      apikey_type: "prod",
      role: "prod-user",
      host_name: "api.indexer.xyz",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query MyQuery {
          near {
            nft_meta(where: {nft_state: {owner: {_eq: "${state.walletAddress}"}}}) {
              image
              name
              token_id
              collection {
                slug
              }
              rarity
              ranking
            }
          }
        }`,
    }),
  });

  if (data) {
    const nftData = data.body.data.near.nft_meta;
    State.update({ nftData });
  }
};

const updateWalletAddress = (e) => {
  State.update({ walletAddress: e.target.value });
};

const getRarityColor = (rarity) => {
  if (rarity < 0.1) {
    return "#ee0000";
  } else if (rarity < 0.25) {
    return "#ff9900";
  } else if (rarity < 0.5) {
    return "#ffc300";
  } else {
    return "#61c700";
  }
};

return (
  <div
    style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
    <a href="https://indexer.xyz/" target="_blank" rel="noopener noreferrer">
      <img
        src="https://indexer.xyz/indexer-logo-black.svg"
        alt="Indexer.xyz logo"
        style={{ height: "1.5em", verticalAlign: "middle" }}
      />
    </a>
    <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "20px" }}>
      NFT Wallet Gallery
    </h1>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "30px",
        flexWrap: "wrap",
      }}
    >
      <label
        htmlFor="walletAddressInput"
        style={{ fontSize: "16px", marginRight: "10px" }}
      >
        Enter Wallet Address:
      </label>
      <input
        type="text"
        id="walletAddressInput"
        value={state.walletAddress}
        onChange={updateWalletAddress}
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "5px 10px",
          margin: "0 10px 10px 0",
          flexGrow: 1,
        }}
      />
      <button
        onClick={fetchData}
        style={{
          backgroundColor: "#0070c9",
          border: "none",
          borderRadius: "5px",
          color: "#fff",
          cursor: "pointer",
          padding: "5px 10px",
          marginLeft: "10px",
        }}
      >
        Fetch NFTs
      </button>
    </div>
    {state.nftData.length > 0 && (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {state.nftData.map((nft) => (
          <a
            href={`https://www.tradeport.xyz/near/collection/${nft.collection.slug}/${nft.token_id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                width: "200px",
                textAlign: "center",
              }}
            >
              <img
                src={nft.image}
                alt={nft.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "5px",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
              <h3 style={{ fontSize: "18px", margin: "0 0 10px" }}>
                {nft.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#3f51b5",
                    borderRadius: "20px",
                    color: "#fff",
                    display: "inline-block",
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "3px 8px",
                  }}
                >
                  Rank: {Math.round(nft.ranking)}
                </span>
              </div>
              <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                Token ID: {nft.token_id}
              </p>
              <p style={{ fontSize: "14px" }}>
                Collection: {nft.collection.slug}
              </p>
            </div>
          </a>
        ))}
      </div>
    )}
  </div>
);
