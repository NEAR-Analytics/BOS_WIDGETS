// Pages that can be reached via the aside tab
const [pages, setPage] = useState([
  {
    name: "Home",
    link: "https://near.org/sandbox#/abnakore.near/widget/AdminHome",
  },
  {
    name: "Manage Candidates",
    link: "https://near.org/sandbox#/abnakore.near/widget/ManageCandidates",
  },
  {
    name: "Mange Parties",
    link: "https://near.org/sandbox#/abnakore.near/widget/ManageParties",
  },
]);

// List of parties and their curresponding number of votes
const [parties, setParties] = useState([
  { id: 1, name: "Foo", acronym: "FOO" },
  { id: 2, name: "Bar", acronym: "BAR" },
  { id: 3, name: "Baz", acronym: "BAZ" },
  { id: 4, name: "sass", acronym: "SAS" },
]);

const [maxId, setMaxId] = useState(4);

// name and acro
const [newParty, setNewParty] = useState({
  id: "",
  name: "",
  acronym: "",
});

function save() {
  newParty.id = maxId + 1;
  setMaxId(maxId + 1);
  setParties((prev) => prev.concat([newParty]));
}

return (
  <Widget
    src="abnakore.near/widget/Wrapper"
    props={{
      body: (
        <div className="main-body">
          <Widget
            src="abnakore.near/widget/Aside"
            props={{ objs: pages, active: "/admin/manage_parties" }}
          />
          <h1>Manage Parties</h1>
          <Widget
            src="abnakore.near/widget/Table"
            props={{
              headings: ["S/N", "Party Name", "Acronym"],
              data: Object.values(parties.map((c) => Object.values(c))),
            }}
          />
          <div className="form">
            <div className="flex">
              <Widget
                src="abnakore.near/widget/Input.jsx"
                props={{
                  type: "text",
                  placeholder: "Party Name",
                  required: true,
                  item: "name",
                  items: newParty,
                  setItem: setNewParty,
                }}
              />
              <Widget
                src="abnakore.near/widget/Input.jsx"
                props={{
                  type: "text",
                  placeholder: "Acronym",
                  required: true,
                  item: "acronym",
                  items: newParty,
                  setItem: setNewParty,
                }}
              />
            </div>
            <CommitButton onCommit={save} data={{ parties: [newParty] }}>
              Add
            </CommitButton>
          </div>
        </div>
      ),
    }}
  />
);
// {
//   "abnakore.near": {
//     "parties": "[{\"name\":\"\",\"acronym\":\"\"}]"
//   }
// }
