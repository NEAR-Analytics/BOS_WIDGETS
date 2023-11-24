const Input = styled.input`
  margin: 5px;
  padding: 8px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 8px;
  width: 150px; /* Set a fixed width for the buttons */
  background-color: #00EC97; /* Set the background color to green for both buttons */
  color: #151515;
  cursor: pointer;
  border: none;
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
  <div>
    <div>
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
    </div>

    <Button
      className="btn-no"
      onClick={() => handleClickNo()}
      disabled={!isSignedIn}
    >
      NO
    </Button>
  </div>
);
