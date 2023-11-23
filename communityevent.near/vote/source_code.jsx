State.init({
  city_name: "",
});

const contract = "communityevent.near";

const handleClickNo = () => {
  Near.call(contract, "vote_no");
};

const handleClickYes = () => {
  Near.call(contract, "vote_yes", { city_name: state.city_name });
};

return (
  <div>
    <div>
      <input
        type="text"
        id="city_name"
        value={state.city_name}
        onChange={(e) => {
          State.update({ [e.target.id]: e.target.value });
        }}
      />
      <input
        type="submit"
        value="Submit city/yes"
        onClick={handleClickYes}
        disabled={!isSignedIn}
      />
    </div>

    <button
      className="btn-no"
      onClick={() => handleClickNo()}
      disabled={isSignedIn}
    >
      {" "}
      NO{" "}
    </button>
  </div>
);
