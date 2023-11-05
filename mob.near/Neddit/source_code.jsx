const subneddit = props.n || "all";
const renderLoading = () => "Loading";
const fetchLimit = props.fetchLimit ? parseInt(props.fetchLimit) : 500;
const renderLimit = props.renderLimit ? parseInt(props.renderLimit) : 10;
const initialRenderLimit = props.initialRenderLimit
  ? parseInt(props.initialRenderLimit)
  : renderLimit;
const halflife = props.halflife
  ? parseFloat(props.halflife)
  : (24 * 60 * 60) / 1.3;

const [displayCount, setDisplayCount] = useState(initialRenderLimit);

// let rawIndex = Social.index("neddit", subneddit, {
//   order: "desc",
//   limit: 200,
// });

let rawIndex = Social.index("post", "main", {
  order: "desc",
  limit: fetchLimit,
});

if (rawIndex === null) {
  return renderLoading();
}

const posts = rawIndex
  .map(({ accountId, blockHeight, value }) => {
    if (value.type !== "md") {
      return null;
    }
    return {
      accountId,
      blockHeight,
      item: {
        type: "social",
        path: value?.item?.path ?? `${accountId}/post/main`,
        blockHeight: value?.item?.blockHeight ?? blockHeight,
      },
    };
  })
  .filter((a) => !!a);

const likes = fetch("https://api.near.social/api/experimental/likes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    item: posts.map((p) => p.item),
  }),
}).body;

if (!likes) {
  return renderLoading();
}

const lastBlockHeight = posts[0].blockHeight ?? 0;

const score = (i) => {
  const post = posts[i];
  const age = lastBlockHeight - post.blockHeight;
  const numLikes = likes[i].length + 0.1;
  return numLikes / Math.exp(1 + age / halflife);
};

const order = [...Array(posts.length).keys()];
order.sort((a, b) => score(b) - score(a));

const render = (post) => {
  return (
    <div key={JSON.stringify(post)}>
      <Widget
        loading={<div className="w-100" style={{ height: "200px" }} />}
        src="mob.near/widget/MainPage.N.Post"
        props={{
          accountId: post.item.path.split("/")[0],
          blockHeight: post.item.blockHeight,
        }}
      />
    </div>
  );
};

return (
  <InfiniteScroll
    pageStart={0}
    loadMore={() => {
      setDisplayCount(displayCount + renderLimit);
    }}
    threshold={props.threshold ?? 800}
    hasMore={displayCount <= posts.length}
    loader={loader}
  >
    {order.slice(0, displayCount).map((i) => render(posts[i]))}
  </InfiniteScroll>
);
