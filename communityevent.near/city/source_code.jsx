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
  <CityContainer>
    <CityInfo>
      <h2>{city[0]}</h2>
      <VotesText>votes: {city[1].votes}</VotesText>
      <Button
        className="btn-view"
        onClick={() => State.update({ showVoters: !state.showVoters })}
      >
        View voters
      </Button>
      <Voters>
        {state.showVoters && (
          <p>
            {city[1].accounts.map((account, index) => (
              <div key={index}>{account}</div>
            ))}
          </p>
        )}
      </Voters>
    </CityInfo>

    <ButtonsContainer>
      <Button
        className="btn-yes"
        onClick={() => handleClickYes()}
        disabled={!isSignedIn}
      >
        Upvote
      </Button>
    </ButtonsContainer>
  </CityContainer>
);
