let appName = "tokens-db";

if (!state.tokensLoaded) {
  const tokens = Social.get(`zavodil.near/${appName}/**`, "final");

  if (tokens) {
    State.update({
      tokensLoaded: true,
      tokens,
    });
  }
}

let data = {
  [appName]: state.tokens,
};

console.log(data, state);

let chainlistData = [];

return (
  <div class="container">
    <div class="form-floating">
      <div class="mb-3">
        <label for="tokenId" class="form-label">
          Token ID
        </label>
        <input
          type="text"
          class="form-control"
          value={state.tokenId}
          onChange={(e) => State.update({ tokenId: e.target.value })}
          id="tokenId"
        />
      </div>
      <button
        disabled={!state.tokenId}
        onClick={() =>
          State.update({
            tokens: { [state.tokenId]: "", ...state.tokens },
            tokenId: "",
          })
        }
      >
        Add token
      </button>
    </div>

    <hr />
    <h3>Data:</h3>
    <ul>
      {Object.keys(state.tokens ?? {}).map((tokenId) => (
        <li>{tokenId}</li>
      ))}
    </ul>
    <div class="mb-3">
      <CommitButton data={data}>Commit Data</CommitButton>
    </div>
  </div>
);
