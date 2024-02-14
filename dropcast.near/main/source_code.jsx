const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = "http://localhost:3000";
const USER = props.USER || {};
const TOKEN = props.TOKEN || "";
console.log(TOKEN, USER, "==>tttttttt");

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
    title: "Manage",
    value: "manage",
  },
];

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

// if (!accountId || !user || !token)
//   return <Widget src={`${Owner}/widget/login`} />;

return (
  <Wrapper className="root">
    <Widget src={`${Owner}/widget/sidebar`} props={{ API_URL, USER, PAGES }} />
  </Wrapper>
);
