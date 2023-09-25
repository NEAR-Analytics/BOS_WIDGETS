return (
  <div className="row">
    <div className="col">
      <Widget
        id="trusted"
        src="andyh.near/widget/StateDemoRoot"
        isTrusted={true}
        props={{ a: 1 }}
      />
    </div>
    <div className="col">
      <Widget
        id="sandboxed"
        src="andyh.near/widget/StateDemoRoot"
        isTrusted={false}
        props={{ b: 2 }}
      />
    </div>
  </div>
);
