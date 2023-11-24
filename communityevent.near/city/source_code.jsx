const Container = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  color: #333;
`;

const Votes = styled.p`
  color: #555;
`;

const ViewButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  margin-top: 10px;
  cursor: pointer;
`;

const VotersList = styled.p`
  margin-top: 10px;
`;

const VoterItem = styled.div`
  margin-bottom: 5px;
`;

const UpvoteButton = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 8px 16px;
  margin-top: 10px;
  cursor: pointer;
`;

const YourComponent = (props) => {
  const city = props.city;

  State.init({
    showVoters: false,
  });

  const contract = "communityevent.near";

  const handleClickYes = () => {
    Near.call(contract, "vote_yes", { city_name: city[0] });
  };

  const isSignedIn = context.accountId;

  return (
    <Container>
      <Title>{city[0]}</Title>
      <Votes>votes: {city[1].votes}</Votes>
      <ViewButton
        onClick={() => State.update({ showVoters: !state.showVoters })}
      >
        View voters
      </ViewButton>
      <div>
        {state.showVoters && (
          <VotersList>
            {city[1].accounts.map((account, index) => (
              <VoterItem key={index}>{account}</VoterItem>
            ))}
          </VotersList>
        )}
      </div>
      <UpvoteButton onClick={() => handleClickYes()} disabled={!isSignedIn}>
        Upvote
      </UpvoteButton>
    </Container>
  );
};
