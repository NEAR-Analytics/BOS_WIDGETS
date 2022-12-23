const accountId = props.accountId;

if (!accountId) {
  return "";
}

let members = Social.keys(`*/graph/connect/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (members === null) {
  return "Loading";
}

members = Object.entries(members || {});
members.sort(
  (a, b) => b.graph.connect[accountId][1] - a.graph.connect[accountId][1]
);

return (
  <>
    {members.map(([accountId]) => (
      <div className="d-flex justify-content-between mb-3">
        <div className="me-4">
          <Widget src="create.near/widget/Group" props={{ accountId }} />
        </div>
        <div>
          <Widget src="create.near/widget/JoinButton" props={{ accountId }} />
        </div>
      </div>
    ))}
  </>
);
