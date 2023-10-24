const accountId = props.accountId ?? context.accountId;

const stars = Social.index(
  "store",
  {
    type: "star",
    accountId,
  },
  {
    accountId,
  }
);

const StorageKey = "order";
const order = Storage.privateGet(StorageKey);

const apps = useMemo(() => {
  if (!stars || order === null) {
    return [];
  }
  const starredApps = new Set();
  stars.forEach(({ value }) => {
    if (value.item.type !== "social") {
      return;
    }
    const widgetSrc = value.item.path;
    if (value.type === "star") {
      starredApps.add(widgetSrc);
    } else if (value.type === "unstar") {
      starredApps.delete(widgetSrc);
    }
  });
  const apps = [...starredApps.keys()];
  apps.reverse();
  apps.sort((a, b) => {
    (order?.[a] || 0) - (order?.[b] || 0);
  });
  Storage.privateSet(
    StorageKey,
    Object.fromEntries(apps.map((a, i) => [a, i + 1]))
  );
  return apps;
}, [stars, order]);

const renderItem = (widgetSrc) => {
  const [accountId, _, widgetName] = widgetSrc.split("/");
  return (
    <a
      href={`/${widgetSrc}`}
      className="text-decoration-none"
      key={widgetSrc}
      onClick={() => {
        order[widgetSrc] = -1;
        Storage.privateSet(StorageKey, order);
      }}
    >
      <Widget
        loading={
          <div
            className="placeholder d-inline-block rounded-3"
            style={{ width: "3em", height: "3em" }}
          />
        }
        src="mob.near/widget/WidgetImage"
        props={{
          tooltip: true,
          accountId,
          widgetName,
        }}
      />
    </a>
  );
};

return (
  <div>
    <h5>Starred Apps</h5>
    <div className="d-flex flex-wrap gap-1 my-3 placeholder-glow">
      {apps.slice(0, props.limit ? parseInt(props.limit) : 24).map(renderItem)}
    </div>
  </div>
);
