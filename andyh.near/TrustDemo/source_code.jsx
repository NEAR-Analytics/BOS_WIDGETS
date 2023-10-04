return (
  <div className="row">
    <div className="col">
      <h2>trusted root</h2>
      <Widget
        id="trusted-root"
        isTrusted
        src="andyh.near/widget/TrustDemoRoot"
      />
    </div>
    <div className="col">
      <h2>sandboxed root</h2>
      <Widget
        id="sandboxed-root"
        isTrusted={false}
        src="andyh.near/widget/TrustDemoRoot"
      />
    </div>
  </div>
);
