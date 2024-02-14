const accountId = context.accountId;
const Owner = props.Owner || "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const USER = props.USER || {};
const PAGES = props.PAGES || [];
const currentPage = props.currentPage;
const changePage = props.changePage;

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

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius : 50px;
`;

const SelectedIcon = styled.div`
    left: -5px;
    width: 20%;
    height: 8px;
    position: absolute;
    border-radius: 0.375rem;
    background-image: linear-gradient(to left,#facc15,#ea580c, rgba(250,204,21,0));
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
      {PAGES.map((page, index) => (
        <div
          key={index}
          className="d-flex text-white align-items-center gap-2 rbt-token-removeable"
          onClick={() => changePage(page.value)}
        >
          {page.icon}
          {currentPage === page.value && <SelectedIcon />}
          <p style={{ color: currentPage === page.value ? "white" : "grey" }}>
            {page.title}
          </p>
        </div>
      ))}
    </div>
    <div className="d-flex w-100 px-3 position-absolute bottom-0 mb-3 justify-content-between">
      <div className="d-flex align-items-center gap-3">
        <Avatar
          src="https://cdn.discordapp.com/avatars/1050807227251953754/b249444edb0aabe2b4e2b6e2b2381265.png"
          alt=""
        />
        <p className="m-0">pontrue</p>
      </div>
      <button className="btn p-0" style={{ width: 30, color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </div>
  </Wrapper>
);
