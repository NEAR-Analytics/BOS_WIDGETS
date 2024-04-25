// Initialize variables with default values or from props
const limit = 20;
const series = props.series ?? "496";
const title = props.title ?? "Total";
const showHeader = props.showHeader ?? true;
const showImage = props.showImage ?? false;

// Initialize state
State.init({
  offset: 0,
  tokens: [],
  hasMore: true,
});

let isFetching = false; // Lock variable to prevent simultaneous fetches

// Function to fetch tokens
function fetchTokens() {
  if (isFetching || !state.hasMore) return; // Exit if a fetch is already in progress or no more tokens to fetch
  isFetching = true; // Set lock to true

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
                limit: ${limit},
                offset: ${state.offset},
                where: { 
                  nft_contract_id: { _eq: "mint.sharddog.near" }, 
                  token_id: {_regex: "^${series}:", _neq: "496:1"} 
                },
                order_by: {minted_timestamp: desc}
            ) {
              token_id
              media
              owner
            }
          }
        `,
    }),
  }).then((res) => {
    isFetching = false; // Release lock
    if (res.ok) {
      const newTokens = res.body.data.mb_views_nft_tokens;

      if (newTokens.length > 0) {
        State.update({
          tokens: [...state.tokens, ...newTokens],
          offset: state.offset + limit,
          hasMore: true,
        });
      } else {
        State.update({
          hasMore: false,
        });
      }
    }
  });
}

// Function to display each NFT
function Sharddog({ owner, media }) {
  const size = "100px";
  return (
    <div className="row">
      <div className="col-sm-3">
        {showImage && (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: { url: media },
              style: {
                width: size,
                height: size,
                objectFit: "cover",
                minWidth: size,
                minHeight: size,
                maxWidth: size,
                maxHeight: size,
                overflowWrap: "break-word",
              },
            }}
          />
        )}
      </div>
      <div className="col-sm-12">
        <Widget
          src="ndcplug.near/widget/ProfileCard.AddToDAO"
          props={{ accountId: owner }}
        />
      </div>
    </div>
  );
}

const size = "144px";

const Grid = styled.div`
  display: row;
`;

// Loader to display while fetching data
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

// Extract "n" from the first fetched token's ID and subtract 1
const total =
  state.tokens.length > 0
    ? parseInt(state.tokens[0].token_id.split(":")[1]) - 1
    : 0;

// Final rendering
return (
  <>
    {showHeader && (
      <h1 style={{ marginLeft: "20px" }}>
        {title}: {total}
      </h1>
    )}

    <InfiniteScroll
      pageStart={0}
      loadMore={fetchTokens}
      hasMore={state.hasMore}
      loader={loader}
    >
      <Grid>
        {state.tokens?.map((it, index) => (
          <Sharddog key={index} owner={it.owner} media={it.media} />
        ))}
      </Grid>
    </InfiniteScroll>
  </>
);
