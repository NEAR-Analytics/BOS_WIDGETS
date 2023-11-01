return (
  <Widget
    loading={props.children}
    src="mob.near/widget/N.Common.OverlayTrigger"
    props={{
      popup: (
        <Widget
          src="jgodwill.near/widget/CPlanet.Profile.Popover"
          props={{ accountId: props.accountId }}
        />
      ),
      overlayClassName: "border m-3 pb-3 bg-white shadow",
      ...props,
    }}
  />
);
