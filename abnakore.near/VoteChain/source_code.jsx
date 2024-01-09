// Get accountId
const accountId = context.accountId;

const List = styled.div`
width: 90%;
height: 100%;
padding: 20px 10px;
`;

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
                <div className="two-sides">
                  <Widget
                    src="abnakore.near/widget/Aside"
                    props={{ objs: pages, active: "/admin/manage_candidates" }}
                  />
                  <List>
                    <Widget
                      src="abnakore.near/widget/VoteCard"
                      props={{
                        name: "Name",
                        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit obcaecati iure rem nulla deleniti accusamus, qui, aut recusandae ut fugiat molestiae dicta asperiores, est aspernatur. Aliquid porro sed neque molestiae!",
                        open: "27-03-2024 2:30PM",
                        close: "27-03-2024 2:30PM",
                        no_of_candidates: 10,
                      }}
                    />
                    <Widget
                      src="abnakore.near/widget/VoteCard"
                      props={{
                        name: "Name",
                        desc: "You can use the slice method along with the spread operator (...) to create a new array containing the first two items.",
                        open: "27-03-2024 2:30PM",
                        close: "27-03-2024 2:30PM",
                        no_of_candidates: 10,
                      }}
                    />
                  </List>
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
