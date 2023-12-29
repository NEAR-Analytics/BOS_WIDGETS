const accountId = props.accountId ?? context.accountId;

return (
  <span>
    <Widget
      src="mob.near/widget/ProfileLine"
      props={{
        ...props,
        accountId,
        link: `#/mob.near/widget/ProfilePage?accountId=${accountId}`,
      }}
    />
    <Widget
      src="itexpert120-contra.nera/widget/devhub.components.molecule.BadgesList"
      props={{
        accountId,
        mode: "compact",
      }}
    />
  </span>
);
