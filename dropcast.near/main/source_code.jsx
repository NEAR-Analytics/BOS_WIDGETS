const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:2402";
const USER = props.USER || Storage.get("user", `${Owner}/widget/discord`);
const TOKEN = props.TOKEN || Storage.get("token", `${Owner}/widget/discord`);
const Logout = props.Logout;

const PAGES = [
  {
    title: "Dashboard",
    value: "dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        aria-hidden="true"
        style={{ width: 24, height: 24 }}
        className="text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    title: "Account",
    value: "account",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        aria-hidden="true"
        style={{ width: 24, height: 24 }}
        className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    title: "Manager",
    value: "manager",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M10 12q-1.65 0-2.825-1.175T6 8q0-1.65 1.175-2.825T10 4q1.65 0 2.825 1.175T14 8q0 1.65-1.175 2.825T10 12m-8 8v-2.8q0-.825.425-1.55t1.175-1.1q1.275-.65 2.875-1.1T10 13h.35q.15 0 .3.05q-.2.45-.337.938T10.1 15H10q-1.775 0-3.187.45t-2.313.9q-.225.125-.363.35T4 17.2v.8h6.3q.15.525.4 1.038t.55.962zm14 1l-.3-1.5q-.3-.125-.562-.262T14.6 18.9l-1.45.45l-1-1.7l1.15-1q-.05-.35-.05-.65t.05-.65l-1.15-1l1-1.7l1.45.45q.275-.2.538-.337t.562-.263L16 11h2l.3 1.5q.3.125.563.275t.537.375l1.45-.5l1 1.75l-1.15 1q.05.3.05.625t-.05.625l1.15 1l-1 1.7l-1.45-.45q-.275.2-.537.338t-.563.262L18 21zm1-3q.825 0 1.413-.587T19 16q0-.825-.587-1.412T17 14q-.825 0-1.412.588T15 16q0 .825.588 1.413T17 18m-7-8q.825 0 1.413-.587T12 8q0-.825-.587-1.412T10 6q-.825 0-1.412.588T8 8q0 .825.588 1.413T10 10m.3 8"
        />
      </svg>
    ),
  },
];

//Styles
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 88vh;
    align-items: stretch;
    background: rgb(23,23,23);
    overflow: auto;
    position: relative;
    @media (max-width: 620px) {
        .sidebar-btn {
            display: flex;
        }
    }
`;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  color: rgb(229 229 229);
`;

const SidebarButton = styled.button`
    top: 5px;
    left: 5px;
    padding: 0;
    z-index: 1;
    width: 29px;
    height: 29px;
    color: white;
    display: none;
    border: 1px solid;  
    position: absolute;
    align-items: center;
    justify-content: center;
`;

State.init({
  sidebar: false,
  page: "dashboard",
});

const changePage = (page) => {
  State.update({
    page,
    sidebar: false,
  });
};

const openSidebar = (value) => {
  State.update({
    sidebar: value,
  });
};

if (!accountId || !USER || !TOKEN)
  return <Widget src={`${Owner}/widget/login`} />;

return (
  <Wrapper className="root">
    <Widget
      src={`${Owner}/widget/sidebar`}
      props={{
        USER,
        PAGES,
        Logout,
        API_URL,
        changePage,
        openSidebar,
        sidebar: state.sidebar,
        currentPage: state.page,
      }}
    />
    <SidebarButton
      className="btn sidebar-btn"
      onClick={() => openSidebar(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 7h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 10H7a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2m0-8H7a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2m0 4H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2"
        />
      </svg>
    </SidebarButton>
    <PageWrapper>
      {state.page === "dashboard" && (
        <Widget
          src={`${Owner}/widget/dashboard`}
          props={{ API_URL, USER, TOKEN, Logout }}
        />
      )}
      {state.page === "account" && (
        <Widget
          src={`${Owner}/widget/account`}
          props={{ API_URL, USER, TOKEN, Logout }}
        />
      )}
      {state.page === "manager" && (
        <Widget
          src={`${Owner}/widget/manager`}
          props={{ API_URL, USER, TOKEN, Logout, changePage }}
        />
      )}
    </PageWrapper>
  </Wrapper>
);
