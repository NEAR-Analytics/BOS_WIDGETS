const addressForArticles = "wikiTest2Article";
const addressForComments = "wikiTest2Comment";
const lastEditor = props.lastEditor;
const commentToShareBlockHeight = props.commentToShareBlockHeight
  ? Number(props.commentToShareBlockHeight)
  : false;

const showAllComments = props.showAllComments;

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
  console.log("Is this", showAllComments);
  return (
    a.value.type === "md" &&
    ((a.blockHeight === commentToShareBlockHeight && !showAllComments) ||
      showAllComments) && (
      <div key={JSON.stringify(a)}>
        <Widget
          src={`${authorForWidget}/widget/WikiOnSocialDB_Comment`}
          props={{
            lastEditorAccountId: lastEditor,
            wikiSiteBlockHeight: props.blockHeight,
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
      src={`${authorForWidget}/widget/WikiOnSocialDB_ManualIndexFeed`}
      props={{
        showAllComments,
        index,
        reverse: true,
        renderItem,
        nextLimit: 10,
        loadMoreText: "Show earlier comments...",
      }}
    />
  </div>
);
