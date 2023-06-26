const index = {
  action: "graph",
  key: "follow",
  options: {
    subscribe: true,
    limit: 50,
    order: "desc",
  },
};

const Item = styled.div`
  text-overflow: ellipsis;
  overflow-x: hidden;
`;

const renderItem = (a) => (
  <Item key={JSON.stringify(a)} className="mb-2">
    <Widget
      src="andyh.near/widget/ProfileLine"
      props={{ accountId: a.accountId, hideAccountId: true, tooltip: true }}
    />
    <span className="text-muted">
      {a.value.type === "follow" ? "followed" : "unfollowed"}
    </span>
    <Widget
      src="andyh.near/widget/ProfileLine"
      props={{
        accountId: a.value.accountId,
        hideAccountId: true,
        tooltip: true,
      }}
    />
    <span className="text-muted">
      <Widget
        src="andyh.near/widget/TimeAgo"
        props={{ blockHeight: a.blockHeight }}
      />
    </span>
  </Item>
);

return (
  <div>
    here's your feed
    <Widget src="andyh.near/widget/IndexFeed" props={{ index, renderItem }} />
  </div>
);
