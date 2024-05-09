return (
  <Widget
    loading={props.children}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: (
        <Widget
          src={`${props.src ?? "mob.near/widget/profile.overlay"}`}
          props={{ accountId: props.accountId }}
        />
      ),
      ...props,
    }}
  />
);
