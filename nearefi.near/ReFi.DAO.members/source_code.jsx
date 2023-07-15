const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "refi.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

const groups = policy.roles
  .filter((role) => role.kind.Group)
  .map((role) => ({
    name: role.name,
    members: role.kind.Group,
  }));

return (
  <div>
    {groups.map((group, i) => (
      <div key={i}>
        <h3>{group.name}</h3>
        {group.members.map((member, j) => (
          <div className="d-flex justify-content-between mb-3">
            <Widget
              src="nearefi.near/widget/ReFi.DAO.memberCard"
              props={{ accountId: member, roleName: group.name }}
            />
          </div>
        ))}
      </div>
    ))}
  </div>
);
