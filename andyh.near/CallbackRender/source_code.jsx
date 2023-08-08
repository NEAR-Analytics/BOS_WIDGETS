const renderComponent = (msg, cb) => {
  console.log({ msg, cb });
  return (
    <div>
      <Widget
        props={{ cb, msg, src: "xuyz" }}
        src="andyh.near/widget/CallbackRenderWidget"
      />
    </div>
    // <h2>{msg}</h2>
  );
};
State.init({ apps: [] });
console.log("[NSCOMP:CallbackRender]");
console.log({ state: Object.fromEntries(Object.entries(state)) });
return (
  <div>
    {/*renderComponent("i am da parent")*/}
    <h2>ima da parent</h2>
    <Widget
      src="andyh.near/widget/CallbackRenderChild"
      props={{
        renderComponent,
      }}
    />
    <Widget
      src="andyh.near/widget/WidgetIcons"
      props={{ tag: "app", limit: 24 }}
    />
    {/*
    <Widget
      src="andyh.near/widget/ComponentSearch"
      props={{
        boostedTag: "app",
        placeholder: "🔍 Search Applications",
        limit: 10,
        onChange: ({ result }) => {
          State.update({ apps: result });
        },
      }}
    />
    {state.apps && (
      <div className="mb-2">
        {state.apps.map((app, i) => (
          <div key={i}>
            <Widget
              src="andyh.near/widget/ComponentSearch.Item"
              props={{
                link: `#/${app.widgetSrc}`,
                accountId: app.accountId,
                widgetName: app.widgetName,
                onHide: () => State.update({ apps: null }),
                extraButtons: ({ widgetPath }) => (
                  <a
                    target="_blank"
                    className="btn btn-outline-secondary"
                    href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
                  >
                    Source
                  </a>
                ),
              }}
            />
          </div>
        ))}
      </div>
    )}
    */}
  </div>
);
