State.init({
  read_index: 0,
  tokens: [],
  issuer: "community.i-am-human.near",
  collectionName: "OG",
  sbtList: [],
});

// issuer.regens.near, community.i-am-human.near, fractal.i-am-human.near, issuer.proofofvibes.near
// add conditional dropdown
// future add classes
// add drop down
// add custom

// Load badge helper functions
function loadSBTs() {
  const res = fetch(
    "https://raw.githubusercontent.com/codingshot/ndc-landing/main/data/sbtList.json"
  );
  return res.body && JSON.parse(res.body);
}
const sbtList = loadSBTs();
State.update({ sbtList: sbtList });
if (!state.sbtList) {
  return "⧗ Loading  SBT List...";
}

// if (state.read_index != -1) {
//   const tokens = Near.view("registry.i-am-human.near", "sbt_tokens", {
//     issuer: state.issuer,
//     from_token: 1 + state.read_index * 100,
//     limit: 100,
//   });

//   if (tokens) {
//     if (!tokens.length) {
//       State.update({ read_index: -1 });
//     } else {
//       State.update({
//         read_index: state.read_index + 1,
//         tokens: [...state.tokens, ...tokens],
//       });
//     }
//   }
// }
// Load hodlers helper functions
function renderHolders() {}
function loadHolders() {
  if (state.read_index != -1) {
    const tokens = Near.view("registry.i-am-human.near", "sbt_tokens", {
      issuer: state.issuer,
      from_token: 1 + state.read_index * 100,
      limit: 100,
    });

    if (tokens) {
      if (!tokens.length) {
        State.update({ read_index: -1 });
      } else {
        State.update({
          read_index: state.read_index + 1,
          tokens: [...state.tokens, ...tokens],
        });
      }
    }
  }
  renderHolders();
}
loadHolders();
const handleIssuerChange = (e) => {
  State.update({ issuer: e.target.value });
  console.log("Issuer Address: " + state.issuer);
  loadHolders();
};

const handleSbtChange = (e) => {
  State.update({
    issuer: sbtList
      .filter((sbt) => sbt.title === e.target.value)
      .map((el) => el.address)[0],
  });
  console.log("New Issuer based on SBT change " + state.issuer);
  loadHolders();
}; // need to change this around

console.log(tokens.length); // put in progress meter

return (
  <div>
    <Widget
      src="ndcplug.near/widget/NDC.Common.SimpleHeader"
      props={{ title: "NDC OG SBT Holders" }}
    />
    <label>Choose A NDC Community SBT Badge</label>
    <div className="sbt">
      <select
        className="form-select"
        aria-label="select asset"
        onChange={handleSbtChange}
      >
        <option selected disabled>
          {" "}
          Select a badge
        </option>
        {sbtList &&
          sbtList.map((sbt) => (
            <option value={sbt.title} selected={sbt.selected}>
              {sbt.title}
            </option>
          ))}
        // add receiver logic here
      </select>
    </div>
    <div className="balance input-group">
      <input
        style={{ maxWidth: "100%" }}
        type="string"
        defaultValue={state.issuer} // feel like this wrong
        value={state.issuer}
        placeholder={state.issuer}
        onChange={handleIssuerChange}
      />
    </div>
    <ol>
      {state.tokens.map((token) => (
        <li class="mb-2">
          <Widget
            src="chaotictempest.near/widget/AccountProfileCard"
            props={{ accountId: token.owner }}
          />
        </li>
      ))}
    </ol>
  </div>
);
