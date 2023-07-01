const { daoId, policy } = props;
const candidateId = props.candidateId;

const postUrl =
  props.postUrl ?? "https://social.near.page/p/rc-dao.near/94244727";

function mapVote(vote) {
  return vote === "Approve" && <span className="text-success">Approve</span>;
}

function vote(action) {
  return Near.call(daoId, "act_proposal", {
    id: props.id,
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
  <Container>
    <Card>
      <Widget
        src="near/widget/AccountProfile"
        props={{ accountId: candidateId }}
      />
      <a className="btn flex-fill btn-outline-primary" href={postUrl}>
        Campaign
      </a>
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
