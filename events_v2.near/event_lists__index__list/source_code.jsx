const event_lists = props.event_lists || [];
if (!event_lists) {
  return props.__engine.loading();
}
const widgetName = `index.list.${props.layout}`;

return <>{renderComponent(widgetName, { event_lists })}</>;
