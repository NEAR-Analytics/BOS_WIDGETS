const daoId = props.daoId ?? "multi.sputnik-dao.near";
const proposal = JSON.parse(JSON.stringify(props.proposal)) ?? {
  id: 39,
};

const policy = props.policy;
const candidateId = props.candidateId ?? "multi.near";

const postUrl =
  props.postUrl ?? "https://social.near.page/p/rc-dao.near/94244727";

const handleApprove = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: proposal.id,
        action: "VoteApprove",
      },
      gas: 200000000000000,
    },
  ]);
};

const proposalId = props.proposalId ?? 41;

const alreadyVoted = props.proposal.votes[accountId];
const canVote =
  !alreadyVoted && props.proposal.status === "In Progress" && accountId;

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
    {!canVote ? (
      <div className="m-2 d-flex flex-row gap-2">
        <button className="btn flex-fill btn-success" onClick={handleApprove}>
          Vote
        </button>
      </div>
    ) : (
      <div className="m-2 d-flex flex-row gap-2">
        <Widget
          src="mob.near/widget/FollowButton"
          props={{ accountId: candidateId }}
        />
      </div>
    )}
  </Card>
);
