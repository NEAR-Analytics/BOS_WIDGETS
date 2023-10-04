return (
  <div className="row">
    <div className="col">
      <h2>trusted parent</h2>
      <Widget
        id="trusted-parent"
        isTrusted
        src="andyh.near/widget/TrustDemoParent"
      />
    </div>
    <div className="col">
      <h2>sandboxed parent</h2>
      <Widget
        id="sandboxed-parent"
        isTrusted={false}
        src="andyh.near/widget/TrustDemoParent"
      />
    </div>
  </div>
);
