return (
  <div className="row">
    <div className="col" style={{ border: "1px solid orange" }}>
      <h6>trusted child</h6>
      <Widget
        id="trusted-child"
        isTrusted
        src="andyh.near/widget/TrustDemoChild"
      />
    </div>
    <div className="col">
      <h6>sandboxed child</h6>
      <Widget
        id="sandboxed-child"
        isTrusted={false}
        src="andyh.near/widget/TrustDemoChild"
      />
    </div>
  </div>
);
