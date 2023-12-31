const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = Social.getr(`${widgetPath}/metadata`);

const name = metadata?.name ?? widgetName;
const image = metadata?.image;
const onHide = props.onHide;
const link = props.link;

const renderExtraButtons = useComponentCallback(props.extraButtons, {
  accountId,
  widgetName,
  widgetPath,
  metadata,
  onHide,
});

return (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="me-2 text-truncate">
        {link ? (
          <a href={link} className="text-decoration-none link-dark">
            <Widget
              src="andyh.near/widget/Component.InlineBlock"
              props={{ accountId, widgetName }}
            />
          </a>
        ) : (
          <Widget
            src="andyh.near/widget/Component.InlineBlock"
            props={{ accountId, widgetName }}
          />
        )}
      </div>
      <div className="text-nowrap">{renderExtraButtons()}</div>
    </div>
  </div>
);
