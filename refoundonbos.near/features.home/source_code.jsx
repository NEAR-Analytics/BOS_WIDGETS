/*__@import:QoL/Url__*/

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
  <div
    style={{ backgroundColor: "#F7F3D4", color: "#2F2F2F", minHeight: "100vh" }}
  >
    {
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
        <div className="text-center row p-5">
          <div>
            <h2
              style={{
                fontFamily: "Cormorant",
                fontSize: "3em",
                marginTop: "25%",
                fontWeight: "300",
              }}
            >
              features
            </h2>
            <h1
              style={{
                fontFamily: "Cormorant",
                fontSize: "4em",
                fontWeight: "600",
              }}
            >
              Veracity and Humanity in Journalism
            </h1>
            <p style={{ color: "#70675C" }}>community focused journalism</p>
          </div>
        </div>

        <div className="text-left row" style={{ paddingTop: "25%" }}>
          <div className="col">
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "Cormorant", fontWeight: "700" }}>
                Simplified Publishing
              </h3>
              <br></br>
              <p style={{ fontWeight: "400", fontSize: "14px" }}>
                To capture live photos for NFTs. This helps store the meta data
                of time and place directly on the blockchain on IPFS and helping
                viewers and newsrooms know that the image is not altered or
                doctored.
              </p>
            </div>
          </div>
          <div className="col">
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "Cormorant", fontWeight: "700" }}>
                Automated Licensing
              </h3>
              <br></br>
              <p style={{ fontWeight: "400" }}>
                Licenses are stored on chain and our smart contracts allow NFT
                minters to purchase multiple licenses for different uses.
              </p>
            </div>
          </div>
          <div className="col">
            <br></br>
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "Cormorant", fontWeight: "700" }}>
                Revenue Sharing
              </h3>
              <br></br>
              <p style={{ fontWeight: "400" }}>
                Journalists can share revenue from their photos and articles
                with those impacted by conflict. The smart contract will split
                the royalties between the journalist and the NGO or to the
                person photographed.
              </p>
            </div>
          </div>
        </div>

        <div className="text-left row" style={{ paddingTop: "2%" }}>
          <div className="col">
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "Cormorant", fontWeight: "700" }}>
                In app camera capability
              </h3>
              <br></br>
              <p style={{ fontWeight: "400", fontSize: "14px" }}>
                We allow Journalists to swiftly create and sell NFTs of their
                content directly to news rooms, the media, and the public.
              </p>
            </div>
          </div>
          <div className="col">
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "Cormorant", fontWeight: "700" }}>
                Cryptocurrency Benefits
              </h3>
              <br></br>
              <p style={{ fontWeight: "400" }}>
                Ease of payment to journalists and their local sources, fixers,
                and contacts in war zones and conflict zones via stable coin
                using a an easy setup crypto wallet on Near. Cryptocurrency
                provides a transfer of value that is much faster than banks, and
                much cheaper even in cases of international transfers. Account
                transactions are publicly auditable and secure, and easily
                accessible with a smartphone.
              </p>
            </div>
          </div>
          <div className="col">
            <br></br>
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "Cormorant", fontWeight: "700" }}>
                Proof of Witness
              </h3>
              <br></br>
              <p style={{ fontWeight: "400" }}>
                When an NFT is created, it has to pass through our smart
                contract and it requires Third Party Verification in order for
                it to be validated as true and confirmed for minting. Allows a
                multisig wallet sign-in to allow a local NGO, a local governing
                body, and up to 2 eye witnesses to authenticate the veracity
                (verification) of the photo or article content.
              </p>
            </div>
          </div>
        </div>

        <div className="text-left row" style={{ paddingTop: "2%" }}>
          <div className="col">
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "Cormorant", fontWeight: "700" }}>
                Easy one click on-boarding on NEAR using Keypom
              </h3>
              <br></br>
              <p style={{ fontWeight: "400", fontSize: "14px" }}>
                Only NEAR allows the creation of programmable keys, which they
                call “keypoms.” These keys allow users to start using our dApp
                right away without needing to create an account.
              </p>
            </div>
          </div>
          <div className="col">
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "Cormorant", fontWeight: "700" }}>
                Publicly Visible Chain of Approvals
              </h3>
              <br></br>
              <p style={{ fontWeight: "400" }}>
                On chain data is public and transparent, displaying the
                verifying parties that were involved in verification.
              </p>
            </div>
          </div>
          <div className="col">
            <br></br>
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "Cormorant", fontWeight: "700" }}>
                Immutable and Decentralized
              </h3>
              <br></br>
              <p style={{ fontWeight: "400" }}>
                The immutability of the blockchain allows the journalists to
                post content that is wrapped in utility NFTs and reducing the
                risk of censorship and later modification of their original
                works, since the blockchain will always have a record of the
                original photograph or article when it was uploaded by the
                journalist.
              </p>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col p-5">
            <button
              style={{
                backgroundColor: "#826C53",
                borderColor: "#826C53",
                borderRadius: "39.5px",
              }}
            >
              Explore Campaigns
            </button>
          </div>
          <div className="col p-5">
            <button
              style={{
                backgroundColor: "#5D8959",
                borderColor: "#5D8959",
                borderRadius: "39.5px",
              }}
            >
              This Way{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="34"
                viewBox="0 0 99 34"
                fill="none"
              >
                <path
                  d="M98.1574 18.4987C99.0379 17.6181 99.0379 16.1905 98.1574 15.3099L83.808 0.960511C82.9274 0.0799599 81.4998 0.0799599 80.6192 0.960511C79.7387 1.84106 79.7387 3.26872 80.6192 4.14927L93.3743 16.9043L80.6192 29.6593C79.7387 30.5399 79.7387 31.9675 80.6192 32.8481C81.4998 33.7286 82.9274 33.7286 83.808 32.8481L98.1574 18.4987ZM0.0998535 19.1591H96.563V14.6495H0.0998535V19.1591Z"
                  fill="#FF8B00"
                />
              </svg>
            </button>
          </div>
        </div>
      </>
    }
  </div>
);
