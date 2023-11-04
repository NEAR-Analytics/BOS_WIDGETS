const { accountId, profile, maxNameLength, name, widgets } = props;
if (!profile) {
  profile = Social.getr(`${accountId}/profile`);
}

if (!maxWidth) {
  maxWidth = "60%";
}

const inner = (
  <div className="d-flex flex-row" style={{ maxWidth: "100%" }}>
    <Widget
      src={widgets.profileImage}
      props={{
        metadata,
        accountId,
        widgetName,
        style: {
          height: "2.5em",
          width: "2.5em",
          minWidth: "2.5em",
          borderRadius: "20px",
        },
        className: "me-2",
      }}
    />
    <div className="text-truncate lh-sm" style={{ maxWidth: "100%" }}>
      <div
        className="text-truncate fw-bold"
        style={{ maxWidth: "90%", textAlign: "start" }}
      >
        {name
          ? name
          : maxNameLength
          ? accountId.slice(0, maxNameLength) + "..."
          : accountId}
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
        src={widgets.profileOverlayTrigger}
        props={{ accountId, children: inner, maxWidth: `${maxWidth}` }}
      />
    ) : (
      inner
    )}
  </div>
);
