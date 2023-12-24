const limit = 20;
const series = props.series ?? "1"; // add series filter
const title = props.title ?? "Total OG BluntDAO";
const showHeader = props.showHeader ?? true;
const showImage = props.showImage ?? false;
// add what nft they have and then add filter of unique people, add link to collection
// add condition if no props fetch all collection
// add condition to only propose if you have privalige
// fix limit
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
               
                offset: ${state.offset}
              where: { nft_contract_id: { _eq: "bluntdao.snft.near" } token_id: {_regex: "^${series}:"}}
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

function Sharddog({ owner, media }) {
  const size = "100px";

  return (
    <div className="row">
      <div className="col-sm-3">
        {showImage && (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: {
                url: media,
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
        )}
      </div>
      <div className="col-sm-12">
        <Widget
          src="bluntdao.near/widget/BluntDAO.member"
          props={{
            accountId: owner,
          }}
        />
      </div>
    </div>
  );
}

const size = "144px";

const Grid = styled.div`
  display: row;
`;

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
    {showHeader && (
      <h1>
        {title}: {state.tokens.length}
      </h1>
    )}

    <InfiniteScroll
      pageStart={0}
      loadMore={fetchTokens}
      hasMore={state.hasMore}
      loader={loader}
    >
      <Grid>
        {state.tokens?.map((it) => {
          return <Sharddog owner={it.owner} media={it.media} />;
        })}
      </Grid>
    </InfiniteScroll>
  </>
);
