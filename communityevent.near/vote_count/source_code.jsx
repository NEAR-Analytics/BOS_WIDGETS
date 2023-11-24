const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const StatBox = styled.div`
  width: 120px; /* Set a fixed width */
  padding: 15px;
  background-color: #00EC97;
  color: #151515;
  border-radius: 10px;
  text-align: center;
`;

const StatLabel = styled.p`
  margin: 0;
  font-weight: bold;
`;

const StatValue = styled.p`
  margin: 0;
  font-size: 18px;
`;

const contract = "communityevent.near";
const yesVotes = Near.view(contract, "get_yes");
const noVotes = Near.view(contract, "get_no");

return (
  <StatsContainer>
    <StatBox>
      <StatLabel>Yes</StatLabel>
      <StatValue>{yesVotes}</StatValue>
    </StatBox>
    <StatBox>
      <StatLabel>No</StatLabel>
      <StatValue>{noVotes}</StatValue>
    </StatBox>
  </StatsContainer>
);
