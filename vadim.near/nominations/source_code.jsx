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
  ).map((item) => {
    const account_id = item[0];
    if (voters[account_id] == undefined) {
      voters[account_id] = {};
    }
    voters[account_id][item[3]] = item[4];
  });

  State.update({ voters });
} else return "Loading";

const countKeys = (obj) => {
  return Object.keys(obj).reduce((count, key) => {
    const value = obj[key];

    return count + JSON.parse(value).length;
  }, 0);
};

const candidateFriendsObject = state.accountId
  ? Social.get(`${state.accountId}/graph/follow/*`, "final") ?? {}
  : {};
const candidateFriends = Object.keys(candidateFriendsObject);

const accounts = Object.keys(state.voters ?? []).map((account_id) => {
  return (
    <div class="row align-items-start">
      <div
        class="col ps-0 overflow-hidden d-flex"
        style={{
          gap: "3px",
          backgroundColor:
            account_id !== state.accountId ? "white" : "lightblue",
        }}
      >
        <div class="overflow-hidden" style={{ maxWidth: "100vw" }}>
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
            />
          </a>
        </div>
        <div class="text-secondary">
          ({countKeys(state.voters[account_id])})
        </div>
      </div>
    </div>
  );
});

const followerSVG = (
  <svg
    x="00px"
    y="0px"
    viewBox="0 0 256 256"
    enable-background="new 0 0 256 256"
    width="14px"
    height="14px"
  >
    <g>
      <g>
        <path
          fill="#000000"
          d="M100,20.6c0,0-49,4.5-46.6,58.4c1.4,11.6,9,70.4,47.8,80.2c4.3,0.8,37.2,9.4,55.5-44.1c1.2-3.5,16.1-40.6,2.2-67.4C155.5,41.6,143.5,17.1,100,20.6z"
        />
        <path
          fill="#000000"
          d="M140.2,173.9c0,0-44.4-6.1-91.1,5.5c-11.2,3.3-38.6,9.6-39,32.7c-0.4,23.1,0,23.7,0,23.7h168C178.2,235.8,139.4,220.7,140.2,173.9z"
        />
        <path fill="#000000" d="M160.5,165.5H246v25.1h-85.5V165.5z" />
        <path fill="#000000" d="M190.5,135.5H216v85.3h-25.5V135.5z" />
      </g>
    </g>
  </svg>
);

const getVotes = (house) => {
  return (JSON.parse(state.voters[state.accountId][house]) ?? []).map(
    (account_id) => {
      currentAccountVotes.push(account_id);
      return (
        <div class="row align-items-start">
          <div class="col ps-2 overflow-hidden d-flex" style={{ gap: "3px" }}>
            <div class="overflow-hidden" style={{ maxWidth: "100vw" }}>
              <Widget
                src="mob.near/widget/N.ProfileLine"
                props={{
                  accountId: account_id,
                  link: true,
                  hideAccountId: true,
                  hideImage: false,
                }}
              />
            </div>
            <div>
              {candidateFriends.includes(account_id) ? followerSVG : ""}
            </div>
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

const currentAccountVotes = [];
const userSimilarity = [];
const votes = Object.keys(state.voters[state.accountId] ?? []).map((house) => {
  return (
    <div class="col col-4 overflow-hidden">
      <h5>{titles[house - 1]}</h5>
      {getVotes(house)}
    </div>
  );
});

Object.keys(state.voters ?? []).map((accountId) => {
  const accountVotes = Object.keys(state.voters[accountId]).reduce(
    (votes, house) => {
      return [...JSON.parse(state.voters[accountId][house]), ...votes];
    },
    []
  );

  const commonVotes = accountVotes.filter((vote) =>
    currentAccountVotes.includes(vote)
  ).length;
  const accountVotesNumber = accountVotes.length;
  const currentAccountVotesNumber = currentAccountVotes.length;
  if (accountId !== state.accountId) {
    userSimilarity.push({
      accountId,
      similarity:
        commonVotes / Math.max(accountVotesNumber, currentAccountVotesNumber),
      commonVotes,
      accountVotesNumber,
      currentAccountVotesNumber,
    });
  }
});

userSimilarity = Object.values(
  userSimilarity.sort((a, b) => b.similarity - a.similarity)
);

const userWithSimilarVotes = userSimilarity.slice(0, 30).map((item) => {
  return (
    <div
      class="col col-md-4 ps-2 overflow-hidden d-flex"
      style={{ gap: "3px" }}
    >
      <div class="overflow-hidden" style={{ maxWidth: "100vw" }}>
        <Widget
          src="mob.near/widget/N.ProfileLine"
          props={{
            accountId: item.accountId,
            link: true,
            hideAccountId: true,
            hideImage: false,
          }}
        />
      </div>
      <div class="text-nowrap">
        {candidateFriends.includes(item.accountId) ? followerSVG : ""}
        <span class="text-secondary">
          ({item.commonVotes} / {item.accountVotesNumber})
        </span>
      </div>
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
        {!state.accountId && (
          <h6 class="pt-3">
            Select a user from the left to view their voting history
          </h6>
        )}
        {state.accountId && (
          <>
            <h4>
              Votes of{" "}
              <Widget
                src="mob.near/widget/N.ProfileLine"
                props={{
                  accountId: state.accountId,
                  link: true,
                  hideAccountId: true,
                  hideImage: false,
                }}
              />{" "}
              <Widget
                src="mob.near/widget/FollowButton"
                props={{ accountId: state.accountId }}
              />
            </h4>
            <hr />

            <div class="row text-start">{votes}</div>

            <h6 class="pt-5">Users with similar vote sequences:</h6>
            <div class="row text-start">{userWithSimilarVotes}</div>
            <div class="row text-center text-secondary mt-3">
              <small>(number of similar votes / number of user votes)</small>
              <small>
                Users followed by {state.accountId} are marked with{" "}
              </small>
            </div>
          </>
        )}
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
