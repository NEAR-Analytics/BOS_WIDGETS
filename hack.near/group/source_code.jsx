const creatorId = props.creatorId;
const groupId = props.groupId;

const group =
  props.group ?? Social.get(`${creatorId}/thing/${groupId}/**`, "final");

if (group === null) {
  return "Loading...";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/group.card"
        props={{
          creatorId,
          groupId,
        }}
      />
      <br />
      <Widget
        src="hack.near/widget/group.members"
        props={{ creatorId, groupId }}
      />
    </div>
  </div>
);
