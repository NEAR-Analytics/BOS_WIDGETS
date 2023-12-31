const index = {
  action: "graph",
  key: "follow",
  spaghetti: 11,
  options: {
    subscribe: true,
    limit: 5,
    order: "desc",
  },
};

const Item = styled.div`
  text-overflow: ellipsis;
  overflow-x: hidden;
`;

// console.log("FOLLOWFEED");

const renderItem = (a) => {
  return (
    <Item key={JSON.stringify(a)} className="mb-2">
      <Widget
        src="andyh.near/widget/ProfileLine"
        props={{ accountId: a.accountId, hideAccountId: true, tooltip: true }}
        isTrusted={true}
      />
      <span className="text-muted">
        {a.value?.type === "follow" ? "followed" : "unfollowed"}
      </span>
      <Widget
        src="andyh.near/widget/ProfileLine"
        props={{
          accountId: a.value.accountId,
          hideAccountId: true,
          tooltip: true,
        }}
        isTrusted={true}
      />
      <span className="text-muted">
        <Widget
          src="andyh.near/widget/TimeAgo"
          props={{ blockHeight: a.blockHeight }}
          isTrusted={true}
        />
      </span>
    </Item>
  );
};

return (
  <div>
    <Widget
      src="andyh.near/widget/IndexFeed"
      props={{ index, renderItem }}
      isTrusted={true}
    />
  </div>
);
