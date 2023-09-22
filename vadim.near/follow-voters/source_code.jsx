const userId =
  state.userId ?? props.accountId ?? context.accountId ?? "vadim.near";

const numberToFollow = 150;

State.init({
  userId,
  whitelisted: [],
  blacklisted: [],
});

if (!userId) {
  return "Please sign  in with NEAR wallet to follow other accounts";
}

const followingData = Social.keys(
  `${state.userId ?? userId}/graph/follow/*`,
  "final"
);
if (followingData === null) {
  return "Loading";
}

if (state.following === undefined) {
  console.log("read following");
  const following =
    followingData[state.userId ?? userId]["graph"]["follow"] ?? {};

  State.update({
    following,
    prevFollowing: JSON.parse(JSON.stringify(following)),
  });
}
const voteData = fetch(
  "https://raw.githubusercontent.com/zavodil/near-nft-owners-list/main/output_election_votes.txt"
);

if (voteData.ok) {
  let voters = {};
  Object.values(
    voteData.body
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

const candidates = [];
Object.keys(state.voters ?? []).map((accountId) => {
  Object.keys(state.voters[accountId]).map((house) => {
    JSON.parse(state.voters[accountId][house]).map((candidateId) => {
      if (!candidates.includes(candidateId)) {
        candidates[candidateId] = house;
      }
    });
  });
});

const votersForCurrentUserId = [];
Object.keys(state.voters ?? []).map((accountId) => {
  const accountVotes = Object.keys(state.voters[accountId]).reduce(
    (votes, house) => {
      return [...JSON.parse(state.voters[accountId][house]), ...votes];
    },
    []
  );
  if (accountVotes.includes(state.userId)) {
    votersForCurrentUserId.push(accountId);
  }
});

const accounts = votersForCurrentUserId;

let followingsAll = [];
accounts.map((followingAccountId) => {
  followingsAll[followingAccountId] =
    (followingsAll[followingAccountId] ?? 0) + 1;
});

let followingTop = Object.keys(followingsAll).sort(
  (a, b) => followingsAll[b] - followingsAll[a]
);

let handleChange = (accountId) => {
  let following = state.following;
  following[accountId] = !following[accountId];
  State.update({ following });
};

let handleSelectAll = () => {
  const following = state.following;

  let followCounter = 0;
  accounts.map((accountId) => {
    if (followCounter < numberToFollow) {
      if (!following[accountId]) {
        followCounter++;
        following[accountId] = true;
      }
    }
  });
  State.update({ following });
};

let followingsBlocks = followingTop.map((accountId) => (
  <li
    className={`list-group-item ${
      state.following[accountId] ? "list-group-item-success" : ""
    }`}
  >
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={accountId}
        disabled={accountId == state.userId}
        id={`follow-${accountId}`}
        name={`follow-${accountId}`}
        onChange={() => handleChange(accountId)}
        checked={state.following[accountId] ?? false}
      />
      <label className="form-check-label" for={`follow-${accountId}`}>
        <Widget
          src="mob.near/widget/N.ProfileLine"
          props={{
            accountId,
            link: false,
            hideAccountId: true,
            hideImage: false,
          }}
        />{" "}
        <a
          className="btn btn-sm btn-outline-secondary border-0"
          href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}
          target="_blank"
        >
          <i className="bi bi-window-plus me-1" title="Open in new tab"></i>
        </a>
      </label>
    </div>
  </li>
));

let dataFollow = {};
Object.keys(state.following).map((accountId) => {
  const prevState = !!state.prevFollowing[accountId];
  let follow = !!state.following[accountId];
  if (accountId !== state.userId && prevState !== follow) {
    dataFollow[accountId] = follow ? "" : null;
  }
});

let dataGraph = [];
let dataNotify = [];

Object.keys(state.following).map((accountId) => {
  if (following[accountId] != state.following[accountId]) {
    let follow = !!state.following[accountId];
    dataGraph.push({
      key: "follow",
      value: {
        type: follow ? "follow" : "unfollow",
        accountId,
      },
    });

    /* dataNotify.push({
      key: accountId,
      value: {
        type: follow ? "follow" : "unfollow",
      },
    }); */
  }
});

const data = {
  graph: {
    follow: dataFollow,
  },
  index: {
    graph: JSON.stringify(dataGraph) /*, 
    notify: JSON.stringify(dataNotify), */,
  },
};

const countKeys = (obj) => {
  return Object.keys(obj).reduce((count, key) => {
    const value = obj[key];

    return count + JSON.parse(value).length;
  }, 0);
};

const containsSearchBy = (account_id) => {
  return !account_id || !state.searchBy || account_id.includes(state.searchBy);
};

const titles = ["HoM", "CoA", "TC"];

const candidatesOrdered = Object.keys(candidates)
  .sort()
  .reduce((obj, key) => {
    obj[key] = candidates[key];
    return obj;
  }, {});

const candidatesList = Object.keys(candidatesOrdered ?? [])
  .filter((account_id) => containsSearchBy(account_id))
  .map((account_id) => {
    return (
      <div class="row align-items-start">
        <a
          onClick={() => {
            State.update({ userId: account_id, following: undefined });
            return false;
          }}
          style={{ cursor: "pointer" }}
        >
          <div
            class="col ps-0 overflow-hidden d-flex"
            style={{
              gap: "3px",
              backgroundColor:
                account_id !== state.userId ? "white" : "lightblue",
            }}
          >
            <div
              class="overflow-hidden"
              style={{ maxWidth: "100vw" }}
              title={account_id}
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
            </div>
            <div class="text-secondary text-nowrap">
              [{titles[candidates[account_id] - 1]}]
            </div>
          </div>
        </a>
      </div>
    );
  });

const commitData = (data) => {
  Social.set(data, { force: true });
};

const currentAccountVotes = [];
const userSimilarity = [];

return (
  <div class="container">
    <div class="row">
      <div class="col col-3 align-self-start overflow-auto">
        <h4>Candidates ({Object.keys(candidates).length})</h4>
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

        {candidatesList}
      </div>
      <div class="col col-9 align-self-start text-start">
        {!state.userId && (
          <h6 class="pt-3 text-center">
            Select a user from the left to view their voting history
          </h6>
        )}
        {state.userId && (
          <>
            <h1 class="text-center">Follow Voters by Candidate</h1>
            <p class="text-center">
              Follow all individuals who voted for you with a single click
            </p>

            <div className="mb-3">
              <button class="btn btn-primary" onClick={handleSelectAll}>
                Select {numberToFollow}
              </button>
              <button
                disabled={context.loading}
                className={`btn ${
                  context.loading ? "btn-outline-dark" : "btn-primary"
                }`}
                onClick={() => commitData(data)}
              >
                {context.loading ? "Loading" : "Mass Follow"}
              </button>
            </div>
            <h4>
              People who voted for {state.userId}: {accounts.length}
              {/* <span>
                ({Object.keys(state.following).length} followed)
              </span>{" "}
              */}
            </h4>
            <ul className="list-group">{followingsBlocks}</ul>

            <div className="mt-2 mb-3">
              <CommitButton
                disabled={context.loading}
                className={`btn ${
                  context.loading ? "btn-outline-dark" : "btn-primary"
                }`}
                data={data}
              >
                {context.loading ? "Loading" : "Mass Follow"}
              </CommitButton>
            </div>
          </>
        )}
      </div>
    </div>

    <hr />
    <p>
      <small>
        Data is retrieved automatically from the NEAR Indexer using Github
        worker with a slight delay ||{" "}
        <a href="/nearukraineguild.near/widget/NDC.Elections.Main?house=1">
          Election stats
        </a>
      </small>
    </p>
  </div>
);
