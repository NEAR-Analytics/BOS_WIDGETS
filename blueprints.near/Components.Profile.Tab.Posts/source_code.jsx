const accountId = props.accountId;
const profile = Social.getr(`${accountId}/profile`);
const { description } = profile;
return (
  <div className="d-flex flex-column gap-3">
    {description && (
      <Widget
        key="desc"
        loading=""
        src="blueprints.near/widget/Components.Post"
        props={{
          accountId,
          pinned: true,
          blockHeight: "now",
          content: {
            text: description,
          },
        }}
      />
    )}
    <Widget
      key="feed"
      src="blueprints.near/widget/UserFeed"
      props={{ accounts: [accountId] }}
    />
  </div>
);
