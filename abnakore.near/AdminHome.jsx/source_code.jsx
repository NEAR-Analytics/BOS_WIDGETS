// Pages that can be reached via the aside tab
const [pages, setPage] = useState([
  { name: "Home", link: "/admin" },
  { name: "Manage Candidates", link: "/admin/manage_candidates" },
  { name: "Mange Parties", link: "/admin/manage_parties" },
]);

// List of parties and their curresponding number of votes
const [parties, setParties] = useState([
  { id: 1, name: "Foo", acronym: "FOO" },
  { id: 2, name: "Bar", acronym: "BAR" },
  { id: 3, name: "Baz", acronym: "BAZ" },
  { id: 4, name: "sass", acronym: "SAS" },
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

return (
  <Widget
    src="abnakore.near/widget/Wrapper.jsx"
    props={{
      body: (
        <>
          <h1>Admin Home</h1>
          <h4>Candidates Details</h4>
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
          <h4>Parties Details</h4>
          <Widget
            src="abnakore.near/widget/Table.jsx"
            props={{
              headings: ["S/N", "Party Name", "Acronym"],
              data: Object.values(parties.map((c) => Object.values(c))),
            }}
          />
        </>
      ),
    }}
  />
);
