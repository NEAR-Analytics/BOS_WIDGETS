const accountId = props.accountId || context.accountId;

if (!accountId) return "Login or send accountId in the props";

const profile = Social.getr(`${accountId}/profile`);

const allWidgetsHistoryChangesBlocks = Social.keys(
  `${accountId}/widget/*`,
  "final",
  {
    return_type: "History",
  }
);

if (allWidgetsHistoryChangesBlocks === null) return "Loading...";

const widget = allWidgetsHistoryChangesBlocks[accountId].widget;

const totalCommits = Object.keys(widget)
  .map((key) => widget[key])
  .flat();

const widgets = Social.getr(`${accountId}/widget`) ?? {};

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      paddingBottom: 40,
    }}
  >
    <div>
      <p
        style={{
          fontSize: 16,
          lineHeight: "16px",
          fontWeight: 600,

          fontWeight: 500,
          color: theme.textColor,
          textAlign: "left",
        }}
      >
        Widgets
      </p>

      {Object.keys(widgets)?.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            marginTop: 16,
            gap: 16,
          }}
        >
          {Object.keys(widgets)?.map((item, index) => (
            <Widget
              src="saidulbadhon.near/widget/ProfilePage.WidgetItem"
              props={{
                name: item,
                accountId,
                commits: allWidgetsHistoryChangesBlocks[accountId].widget[item],
                theme: props.theme,
              }}
            />
          ))}
        </div>
      ) : (
        <p
          style={{
            padding: 20,
            textAlign: "center",
            color: "rgba(0,0,0,.75)",
          }}
        >
          {profile?.name} does not have any widget.
        </p>
      )}
    </div>

    {/*<div>
        <h2>{totalCommits.length} contributions</h2>
        <div style={{ marginTop: 20 }} />
        <Widget
          src="zahidulislam.near/widget/Profile.Contributions"
          props={{ theme: theme }}
        />
      </div>*/}
  </div>
);
