const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !props.profile;

if (profile === null) {
  return "Loading";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="sharddog.near/widget/ProfileLarge"
        props={{
          accountId,
          profile,
          link: true,
          fast,
          showEditButton: !props.profile,
        }}
      />

      <div className="mt-3">
        <Widget
          src="sharddog.near/widget/ProfileTabs"
          props={{ accountId, profile }}
        />
      </div>
    </div>
  </div>
);
