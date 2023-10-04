return (
  <div className="row">
    <div className="col" style={{ border: "1px solid orange" }}>
      <h6>trusted grandchild</h6>
      <Widget
        id="trusted-grandchild"
        isTrusted
        src="andyh.near/widget/TrustDemoGrandChild"
      />
    </div>
    <div className="col">
      <h6>sandboxed grandchild</h6>
      <Widget
        id="sandboxed-grandchild"
        isTrusted={false}
        src="andyh.near/widget/TrustDemoGrandChild"
      />
    </div>
  </div>
);
