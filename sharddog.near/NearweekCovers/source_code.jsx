State.init({
  tokens: [],
});

const accountId = props.accountId ?? context.accountId;

const styles = {
  gridItem: {
    position: "relative",
    textAlign: "center",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
    border: "1px solid #ccc",
    overflow: "hidden",
    margin: "10px",
    background:
      "url(https://my.shard.dog/_next/static/media/dog_pattern.a5034d5c.png), rgba(251, 249, 245, 0.85)",
    color: "#000",
  },
  shelf: {
    content: '""',
    position: "absolute",
    bottom: "-15px",
    left: "10%",
    width: "80%",
    height: "10px",
    backgroundColor: "#aaa",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
    zIndex: -1,
  },
  hoverEffect: {
    transform: "rotate(-2deg) translateY(-10px)",
    transition: "transform 0.3s ease",
  },
};

function fetchTokens() {
  asyncFetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
     query MyQuery {
  mb_views_nft_tokens(
    where: {nft_contract_id: {_eq: "mint.sharddog.near"}, owner: {_eq: "${accountId}"}, reference: {_eq: "https://nftstorage.link/ipfs/bafkreia7y3fwfr3bwafvggjrztkjjq25crgxpbpgc4vfejcvez4yfshazi"}},
    order_by: { token_id: asc }
  ) {
    title
    owner
    minted_timestamp
    media
    extra
    description
  }
    }
        `,
    }),
  }).then((res) => {
    //console.log(res);
    if (res.ok) {
      let tokens = res.body.data.mb_views_nft_tokens;

      // Modify each token to include the parsed link
      tokens = tokens.map((token) => {
        const link = JSON.parse(token.extra).link;
        const releaseDate = JSON.parse(token.extra).date;
        return {
          ...token,
          link: link,
          releaseDate: releaseDate,
        };
      });

     // console.log(tokens);
      State.update({
        tokens: tokens,
      });
    }
  });
}

fetchTokens();

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(344px, 0.1fr));

  @media (hover: none) {
    grid-template-columns: repeat(auto-fill, minmax(344px, 0.1fr));
  }
`;

const wsize = "300px";
const hsize = "420px";

const loader = (
  <div className="loader" key={"loader"}>
    <span
      className="spinner-grow spinner-grow-sm me-1"
      role="status"
      aria-hidden="true"
    />
    Loading ...
  </div>
);


const nfts = Near.view("mint.sharddog.near", "nft_tokens_for_owner", {
  account_id: accountId,
  from_index: "0",
  limit: 2000,
});

if (!nfts) {
  return "";
}
 console.log(nfts);

return (
  <>
    <span style={{ textAlign: "left" }}>
      <h2>My NEARWEEK Covers</h2>
    </span>
    <span style={{ textAlign: "left" }}>
      <i>Powered by ShardDog</i>
    </span>
    <br />
    <div style={styles.gridContainer}>
      <Grid>
  {nfts?.map((nft, i) => {
    if (nft.metadata.reference === "https://nftstorage.link/ipfs/bafkreia7y3fwfr3bwafvggjrztkjjq25crgxpbpgc4vfejcvez4yfshazi") {
      return (
        <div
          key={i}  // It's a good practice to provide a unique key when mapping over items
          style={styles.gridItem}
          onMouseOver={() => {
            // Define what you want to happen on hover here
          }}
        >
          <Widget
            src="sharddog.near/widget/Image.Minted"
            title={nft.owner_id}
            props={{
              title: nft.owner_id,
              timestamp: nft.minted_timestamp,
              image: {
                url: nft.metadata.media,
              },
              style: {
                width: wsize,
                height: hsize,
                objectFit: "cover",
                minWidth: wsize,
                minHeight: hsize,
                maxWidth: wsize,
                maxHeight: hsize,
              },
            }}
          />
          <h4>{nft.title}</h4>
          <p>Released: {JSON.parse(nft.metadata.extra).date}</p>
          <p>
            <a href={JSON.parse(nft.metadata.extra).link} target="_blank" rel="noopener noreferrer">
              READ ISSUE
            </a>
          </p>
        </div>
      );
    }
    return null;  // Return null or some fallback JSX if the condition is not met
  })}
</Grid>

    </div>
  </>
);
