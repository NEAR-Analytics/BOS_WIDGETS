const accountId = "marmaj.sputnik-dao.near";

const profile = "marmaj.sputnik-dao.near";

if (profile === null) {
  return "Loading";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="mob.near/widget/ProfileLarge"
        props={{
          accountId,
          profile,
          link: true,
          showEditButton: !props.profile,
        }}
      />

      <div className="mt-3">
        <Widget
          src="mob.near/widget/ProfileTabs"
          props={{ accountId, profile }}
        />
      </div>
    </div>
  </div>
);
