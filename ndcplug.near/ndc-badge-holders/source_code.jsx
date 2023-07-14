State.init({
  read_index: 0,
  tokens: [],
  issuer: "community.i-am-human.near",
  collectionName: "OG",
});
// add conditional
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
console.log(tokens.length); // put in progress meter

return (
  <div>
    <h1>NDC {state.collectionName} SBT Holders:</h1>
    <ol>
      {state.tokens.map((token) => (
        <li class="mb-2">
          <Widget
            src="chaotictempest.near/widget/AccountProfileCard"
            props={{ accountId: token.owner, tooltip: true }}
          />
        </li>
      ))}
    </ol>
  </div>
);
