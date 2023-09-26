return (
  <div className="row">
    <div className="col">
      <Widget
        id="trusted"
        src="andyh.near/widget/StateDemoRoot"
        isTrusted={true}
        props={{ title: "State across Trusted Components" }}
      />
    </div>
    <div className="col">
      <Widget
        id="sandboxed"
        src="andyh.near/widget/StateDemoRoot"
        isTrusted={false}
        props={{ title: "State within Sandboxed Components" }}
      />
    </div>
  </div>
);
