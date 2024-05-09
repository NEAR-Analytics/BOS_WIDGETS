return (
  <Widget
    loading={props.children}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: (
        <Widget
          src={`${props.src ?? "mob.near/widget/profile.modal"}`}
          props={{ accountId: props.accountId }}
        />
      ),
      ...props,
    }}
  />
);
