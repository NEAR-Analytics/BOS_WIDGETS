const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name;
const image = profile.image;

const hideInfo = props.hideInfo ?? false;

return (
  <div className="profile d-inline-block">
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        profile,
        accountId,
        className: "float-start d-inline-block me-2",
      }}
    />
    {!hideInfo && (
      <div className="profile-info d-inline-block" style={{ maxWidth: "16em" }}>
        <div className="profile-name text-truncate">
          {name || "No-name profile"}
        </div>
        <div className="profile-links d-flex">
          <div className="d-inline-block profile-account text-secondary text-truncate">
            @{accountId}
          </div>
        </div>
      </div>
    )}
  </div>
);
