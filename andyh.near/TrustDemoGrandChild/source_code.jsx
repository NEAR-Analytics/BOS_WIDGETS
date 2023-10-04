return (
  <div className="row">
    <div className="col" style={{ border: "1px solid orange" }}>
      <h6>trusted great-grandchild</h6>
      <Widget
        id="trusted-greatgrandchild"
        isTrusted
        src="andyh.near/widget/TrustDemoGreatGrandChild"
      />
    </div>
    <div className="col">
      <h6>sandboxed great-grandchild</h6>
      <Widget
        id="sandboxed-greatgrandchild"
        isTrusted={false}
        src="andyh.near/widget/TrustDemoGreatGrandChild"
      />
    </div>
  </div>
);
