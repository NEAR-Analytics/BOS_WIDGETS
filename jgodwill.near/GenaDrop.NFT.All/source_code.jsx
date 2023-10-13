const limit = props.limit ?? 475;
const nftContract = props.nftContract ?? "nft.genadrop.near";
State.init({
  offset: 0,
  tokens: [],
  hasMore: true,
  nftCount: 0,
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
              where: { nft_contract_id: { _eq: "${nftContract}" }}
              order_by: {minted_timestamp: desc}
            ) {
            
              media
              owner
              token_id
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
  State.update({
    nftCount:
      state.nftCount > 0 ? state.tokens.length / 2 : state.tokens.length,
  });
}

fetchTokens();

function Sharddog({ owner, media, token }) {
  const size = "144px";

  return (
    <a
      href={`/mob.near/widget/NftImage?tokenId=${token}&contractId=${nftContract}`}
      target="_blank"
    >
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
    </a>
  );
}

const size = "144px";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(143px, 0.1fr));

  @media (hover: none) {
    grid-template-columns: repeat(auto-fill, minmax(143px, 0.1fr));
  }
  margin: 0 auto;
`;

const Title = styled.h6`
  text-align: center;
  padding: 1rem 0;
  font-weight: 700;
`;

const Inst = styled.div`
  h5{
    text-align: center;
    font-weight: 700;
  }
  padding: 1rem;
  pre{
    display:inline;
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

console.log("count", state.nftCount);
return (
  <InfiniteScroll
    pageStart={0}
    loadMore={fetchTokens}
    hasMore={state.hasMore}
    loader={loader}
  >
    <Inst>
      <h5>How to Send a Post to the Author as an NFT on the NEAR Blockchain</h5>
      <ol>
        <li>
          Find a post with an image that you want to send to the author as an
          NFT.
        </li>
        <li>
          {" "}
          Click the three dots<pre>(...)</pre> in the top right corner of the
          post.
        </li>
        <li>
          Click on <pre>"Send this Post to the Author as a NEAR NFT"</pre>.
        </li>
        <li>
          A pop-up window will appear asking you to confirm your selection.
        </li>
        <li>
          Click <pre>"Confirm"</pre> to send the post to the author as an NFT.
        </li>
      </ol>
    </Inst>
    <Title>NFT Count: {Math.trunc(state.nftCount)}</Title>
    <Grid>
      {state.tokens?.map((it) => {
        console.log("It " + it.tokenid);
        return (
          <Sharddog owner={it.owner} media={it.media} token={it.token_id} />
        );
      })}
    </Grid>
  </InfiniteScroll>
);
