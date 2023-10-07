return (
  <>
    <div className="row">
      <p>
        Click on any shape to trigger a state change in the root Component.
        These state changes will then propagate down to its descendants as
        props.
      </p>
    </div>
    <div className="row">
      <div className="col">
        <h2>trusted author</h2>
        <Widget
          id="trusted-author"
          src="andyh.near/widget/StateDemoRoot"
          trust={{ mode: "trusted-author" }}
          props={{ title: "State within Trusted Components" }}
        />
      </div>
      <div className="col">
        <h2>sandboxed</h2>
        <Widget
          id="sandboxed"
          src="andyh.near/widget/StateDemoRoot"
          trust={{ mode: "sandboxed" }}
          props={{ title: "State across Sandboxed Components" }}
        />
      </div>
    </div>
  </>
);
