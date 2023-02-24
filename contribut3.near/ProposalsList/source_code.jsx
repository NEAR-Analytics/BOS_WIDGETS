const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;

const requests =
  Near.view(
    ownerId,
    "get_contributor_contribution_requests",
    { account_id: context.accountId },
    "final",
    true
  ) ?? [];

if (!requests) {
  return "Loading...";
}

if (Array.isArray(requests) && requests.length === 0) {
  return "No contribution requests found!";
}

const allRequests = requests.filter(
  ([entityId, contributorId]) =>
    entityId.includes(search) ||
    (accountId ? contributorId.includes(search) : true)
);

if (!allRequests || allRequests.length === 0) {
  return "No requests match search criteria!";
}

return (
  <>
    {allRequests.map(([entityId, contributorId]) => (
      <div key={contributorId} className="mt-3">
        <Widget
          src={`${ownerId}/widget/ContributionRequest`}
          props={{
            entityId: accountId || entityId,
            contributorId: accountId ? entityId : contributorId,
            update: props.update,
          }}
        />
      </div>
    ))}
  </>
);
