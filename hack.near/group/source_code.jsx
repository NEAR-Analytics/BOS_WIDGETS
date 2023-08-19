const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const group =
  props.group ?? Social.getr(`${accountId}/graph/${props.groupId}/**`);
const fast = !props.group;

if (group === null) {
  return "Loading...";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/group.card"
        props={{
          groupId: props.groupId,
          group,
          link: true,
          fast,
          showEditButton: !props.group,
        }}
      />
      <br />
      <Widget
        src="hack.near/widget/group.members"
        props={{ creatorId: accountId, groupId: props.groupId }}
      />
    </div>
  </div>
);
