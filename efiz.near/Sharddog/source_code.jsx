const limit = 20;
const { Sharddog } = VM.require("efiz.near/widget/Sharddog.Template");
const { sharddogFetch } = VM.require("efiz.near/widget/Sharddog.Function");

State.init({
  offset: 0,
  tokens: [],
  hasMore: true,
});

function fetchTokens() {
  const tokens = sharddogFetch(limit, state.offset);
  console.log(`outside: ${JSON.stringify(tokens)}`);
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

const size = "144px";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(143px, 0.1fr));

  @media (hover: none) {
    grid-template-columns: repeat(auto-fill, minmax(143px, 0.1fr));
  }
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
  <InfiniteScroll
    pageStart={0}
    loadMore={() => fetchTokens()}
    hasMore={state.hasMore}
    loader={loader}
  >
    <Grid>
      {state.tokens?.map((it) => {
        return <Sharddog owner={it.owner} media={it.media} />;
      })}
    </Grid>
  </InfiniteScroll>
);
