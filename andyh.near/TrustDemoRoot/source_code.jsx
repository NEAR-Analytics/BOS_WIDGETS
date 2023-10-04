return (
  <div className="row">
    <div className="col" style={{ border: "1px solid orange" }}>
      <h6>trusted parent</h6>
      <Widget
        id="trusted-parent"
        isTrusted
        src="andyh.near/widget/TrustDemoParent"
      />
    </div>
    <div className="col">
      <h6>sandboxed parent</h6>
      <Widget
        id="sandboxed-parent"
        isTrusted={false}
        src="andyh.near/widget/TrustDemoParent"
      />
    </div>
  </div>
);
