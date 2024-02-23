const [nftData, setNFTData] = useState([]);

useEffect(() => {
  var query = `query {
                        tokens{
                                id
                                title
                                owner_id
                                media
                                owner_id
                            }
                        }`;

  asyncFetch("https://api.thegraph.com/subgraphs/name/devscloudmex/nativonft", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  })
    .then(({ body }) => {
      setNFTData(body.data.tokens);
    })
    .catch((err) => console.log(err));
}, []);

const loadingUrl =
  props.loadingUrl ??
  "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu";

return (
  <div>
    <h1>BOS + TheGraph</h1>
    {nftData && (
      <>
        <div
          style={{
            marginTop: "10px",
            display: "grid",
            "grid-template-columns": "repeat(3, 1fr)",
            "grid-column-gap": "10px",
            "grid-row-gap": "10px",
          }}
        >
          {nftData &&
            nftData.map(
              (nft, i) =>
                nft.media && (
                  <div>
                    <img
                      src={
                        nft.media !== null
                          ? "https://ipfs.near.social/ipfs/" + nft.media
                          : loadingUrl
                      }
                      style={{ width: "150px", height: "150px" }}
                    />
                    <br />
                    <label>
                      <span style={{ fontWeight: "bold" }}>Token Id:</span>
                      {nft.id}
                    </label>
                    <br />
                    <label>
                      <span style={{ fontWeight: "bold" }}>Title:</span>
                      {nft.title}
                    </label>
                    <label>
                      <span style={{ fontWeight: "bold" }}>Owner:</span>
                      {nft.owner_id}
                    </label>
                  </div>
                )
            )}
        </div>
      </>
    )}
  </div>
);
