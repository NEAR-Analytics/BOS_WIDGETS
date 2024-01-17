// Getting the current user's account Id
const accountId = context.accountId;

// Pages that can be reached via the aside tab
const [pages, setPage] = useState([
  {
    name: "Voting Page",
    link: "https://near.org/abnakore.near/widget/App.jsx",
  },
  {
    name: "Result",
    link: "https://near.org/abnakore.near/widget/Result.jsx",
  },
  {
    name: "Admin Home",
    link: "https://near.org/abnakore.near/widget/AdminHome",
  },
  {
    name: "Manage Candidates",
    link: "https://near.org/abnakore.near/widget/ManageCandidates",
  },
  {
    name: "Mange Parties",
    link: "https://near.org/abnakore.near/widget/ManageParties",
  },
]);

// List of candidates and their curresponding number of votes
const [candidates, setCandidates] = useState([]);

const [maxId, setMaxId] = useState(4);

// name and acro
const [newCandidate, setNewCandidate] = useState({
  name: "",
  party: "",
  role: "",
  votes: "",
});

function save() {
  newCandidate.id = maxId + 1;
  newCandidate.votes = 0;
  newCandidate.rank = maxId + 1;
  setMaxId(maxId + 1);
  setCandidates((prev) => prev.concat([newCandidate]));
}

// Sort the currencies by(name,code or rate) order(ascending, descending)
function Sort(by, order) {
  if (order === "ascending") {
    candidates.sort((a, b) => (a[by] > b[by] ? 1 : -1));
  } else {
    candidates.sort((a, b) => (a[by] < b[by] ? 1 : -1));
  }
  return candidates;
}

// Social.set({candidates: []});

// Get the candidates data
const Data = Social.get(`abnakore.near/candidates`);

useEffect(() => {
  if (Data === undefined) {
    // Set the candidate to an empty list if there is no candidate
    setCandidates([]);
  } else {
    setCandidates(JSON.parse(Data));
  }
}, [Data === null]);

// Only signed In users can access the page
return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              <div className="two-sides">
                <Widget
                  src="abnakore.near/widget/Aside"
                  props={{ objs: pages, active: "/admin/manage_candidates" }}
                />
                <div className="body-contents">
                  <button onClick={get_data}>Show</button>
                  <h1>Manage Candidates</h1>
                  <Widget
                    src="abnakore.near/widget/Table"
                    props={{
                      headings: [
                        "Rank",
                        "Candidate's Name",
                        "Party",
                        "Role",
                        "Number of votes",
                      ],
                      data: Sort("votes", "decending").map((cand, index) =>
                        Object.values({ id: index + 1, ...cand })
                      ),
                    }}
                  />
                  <div className="form">
                    <div className="flex">
                      <Widget
                        src="abnakore.near/widget/Input.jsx"
                        props={{
                          type: "text",
                          placeholder: "Full Name",
                          required: true,
                          item: "name",
                          items: newCandidate,
                          setItem: setNewCandidate,
                        }}
                      />
                      <Widget
                        src="abnakore.near/widget/Input.jsx"
                        props={{
                          type: "text",
                          placeholder: "party",
                          required: true,
                          item: "party",
                          items: newCandidate,
                          setItem: setNewCandidate,
                        }}
                      />
                    </div>
                    <div className="flex">
                      <Widget
                        src="abnakore.near/widget/Input.jsx"
                        props={{
                          type: "text",
                          placeholder: "Role",
                          required: true,
                          item: "role",
                          items: newCandidate,
                          setItem: setNewCandidate,
                        }}
                      />
                    </div>
                    <CommitButton
                      onCommit={save}
                      data={{ candidates: [newCandidate] }}
                    >
                      Add
                    </CommitButton>
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
