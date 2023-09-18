State.init({
  accountId: props.accountId,
  propsAccountId: props.accountId,
  whitelisted: [],
  blacklisted: [],
});

if (state.propsAccountId !== props.accountId) {
  State.update({ accountId: props.accountId, propsAccountId: props.accountId });
}

const blacklisted = fetch(
  "https://gist.githubusercontent.com/zavodil/49c5188913cd76b2a20861a4e4e91855/raw/0f7b273a5b259a3a77672500d9cc5317ba0dbccb/blacklisted.txt"
);
if (blacklisted.ok) {
  State.update({ blacklisted: JSON.parse(blacklisted.body) });
}

const whitelisted = fetch(
  "https://gist.githubusercontent.com/zavodil/20e4ae896e1f6053e1d66a398e1026c9/raw/0363976f86bb067c142b1d8912ad37e639b876cf/whitelisted.txt"
);
if (whitelisted.ok) {
  State.update({ whitelisted: JSON.parse(whitelisted.body) });
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

const containsSearchBy = (account_id) => {
  return !account_id || !state.searchBy || account_id.includes(state.searchBy);
};

const svgBlack = (
  <svg x="0px" y="0px" width="14px" height="14px" viewBox="0 0 93.49 122.88">
    <path
      fill="#e21b1b"
      d="M2.34,62.52l-0.26,0.27l-2.08-0.83V31.27c0-1.42,0.42-2.76,1.14-3.89l0,0c0.14-0.22,0.29-0.44,0.46-0.64 c0.17-0.22,0.35-0.42,0.53-0.6l0.02-0.02c0.54-0.54,1.18-1.01,1.89-1.36l0.03-0.01l0.35-0.17l0.04-0.02 c0.86-0.37,1.82-0.58,2.81-0.58l0,0h0.04v0c2.01,0,3.84,0.82,5.16,2.14c0.54,0.54,1.01,1.18,1.36,1.88l0.02,0.04l0.16,0.35 l0.01,0.03c0.37,0.86,0.58,1.82,0.58,2.81l0,0.01v0.04v24.96v1.13l-1.13,0.07c-3.08,0.19-5.92,1.18-8.32,2.77 c-0.48,0.32-0.94,0.66-1.38,1.02c-0.41,0.34-0.84,0.72-1.26,1.15L2.34,62.52L2.34,62.52L2.34,62.52z M65.62,83.35l1.23,0.46 l0.53,0.39c0.09,0.12,0.2,0.22,0.33,0.31l0,0l0.16,0.09l0,0.01c0.17,0.08,0.35,0.12,0.54,0.12v0h0.03c0.18,0,0.34-0.03,0.49-0.09 l0.12-0.06l0.12-0.07l0.04-0.02l0.04-0.02c0.54-0.31,1.26-0.85,2.05-1.5c0.8-0.67,1.71-1.49,2.61-2.33 c1.76-1.66,3.76-3.66,4.56-4.45l0.04-0.04c2.53-2.53,5.11-3.7,7.38-3.85c0.46-0.03,0.92-0.02,1.35,0.03 c0.44,0.05,0.87,0.14,1.28,0.27h0.01l0.05,0.02l0.01,0c0.81,0.26,1.56,0.67,2.22,1.2l0.03,0.03l0.31,0.27l0.06,0.05l0.29,0.29 l0.05,0.06l0.01,0.01l0,0l0.01,0.02l0,0c0.56,0.62,1.01,1.35,1.34,2.16l0.02,0.03l0.15,0.42l0.02,0.09l0.12,0.43l0.01,0.05 l0.01,0.06h0c0.57,2.38,0.1,5.27-1.88,8.17c-0.37,0.55-0.81,1.11-1.29,1.65c-0.48,0.54-1.02,1.09-1.62,1.62l0,0l-0.08,0.07 l-0.1,0.09l-0.07,0.07l-0.04,0.04L63.64,114.3l-0.85,0.93l-0.06-0.06c-1.35,1.23-2.67,2.29-4.01,3.2c-1.6,1.08-3.22,1.95-4.9,2.61 c-1.69,0.67-3.46,1.15-5.33,1.46c-1.87,0.3-3.84,0.45-5.94,0.45h-15.9c-5.3,0-10.23-1.56-14.36-4.23l0,0 c-0.79-0.51-1.57-1.08-2.32-1.69c-0.76-0.62-1.47-1.26-2.12-1.92l-0.02-0.02l0,0c-2.01-2.04-3.71-4.42-5-7.03 c-0.25-0.52-0.49-1.04-0.71-1.56C0.76,103.2,0.01,99.65,0,95.93h0V95.9V74.93c0-1.93,0.36-3.79,1-5.49l0-0.01 c0.12-0.31,0.26-0.64,0.41-0.97h0c0.15-0.32,0.31-0.64,0.48-0.95l0.01-0.02l0.03-0.05l0.02-0.04c0.62-0.97,1.36-1.88,2.19-2.69 l0.02-0.02l0.46-0.43l0.04-0.03l0.48-0.41l0.04-0.04l0.02-0.02l0,0c1.06-0.85,2.24-1.57,3.51-2.11h0c0.29-0.12,0.57-0.24,0.76-0.3 v0c1.56-0.57,3.25-0.88,5.01-0.88v0h0.04h0.64l0.29,0.04l0.27,0.07l0.21,0.02v0h17.27v0l0.11,0h0.08l0.11,0v0h17.27v0l0.05,0h0.07 l0.05,0v0h1.28c2.54,0,4.94,0.65,7.05,1.79l0,0c0.42,0.23,0.82,0.47,1.19,0.72v0l0.01,0c0.36,0.24,0.74,0.52,1.11,0.82l0.01,0.01 l0.02,0.02l0,0c1.82,1.49,3.3,3.41,4.25,5.6c0.2,0.45,0.37,0.89,0.5,1.31v0c0.15,0.45,0.27,0.91,0.38,1.37v0.01l0.01,0.07 l0.02,0.11c0.01,0.08,0.02,0.16,0.04,0.22h0l0.01,0.03h0l0.04,0.11h0l0.02,0.06L67,73.21l0.06,0.65l0,0.04l0.02,0.26v0.04 l0.02,0.46v0.03l0,0.25l0,0.01v4.43v1.66l-1.58-0.52c-2.46-0.81-4.81-1.36-7.03-1.66h0c-0.5-0.07-0.98-0.12-1.42-0.17 c-0.45-0.04-0.92-0.08-1.39-0.1l-1.02-0.03c-2.85-0.04-5.48,0.37-7.81,1.17c-0.51,0.18-0.99,0.36-1.42,0.55 c-0.45,0.2-0.9,0.41-1.32,0.64l-0.71,0.41c-2.23,1.34-4.08,3.14-5.49,5.34c-0.29,0.46-0.56,0.9-0.78,1.33 c-0.24,0.45-0.46,0.94-0.68,1.44v0l-0.01,0.03h0c-0.68,1.62-1.17,3.4-1.45,5.33c-0.06,0.44-0.12,0.87-0.15,1.28 c-0.03,0.34-0.07,0.7-0.08,1.06l2.66,0.03c0.08-1.35,0.28-2.64,0.57-3.84h0c0.09-0.37,0.18-0.72,0.27-1.03h0 c0.09-0.3,0.2-0.64,0.33-0.98v0l0.32-0.82l0,0c0.89-2.13,2.18-3.94,3.8-5.38c0.32-0.28,0.66-0.55,0.99-0.8 c0.37-0.27,0.72-0.51,1.06-0.71l0.02-0.01l0.03-0.02v0c1.7-1.02,3.68-1.73,5.9-2.09c0.45-0.07,0.94-0.14,1.44-0.18 c0.49-0.05,1-0.07,1.49-0.09h0.03l0.98,0h0.02c2.3,0.03,4.79,0.39,7.44,1.07v0c0.61,0.15,1.18,0.32,1.72,0.49 c0.62,0.19,1.21,0.39,1.77,0.58L65.62,83.35L65.62,83.35z M15.74,60.59L15.74,60.59L15.74,60.59L15.74,60.59L15.74,60.59z M48.24,57.4H36.05h-1.2v-1.2V7.3h0c0-2.01,0.82-3.84,2.14-5.16c0.54-0.54,1.18-1.01,1.88-1.36l0.03-0.01l0.35-0.17l0.04-0.02 c0.86-0.37,1.81-0.58,2.81-0.58l0-0.01h0.04v0.01c2.01,0,3.84,0.82,5.16,2.14c0.54,0.54,1,1.18,1.36,1.88l0.02,0.03l0.16,0.35 l0.02,0.04c0.37,0.86,0.58,1.81,0.58,2.81l0,0.01V7.3v48.89v1.2H48.24L48.24,57.4z M53.63,57.45l-0.22-0.02l-1.12-0.09v-1.11V19.01 h0c0-2.01,0.82-3.84,2.14-5.16c0.54-0.54,1.18-1,1.89-1.36l0.04-0.02l0.35-0.16l0.03-0.02c0.86-0.37,1.81-0.58,2.81-0.58l0,0h0.04 c1.42,0,2.76,0.42,3.89,1.14l0,0l0.01,0.01c0.22,0.13,0.43,0.29,0.63,0.45l0,0l0.01,0.01c0.21,0.16,0.41,0.34,0.59,0.52l0.02,0.02 c0.54,0.54,1.01,1.18,1.36,1.88l0.01,0.03l0.17,0.35l0.02,0.04c0.37,0.86,0.58,1.82,0.58,2.81l0,0v0.04v42.9l-2.07,0.84l-0.2-0.2 c-2.06-2.06-4.63-3.62-7.49-4.45c-0.57-0.17-1.16-0.31-1.73-0.41C54.84,57.58,54.24,57.5,53.63,57.45L53.63,57.45z M30.68,57.4 H18.49h-1.21v-1.2V31.27h0V18.89h0c0-1.42,0.42-2.77,1.14-3.9h0c0.14-0.23,0.3-0.45,0.46-0.65c0.17-0.22,0.35-0.42,0.52-0.59 l0.02-0.02c0.54-0.54,1.18-1,1.89-1.36l0.03-0.01l0.35-0.16l0.04-0.02c0.86-0.37,1.81-0.58,2.81-0.58l0,0h0.04v0 c2.01,0,3.84,0.82,5.16,2.14c0.54,0.54,1,1.18,1.36,1.88l0.01,0.03L31.28,16l0.02,0.04c0.37,0.86,0.58,1.82,0.58,2.81l0,0v0.04 v37.3v1.2H30.68L30.68,57.4z"
    />
  </svg>
);

const svgFlag = (
  <svg width="14px" height="14px" viewBox="0 0 116.8 122.88">
    <path
      fill="#e21b1b"
      d="M18,81.08l-5.78-56.9A4.3,4.3,0,0,1,14.39,20C41.59,2.6,54.66,9.66,66.7,16.16,76.22,21.3,84.92,26,103.75,10a4.45,4.45,0,0,1,6.2.44,4.22,4.22,0,0,1,1,2.42l5.78,56.89a4.23,4.23,0,0,1-1.38,3.57c-21.79,19.84-35,13.16-48.6,6.27C55.74,74,44.35,68.25,25.21,84.12a4.47,4.47,0,0,1-6.21-.5,4.26,4.26,0,0,1-1-2.54Z"
    />
    <path
      fill="#1a1a1a"
      d="M17.89,16.71l9.88,98.6a6.89,6.89,0,1,1-13.71,1.35L4.21,18.38a10.15,10.15,0,1,1,13.68-1.67Z"
    />
  </svg>
);

const flagTitle = "This account wasn't initially on the whitelist";
const blackTitle = "This account was initially blacklisted";

const accounts = Object.keys(state.voters ?? [])
  .filter((account_id) => containsSearchBy(account_id))
  .map((account_id) => {
    return (
      <div class="row align-items-start">
        <a
          onClick={() => {
            State.update({ accountId: account_id });
            return false;
          }}
          style={{ cursor: "pointer" }}
        >
          <div
            class="col ps-0 overflow-hidden d-flex"
            style={{
              gap: "3px",
              backgroundColor:
                account_id !== state.accountId ? "white" : "lightblue",
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
              {state.blacklisted.includes(account_id) && (
                <span title={blackTitle}>{svgBlack}</span>
              )}
              {!state.blacklisted.includes(account_id) &&
                !state.whitelisted.includes(account_id) && (
                  <span title={flagTitle}>{svgFlag}</span>
                )}
              ({countKeys(state.voters[account_id])})
            </div>
          </div>
        </a>
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
    <div class="col col-4 ps-2 overflow-hidden d-flex" style={{ gap: "3px" }}>
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
        {state.blacklisted.includes(item.accountId) && (
          <span title={blackTitle}>{svgBlack}</span>
        )}
        {!state.blacklisted.includes(item.accountId) &&
          !state.whitelisted.includes(item.accountId) && (
            <span title={flagTitle}>{svgFlag}</span>
          )}
        <span class="text-secondary">
          ({item.commonVotes}/{item.accountVotesNumber})
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
            <h4 class="text-nowrap text-center">
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

            <div class="row text-start">
              {votes.length ? (
                votes
              ) : (
                <h3 class="text-center">Votes not found</h3>
              )}
            </div>

            {!!votes.length && (
              <>
                <h6 class="pt-5">Users with similar vote sequences:</h6>
                <div class="row text-start">{userWithSimilarVotes}</div>
                <div class="row text-center text-secondary mt-3">
                  <small>
                    (number of similar votes / number of user votes)
                  </small>
                  <small>
                    Users followed by{" "}
                    <a
                      href={`/vadim.near/widget/elections?accountId=${state.accountId}`}
                    >
                      {state.accountId}
                    </a>{" "}
                    are marked with {followerSVG}
                  </small>
                </div>
              </>
            )}
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
