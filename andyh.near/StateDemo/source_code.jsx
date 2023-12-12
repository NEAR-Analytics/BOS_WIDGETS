export default function (props) {
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
          <Component
            id="trusted"
            src="andyh.near/StateDemoRoot"
            trust={{ mode: "sandboxed" }}
            props={{ title: "State across Trusted Components" }}
          />
        </div>
        <div className="col">
          <Component
            id="sandboxed"
            src="andyh.near/StateDemoRoot"
            props={{ title: "State within Sandboxed Components" }}
          />
        </div>
      </div>
    </>
  );
}
