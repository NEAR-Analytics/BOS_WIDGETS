const { handleCreateProject, projects, navigate } = props;

function renderProject({ title, tags, logo, id }) {
  return (
    <a
      className="rounded-2 overflow-hidden w-100 text-decoration-none"
      onClick={() => {
        navigate("editor", { project: id });
      }}
      href={Url.construct("#//*__@appAccount__*//widget/home", {
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
    <div className="d-flex gap-4 justify-content-between py-4">
      <h4>
        Crowdfunding <span style={{ color: "#A2733B" }}>Campaign</span>
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

const IT = "nearui.near/widget/Input.ExperimentalText";

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
    <div className="text-start row" style={{ marginTop: "5%" }}>
      <div className="col w-50">
        <h3>Fund my reporting campaign in</h3>
        <h3 style={{ color: "#A2733B" }}>Eastern Europe</h3>
        <p>
          Hey there! I'm Jane, a passionate freelance journalist on a mission to
          bring you the untold stories of Eastern Europe. As an independent
          storyteller with a shoestring budget, I'm reaching out to you, the
          community, to help turn this dream into reality.
        </p>

        <div style={{ padding: "5%" }}></div>
        <p>Goal: $1000</p>
        <p>Progress:</p>
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            style={{ width: "50%", backgroundColor: "#A2733B" }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <div style={{ padding: "5%" }}></div>
        {/* <h3>Related Post</h3>
          <Widget src={`refound_app.near/widget/card`} props={{"title":"Test", "description":"Test", "media":""}}} /> */}

        <Widget
          src={IT}
          props={{
            label: "Donate to this Cause",
            placeholder: "Amount in NEAR",
            inputProps: {
              defaultValue: state.project.location,
            },
            onChange: (v) => updateP("location", v),
          }}
        />
        <button
          style={{
            backgroundColor: "#A2733B",
            borderColor: "#A2733B",
            marginTop: "20px",
          }}
        >
          Donate
        </button>
      </div>

      <div className="col w-50">
        <img
          src="https://bafybeibfzyfyudqfn6equrqbscrdizhki6lzyhqeq7pqpwxczjcrp47lfe.ipfs.w3s.link/campaignImage.png"
          style={{
            borderRadius: "84px",
            width: "60%",
            marginLeft: "30%",
            height: auto,
          }}
        ></img>
      </div>
    </div>
  </>
);
