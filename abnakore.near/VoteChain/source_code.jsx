// Get accountId
const accountId = context.accountId;

// Pages that can be reached via the aside tab
const [pages, setPage] = useState([
  {
    name: "All Votes",
    link: "https://near.org/abnakore.near/widget/VoteChain",
  },
  {
    name: "My Votes",
    link: "https://near.org/abnakore.near/widget/VoteChain?tab=my_votes",
  },
  {
    name: "Watchlist",
    link: "https://near.org/abnakore.near/widget/VoteChain?tab=watchlist",
  },
  {
    name: "Create New Vote",
    type: "button",
    link: "https://near.org/abnakore.near/widget/CreateVote",
  },
]);
return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              <div className="body-contents">
                <div className="two-sides"></div>
                <Widget
                  src="abnakore.near/widget/Aside"
                  props={{ objs: pages, active: "/admin/manage_candidates" }}
                />
                <div className="body-contents">
                  <h1>...</h1>
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

// // Pages that can be reached via the aside tab
// const [pages, setPage] = useState([
//   {
//     name: "Home",
//     link: "https://near.org/sandbox#/abnakore.near/widget/AdminHome",
//   },
//   {
//     name: "Manage Candidates",
//     link: "https://near.org/sandbox#/abnakore.near/widget/ManageCandidates",
//   },
//   {
//     name: "Mange Parties",
//     link: "https://near.org/sandbox#/abnakore.near/widget/ManageParties",
//   },
// ]);
// return (
//   <>
//     {accountId ? (
//       <Widget
//         src="abnakore.near/widget/Wrapper"
//         props={{
//           body: (
//             <div className="main-body">
//               <div className="body-contents">
//                 <div className="two-sides"></div>
//                 <Widget
//                   src="abnakore.near/widget/Aside"
//                   props={{ objs: pages, active: "/admin/manage_candidates" }}
//                 />
//                 <div className="body-contents">
//                   <h1>...</h1>
//                 </div>
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
