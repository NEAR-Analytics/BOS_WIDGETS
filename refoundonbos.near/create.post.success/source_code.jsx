/*__@import:QoL/Url__*/

const { handleCreateProject, projects, navigate } = props;

function renderProject({ title, tags, logo, id }) {
  return (
    <a
      className="rounded-2 overflow-hidden w-100 text-decoration-none"
      onClick={() => {
        navigate("editor", { project: id });
      }}
      href={Url.construct("#/refoundonbos.near/widget/landing.home", {
        page: "editor",
        project: id,
      })}
      style={{
        width: "calc( 20% - 20px )",
        maxWidth: "100%",
        backgroundColor: "#f9fbfe",
        border: "1px solid #d1d5db",
        cursor: "pointer",
      }}
    >
      <div className="ratio ratio-4x3">
        <div className="d-flex justify-content-center align-items-center bg-white">
          {logo && <img src={logo} alt={title} height={55} width={55} />}
        </div>
      </div>
      <div className="p-3">
        <h5
          className="h6 m-0"
          style={{
            lineHeight: 1.5,
          }}
        >
          {title}
        </h5>
      </div>
    </a>
  );
}

/*__@import:QoL/widget__*/

const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  list-style: none;
  grid-gap: 36px;
  margin-bottom: 36px;
`;

const Nav = styled.div`
  // commenting out stickiness for now
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  display: flex;
  padding: 0 64px 0 64px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: ${navHeightPx}px;
  background: #ffffff;
  z-index: 1000;
  // background: pink;

  @media screen and (max-width: 768px) {
    // display: none;
    padding: 24px 8px 24px 16px;
    height: ${navHeightPxMobile}px;
  }

  & > a {
    width: 10rem;
  }
`;

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // background: green;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NavRightMobile = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    padding-right: 16px;
  }
`;

const NavLogo = styled.a`
  text-align: center;
  color: #2e2e2e;
  font-size: 23.95px;
  font-weight: 700;
  line-height: 23.95px;
  word-wrap: break-word;
  margin-right: 48px;
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`;

const NavTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavTab = styled.a`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.selected ? "#2E2E2E" : "#7B7B7B")};
  font-size: 14px;
  font-weight: ${(props) => (props.selected ? 500 : 400)};
  line-height: 16px;
  word-wrap: break-word;
  text-decoration: none;
  position: relative;

  :not(:last-child) {
    margin-right: 32px;
  }

  :hover {
    text-decoration: none;
  }
`;

// projects = null;
return (
  <>
    <div className="row">
      <Nav>
        <NavLeft>
          <NavLogo href={"https://near.org/refound-landing.near/widget/home"}>
            refound
          </NavLogo>
        </NavLeft>
        <NavRight>
          <NavTabs>
            <Link
              href="https://near.org/refound-create-post.near/widget/home"
              style={{
                textDecoration: "none",
                color: "grey",
                marginRight: "10px",
              }}
            >
              Create
            </Link>
            <Link
              href="https://near.org/refoundonbos.near/widget/home"
              style={{
                textDecoration: "none",
                color: "grey",
                marginRight: "10px",
              }}
            >
              Discover
            </Link>
            <Link
              href="https://near.org/refound-features.near/widget/home"
              style={{
                textDecoration: "none",
                color: "grey",
                marginRight: "10px",
              }}
            >
              Features
            </Link>
            <Link
              href="https://near.org/refound-create-campaign.near/widget/home"
              style={{
                textDecoration: "none",
                color: "grey",
                marginRight: "10px",
              }}
            >
              Funding Relief
            </Link>
            <Link
              href="https://refound.app/waitlist"
              style={{
                textDecoration: "none",
                color: "grey",
                marginRight: "10px",
              }}
            >
              Waitlist
            </Link>
          </NavTabs>
        </NavRight>
      </Nav>
    </div>
    <div className="text-left row">
      <div className="col">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="85"
          viewBox="0 0 81 85"
          fill="none"
          style={{ marginTop: "30%", marginBottom: "5%" }}
        >
          <path
            d="M44.6313 70.2105L57.4208 83L78.7366 61.6842"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 14.7895V40.3684C2 40.3684 2 53.1579 31.8421 53.1579C61.6842 53.1579 61.6842 40.3684 61.6842 40.3684V14.7895"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M31.8421 2C61.6842 2 61.6842 14.7895 61.6842 14.7895C61.6842 14.7895 61.6842 27.5789 31.8421 27.5789C2 27.5789 2 14.7895 2 14.7895C2 14.7895 2 2 31.8421 2Z"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M31.8421 78.7368C2 78.7368 2 65.9474 2 65.9474V40.3684"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h3>Thanks for submitting.</h3>
        <p>Now your creation is handed off to be voted on by the community.</p>
        <br></br>
        <p>
          Explore other{" "}
          <a
            style={{ textDecoration: "underline", color: "grey" }}
            href="https://near.org/refound_app.near/widget/home"
          >
            campaigns
          </a>
          .
        </p>
      </div>
      <div className="col">
        <img
          src="https://bafybeif4sixy5mdd6wghizzkfn5hbkq2de4wygoaxh4lqaflcjqnyoizyi.ipfs.w3s.link/createSuccess.png"
          style={{ borderRadius: "84px", height: "75vh", width: auto }}
        ></img>
      </div>
    </div>
  </>
);
