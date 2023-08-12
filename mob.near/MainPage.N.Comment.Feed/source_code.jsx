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

const ShowMore = styled.div`
  padding: 10px 0px 10px 64px;
  position: relative;
  :before {
    content: "";
    position: absolute;
    left: 30px;
    top: 6px;
    height: 32px;
    width: 2px;
    background-image: linear-gradient(to bottom, transparent 50%, #ccc 50%);
    background-size: 100% 10px;
    background-repeat: repeat-y;
        z-index: -1;
  }
`;

return (
  <Widget
    src="mob.near/widget/FilteredIndexFeed"
    props={{
      index,
      reverse: true,
      manual: true,
      renderItem,
      nextLimit: 10,
      loadMoreText: <ShowMore>Show earlier comments...</ShowMore>,
    }}
  />
);
