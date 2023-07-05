const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "voter";
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const proposalId =
  props.proposalId ?? Near.view(daoId, "get_last_proposal_id") - 1;

console.log(proposalId);

if (!accountId) {
  return "";
}

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}
const deposit = policy.proposal_bond;

const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group);

State.init({
  isMember: false,
});

const proposal = Near.view(daoId, "get_proposal", {
  id: proposalId,
});

if (proposal === null) {
  return "missing *proposalId*";
}

console.log(proposal);

// check if account can join
const canJoin = accountId && memberId !== proposal.proposer;

console.log(canJoin);

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "add member to DAO",
          kind: {
            AddMemberToRole: {
              member_id: memberId,
              role: roleId,
            },
          },
        },
      },
      gas: 300000000000000,
      deposit: deposit,
    },
  ]);
};

const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(memberId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

// IAH Verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: memberId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

return (
  <div>
    {!validMember && canJoin && (
      <button
        disabled={!human}
        className="btn btn-success m-1"
        onClick={handleProposal}
      >
        Join DAO
      </button>
    )}
    {!canJoin && (
      <button disabled={!canJoin} className="btn btn-success m-1">
        Joined
      </button>
    )}
    <a
      className="btn btn-outline-success m-1"
      href="#/hack.near/widget/verified.members"
    >
      Members
    </a>
  </div>
);
