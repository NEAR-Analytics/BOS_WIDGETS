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
        <Widget
          id="trusted"
          src="andyh.near/widget/StateDemoRoot"
          isTrusted={false}
          props={{ title: "State across Trusted Components" }}
        />
      </div>
      {/*
      <div className="col">
        <Widget
          id="sandboxed"
          src="andyh.near/widget/StateDemoRoot"
          isTrusted={false}
          props={{ title: "State within Sandboxed Components" }}
        />
      </div>
      */}
    </div>
  </>
);
