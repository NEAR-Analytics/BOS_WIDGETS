return (
  <div>
    <h5>Applications</h5>
    <div className="mb-2">
      <Widget
        src="andyh.near/widget/ComponentSearch"
        props={{
          boostedTag: "app",
          placeholder: "🔍 Search Applications",
          limit: 5,
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

    <Widget
      src="andyh.near/widget/WidgetIcons"
      props={{ tag: "app", limit: 5 }}
    />
  </div>
);
