const accountId = props.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name;

const maxWidth = props.maxWidth ?? "60%";

const inner = (
  <div className="d-flex flex-row" style={{ maxWidth: "100%" }}>
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        metadata,
        accountId,
        widgetName,
        style: { height: "2.5em", width: "2.5em", minWidth: "2.5em" },
        className: "me-2",
      }}
    />
    <div className="text-truncate lh-sm" style={{ maxWidth: "100%" }}>
      <div
        className="text-truncate fw-bold"
        style={{ maxWidth: "90%", textAlign: "start" }}
      >
        {name}
      </div>
      <div className="text-truncate text-muted" style={{ maxWidth: "90%" }}>
        <small>
          <span className="font-monospace">@{accountId}</span>
        </small>
      </div>
    </div>
  </div>
);

return (
  <div
    className="short-inline-block-container"
    style={{ maxWidth: `${maxWidth}` }}
  >
    {props.tooltip ? (
      <Widget
        src="mob.near/widget/Profile.OverlayTrigger"
        props={{ accountId, children: inner, maxWidth: `${maxWidth}` }}
      />
    ) : (
      inner
    )}
  </div>
);
