return (
  <Widget
    loading={props.children}
    src="james.near/widget/overlay.trigger"
    props={{
      popup: (
        <Widget
          src="james.near/widget/profile.hover.modal"
          props={{ accountId: props.accountId }}
        />
      ),
      ...props,
    }}
  />
);
