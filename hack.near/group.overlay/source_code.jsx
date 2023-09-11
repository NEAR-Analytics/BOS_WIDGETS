return (
  <Widget
    loading={props.children}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: (
        <Widget
          src="mob.near/widget/group.popover"
          props={{ groupId: props.groupId, accountId: props.accountId }}
        />
      ),
      ...props,
    }}
  />
);
