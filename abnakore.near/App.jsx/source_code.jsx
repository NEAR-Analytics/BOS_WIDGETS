// Get the user's accountId
const accountId = context.accountId;

// Declaring variables
const voteId = props.vote && props.vote;
// !!!
// const voteId = 0;
const [passcodeEntered, setPasscodeEntered] = useState("");
const [candidate, setCandidate] = useState(0);
const [party, setparty] = useState(0);

// All the votes
const [allVotes, setAllVotes] = useState([]);
const [voteToRender, setVoteToRender] = useState([]);
const [opened, setOpened] = useState(false);

// Pages that will be displayed in the aside
const [pages, setPages] = useState([
  {
    name: "Voting Page",
    link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
  },
  {
    name: "Result",
    link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
  },
  //   { name: "Log out", link: "https://near.org/signin" },
]);

// Add admin pages if the user is the creator of the vote
useEffect(() => {
  console.log(
    "Is Admin?",
    voteToRender.creator,
    accountId,
    voteToRender.creator === accountId,
    props
  );
  if (voteToRender.creator === accountId) {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Result",
        link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Admin Home",
        link: `https://near.org/abnakore.near/widget/AdminHome?vote=${voteToRender.id}`,
      },
      {
        name: "Manage Candidates",
        link: `https://near.org/abnakore.near/widget/ManageCandidates?vote=${voteToRender.id}`,
      },
      {
        name: "Mange Parties",
        link: `https://near.org/abnakore.near/widget/ManageParties?vote=${voteToRender.id}`,
      },
    ]);
  } else {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Result",
        link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
      },
    ]);
  }
}, [voteToRender.creator === accountId]);

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
  show_error_on_passwordInput: false,
});

// Hashing function
function hash(text) {
  var hashed = "";
  for (var i = 0; i < text.length; i++) {
    // console.log(text.charAt(i), "=", text.charCodeAt(i));
    hashed += text.charCodeAt(i);
  }
  //   console.log(hashed);
  return hashed;
}

// Check the entered passcode if it is correct
function checkPasscode() {
  const hashedPasscode = hash(passcodeEntered);
  if (hashedPasscode === voteToRender.passcode) {
    console.log("true");
    setOpened(true);
    return true;
  } else {
    console.log("false");
    setState({
      ...state,
      show_error_on_passwordInput: true,
    });
    return false;
  }
}

// Users that already voted
const [voted, setVoted] = useState([1]);

// Function for voting
function vote() {
  if (candidate > 0 && party > 0) {
    // console.log(accountId);
    // console.log(voted);
    // setCandidates([...candidates]);
    setState({
      ...state,
      show_message: true,
    });
    // Update
    // !!!
    setVoteToRender((vote) => ({
      ...vote,
      candidates: vote.candidates.map((c, i) =>
        i === candidate - 1 ? { ...c, votes: c.votes + 1 } : c
      ),
      voters: vote.voters.concat(accountId),
    }));
  } else {
    // Set an error on the dropdown
    setState({
      ...state,
      show_error_on_dropdown: true,
    });
  }
}

// Update the value of the dropdowns when changed
function updateDropdown(e) {
  setCandidate(e.target.value);
  setparty(e.target.value);
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

const secText = styled.h3`
    text-align: center;
`;
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
                  {ongoing === true ? (
                    // Check if the vote has password
                    voteToRender.passcode === "" || opened ? (
                      // Check if the vote reached to its voters limit
                      voteToRender.limit === "" ||
                      (voteToRender.limit !== "" &&
                        voteToRender.limit > voteToRender.voters.length) ? (
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
                                <path
                                  d="M4 6H20M4 12H20M4 18H20"
                                  stroke="#fefefe"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </g>
                            </svg>
                          </i>
                          <h1>{voteToRender.name}</h1>
                          <p
                            style={{
                              textAlign: "center",
                              padding: "10px 20px",
                            }}
                          >
                            {voteToRender.desc}
                          </p>
                          <p
                            style={{
                              color: "green",
                              display: voteToRender.voters.includes(accountId)
                                ? "block"
                                : "none",
                            }}
                          >
                            You Have Succesfully Voted
                          </p>
                          <div className="card">
                            <div className="flex">
                              <select
                                disabled={
                                  voteToRender.voters.includes(accountId)
                                    ? true
                                    : false
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
                                  Select by Candidate
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
                              OR
                              <select
                                disabled={
                                  voteToRender.voters.includes(accountId)
                                    ? true
                                    : false
                                }
                                className={`drop-down ${
                                  state.show_error_on_dropdown ? "error" : ""
                                }`}
                                value={party}
                                onChange={updateDropdown}
                                name="party"
                                required
                              >
                                <option className="option" value={0}>
                                  Select by Party
                                </option>
                                {voteToRender.parties
                                  .filter((party) =>
                                    voteToRender.candidates
                                      .map((c) => c.party)
                                      .includes(party.acronym)
                                  )
                                  .map((party, i) => (
                                    <option
                                      className="option"
                                      key={party.acronym}
                                      value={i + 1}
                                    >
                                      {party.name} ({party.acronym})
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <button
                              disabled={
                                voteToRender.voters.includes(accountId)
                                  ? true
                                  : false
                              }
                              onClick={vote}
                            >
                              Vote
                            </button>

                            <p
                              id="thanks"
                              className={`read-the-docs ${
                                state.show_message ? "" : "hide"
                              }`}
                            >
                              Thank you for voting
                              {voteToRender.candidates[candidate - 1].name}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="body-contents">
                          <secText>
                            Sorry the max number of voters({voteToRender.limit})
                            has been reached
                          </secText>
                        </div>
                      )
                    ) : (
                      <div className="body-contents">
                        <div className="form">
                          <secText>Please Enter Passcode</secText>
                          <p
                            className="error"
                            style={{
                              color: "red",
                              display: state.show_error_on_passwordInput
                                ? "block"
                                : "none",
                              textAlign: "center",
                            }}
                          >
                            The Password you entered is incorrect
                          </p>
                          <Widget
                            src="abnakore.near/widget/Input.jsx"
                            props={{
                              type: "password",
                              placeholder: "Enter Passcode",
                              required: true,
                              otherAttributes: {
                                value: passcodeEntered,
                                autoFocus: true,
                                onKeyPress: (e) => {
                                  if (e.key === "Enter") {
                                    checkPasscode();
                                  }
                                },
                                onChange: (e) => {
                                  setPasscodeEntered(e.target.value);
                                },
                              },
                            }}
                          />
                          <button onClick={checkPasscode}>Submit</button>
                        </div>
                      </div>
                    )
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
