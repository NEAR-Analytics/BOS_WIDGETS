const item = props.item;
const rootItem = props.rootItem;
const depth = props.depth ?? 1;
const renderLoading = () => "Loading";
const fetchLimit = props.fetchLimit ? parseInt(props.fetchLimit) : 100;
const renderLimit = props.renderLimit ? parseInt(props.renderLimit) : 3;
const initialRenderLimit = props.initialRenderLimit
  ? parseInt(props.initialRenderLimit)
  : renderLimit;
const halflife = props.halflife
  ? parseFloat(props.halflife)
  : (24 * 60 * 60) / 1.3;

const [displayCount, setDisplayCount] = useState(initialRenderLimit);

let rawIndex = Social.index("comment", item, {
  order: "desc",
  limit: fetchLimit,
});

if (rawIndex === null) {
  return renderLoading();
}

const comments = rawIndex
  .map(({ accountId, blockHeight, value }) => {
    if (value.type !== "md") {
      return null;
    }
    return {
      accountId,
      blockHeight,
      item: {
        type: "social",
        path: value?.item?.path ?? `${accountId}/comment/main`,
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
    item: comments.map((p) => p.item),
  }),
}).body;

if (!likes) {
  return renderLoading();
}

const lastBlockHeight = comments[0].blockHeight ?? 0;

const score = (i) => {
  const comment = comments[i];
  const age = lastBlockHeight - comment.blockHeight;
  const numLikes = likes[i].length + 0.1;
  return numLikes / Math.exp(1 + age / halflife);
};

const order = [...Array(comments.length).keys()];
order.sort((a, b) => score(b) - score(a));

const render = (comment) => {
  const accountId = comment.item.path.split("/")[0];
  const blockHeight = comment.item.blockHeight;

  return (
    <>
      <Widget
        key={JSON.stringify(comment)}
        loading={<div className="w-100" style={{ minHeight: "200px" }} />}
        src="mob.near/widget/Neddit.Comment"
        props={{
          accountId,
          blockHeight,
          rootItem,
          item,
          highlight:
            accountId === props.highlightComment?.accountId &&
            blockHeight === props.highlightComment?.blockHeight,
        }}
      />
      <Widget
        key="sub-comments"
        loading={false}
        src="mob.near/widget/Neddit.Comment.Feed"
        props={{
          item: comment.item,
          rootItem,
          depth: depth + 1,
          initialRenderLimit: depth === 1 ? 3 : 0,
          renderLimit: 10,
        }}
      />
    </>
  );
};

const fetchMore = displayCount < comments.length && (
  <div key={"loader more"}>
    <a
      className=""
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        e.preventDefault && e.preventDefault();
        setDisplayCount(displayCount + renderLimit);
      }}
    >
      More comments ({comments.length - displayCount})
    </a>
  </div>
);

return comments.length > 0 ? (
  <div style={{ marginLeft: "52px" }}>
    {order.slice(0, displayCount).map((i) => render(comments[i]))}
    {fetchMore}
  </div>
) : (
  ""
);
