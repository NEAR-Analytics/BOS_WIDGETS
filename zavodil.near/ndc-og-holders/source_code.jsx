State.init({
  read_index: 0,
  tokens: [],
});

if (state.read_index != -1) {
  const tokens = Near.view("registry.i-am-human.near", "sbt_tokens", {
    issuer: "community.i-am-human.near",
    from_token: 1 + state.read_index * 33,
    limit: 33,
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

return (
  <div>
    <h1>NDC OG Token Holders:</h1>
    <ol>
      {state.tokens.map((token) => (
        <li class="mb-2">
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{ accountId: token.owner, tooltip: true }}
          />
        </li>
      ))}
    </ol>
  </div>
);
