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
  <div>
    <h2> {city[0]} </h2>
    <p>votes: {city[1].votes} </p>
    <button
      className="btn-view"
      onClick={() => State.update({ show_voters: !state.show_voters })}
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

    <button
      className="btn-yes"
      onClick={() => handleClickYes()}
      disabled={!isSignedIn}
    >
      Upvote
    </button>
  </div>
);
