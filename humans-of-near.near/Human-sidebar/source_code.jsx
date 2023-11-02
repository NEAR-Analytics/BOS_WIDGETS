const Owner = "humans-of-near.near";
const API_URL = "https://humans.nearverselabs.com/api";

const { humans, profileModal, filtersModal, showProfile, showFilters } = props;

const Sidebar = styled.div`
  position: absolute;
  right: 40px; 
  height: 100%; 
  padding-top:32px;
  padding-bottom:32px;
`;

const SidebarContent = styled.div`
  color: white;
  height: 100%;
  display: flex;
  border-radius: 6px;
  padding: 30px 6px;
  text-align: center;
  background: #22272B;
  align-items: center;
  border: 1px solid #FFF;
  flex-direction: column;
  justify-content: space-between;
`;

return (
  <Sidebar>
    <SidebarContent>
      <div className="d-flex flex-column" style={{ gap: 40 }}>
        <div
          style={{
            padding: "10px 0",
            borderBottom: profileModal ? "1px solid #FFF" : 0,
          }}
        >
          <button
            className="btn p-0"
            onClick={showProfile}
            style={{ width: "fit-content", height: "fit-content" }}
          >
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
          </button>
        </div>

        <div
          style={{
            padding: "10px 0",
            borderBottom: filtersModal ? "1px solid #FFF" : 0,
          }}
        >
          <button
            className="btn p-0"
            onClick={showFilters}
            style={{ width: "fit-content", height: "fit-content" }}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1134 13.542H23.8277M12.3991 16.9706H21.542M14.6848 20.3991H19.2563"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="1.13137"
                y="16.9705"
                width="22.4"
                height="22.4"
                rx="1.2"
                transform="rotate(-45 1.13137 16.9705)"
                stroke="white"
                strokeWidth="1.6"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 12 }}>Humans</p>
        <p>{humans}</p>
      </div>
    </SidebarContent>
  </Sidebar>
);
