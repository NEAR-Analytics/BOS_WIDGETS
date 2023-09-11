const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";

if (!accountId) {
  return "";
}

let contributors = Social.keys(`${accountId}/graph/${groupId}/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (contributors === null) {
  return "Loading...";
}

contributors = Object.entries(contributors[accountId].graph[groupId] || {});
contributors.sort((a, b) => b[1] - a[1]);

return (
  <>
    {contributors.map(([accountId], i) => (
      <div key={i} className="d-flex justify-content-between mb-3">
        <div className="me-4">
          <Widget src="mob.near/widget/Profile" props={{ accountId }} />
        </div>
        <div>
          <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
        </div>
      </div>
    ))}
  </>
);
