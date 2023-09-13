return (
  <>
    <Widget
      id="trusted"
      src="andyh.near/widget/ComponentIdTestParent"
      isTrusted={true}
      props={{ title: "trusted" }}
    />
    <Widget
      id="sandboxed"
      src="andyh.near/widget/ComponentIdTestParent"
      isTrusted={false}
      props={{ title: "sandboxed" }}
    />
  </>
);
