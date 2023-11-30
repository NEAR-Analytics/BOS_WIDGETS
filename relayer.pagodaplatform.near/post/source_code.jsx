const Button = styled.button`
  margin: 5px;
  background-color: #00EC97;
  color: #151515;
`;

const CityContainer = styled.div`
  display: flex;
  border: 1px solid #151515;
  background-color: #F4F4F4;
`;

const CityInfo = styled.div`
  flex: 1;
  padding: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
`;

const VotesText = styled.p`
  margin: 5px;
`;

const Voters = styled.p`
  margin: 5px;
`;

const info = props.information;

State.init({
  showVoters: false,
  name: info.name,
  description: info.description,
  authorId: info.authorId,
  timestamp: info.timestamp,
});

return (
  <CityContainer>
    <CityInfo>
      <h2>{state.name}</h2>
      <VotesText>Description: {state.description}</VotesText>
      <VotesText>AuthorId: {state.authorId}</VotesText>
      <VotesText>Timestamp: {state.timestamp}</VotesText>
    </CityInfo>
  </CityContainer>
);
