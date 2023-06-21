const addressForComments = "sayalot-comments";
const addressForArticles = "sayALotArticle";
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const index = {
  action: addressForComments,
  key: props.item,
  options: {
    limit: props.limit ?? 3,
    order: "desc",
    accountId: props.accounts,
    subscribe: props.subscribe,
  },
};

const raw = !!props.raw;

const renderItem = (a) => {
  const item = {
    type: "social",
    path: `${state.article.author}/${addressForArticles}/main`,
    blockHeight: firstArticleBlockHeight,
  };

  return (
    a.value.type === "md" && (
      <div key={JSON.stringify(a)}>
        <Widget
          src={`${authorForWidget}/widget/SayALot_Comment`}
          props={{
            accountId: a.accountId,
            blockHeight: a.blockHeight,
            highlight:
              a.accountId === props.highlightComment?.accountId &&
              a.blockHeight === props.highlightComment?.blockHeight,
            raw,
          }}
        />
      </div>
    )
  );
};

return (
  <div>
    <Widget
      src={`eugenewolf507.near/widget/SayALot_ManualIndexFeed`}
      props={{
        index,
        reverse: true,
        renderItem,
        nextLimit: 10,
        loadMoreText: "Show earlier comments...",
      }}
    />
  </div>
);
