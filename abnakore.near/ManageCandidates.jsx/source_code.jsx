// Pages that can be reached via the aside tab
const [pages, setPage] = useState([
  {
    name: "Home",
    link: "https://near.org/sandbox#/abnakore.near/widget/AdminHome.jsx",
  },
  {
    name: "Manage Candidates",
    link: "https://near.org/sandbox#/abnakore.near/widget/ManageCandidates.jsx",
  },
  {
    name: "Mange Parties",
    link: "https://near.org/sandbox#/abnakore.near/widget/ManageParties.jsx",
  },
]);

// List of candidates and their curresponding number of votes
const [candidates, setCandidates] = useState([
  {
    id: 1,
    name: "Foo",
    party: "APD",
    email: "example@gmail.com",
    role: "President",
    votes: 3,
    rank: 2,
  },
  {
    id: 2,
    name: "Bar",
    party: "YMB",
    email: "example@gmail.com",
    role: "President",
    votes: 5,
    rank: 1,
  },
  {
    id: 3,
    name: "Baz",
    party: "AAN",
    email: "example@gmail.com",
    role: "President",
    votes: 1,
    rank: 4,
  },
  {
    id: 4,
    name: "sass",
    party: "AKA",
    email: "example@gmail.com",
    role: "President",
    votes: 2,
    rank: 3,
  },
]);

const [maxId, setMaxId] = useState(4);

// name and acro
const [newCandidate, setNewCandidate] = useState({
  id: "",
  name: "",
  party: "",
  email: "",
  role: "",
  votes: "",
  rank: "",
});

function save() {
  newCandidate.id = maxId + 1;
  newCandidate.votes = 0;
  newCandidate.rank = maxId + 1;
  setMaxId(maxId + 1);
  setCandidates((prev) => prev.concat([newCandidate]));
}

return (
  <Widget
    src="abnakore.near/widget/Wrapper.jsx"
    props={{
      body: (
        <>
          <Widget
            src="abnakore.near/widget/Aside.jsx"
            props={{ objs: pages, active: "/admin/manage_candidates" }}
          />
          <h1>Manage Candidates</h1>
          <Widget
            src="abnakore.near/widget/Table.jsx"
            props={{
              headings: [
                "S/N",
                "Candidate's Name",
                "Party",
                "Email",
                "Role",
                "Number of votes",
                "Rank",
              ],
              data: Object.values(candidates.map((c) => Object.values(c))),
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
                  type: "email",
                  placeholder: "Email",
                  required: true,
                  item: "email",
                  items: newCandidate,
                  setItem: setNewCandidate,
                }}
              />
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
              <CommitButton
                onCommit={save}
                data={{ candidates: [newCandidate] }}
                style={{ width: "100px" }}
              >
                Add
              </CommitButton>
            </div>
          </div>
        </>
      ),
    }}
  />
);
