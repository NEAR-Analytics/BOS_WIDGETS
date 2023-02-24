const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;
const cid = props.cid;

const allContributors = (
  accountId
    ? Object.keys(
      Near.view(
        ownerId,
        cid ? "get_need_contributions" : "get_entity_contributions",
        { account_id: accountId, ...(cid ? { cid } : {}) },
        "final",
        true
      ) ?? {}
    )
    : Near.view(ownerId, "get_contributors", {}, "final", true) ?? []
).filter((id) => id.includes(search));

if (!allContributors || allContributors.length === 0) {
  return "No contributors found!";
}

return (
  <>
    {allContributors.map((ids) => (
      <div key={account ? ids : ids[0]} className="mb-2">
        <Widget
          src={`${ownerId}/widget/Contributor`}
          props={{ accountId: accountId ? ids : ids[0], update: props.update }}
        />
      </div>
    ))}
  </>
);
