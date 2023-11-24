const Input = styled.input`
  margin: 5px;
  padding: 8px;
  height: 40px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 8px;
  width: 150px;
  background-color: #00EC97;
  color: #151515;
  cursor: pointer;
  border: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

State.init({
  cityName: "",
});

const contract = "communityevent.near";

const handleClickNo = () => {
  Near.call(contract, "vote_no");
};

const handleClickYes = () => {
  Near.call(contract, "vote_yes", { city_name: state.cityName });
};

const isSignedIn = context.accountId;

return (
  <Container>
    <Input
      type="text"
      id="cityName"
      value={state.cityName}
      onChange={(e) => {
        State.update({ [e.target.id]: e.target.value });
      }}
    />
    <Button type="submit" onClick={handleClickYes} disabled={!isSignedIn}>
      SUBMIT / YES
    </Button>
    <Button
      className="btn-no"
      onClick={() => handleClickNo()}
      disabled={!isSignedIn}
    >
      NO
    </Button>
  </Container>
);
