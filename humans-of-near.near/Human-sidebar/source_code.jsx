const Owner = "humans-of-near.near";
const API_URL = "https://humans.nearverselabs.com/api";

const Sidebar = styled.div`
  position: absolute;
  right: 40px; 
  height: 100%; 
  width: 62px; 
  padding-top:32px;
  padding-bottom:32px;
`;

const SidebarContent = styled.div`
  padding: 40px 16px;
  display: flex;
  height: 100%;
  background: #22272B;
  color: white;
  border-radius: 6px;
  border: 1px solid #FFF;
`;

return (
  <Sidebar>
    <SidebarContent>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.35 10.725V19.275C26.35 20.675 25.6 21.9751 24.3875 22.6876L16.9625 26.975C15.75 27.675 14.25 27.675 13.025 26.975L5.6 22.6876C4.3875 21.9876 3.6375 20.6875 3.6375 19.275V10.725C3.6375 9.32504 4.3875 8.02499 5.6 7.31249L13.025 3.025C14.2375 2.325 15.7375 2.325 16.9625 3.025L24.3875 7.31249C25.6 8.02499 26.35 9.31254 26.35 10.725Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 13.75C16.6085 13.75 17.9125 12.446 17.9125 10.8375C17.9125 9.22896 16.6085 7.92505 15 7.92505C13.3915 7.92505 12.0875 9.22896 12.0875 10.8375C12.0875 12.446 13.3915 13.75 15 13.75Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 20.8249C20 18.5749 17.7625 16.75 15 16.75C12.2375 16.75 10 18.5749 10 20.8249"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SidebarContent>
  </Sidebar>
);
