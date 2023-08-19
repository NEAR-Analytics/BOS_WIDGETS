const accountId = props.accountId;
const creatorId = props.creatorId;

const groupId = props.groupId;

if (!accountId) {
  return "";
}

let members = Social.keys(`${creatorId}/graph/${groupId}/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (members === null) {
  return "Loading";
}

members = Object.entries(members[creatorId]?.graph[groupId] || {});
members.sort((a, b) => b[1] - a[1]);
return (
  <>
    {members.map(([accountId], i) => (
      <div key={i} className="d-flex justify-content-between mb-3">
        <div className="me-4">
          <Widget src="mob.near/widget/Profile" props={{ accountId }} />
        </div>
      </div>
    ))}
  </>
);
