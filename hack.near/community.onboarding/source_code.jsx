const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const role = props.role ?? "voter";

const policy = Near.view(daoId, "get_policy");
const deposit = policy.proposal_bond;

if (policy === null) {
  return "";
}

const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group);

// IAH Verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: accountId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

const handleJoin = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "potential member",
          kind: {
            AddMemberToRole: {
              member_id: accountId,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

return (
  <div className="m-2">
    {!accountId && (
      <Widget
        src="near/widget/DIG.Button"
        props={{
          href: "https://near.org/signup",
          label: "Create Account",
          variant: "outline-dark",
          size: "large",
        }}
      />
    )}

    {human ? (
      <Widget
        src="hack.near/widget/community.join"
        props={{
          memberId: accountId,
          roleId,
        }}
      />
    ) : (
      <Widget
        src="near/widget/DIG.Button"
        props={{
          href: "https://i-am-human.app/?community=banyan&vertical=regionalcommunities",
          label: "Get Verified",
          variant: "outline-primary",
          size: "large",
        }}
      />
    )}
  </div>
);
