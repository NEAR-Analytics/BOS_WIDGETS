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

                  <Widget
                    src="abnakore.near/widget/Table"
                    props={{
                      headings: ["Party Name", "Acronym"],
                      data: [[]],
                    }}
                  />
                  <div className="form">
                    <h5 style={{ textAlign: "center" }}>Add Party</h5>
                    <div className="flex">
                      <Widget
                        src="abnakore.near/widget/Input.jsx"
                        props={{
                          type: "text",
                          placeholder: "Party Name",
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
                          placeholder: "Acronym",
                          required: true,
                          item: "party",
                          items: newCandidate,
                          setItem: setNewCandidate,
                        }}
                      />
                    </div>
                    <button>Add</button>
                  </div>
                  <hr />

                  <Widget
                    src="abnakore.near/widget/Table"
                    props={{
                      headings: ["Candidate's Name", "Party"],
                      data: [[]],
                    }}
                  />
                  <div className="form">
                    <h5 style={{ textAlign: "center" }}>Add Candidate</h5>
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
                    <button>Add</button>
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
