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

function renderHeader({ handleCreateProject }) {
  return (
    <div className="d-flex gap-4 py-4">
      <h4>
        Create a{" "}
        <span style={{ color: "#1193B0", display: "block" }}>
          Post or Event
        </span>
      </h4>
    </div>
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
          <NavLogo
            href={"https://near.org/refoundonbos.near/widget/landing.home"}
          >
            refound
          </NavLogo>
        </NavLeft>
        <NavRight>
          <NavTabs>
            <Link
              href="https://near.org/refoundonbos.near/widget/create.post.home"
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
              href="https://near.org/refoundonbos.near/widget/features.home"
              style={{
                textDecoration: "none",
                color: "grey",
                marginRight: "10px",
              }}
            >
              Features
            </Link>
            <Link
              href="https://near.org/refoundonbos.near/widget/create.campaign.home"
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

    <div className="text-center row">
      <div className="col">
        <Widget
          src="refoundonbos.near/widget/create.post.form"
          props={{
            handleCreateProject,
          }}
        />
      </div>
      <div className="col">
        <img
          src="https://bafybeighkowldeqm4ffrp22floba67vcgxstzjf3f622xf6raxgo2p2c7m.ipfs.w3s.link/createPost.png"
          style={{ borderRadius: "84px", height: "75vh", width: auto }}
        ></img>
      </div>
    </div>
  </>
);
