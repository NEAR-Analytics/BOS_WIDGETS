State.init({ filter: "all" });
State.update({ members: props.members });
const data = state.members
  .flatMap((member) => Social.keys(`${member}/profile/`, "final"))
  .reduce((obj, item) => Object.assign(obj, item), {});
const telegram = state.members
  .flatMap((member) =>
    Social.keys(`${member}/profile/linktree/telegram`, "final")
  )
  .reduce((obj, item) => Object.assign(obj, item), {});
const github = state.members
  .flatMap((member) =>
    Social.keys(`${member}/profile/linktree/github`, "final")
  )
  .reduce((obj, item) => Object.assign(obj, item), {});
const twitter = state.members
  .flatMap((member) =>
    Social.keys(`${member}/profile/linktree/twitter`, "final")
  )
  .reduce((obj, item) => Object.assign(obj, item), {});
const website = state.members
  .flatMap((member) =>
    Social.keys(`${member}/profile/linktree/website`, "final")
  )
  .reduce((obj, item) => Object.assign(obj, item), {});

if (!data || !telegram || !github || !twitter || !website) {
  return "Loading...";
}

let filterBy = {};
filterBy["all"] = new Set([...Object.keys(data)]);
filterBy["telegram"] = new Set([...Object.keys(telegram)]);
filterBy["github"] = new Set([...Object.keys(github)]);
filterBy["twitter"] = new Set([...Object.keys(twitter)]);
filterBy["website"] = new Set([...Object.keys(website)]);

const profilesPerPage = 10;

const [currentPage, setCurrentPage] = useState(1);

const startIndex = (currentPage - 1) * profilesPerPage;

const endIndex = startIndex + profilesPerPage;

let displayedProfiles = [...filterBy[state.filter]].slice(startIndex, endIndex);

const handlePageChange = (page) => {
  setCurrentPage(page);
};

const totalPages = Math.ceil(
  Object.keys(data).filter((accountId) => filterBy[state.filter].has(accountId))
    .length / profilesPerPage
);

const accounts = displayedProfiles.map((accountId) => (
  <div className="m-2" key={accountId}>
    <hr />

    <Widget src="hack.near/widget/profile.linktree" props={{ accountId }} />
  </div>
));

return (
  <div>
    <h3 className="m-2 mb-3">Community Members</h3>
    <br />
    <div className="flex-row m-2">
      <h5>Filter</h5>
      <button
        onClick={() => State.update({ filter: "twitter" })}
        disabled={state.filter === "twitter"}
      >
        Twitter
      </button>
      <button
        onClick={() => State.update({ filter: "github" })}
        disabled={state.filter === "github"}
      >
        GitHub
      </button>
      <button
        onClick={() => State.update({ filter: "telegram" })}
        disabled={state.filter === "telegram"}
      >
        Telegram
      </button>
      <button
        onClick={() => State.update({ filter: "website" })}
        disabled={state.filter === "website"}
      >
        Website
      </button>
      <button
        onClick={() => State.update({ filter: "all" })}
        disabled={state.filter === "all"}
      >
        Reset
      </button>
    </div>
    <br />
    <h5 className="m-2 mb-3">{[...filterBy[state.filter]].length} total</h5>
    <div className="m-2">{accounts}</div>
    <div className="m-3">
      <hr />
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next Page
      </button>
    </div>
  </div>
);
