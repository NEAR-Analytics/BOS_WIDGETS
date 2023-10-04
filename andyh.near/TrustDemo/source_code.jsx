return (
  <div className="row">
    <div className="col">
      <h6>trusted root</h6>
      <Widget
        id="trusted-root"
        isTrusted
        src="andyh.near/widget/TrustDemoRoot"
      />
    </div>
    <div className="col">
      <h6>sandboxed root</h6>
      <Widget
        id="sandboxed-root"
        isTrusted={false}
        src="andyh.near/widget/TrustDemoRoot"
      />
    </div>
  </div>
);
