const Line = styled.div`
.tag-style{
  background: rgba(26, 46, 51, 0.25);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 38px;
  font-weight: 500;
  font-size: 12px;
  color:#fff;
  padding:3px 11px;
  margin-right:5px;
}
`;
const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const name = metadata.name ?? widgetName;
const description = metadata.description;
const tags = Object.keys(metadata.tags ?? {});

return (
  <Line>
    <div className="d-flex flex-row">
      <Widget
        src="mob.near/widget/WidgetImage"
        props={{
          metadata,
          accountId,
          widgetName,
          style: { height: "38px", width: "38px" },
          className: "me-2",
        }}
      />
      <div className="text-truncate">
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
                <span key={i} className="tag-style">
                  #{tag}
                </span>
              ))}
            </>
          )}
          {description}
        </div>
      </div>
    </div>
  </Line>
);
