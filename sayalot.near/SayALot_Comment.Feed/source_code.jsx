const realArticleId = props.realArticleId;
if (!realArticleId) {
  return "Article id not provided";
}
const isDebug = props.isDebug;
const addressForComments = isDebug
  ? "test_sayalot-comments"
  : "sayalot-comments";
const addressForArticles = isDebug ? "test_sayALotArticle" : "sayALotArticle";
const authorForWidget = "sayalot.near";
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
console.log(1, index);
const raw = !!props.raw;
const renderItem = (a) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)}>
      {" "}
      <Widget
        src={`${authorForWidget}/widget/SayALot_Comment`}
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          highlight:
            a.accountId === props.highlightComment?.accountId &&
            a.blockHeight === props.highlightComment?.blockHeight,
          raw,
          realArticleId,
          isDebug,
        }}
      />{" "}
    </div>
  );
return (
  <div>
    {" "}
    <Widget
      src={`${authorForWidget}/widget/SayALot_ManualIndexFeed`}
      props={{
        index,
        reverse: true,
        renderItem,
        nextLimit: 10,
        loadMoreText: "Show earlier comments...",
        realArticleId,
        isDebug,
      }}
    />{" "}
  </div>
);
