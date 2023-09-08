State.init({ accountId: props.accountId });

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
    /*.sort((a, b) => {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
      })*/
  ).map((item) => {
    const account_id = item[0];
    if (voters[account_id] == undefined) {
      voters[account_id] = {};
    }
    voters[account_id][item[3]] = item[4];
  });

  State.update({ voters });
} else return "Loading";

const countKeysRecursive = (obj) => {
  return Object.keys(obj).reduce((count, key) => {
    const value = obj[key];

    return count + JSON.parse(value).length;
  }, 0);
};

const accounts = Object.keys(state.voters ?? []).map((account_id) => {
  return (
    <div class="row align-items-start">
      <div
        class="col ps-0 overflow-hidden"
        style={{
          backgroundColor:
            account_id !== state.accountId ? "white" : "lightblue",
        }}
      >
        <a
          onClick={() => {
            State.update({ accountId: account_id });
            return false;
          }}
          style={{ cursor: "pointer" }}
        >
          <Widget
            src="mob.near/widget/N.ProfileLine"
            props={{
              accountId: account_id,
              link: false,
              hideAccountId: true,
              hideImage: false,
            }}
          />{" "}
          ({countKeysRecursive(state.voters[account_id])})
        </a>
      </div>
    </div>
  );
});

const getVotes = (house) => {
  return (JSON.parse(state.voters[state.accountId][house]) ?? []).map(
    (account_id) => {
      return (
        <div class="row align-items-start">
          <div class="col ps-2 overflow-hidden">
            <Widget
              src="mob.near/widget/N.ProfileLine"
              props={{
                accountId: account_id,
                link: false,
                hideAccountId: true,
                hideImage: false,
              }}
            />
          </div>
        </div>
      );
    }
  );
};
const titles = [
  "House of Merit",
  "Council Of Advisors",
  "Transparency Commission",
];
const votes = Object.keys(state.voters[state.accountId] ?? []).map((house) => {
  return (
    <div class="col col-4 overflow-hidden">
      <h5>{titles[house - 1]}</h5>
      {getVotes(house)}
    </div>
  );
});

return (
  <div class="container">
    <div class="row">
      <div
        class="col col-3 align-self-start overflow-auto"
        style={{ height: "calc(100vh - 7rem)" }}
      >
        <h4>Users ({Object.keys(state.voters).length})</h4>
        {accounts}
      </div>
      <div class="col col-9 align-self-start text-center">
        {state.accountId && <h4>Votes of {state.accountId}</h4>}
        <div class="row text-start">{votes}</div>
      </div>
    </div>

    <hr />
    <p>
      <small>
        Data is retrieved automatically from the NEAR Indexer with a slight
        delay.
      </small>
    </p>
  </div>
);
