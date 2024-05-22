return (
  <Widget
    src={"old.potlock.near/widget/Components.Button"}
    props={{
      ...props,
      type: "primary",
      text: "Verify to Donate",
      style: props.style || {},
      href: props.href,
      target: "_blank",
    }}
  />
);
