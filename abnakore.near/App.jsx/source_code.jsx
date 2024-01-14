// Get the user's accountId
const accountId = context.accountId;
const voteId = 0;

// All the votes
const [allVotes, setAllVotes] = useState([]);
const [voteToRender, setVoteToRender] = useState([]);

// Get all the votes
const votesData = Social.get(`abnakore.near/votes`);
useEffect(() => {
  if (votesData === undefined) {
    // Set the votes to an empty list if there is no votes
    setAllVotes([]);
  } else {
    setAllVotes(JSON.parse(votesData));
  }
  setVoteToRender(allVotes[voteId]);
}, [votesData === null]);

// Set the vote to be rendered
useEffect(() => {
  setVoteToRender(allVotes[voteId]);
}, [allVotes]);

const [candidate, setCandidate] = useState(0);

// List of candidates and their curresponding number of votes
// const [candidates, setCandidates] = useState(voteToRender.candidates);

// Get the candidates data
// const cands = Social.get(`abnakore.near/candidates`);

// useEffect(() => {
//   if (cands === undefined) {
//     // Set the candidate to an empty list if there is no candidate
//     setCandidates([]);
//   } else {
//     setCandidates(JSON.parse(cands));
//   }
// }, [cands === null]);

const [state, setState] = useState({
  show_message: false,
  show_error_on_dropdown: false,
});

// Pages that will be displayed in the aside
const [pages, setPages] = useState([
  {
    name: "Voting Page",
    link: "https://near.org/sandbox#/abnakore.near/widget/App.jsx",
  },
  {
    name: "Result",
    link: "https://near.org/sandbox#/abnakore.near/widget/Result.jsx",
  },
  { name: "Log out", link: "https://near.org/signin" },
]);

// Users tht already voted
const [voted, setVoted] = useState([1]);

// Functions
function vote() {
  if (candidate > 0) {
    // console.log(context.accountId);
    // console.log(voted);
    // setCandidates([...candidates]);
    setState({
      ...state,
      show_message: true,
    });
    setVoted((prev) => prev.concat([context.accountId]));
  } else {
    // Set an error on the dropdown
    setState({
      ...state,
      show_error_on_dropdown: true,
    });
  }
}

// Update the value of the dropdown when changed
function updateDropdown(e) {
  setCandidate(e.target.value);
  // Remove the error on the dropdown
  setState({
    ...state,
    show_error_on_dropdown: false,
  });
}

// Get the current date and time
function getDateTime() {
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

//  Format the date and time (January 7, 2024 at 5:57 PM)
function formatDateTime(dateTimeString) {
  // Assuming you have a date-time input with the format "YYYY-MM-DDTHH:mm" as a string
  const dateTime = new Date(dateTimeString);

  // Formatting the date and time in 12-hour format
  const formattedDateTime = dateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Set to true for 12-hour format
  });

  return formattedDateTime;
}

// check if the vote is ongoing
function isOngoing() {
  return voteToRender.closeTime !== ""
    ? Date.parse(voteToRender.openTime) <= Date.parse(getDateTime()) &&
        Date.parse(voteToRender.closeTime) > Date.parse(getDateTime())
    : Date.parse(voteToRender.openTime) <= Date.parse(getDateTime());
}
const [ongoing, setOngoing] = useState(isOngoing());

// // Re check if it is ongoing every 1 sec
useEffect(() => {
  const interval = setInterval(() => {
    setOngoing(isOngoing());
  }, 1000);
  return () => clearInterval(interval);
}, [voteToRender]);

return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              {/* Check if the vote exists(i.e allVotes[voteId] exists) */}
              {voteToRender ? (
                <div className="two-sides">
                  {/* The Aside bar that helps in quick navigation btw pages */}
                  <Widget
                    src="abnakore.near/widget/Aside"
                    props={{ objs: pages, active: "/" }}
                  />

                  {/* Check if the vote is ongoing */}
                  {!ongoing === true ? (
                    <div className="body-contents">
                      <i>
                        <svg
                          width="64px"
                          height="64px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M4 6H20M4 12H20M4 18H20"
                              stroke="#fefefe"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </i>
                      <h1>{voteToRender.name}</h1>
                      {JSON.stringify(ongoing)}
                      <p
                        style={{
                          color: "green",
                          display: voted.includes(context.accountId)
                            ? "block"
                            : "none",
                        }}
                      >
                        You Have Succesfully Voted
                      </p>
                      <div className="card">
                        <div>
                          <select
                            disabled={
                              voted.includes(context.accountId) ? true : false
                            }
                            className={`drop-down ${
                              state.show_error_on_dropdown ? "error" : ""
                            }`}
                            value={candidate}
                            onChange={updateDropdown}
                            name="candidate"
                            required
                          >
                            <option className="option" value={0}>
                              Select Candidate
                            </option>
                            {voteToRender.candidates.map((candidate, i) => (
                              <option
                                className="option"
                                key={candidate.id}
                                value={i + 1}
                              >
                                {candidate.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          disabled={
                            voted.includes(context.accountId) ? true : false
                          }
                          onClick={vote}
                        >
                          Vote
                        </button>

                        <p
                          id="thanks"
                          className={`read-the-docs ${
                            !state.show_message ? "" : "hide"
                          }`}
                        >
                          Thank you for voting{" "}
                          {voteToRender.candidates[candidate - 1].name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="body-contents">
                      {voteToRender.closeTime !== ""
                        ? Date.parse(voteToRender.openTime) <=
                            Date.parse(getDateTime()) &&
                          Date.parse(voteToRender.closeTime) >
                            Date.parse(getDateTime())
                        : Date.parse(voteToRender.openTime) <=
                          Date.parse(getDateTime())}
                      {/* If the vote has not been started */}
                      {Date.parse(voteToRender.openTime) >
                      Date.parse(getDateTime()) ? (
                        <>
                          <h1>
                            This vote will start on: <br />
                          </h1>
                          <h3>{formatDateTime(voteToRender.openTime)}</h3>
                        </>
                      ) : (
                        <>
                          <h1>
                            The vote has been ended on: <br />
                          </h1>
                          <h3>{formatDateTime(voteToRender.closeTime)}</h3>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="body-contents">
                  <h1>Vote Doesn't exist</h1>
                </div>
              )}
            </div>
          ),
        }}
      />
    ) : (
      <Widget src="abnakore.near/widget/SignIn.jsx" props={props} />
    )}
  </>
);
