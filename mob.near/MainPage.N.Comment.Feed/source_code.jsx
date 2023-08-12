const index = {
  action: "comment",
  key: props.item,
  options: {
    limit: props.limit ?? 3,
    order: "desc",
    accountId: props.accounts,
    subscribe: props.subscribe,
  },
};

const raw = !!props.raw;

const renderItem = (a) =>
  a.value.type === "md" && (
    <Widget
      key={JSON.stringify(a)}
      src="mob.near/widget/MainPage.N.Comment"
      props={{
        accountId: a.accountId,
        blockHeight: a.blockHeight,
        highlight:
          a.accountId === props.highlightComment?.accountId &&
          a.blockHeight === props.highlightComment?.blockHeight,
        raw,
      }}
    />
  );

return (
  <Widget
    src="mob.near/widget/FilteredIndexFeed"
    props={{
      index,
      reverse: true,
      manual: true,
      renderItem,
      nextLimit: 10,
      loadMoreText: "Show earlier comments...",
    }}
  />
);
