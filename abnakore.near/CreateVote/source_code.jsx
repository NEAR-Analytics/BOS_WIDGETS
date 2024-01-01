// Get accountId
const accountId = context.accountId;

// New Vote
const [newVote, setNewVote] = useState({
  name: "",
  desc: "",
  role: "",
  creator: "",
  openDate: "",
  closeDate: "",
  opened: true,
  passcode: null,
  candidates: [],
  parties: [],
});

// Parties
const [parties, setParties] = useState([
  { name: "All pe", acronym: "APP" },
  { name: "All ee", acronym: "AEP" },
  { name: "People De", acronym: "PDE" },
]);

// New Party
const [newParty, setNewParty] = useState({
  name: "",
  acronym: "",
});

// candidates
const [candidates, setCandidates] = useState([]);

// New Candidate
const [newCandidate, setNewCandidate] = useState({
  name: "",
  party: "",
  role: "",
  votes: 0,
});

// Add the new party to the table
function AddParty() {
  // Check if the data given is valid

  if (newParty.name !== "" && newParty.acronym !== "") {
    // check for no similar name or acronym
    if (JSON.stringify(parties) !== JSON.stringify([])) {
      const filtered = parties.filter((party) => {
        return (
          party.name.toLowerCase() === newParty.name.toLowerCase() ||
          party.acronym.toLowerCase() === newParty.acronym.toLowerCase()
        );
      });
      if (filtered.length > 0) {
        return;
      }
    }

    // Check for three letters of the acronym
    if (newParty.acronym.length <= 4 && newParty.acronym.length > 0) {
      setParties((prev) =>
        prev.concat([{ ...newParty, acronym: newParty.acronym.toUpperCase() }])
      );
      setNewParty({ name: "", acronym: "" });
    }
  }
}

// Add the new party to the table
function AddCandidate() {
  // Check if the data given is valid
  console.log("ja");
  console.log(candidates);
  console.log(newCandidate);

  if (newCandidate.name !== "" && newCandidate.party !== "") {
    // check if there is another candidate with thesame party
    // if (JSON.stringify(parties) !== JSON.stringify([])) {
    const filtered = candidates.filter((candidate) => {
      console.log(candidate);
      return candidate.party.toLowerCase() === newCandidate.party.toLowerCase();
    });
    if (filtered.length > 0) {
      return;
    }
    // }

    // Check for three letters of the acronym
    setCandidates((prev) => prev.concat([{ ...newCandidate }]));
    setNewCandidate({
      name: "",
      party: "",
      role: "",
      votes: 0,
    });
  }
}

// Update the value of the dropdown
function updateDropDown(e) {
  setTest(e.target.value);
  let c = newCandidate;
  c.party = e.target.value;
  setNewCandidate(c);
}

// for test
const [test, setTest] = useState("E");

const secText = styled.h5`
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
              <div className="body-contents">
                <h1>Create</h1>
                <div className="form">
                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "text",
                      placeholder: "Name / Title",
                      required: true,
                      item: "name",
                      items: newVote,
                      setItem: setNewVote,
                    }}
                  />

                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "text",
                      placeholder: "Description",
                      required: true,
                      kind: "textarea",
                      item: "desc",
                      items: newVote,
                      setItem: setNewVote,
                    }}
                  />
                  <hr />

                  <secText>Parties Section</secText>
                  <Widget
                    src="abnakore.near/widget/Table"
                    props={{
                      headings: ["S/N", "Party Name", "Acronym"],
                      data: parties.map((p, i) =>
                        [i + 1].concat(Object.values(p).splice(0, 2))
                      ),
                    }}
                  />
                  <div className="form">
                    <secText>Add Party</secText>
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
                    <button onClick={AddParty}>Add</button>
                  </div>
                  <hr />

                  <secText>Candidates Section</secText>
                  {newCandidate.party}
                  <Widget
                    src="abnakore.near/widget/Table"
                    props={{
                      headings: ["S/N", "Candidate's Name", "Party"],
                      data: candidates.map((p, i) =>
                        [i + 1].concat(Object.values(p).splice(0, 2))
                      ),
                    }}
                  />
                  <div className="form">
                    <secText>Add Candidate</secText>
                    <div className="flex">
                      <Widget
                        src="abnakore.near/widget/Input.jsx"
                        props={{
                          type: "text",
                          placeholder: "Candidate's Name",
                          required: true,
                          item: "name",
                          items: newCandidate,
                          setItem: setNewCandidate,
                        }}
                      />
                      <select
                        className="drop-down"
                        value={newCandidate.party}
                        onChange={updateDropDown}
                        name="party"
                        required
                      >
                        <option className="option" value="">
                          Select Party
                        </option>
                        {parties.map((party) => (
                          <option
                            className="option"
                            key={party.acronym}
                            value={party.acronym}
                          >
                            {party.name}({party.acronym})
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={AddCandidate}>Add</button>
                  </div>

                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "password",
                      placeholder: "Passcode",
                      required: false,
                      item: "passcode",
                      items: newVote,
                      setItem: setNewVote,
                    }}
                  />
                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "text",
                      placeholder: "Role",
                      required: true,
                      item: "role",
                      items: newVote,
                      setItem: setNewVote,
                    }}
                  />
                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "date",
                      placeholder: "Open on",
                      required: false,
                      item: "openDate",
                      items: newVote,
                      setItem: setNewVote,
                    }}
                  />
                  <Widget
                    src="abnakore.near/widget/Input.jsx"
                    props={{
                      type: "date",
                      placeholder: "Close on",
                      required: false,
                      item: "closeDate",
                      items: newVote,
                      setItem: setNewVote,
                    }}
                  />
                  <button>Submit</button>
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

// // Get accountId
// const accountId = context.accountId;

// return (
//   <>
//     {accountId ? (
//       <Widget
//         src="abnakore.near/widget/Wrapper"
//         props={{
//           body: (
//             <div className="main-body">
//               <div className="body-contents">
//                 <h1>____</h1>
//               </div>
//             </div>
//           ),
//         }}
//       />
//     ) : (
//       <Widget src="abnakore.near/widget/SignIn.jsx" props={props} />
//     )}
//   </>
// );
