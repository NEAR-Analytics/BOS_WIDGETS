State.init({
  filter: 1,
  read_index: 0,
  tokens: [],
});

const data = fetch(
  "https://raw.githubusercontent.com/zavodil/near-nft-owners-list/main/output_election_votes.txt"
);

if (data.ok) {
  let voters = {};
  Object.values(
    data.body
      .split("\n")
      .map((line) => line.split("|"))
      .filter((data) => data.length === 5)
  ).map((item) => {
    const account_id = item[0];
    if (voters[account_id] == undefined) {
      voters[account_id] = {};
    }
    voters[account_id][item[3]] = item[4].toLowerCase();
  });

  State.update({ voters });
} else return "Loading";

if (state.read_index != -1) {
  const tokens = Near.view("registry.i-am-human.near", "sbt_tokens", {
    issuer: "community.i-am-human.near",
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

const tokens = state.tokens.filter(
  (token) => token.metadata.class == state.filter
);
const votersFiltered = tokens.map((token) => token.owner);

let affectedCandidates = {};
let totalDisaqualifiedVotes = 0;
votersFiltered.map((accountId) => {
  Object.keys(state.voters[accountId] ?? []).map((house) => {
    JSON.parse(state.voters[accountId][house]).map(
      (candidateId) =>
        (affectedCandidates[candidateId] =
          (affectedCandidates[candidateId] ?? 0) + 1)
    );
    totalDisaqualifiedVotes += JSON.parse(
      state.voters[accountId][house]
    ).length;
  });
});
const affectedCandidatesSorted = Object.keys(affectedCandidates).sort(
  (a, b) => affectedCandidates[b] - affectedCandidates[a]
);

const containsSearchBy = (account_id) => {
  return !account_id || !state.searchBy || account_id.includes(state.searchBy);
};

return (
  <div>
    <h1>Votes by Community SBT Owners</h1>

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        id="filter-1"
        onChange={() => State.update({ filter: 1 })}
        checked={state.filter == 1}
      />
      <label class="form-check-label" for="filter-1">
        SBT OG token
      </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        id="filter-2"
        onChange={() => State.update({ filter: 2 })}
        checked={state.filter == 2}
      />
      <label class="form-check-label" for="filter-2">
        SBT NDC Contributor
      </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        id="filter-3"
        onChange={() => State.update({ filter: 3 })}
        checked={state.filter == 3}
      />
      <label class="form-check-label" for="filter-3">
        GWG Core Contributor
      </label>
    </div>

    <div class="input-group mb-1">
      <input
        type="text"
        class="form-control"
        placeholder="Search by NEAR Account ID"
        onChange={(e) =>
          State.update({
            searchBy: e.target.value,
          })
        }
        value={state.searchBy}
      />

      <button
        class="btn btn-outline-secondary"
        type="button"
        onClick={() => State.update({ searchBy: "" })}
        title="Reset Search"
      >
        X
      </button>
    </div>

    <div class="row align-items-start border-bottom">
      <div class="col fw-bold">Candidate</div>
      <div class="col fw-bold">Votes casted</div>
    </div>

    {affectedCandidatesSorted
      .filter((account_id) => containsSearchBy(account_id))
      .map((candidateId) => {
        return (
          <div class="row border-bottom align-items-start">
            <div class="col" title={candidateId}>
              <Widget
                src="mob.near/widget/N.ProfileLine"
                props={{
                  accountId: candidateId,
                  link: true,
                  hideAccountId: true,
                  hideImage: false,
                }}
              />
            </div>
            <div class="col align-items-start">
              {affectedCandidates[candidateId]}
            </div>
          </div>
        );
      })}
    <div class="pt-3">
      Voters:{" "}
      <ol>
        {votersFiltered.map((item) => (
          <li>{item}</li>
        ))}
      </ol>
    </div>
  </div>
);
