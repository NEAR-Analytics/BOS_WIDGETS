const index = {
  action: "comment",
  key: props.item,
  options: {
    limit: props.limit ?? 5,
    order: "desc",
    accountId: props.accounts,
    subscribe: props.subscribe,
  },
};

const raw = !!props.raw;

const Wrapper = styled.div`
  > div:first-child {
    > a:first-child {
      display: inline-flex;
      margin-bottom: 24px;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
      outline: none;
      font-weight: 600;

      &:hover,
      &:focus {
        color: #fff;
        text-decoration: underline;
      }
    }
  }
`;

const renderItem = (a) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)}>
      {/*<Widget
        src="adminalpha.near/widget/Comments.Comment"
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          highlight:
            a.accountId === props.highlightComment?.accountId &&
            a.blockHeight === props.highlightComment?.blockHeight,
          raw,
        }}
      />*/}
    </div>
  );

return (
  <Wrapper>
    <Widget
      src="ref-admin.near/widget/IndexFeed"
      props={{
        index,
        manual: true,
        reverse: true,
        renderItem,
        nextLimit: 10,
        loadMoreText: "Show earlier comments...",
        moderatorAccount: "adminalpha.near",
      }}
    />
  </Wrapper>
);
