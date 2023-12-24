const limit = 10;
const accountId = props.accountId ?? context.accountId;
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
              where: { nft_contract_id: { _eq: "mint.sharddog.near" },owner:{_eq: "${accountId}"}}
              order_by: {minted_timestamp: desc}
            ) {
              media
            }
          }
        `,
    }),
  }).then((res) => {
    if (res.ok) {
      const tokens = res.body.data.mb_views_nft_tokens;

      State.update({
        tokens: [...state.tokens, ...tokens],
        hasMore: false,
      });
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
            props={{
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
);
