const index = {
  action: "post",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: props.accounts,
  },
};

const Post = styled.div`
  border-bottom: 1px solid rgba(48, 67, 82, 0.5);
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

const renderItem = (a) =>
  a.value.type === "md" && (
    <Post className="post" key={JSON.stringify(a)}>
      <Widget
        src="ref-admin.near/widget/Posts.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </Post>
  );

return (
  <Widget
    src="ref-admin.near/widget/IndexFeed"
    props={{ index, renderItem, moderatorAccount: "adminalpha.near" }}
  />
);
