const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "refi.sputnik-dao.near";
const issuer = props.issuer ?? "issuer.regens.near";
const classId = props.classId ?? 1;
const policy = Near.view(daoId, "get_policy");
const reference =
  props.reference ??
  "https://genadrop.mypinata.cloud/ipfs/QmUxy2gB1QQD8mqRSwKkU2k6an4o99ip5ZL12if2opyjas?_gl=1*qk5u0e*_ga*MTQ0ODg3NzEzNS4xNjgyNjA0ODQy*_ga_5RMPXG14TE*MTY4OTM1MzU2Mi4yLjEuMTY4OTM1MzU5Ny4yNS4wLjA";

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
              props={{
                classId: classId,
                issuer: issuer,
                accountId: member,
                roleName: group.name,
                reference: reference,
              }}
            />
          </div>
        ))}
      </div>
    ))}
  </div>
);
