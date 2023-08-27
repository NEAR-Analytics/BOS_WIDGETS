const accountId = context.accountId;

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const index = {
  action: "notify",
  key: accountId,
  options: {
    limit: 10,
    order: "desc",
    subscribe: true,
  },
};

const renderItem = (item, i) => {
  if (i === 0) {
    Storage.set("lastBlockHeight", item.blockHeight);
  }
  return (
    <Widget
      loading={
        <div className="mb-3 placeholder-glow" style={{ minHeight: "48px" }} />
      }
      src="mob.near/widget/Notification.Item"
      key={i}
      props={item}
    />
  );
};

return (
  <Widget
    src="mob.near/widget/FilteredIndexFeed"
    props={{ index, renderItem }}
  />
);
