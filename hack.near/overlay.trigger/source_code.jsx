return (
  <Widget
    loading={props.children}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: (
        <Widget src={`${props.src}`} props={{ accountId: props.accountId }} />
      ),
      ...props,
    }}
  />
);
