const accountId = context.accountId;
const Owner = props.Owner || "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const USER = props.USER || {};
const PAGES = props.PAGES || [];
const currentPage = props.currentPage;
const changePage = props.changePage;
const sidebar = props.sidebar || false;
const openSidebar = props.openSidebar || ((value) => {});
const Logout = props.Logout;

//Styles
const Wrapper = styled.div`
    top: 0px;
    width: 256px;
    height: 100%;  
    display: flex;
    color: #d4d4d4;
    position: sticky;
    align-items: center;
    background: #262626;
    flex-direction: column;
    transition: width 2s ease-out;
    .left-side{
        display: flex;
    }
    @media (max-width: 620px) {
        width: ${sidebar ? "55%" : 0};
        z-index: 2;
        position: absolute;
        ${
          !sidebar &&
          `.left-side{
            display: none;
        }`
        }
        .close {
          display: flex;
        }
    }
`;

const LogoIcon = styled.img`
    width: 100px; 
    height: 100px; 
`;

const Title = styled.h2`
    font-size: 24px;
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(to bottom right, #facc15, #fb923c, #db2777);
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius : 50px;
`;

const SelectedIcon = styled.div`
    left: -5px;
    width: 10%;
    height: 8px;
    position: absolute;
    border-radius: 0.375rem;
    background-image: linear-gradient(to right ,#facc15,#ea580c);
`;

const CloseButton = styled.button`
    top: 10px;
    padding: 0;
    z-index: 1;
    width: 29px;
    right: 10px;
    height: 29px;
    color: white;
    display: none;
    border: 1px solid;  
    position: absolute;
    align-items: center;
    justify-content: center;
`;

return (
  <Wrapper className="sidebar">
    <div className="flex-column align-items-center left-side">
      <CloseButton className="btn close" onClick={() => openSidebar(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
          />
        </svg>
      </CloseButton>
      <div className="d-flex justify-content-center align-items-center flex-column pt-5">
        <LogoIcon
          src="https://dropcast.nearverselabs.com/logo.png"
          decoding="async"
          data-nimg="fill"
        />
        <Title>Dropcast</Title>

        <p className="m-0" style={{ fontSize: 12 }}>
          Powered by Nearverse Labs
        </p>
      </div>

      <div className="d-flex flex-column mt-5 gap-4">
        {PAGES.map((page, index) => {
          if (page.link) {
            return (
              <a
                key={index}
                target="_blank"
                href={page.link}
                style={{ color: currentPage === page.value ? "white" : "grey" }}
                className="d-flex align-items-center gap-2 rbt-token-removeable"
              >
                {page.icon}
                {currentPage === page.value && <SelectedIcon />}
                <p className="m-0">{page.title}</p>
              </a>
            );
          } else {
            return (
              <div
                key={index}
                style={{ color: currentPage === page.value ? "white" : "grey" }}
                className="d-flex align-items-center gap-2 rbt-token-removeable"
                onClick={() => changePage(page.value)}
              >
                {page.icon}
                {currentPage === page.value && <SelectedIcon />}
                <p className="m-0">{page.title}</p>
              </div>
            );
          }
        })}
      </div>
      <div className="d-flex w-100 px-3 position-absolute bottom-0 mb-3 justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <Avatar
            src={`https://cdn.discordapp.com/avatars/${USER.id}/${USER.avatar}.png`}
            alt=""
          />
          <p className="m-0">{USER.username}</p>
        </div>
        <a
          className="btn p-0"
          style={{ width: 30, color: "white" }}
          onClick={Logout}
          href={`https://near.org/${Owner}/widget/login`}
        >
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
        </a>
      </div>
    </div>
  </Wrapper>
);
