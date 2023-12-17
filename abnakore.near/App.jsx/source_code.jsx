const [candidate, setCandidate] = useState(0);
const [candidates, setCandidates] = useState([
  { id: 1, name: "Foo", votes: 3, rank: 2 },
  { id: 2, name: "Bar", votes: 5, rank: 1 },
  { id: 3, name: "Baz", votes: 1, rank: 4 },
  { id: 4, name: "sass", votes: 2, rank: 3 },
]);
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

const accountId = context.accountId;

return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              <div className="two-sides">
                {/* The Aside bar that helps in quick navigation btw pages */}
                <Widget
                  src="abnakore.near/widget/Aside"
                  props={{ objs: pages, active: "/" }}
                />

                <div className="body-contents">
                  <h1>VoteChain</h1>
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
                        {candidates.map((candidate) => (
                          <option
                            className="option"
                            key={candidate.id}
                            value={candidate.id}
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
                        state.show_message ? "" : "hide"
                      }`}
                    >
                      Thank you for voting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        }}
      />
    ) : (
      <Widget src="abnakore.near/widget/SignIn.jsx" props={props} />
    )}
  </>
);
