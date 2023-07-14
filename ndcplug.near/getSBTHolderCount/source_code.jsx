const issuer = props.issuer ?? "issuer.regens.near";
State.init({
  read_index: 0,
  tokens: [],
  issuer: issuer,
});

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
}
loadHolders();
return <div>{state.tokens.length}</div>;
