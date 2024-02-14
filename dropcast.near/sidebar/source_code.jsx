const accountId = context.accountId;
const Owner = props.Owner || "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";

//Styles
const Wrapper = styled.div`
  display: flex;
  width: 256px;
  height: 100vh;
  color: #d4d4d4;
  position: relative;
  align-items: center;
  background: #262626;
  flex-direction: column;
`;

const LogoIcon = styled.img`
    width: 100px; 
    height: 100px; 
`;

const Title = styled.h2`
    font-size: 24px;
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(to bottom right, #facc15, #fb923c, #db2777, rgb(251 146 60 / 0));
`;

return (
  <Wrapper>
    <div className="d-flex justify-content-center align-items-center flex-column pt-5">
      <LogoIcon
        src="https://vulcanapp.io/_next/static/media/logo.24108d07.svg"
        decoding="async"
        data-nimg="fill"
      />
      <Title>Vulcan</Title>
      <p className="m-0" style={{ fontSize: 12 }}>
        Powered by Blocksmith Labs
      </p>
      <p className="m-0" style={{ fontSize: 12 }}>
        Managed by Nearverse Labs
      </p>
    </div>

    <div className="d-flex flex-column mt-5 gap-3">
      <div className="d-flex text-white align-items-center gap-2 rbt-token-removeable">
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
        Dashboard
      </div>
      <div className="d-flex text-white align-items-center gap-2 rbt-token-removeable">
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
        Account
      </div>
    </div>
  </Wrapper>
);
