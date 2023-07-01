const { daoId, policy, proposal } = props;
const candidateId = props.candidateId;

const postUrl =
  props.postUrl ?? "https://near.org/hack.near/widget/dao.election";

function mapVote(vote) {
  return vote === "Approve" && <span className="text-success">Approve</span>;
}

function vote(action) {
  return Near.call(daoId, "act_proposal", {
    id: proposal.id,
    action,
  });
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  width: 95%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 15px;
  margin: 0.888em;
`;

return (
  <Container>
    <Card>
      <Widget
        src="near/widget/AccountProfile"
        props={{ accountId: candidateId }}
      />
      <Widget
        src="near/widget/DIG.Button"
        props={{
          href: `${postUrl}`,
          label: "View Thread",
          variant: "outline-primary",
          size: "small",
        }}
      />
      <div className="m-2 d-flex flex-row gap-2">
        <button
          className="btn flex-fill btn-success"
          onClick={() => vote("VoteApprove")}
        >
          Vote
        </button>
      </div>
    </Card>
  </Container>
);
