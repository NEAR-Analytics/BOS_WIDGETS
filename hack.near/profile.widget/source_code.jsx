const src = props.src ?? "hack.near/widget/Academy";
const [accountId, widget, widgetName] = src.split("/");

const metadata = props.metadata ?? Social.getr(`${src}/metadata`);

return (
  <>
    <div className="d-flex flex-row">
      <div className="me-1">
        <Widget
          src="mob.near/widget/WidgetImage"
          props={{
            accountId,
            widgetName,
            imageClassName: "w-100 h-100",
          }}
        />
      </div>
      <div className="ms-2" style={{ textOverflow: "ellipsis" }}>
        <span className="fw-bold ms-1">{metadata.name ?? widgetName}</span>
        <div className="text-truncate text-muted">
          <Widget src="hack.near/widget/BuilderHat" props={{ accountId }} />
          <small>
            <span className="font-monospace ms-1">@{accountId}</span>
          </small>
        </div>
      </div>
    </div>
  </>
);
