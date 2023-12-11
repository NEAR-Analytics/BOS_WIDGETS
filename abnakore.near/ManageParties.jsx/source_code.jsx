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

return (
  <>
    <Widget
      src="abnakore.near/widget/Aside.jsx"
      props={{ objs: pages, active: "/admin/manage_parties" }}
    />
    <h1>Manage Parties</h1>
    <Widget
      src="abnakore.near/widget/Table.jsx"
      props={{
        headings: ["S/N", "Party Name", "Acronym"],
        data: Object.values(parties.map((c) => Object.values(c))),
      }}
    />
    <div className="form">
      <div className="flex">
        <Widget
          src="abnakore.near/widget/Input.jsx"
          props={{ type: "text", placeholder: "Party Name", required: true }}
        />
        <Widget
          src="abnakore.near/widget/Input.jsx"
          props={{ type: "text", placeholder: "Acronym", required: true }}
        />
      </div>
    </div>
  </>
);
