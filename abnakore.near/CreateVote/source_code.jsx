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
