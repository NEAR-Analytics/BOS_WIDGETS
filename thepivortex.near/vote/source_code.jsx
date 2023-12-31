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
      <input
        type="text"
        id="cityName"
        value={state.cityName}
        onChange={(e) => {
          State.update({ [e.target.id]: e.target.value });
        }}
      />
      <input
        type="submit"
        value="SUBMIT / YES"
        onClick={handleClickYes}
        disabled={!isSignedIn}
      />
    </div>

    <button
      className="btn-no"
      onClick={() => handleClickNo()}
      disabled={!isSignedIn}
    >
      {" "}
      NO{" "}
    </button>
  </div>
);
