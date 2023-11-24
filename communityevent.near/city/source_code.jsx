const CityContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
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

const Button = styled.button`
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
      <p>votes: {city[1].votes}</p>
      <button
        className="btn-view"
        onClick={() => State.update({ showVoters: !state.showVoters })}
      >
        View voters
      </button>
      <div>
        {state.showVoters && (
          <p>
            {city[1].accounts.map((account, index) => (
              <div key={index}>{account}</div>
            ))}
          </p>
        )}
      </div>
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
