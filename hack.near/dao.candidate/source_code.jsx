const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;

const daoId = props.daoId ?? "multi.sputnik-dao.near";
const groupId = props.groupId ?? "community";

const candidateId = props.candidateId ?? "multi.near";
const proposalId = props.proposalId;

const proposal = Near.view(daoId, "get_proposal", {
  id: JSON.parse(proposalId),
});

if (proposal === null) {
  return "missing *proposalId*";
}

const postUrl =
  props.postUrl ?? "https://social.near.page/p/rc-dao.near/94244727";

State.init({
  isMember: false,
});

const policy = Near.view(daoId, "get_policy");

if (!policy) {
  return "Loading...";
}

const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => role.kind.Group);

const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(memberId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

// check if account can vote
const canVote =
  accountId &&
  memberId &&
  proposal.votes &&
  !proposal.votes[memberId] &&
  proposal.status === "In Progress";

const handleApprove = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: proposalId,
        action: "VoteApprove",
      },
      gas: 219000000000000,
    },
  ]);
};

console.log(proposalId);
console.log(proposal);

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  width: 100%;
  border-radius: 9px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 12px;
  margin: 0.555em;
`;

return (
  <Card>
    <Widget
      src="near/widget/AccountProfile"
      props={{ accountId: candidateId }}
    />
    <a className="btn flex-fill btn-outline-primary" href={postUrl}>
      Campaign
    </a>
    {validMember && (
      <div className="m-2 d-flex flex-row gap-2">
        {canVote ? (
          <button className="btn flex-fill btn-success" onClick={handleApprove}>
            Vote
          </button>
        ) : (
          <Widget
            src="mob.near/widget/FollowButton"
            props={{ accountId: candidateId }}
          />
        )}
      </div>
    )}
  </Card>
);
