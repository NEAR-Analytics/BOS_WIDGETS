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

const info = props.info;

State.init({
  showVoters: false,
});

/*
const contract = "communityevent.near";
const handleClickYes = () => {
  Near.call(contract, "vote_yes", { city_name: city[0] });
};
*/

const isSignedIn = context.accountId;

return (
  <CityContainer>
    <CityInfo>
      <h2>{info[0].name}</h2>
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
