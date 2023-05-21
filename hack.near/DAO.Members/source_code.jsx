const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

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
          <a
            key={j}
            className="text-decoration-none"
            href={`#mob.near/widget/ProfilePage?accountId=${member}`}
          >
            <h5>{member}</h5>
          </a>
        ))}
      </div>
    ))}
  </div>
);
