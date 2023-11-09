State.init({
  tabName: "whitelist",
});

return (
  <div style={{ padding: 20 }}>
    <p style={{ fontSize: 30, fontWeight: "500" }}>Manage Account</p>
    <Widget
      src="harrydhillon.near/widget/BountyManager.Layout.Tab"
      props={{
        tabName: state.tabName,
        updateTabName: (val) => {
          State.update({ tabName: val });
        },
      }}
    />
  </div>
);
