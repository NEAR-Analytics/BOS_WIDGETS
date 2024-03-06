const data = Social.get("*/widget/*/metadata/fork_of", "final");

if (!data) {
  return "";
}

const process = (data) => {
  let forkCount = {};
  let forkers = {};

  Object.entries(data).forEach(([account, widgets]) => {
    Object.entries(widgets.widget).forEach(([widgetName, widgetInfo]) => {
      const forkOf = widgetInfo.metadata.fork_of;
      if (!forkCount[forkOf]) {
        forkCount[forkOf] = 1;
        forkers[forkOf] = [account];
      } else {
        forkCount[forkOf]++;
        if (!forkers[forkOf].includes(account)) {
          forkers[forkOf].push(account);
        }
      }
    });
  });

  return Object.keys(forkCount)
    .map((forkOf) => ({
      widget: forkOf,
      count: forkCount[forkOf],
      forkers: forkers[forkOf],
    }))
    .filter((widget) => widget.count >= 2)
    .sort((a, b) => b.count - a.count);
};

const widgets = process(data);

const formatWidgetName = (widgetString) => {
  const parts = widgetString.split("/");
  const widgetName = parts[2].split("@")[0];
  const creatorId = parts[0];
  return (
    <>
      <a
        href={`https://near.social/${creatorId}/widget/${widgetName}`}
      >{`${widgetName}`}</a>
      by
      <Widget
        src="mob.near/widget/N.ProfileLine"
        props={{ accountId: creatorId, hideAccountId: true }}
      />
    </>
  );
};

const formatWidgetSrc = (widgetString) => {
  const parts = widgetString.split("/");
  const widgetName = parts[2].split("@")[0];
  const creatorId = parts[0];
  return `${creatorId}/widget/${widgetName}`;
};

return (
  <>
    <div className="m-2">
      <h2>Most Forked Widgets</h2>
      <h5>
        via <a href="https://near.social/edit">Near.Social</a> editor
      </h5>
      <hr />
      {widgets.map((widget, index) => (
        <div className="row mb-2">
          <div className="col">
            <p>{formatWidgetName(widget.widget)}</p>
          </div>
          <div className="col">
            <Widget
              src="hack.near/widget/fork"
              props={{ src: formatWidgetSrc(widget.widget) }}
            />
            <span className="ms-2">{widget.count}</span>
            <Widget
              src="hack.near/widget/ForkButton.Faces"
              props={{ forkers: widget.forkers, limit: 39 }}
            />
          </div>
        </div>
      ))}
    </div>
  </>
);
