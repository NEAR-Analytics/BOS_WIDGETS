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

// List of candidates and their curresponding number of votes
const [candidates, setCandidates] = useState([
  { id: 1, name: "Foo", votes: 3, rank: 2 },
  { id: 2, name: "Bar", votes: 5, rank: 1 },
  { id: 3, name: "Baz", votes: 1, rank: 4 },
  { id: 4, name: "sass", votes: 2, rank: 3 },
]);

return (
  <Widget
    src="abnakore.near/widget/Wrapper"
    props={{
      body: (
        <div className="main-body">
          <div className="two-sides">
            <Widget
              src="abnakore.near/widget/Aside.jsx"
              props={{ objs: pages, active: "/result" }}
            />
            <div className="body-contents">
              <h1>Result</h1>
              {/* Calling the table component */}
              {/* Extracting The values in the table an converting them to list */}
              <Widget
                src="abnakore.near/widget/Table.jsx"
                props={{
                  headings: [
                    "S/N",
                    "Candidate's Name",
                    "Number of votes",
                    "Rank",
                  ],
                  data: Object.values(candidates.map((c) => Object.values(c))),
                }}
              />
            </div>
          </div>
        </div>
      ),
    }}
  />
);
