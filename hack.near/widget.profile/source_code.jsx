const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const name = metadata.name ?? widgetName;
const description = metadata.description;
const tags = Object.keys(metadata.tags ?? {});

return (
  <div className="d-flex flex-row">
    <a href={`#/${widgetPath}`} className="text-decoration-none link-dark">
      <Widget
        src="mob.near/widget/WidgetImage"
        props={{
          metadata,
          accountId,
          widgetName,
          style: { height: "3em", width: "3em", minWidth: "3em" },
          className: "me-2 float-start d-inline-block",
          imageClassName: "w-100 h-100",
        }}
      />
      <div className="d-inline-block">
        <div className="text-truncate">
          <span className="fw-bold">{name}</span>{" "}
          <small>
            <span className="font-monospace">{widgetPath}</span>
          </small>
        </div>
        <div className="text-truncate text-muted">
          {tags.length > 0 && (
            <>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="me-1 fw-light badge border border-secondary text-bg-light"
                >
                  #{tag}
                </span>
              ))}
            </>
          )}
          {description}
        </div>
      </div>
    </a>
  </div>
);
