return (
  <>
    <Widget id="trusted-root" isTrusted src="andyh.near/widget/TrustDemoRoot" />
    <Widget
      id="sandboxed-root"
      isTrusted={false}
      src="andyh.near/widget/TrustDemoRoot"
    />
  </>
);
