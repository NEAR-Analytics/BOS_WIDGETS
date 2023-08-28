return (
  <>
    <Markdown text={"oh hey!"} />
    <Widget
      isTrusted={true}
      src="andyh.near/widget/TrustedStateChild"
      props={{ value: 11 }}
    />
  </>
);
