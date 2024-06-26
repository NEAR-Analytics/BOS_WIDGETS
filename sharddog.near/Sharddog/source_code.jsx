const limit = 1000;

State.init({
  offset: 0,
  tokens: [],
  hasMore: true,
});

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
                limit: ${limit},
                offset: ${state.offset}
            where: {
          _or: [
            {nft_contract_id: {_eq: "mint.sharddog.near"}},
            {nft_contract_id: {_eq: "comic.sharddog.near"}},
            {nft_contract_id: {_eq: "humansofbrazil.sharddog.near"}},
            {nft_contract_id: {_eq: "mmc-mint.sharddog.near"}},
            {nft_contract_id: {_eq: "nft.bluntdao.near"}},
            {nft_contract_id: {_eq: "meteor.sharddog.near"}},
             {nft_contract_id: {_eq: "open.sharddog.near"}},
             {nft_contract_id: {_eq: "harvestmoon.sharddog.near"}},
          ]
        }
              order_by: {minted_timestamp: desc}
            ) {
              media
              owner
            }
          }
        `,
    }),
  }).then((res) => {
    if (res.ok) {
      const tokens = res.body.data.mb_views_nft_tokens;
      if (tokens.length > 0) {
        State.update({
          tokens: [...state.tokens, ...tokens],
          offset: state.offset + limit,
          hasMore: false,
        });
      } else {
        State.update({
          hasMore: false,
        });
      }
    }
  });
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(44px, 0.1fr));

  @media (hover: none) {
    grid-template-columns: repeat(auto-fill, minmax(44px, 0.1fr));
  }
`;

const size = "44px";

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

return (
  <>
    <span style={{ textAlign: "left" }}>Recent ShardDog Claims</span>
    <br />
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchTokens}
      hasMore={state.hasMore}
      loader={loader}
    >
      <Grid>
        {state.tokens?.map((it) => {
          return (
            <Widget
              src="sharddog.near/widget/Image"
              title={it.owner}
              props={{
                title: it.owner,
                image: {
                  url: it.media,
                },
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
          );
        })}
      </Grid>
    </InfiniteScroll>
  </>
);
