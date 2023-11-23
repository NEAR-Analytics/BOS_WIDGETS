const contract = "communityevent.near";
const yes_votes = Near.view(contract, "get_yes");
const no_votes = Near.view(contract, "get_no");

return (
  <div>
    <p> Yes: {yes_votes} </p>
    <p> No: {no_votes} </p>
  </div>
);
