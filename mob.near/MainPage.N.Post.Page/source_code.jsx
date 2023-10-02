return (
  <div style={{ marginTop: "calc(-1 * var(--body-top-padding, 0))" }}>
    <Widget
      src="mob.near/widget/MainPage.N.Post"
      props={{
        ...props,
        noBorder: true,
        commentsLimit: 30,
        subscribe: true,
        truncateContent: false,
      }}
    />
  </div>
);
