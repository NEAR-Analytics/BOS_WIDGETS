const ownerId = "contribut3.near";

const allEntities =
  Near.view(
    ownerId,
    "get_contributor_admin_entities",
    { account_id: context.accountId },
    "final"
  ) ?? [];

allEntities.sort((a, b) => a.localeCompare(b));

console.log(allEntities);

return (
  <div>
    {allEntities && allEntities.length > 0
      ? allEntities.map((accountId) => (
          <div key={accountId} className="mb-2">
            <Widget
              src={`${ownerId}/widget/Entity`}
              props={{ accountId, notStandalone: true }}
            />
          </div>
        ))
      : "No entities with Admin access for your account!"}
  </div>
);
