return (
  <div>
    <h2 className="mb-3">applications</h2>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/ComponentSearch"
        props={{
          boostedTag: "app",
          placeholder: "🔭 explore",
          limit: 10,
          onChange: ({ result }) => {
            State.update({ apps: result });
          },
        }}
      />
    </div>
    {state.apps && (
      <div className="mb-2">
        {state.apps.map((app, i) => (
          <div key={i}>
            <Widget
              src="mob.near/widget/ComponentSearch.Item"
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

    <Widget
      src="mob.near/widget/WidgetIcons"
      props={{ tag: "app", limit: 888 }}
    />
    <h3>#template</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "template" }} />
    <h3>#data</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "data" }} />
    <h3>#dev</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "dev" }} />
    <h3>#social</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "social" }} />
    <h3>#widget</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "widget" }} />
    <h3>#page</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "page" }} />
    <h3>#feed</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "feed" }} />
    <h3>#inline</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "inline" }} />
    <h3>#component</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "component" }} />
    <h3>#nft</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "nft" }} />
    <h3>#search</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "search" }} />
    <h3>#editor</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "editor" }} />
    <h3>#game</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "game" }} />
    <h3>#hack</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "hack" }} />
    <h3>#example</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "example" }} />
    <h3>#settings</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "settings" }} />
    <h3>#explorer</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "explorer" }} />
    <h3>#profile</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "profile" }} />
  </div>
);
