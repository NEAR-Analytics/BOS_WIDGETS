return (
  <div className="row">
    <div className="col">
      <Widget
        id="trusted"
        src="andyh.near/widget/StateDemoRoot"
        isTrusted={true}
      />
    </div>
    <div className="col">
      <Widget
        id="sandboxed"
        src="andyh.near/widget/StateDemoRoot"
        isTrusted={false}
      />
    </div>
  </div>
);
