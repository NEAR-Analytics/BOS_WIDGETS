const contract = "pivortex.testnet";
const thing = Near.view(contract, "get_greeting", {});

return (
  <div>
    <h2>This is a match</h2>
    <div> d {thing} d </div>
  </div>
);
