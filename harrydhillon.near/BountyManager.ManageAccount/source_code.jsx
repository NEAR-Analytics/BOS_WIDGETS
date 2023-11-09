State.init({
  tabName: "whitelist",
});

const listAcc = [
  "noak.near",
  "robert.near",
  "harrydhillon.near",
  "stainslaw.near",
];

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
    {state.tabName === "whitelist" && (
      <>
        <div style={{ display: "flex", justifyContent: "space-betweeen" }}>
          <div style={{ width: "49%" }}>
            <p style={{ fontSize: 20, fontWeight: "500" }}>Whitelist</p>
            {listAcc.map((item) => (
              <div
                style={{ height: 45, display: "flex", alignItems: "center" }}
              >
                <p style={{ transform: "translateY(5px)" }}>{item}</p>
              </div>
            ))}
          </div>
          <div style={{ width: "49%" }}>
            <p style={{ fontSize: 20, fontWeight: "500" }}>Blacklist</p>
            {listAcc.map((item) => (
              <div
                style={{
                  display: "flex",
                  paddingTop: 2,
                  height: 45,
                  justifyContent: "space-around",
                }}
              >
                <button style={{ height: "fit-content" }}>Remove</button>
                <button style={{ height: "fit-content" }}>Blacklist</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", paddingTop: 10 }}>
          <input placeholder="Add Account to whitelist" />
          <button>Add</button>
        </div>
      </>
    )}
    {state.tabName === "blacklist" && (
      <>
        <div style={{ display: "flex", justifyContent: "space-betweeen" }}>
          <div style={{ width: "49%" }}>
            <p style={{ fontSize: 20, fontWeight: "500" }}>Blacklist</p>
            {listAcc.map((item) => (
              <div
                style={{ height: 45, display: "flex", alignItems: "center" }}
              >
                <p style={{ transform: "translateY(5px)" }}>{item}</p>
              </div>
            ))}
          </div>
          <div style={{ width: "49%" }}>
            <p style={{ fontSize: 20, fontWeight: "500" }}>Whitelist</p>
            {listAcc.map((item) => (
              <div
                style={{
                  display: "flex",
                  paddingTop: 2,
                  height: 45,
                  justifyContent: "space-around",
                }}
              >
                <button style={{ height: "fit-content" }}>Remove</button>
                <button style={{ height: "fit-content" }}>Whitelist</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", paddingTop: 10 }}>
          <input placeholder="Add Account to blacklist" />
          <button>Add</button>
        </div>
      </>
    )}
  </div>
);
