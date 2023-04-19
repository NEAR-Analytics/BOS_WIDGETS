const proposal = props.proposal;

const ProposalCard = styled.div`
  position: relative;
  height: 300px;
  width: 80%;
  margin: 50px auto;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  overflow: auto;
  border-radius: 4px;
  padding: 20px;
`;

const votes = proposal.proposal.votes;

const voteList = votes
  ? Object.keys(votes).map((voter) => {
      return (
        <>
          <span>{voter}:</span>
          <span>{votes[voter]}</span>
        </>
      );
    })
  : "";

const Status = styled.div`
  font-weight: 700;
  color: ${(props) => {
    switch (props.status) {
      case "Rejected":
        return "#ff5e03";
      case "Approved":
        return "#13a36e";
      case "Expired":
        return "grey";
      case "InProgress":
        return "#ff8743";
    }
  }}
`;

const ProposalId = styled.div`
  color:#8c8c8c;
  font-size: 11px;
`;
const Label = styled.span`
  color:#8c8c8c;
  font-size: 11px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Type = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const PropInfos = styled.div`
  float: right;
  padding: 10px;
  background: rgba(68, 152, 224, 0.1);
  border-radius: 4px;
`;

return (
  <ProposalCard>
    <Header>
      <Status status={proposal.status}>{proposal.status}</Status>
      <ProposalId>Proposal Id {proposal.proposal_id}</ProposalId>
    </Header>
    <Type>{proposal.proposal_type}</Type>
    <PropInfos>
      <InfoWrapper>
        <Label>Proposer</Label>
        <a
          href={`https://explorer.near.org/accounts/${proposal.proposal.proposer}`}
          target="_blank"
        >
          {proposal.proposal.proposer}
        </a>
      </InfoWrapper>
      <InfoWrapper>
        <Label>Submission Time</Label>
        <span>{new Date(proposal.submission_time).toLocaleString()}</span>
      </InfoWrapper>
    </PropInfos>
    <InfoWrapper>
      <Label>Description</Label>
      <p>{proposal.proposal.description}</p>
    </InfoWrapper>
    <InfoWrapper>
      <Label>Votes</Label>
      <div>{voteList}</div>
    </InfoWrapper>
  </ProposalCard>
);
