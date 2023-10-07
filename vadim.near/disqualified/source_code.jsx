const disqualified = fetch(
  "https://gist.githubusercontent.com/zavodil/75b2f326efc220da8176233dbb309748/raw/9081ec8b917144872b530b8f5085a5c5d0af442a/gistfile1.txt"
);
if (disqualified.ok) {
  State.update({ disqualified: disqualified.body.split("\n") });
}

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

let affectedCandidates = {};
let totalDisaqualifiedVotes = 0;
state.disqualified.map((accountId) => {
  Object.keys(state.voters[accountId]).map((house) => {
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
    <h4>
      EIC{" "}
      <a
        href="https://near-ndc.notion.site/0de8e7789e3a476584ca56a4399f10ac?v=4e99173f37b74bec8af740160a8f8bd9"
        target="_blank"
      >
        nullified
      </a>{" "}
      the votes of 157 voters
    </h4>
    <h1>The candidates affected:</h1>

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
      <div class="col fw-bold">Votes nullified</div>
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
  </div>
);
