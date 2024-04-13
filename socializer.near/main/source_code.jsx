const accountId = context.accountId;
const Owner = "socializer.near";
const API_URL = "https://e2e.nearverselabs.com";
// const API_URL = "http://localhost:3000";
const currentPage = Storage.get("page") || "dashboard";

State.init({
  sate: false,
  page: currentPage,
});

useEffect(() => {
  if (!accountId) {
    State.update({
      sidebar: [
        {
          icon: (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                stroke="#808080"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                stroke="#808080"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                stroke="#808080"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
                stroke="#808080"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
          label: "Dashboard",
          value: "dashboard",
        },
      ],
    });
  } else {
    State.update({
      sidebar: [
        {
          icon: (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                stroke="#808080"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                stroke="#808080"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                stroke="#808080"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
                stroke="#808080"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
          label: "Dashboard",
          value: "dashboard",
        },
        {
          icon: (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 19H8.673V11H4V19ZM9.673 19H14.327V5H9.673V19ZM15.327 19H20V13H15.327V19ZM3 20V10H8.673V4H15.327V12H21V20H3Z"
                fill="#121212"
              />
            </svg>
          ),
          label: "Leaderboard",
          value: "leaderboard",
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <g fill="currentColor">
                <path d="M12 8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                <path d="M4 3a2 2 0 0 1 2-2h21a2 2 0 0 1 2 2v25a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.26A3.247 3.247 0 0 1 2.5 22c0-1.078.525-2.034 1.333-2.625A3.246 3.246 0 0 1 2.5 16.75c0-1.078.525-2.034 1.333-2.625A3.246 3.246 0 0 1 2.5 11.5c0-1.078.525-2.034 1.333-2.625A3.246 3.246 0 0 1 2.5 6.25A3.25 3.25 0 0 1 4 3.51zm2 17.268V25h21V3H6v.01c.223.016.44.056.649.116c.202-.025.545.137.91.424A3.248 3.248 0 0 1 8.99 6H9a.75.75 0 0 1-1.5 0h-.018A1.751 1.751 0 0 0 6 4.518v3.741c.223.017.44.057.649.117c.202-.025.545.137.91.424a3.248 3.248 0 0 1 1.432 2.45H9a.75.75 0 0 1-1.5 0h-.018A1.751 1.751 0 0 0 6 9.768v3.741c.223.018.44.057.649.117c.202-.024.545.136.91.424A3.248 3.248 0 0 1 8.99 16.5H9a.75.75 0 0 1-1.5 0h-.018A1.751 1.751 0 0 0 6 15.018v3.741c.223.017.44.057.649.117c.202-.024.545.136.91.423A3.248 3.248 0 0 1 8.99 21.75H9a.75.75 0 0 1-1.5 0h-.018A1.751 1.751 0 0 0 6 20.268M6 27v1h21v-1z" />
              </g>
            </svg>
          ),
          label: "Ledger",
          value: "profile",
        },
      ],
    });
  }
}, [accountId]);
// if (!accountId) {
//   State.update({
//     sidebar: [
//       {
//         icon: (
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
//               stroke="#808080"
//               stroke-width="1.5"
//               stroke-miterlimit="10"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             />
//             <path
//               d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
//               stroke="#808080"
//               stroke-width="1.5"
//               stroke-miterlimit="10"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             />
//             <path
//               d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
//               stroke="#808080"
//               stroke-width="1.5"
//               stroke-miterlimit="10"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             />
//             <path
//               d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
//               stroke="#808080"
//               stroke-width="1.5"
//               stroke-miterlimit="10"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             />
//           </svg>
//         ),
//         label: "Dashboard",
//         value: "dashboard",
//       },
//     ],
//   });
// }

//Styles

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: stretch;
  flex-direction: column;
  background: white;
  overflow: auto;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 96px);
  flex-direction: row;
  background: white;
  overflow: auto;
  position: relative;
  padding-bottom: 15px;
`;

const changeTab = (value) => {
  //   const list = state.sidebar;
  //   const result = list.map((item) => {
  //     item.active = false;
  //     if (item.value === value) item.active = true;
  //     return item;
  //   });

  Storage.set("page", value);
};

useEffect(() => {
  State.update({ page: currentPage });
}, [currentPage]);

return (
  <Wrapper className="root">
    <Widget src={`${Owner}/widget/Header`} props={{ API_URL }} />
    <Content>
      <Widget
        src={`${Owner}/widget/Sidebar`}
        props={{ API_URL, changeTab, page: state.page, list: state.sidebar }}
      />
      {state.page === "dashboard" && (
        <Widget
          src={`${Owner}/widget/Dashboard`}
          props={{ API_URL, changePage: changeTab, page: state.page }}
        />
      )}
      {state.page === "profile" && (
        <Widget props={{ API_URL }} src={`${Owner}/widget/Profile`} />
      )}
      {state.page === "leaderboard" && (
        <Widget props={{ API_URL }} src={`${Owner}/widget/Leaderboard`} />
      )}
      {state.page === "new_campaigns" && (
        <Widget
          src={`${Owner}/widget/NewCampaign`}
          props={{ API_URL, changePage: changeTab, page: state.page }}
        />
      )}
    </Content>
  </Wrapper>
);
