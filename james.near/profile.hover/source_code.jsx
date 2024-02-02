return (
  <Widget
    loading={props.children}
    src="mob.near/widget/N.Common.OverlayTrigger"
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
