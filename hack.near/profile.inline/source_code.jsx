const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = props.fast ?? !props.profile;

const name = profile.name;
const description = profile.description;
const tags = Object.keys(profile.tags ?? {});

const imgWrapperStyle = { height: "3em", width: "3em" };

return (
  <div className="d-flex flex-row">
    <div className="me-2">
      <Widget
        src="mob.near/widget/ProfileImage"
        loading={<div style={imgWrapperStyle} />}
        props={{
          fast,
          profile,
          accountId,
          widgetName,
          style: imgWrapperStyle,
          imageClassName: "rounded-circle w-100 h-100",
        }}
      />
    </div>
    <div className="text-truncate">
      <div className="text-truncate">
        <span className="fw-bold me-1">{name}</span>
        <Widget src="james.near/widget/BuilderHat" props={{ accountId }} />
      </div>
      <div className="text-truncate text-muted">
        <small>
          <span className="font-monospace">@{accountId}</span>
        </small>
      </div>
    </div>
  </div>
);
