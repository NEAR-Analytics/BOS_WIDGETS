const accountId = props.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const maxNameLength = props.maxNameLength ?? 16;

let name = profile.name ?? accountId.slice(0, maxNameLength) + "...";

const maxWidth = props.maxWidth ?? "60%";

const widgetOwner =
  props.widgetOwner ??
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

const inner = (
  <div className="d-flex flex-row" style={{ maxWidth: "100%" }}>
    <Widget
      src="mob.near/widget/ProfileImage"
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
        src={`${widgetOwner}/widget/Profile.OverlayTrigger`}
        props={{ accountId, children: inner, maxWidth: `${maxWidth}` }}
      />
    ) : (
      inner
    )}
  </div>
);
