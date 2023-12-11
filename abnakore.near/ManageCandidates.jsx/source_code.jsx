// Pages that can be reached via the aside tab
const [pages, setPage] = useState([
  { name: "Home", link: "/admin" },
  { name: "Manage Candidates", link: "/admin/manage_candidates" },
  { name: "Mange Votes", link: "/manv" },
]);

// List of candidates and their curresponding number of votes
const [candidates, setCandidates] = useState([
  { id: 1, name: "Foo", votes: 3, rank: 2 },
  { id: 2, name: "Bar", votes: 5, rank: 1 },
  { id: 3, name: "Baz", votes: 1, rank: 4 },
  { id: 4, name: "sass", votes: 2, rank: 3 },
]);

return (
  <>
    <Widget
      src="abnakore.near/widget/Aside.jsx"
      props={{ objs: pages, active: "/admin/manage_candidates" }}
    />
    <h1>Manage Candidates</h1>
    <Widget
      src="abnakore.near/widget/Table.jsx"
      props={{
        headings: ["S/N", "Candidate's Name", "Number of votes", "Rank"],
        data: Object.values(candidates.map((c) => Object.values(c))),
      }}
    />
    <div className="form">
      <div className="flex">
        <Widget
          src="abnakore.near/widget/Input.jsx"
          props={{ type: "text", placeholder: "Full Name", required: true }}
        />
        <Widget
          src="abnakore.near/widget/Input.jsx"
          props={{ type: "text", placeholder: "party", required: true }}
        />
      </div>
      <div className="flex">
        <Widget
          src="abnakore.near/widget/Input.jsx"
          props={{ type: "email", placeholder: "Email", required: true }}
        />
        <Widget
          src="abnakore.near/widget/Input.jsx"
          props={{ type: "text", placeholder: "Role", required: true }}
        />
      </div>
    </div>
  </>
);
