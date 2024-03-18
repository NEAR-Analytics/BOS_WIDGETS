const accountId = context.accountId;
const Owner = "socializer.near";
const API_URL = "https://e2e.nearverselabs.com";

State.init({
  sate: false,
  page: "dashboard",
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
      active: true,
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
      active: false,
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
            d="M21.08 8.58003V15.42C21.08 16.54 20.48 17.58 19.51 18.15L13.57 21.58C12.6 22.14 11.4 22.14 10.42 21.58L4.48003 18.15C3.51003 17.59 2.91003 16.55 2.91003 15.42V8.58003C2.91003 7.46003 3.51003 6.41999 4.48003 5.84999L10.42 2.42C11.39 1.86 12.59 1.86 13.57 2.42L19.51 5.84999C20.48 6.41999 21.08 7.45003 21.08 8.58003Z"
            stroke="#121212"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 11C13.2869 11 14.33 9.95681 14.33 8.66998C14.33 7.38316 13.2869 6.34003 12 6.34003C10.7132 6.34003 9.67004 7.38316 9.67004 8.66998C9.67004 9.95681 10.7132 11 12 11Z"
            stroke="#121212"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 16.66C16 14.86 14.21 13.4 12 13.4C9.79 13.4 8 14.86 8 16.66"
            stroke="#121212"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      label: "Profile",
      value: "profile",
      active: false,
    },
  ],
});

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
        active: true,
      },
    ],
  });
}

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
  const list = state.sidebar;
  const result = list.map((item) => {
    item.active = false;
    if (item.value === value) item.active = true;
    return item;
  });

  State.update({ page: value, sidebar: result });
};

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
    </Content>
  </Wrapper>
);
