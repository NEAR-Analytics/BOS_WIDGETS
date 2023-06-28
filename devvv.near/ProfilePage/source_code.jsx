const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return <div>No account ID</div>;
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  <div className="container py-4">
    <div className="text-center">Loading...</div>
  </div>;
}

return (
  <div className="container py-4">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <Widget
          src="mob.near/widget/ProfileLarge"
          props={{
            accountId,
            profile,
            link: true,
            showEditButton: !props.profile,
          }}
        />

        <div className="mt-4">
          <Widget
            src="devvv.near/widget/ProfileTabs"
            props={{ accountId, profile }}
          />
        </div>
      </div>
    </div>
  </div>
);
