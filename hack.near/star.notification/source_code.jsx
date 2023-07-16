const accountId = props.accountId ?? context.accountId;

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
    <div className="m-2 mt-3">
      <Widget
        src="hack.near/widget/star.notification.item"
        key={i}
        props={item}
      />
    </div>
  );
};

return <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />;
