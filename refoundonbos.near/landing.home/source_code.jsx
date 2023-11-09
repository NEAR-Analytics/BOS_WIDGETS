const { handleCreateProject, projects, navigate } = props;
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
  <div style={{ minHeight: "100vh", overflow: "hidden" }}>
    {
      <div>
        <div
          style={{
            backgroundColor: "#BFE7B5",
            color: "#113F0D",
            borderBottomLeftRadius: "85px",
            borderBottomRightRadius: "85px",
          }}
        >
          <div className="row">
            <Nav>
              <NavLeft>
                <NavLogo
                  href={
                    "https://near.org/refoundonbos.near/widget/landing.home"
                  }
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
          <div className="text-left row p-5">
            <div className="col">
              <h1
                style={{
                  fontFamily: "Cormorant",
                  fontSize: "3.5em",
                  color: "#113F0D",
                  marginTop: "45%",
                }}
              >
                The platform for{" "}
                <span style={{ color: "#1193B0" }}>verified</span> journalism
              </h1>
              <h5 style={{ textAlign: "initial" }}>
                <b>Empowered</b> and <b>Protected</b> on the Blockchain.
              </h5>
              <div style={{ padding: "10% 0" }}></div>
              <a
                style={{
                  color: "#2B2B2B",
                  marginRight: "30px",
                  fontWeight: "700",
                }}
                href="https://testnet.mynearwallet.com/linkdrop/v1.keypom.testnet/49e2pkjCZM1CRMhfWoKQiVgC45wqa2ADJrRDmFSwz7q3TA3c8PywH177CuWKwNvCJxbjAYx35XMcVU7Qr4Y3kbWX"
              >
                Sign Up{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="13"
                  viewBox="0 0 38 13"
                  fill="none"
                >
                  <path
                    d="M37.3166 6.89032C37.622 6.58485 37.622 6.08959 37.3166 5.78412L32.3387 0.80622C32.0332 0.500751 31.5379 0.500751 31.2325 0.80622C30.927 1.11169 30.927 1.60695 31.2325 1.91242L35.6573 6.33722L31.2325 10.762C30.927 11.0675 30.927 11.5627 31.2325 11.8682C31.5379 12.1737 32.0332 12.1737 32.3387 11.8682L37.3166 6.89032ZM0 7.11942H36.7635V5.55502H0V7.11942Z"
                    fill="#113F0D"
                  />
                </svg>
              </a>
              <a
                style={{
                  color: "#2B2B2B",
                  marginRight: "15%",
                  fontWeight: "700",
                }}
                href="https://near.org/refoundonbos.near/widget/home"
              >
                Explore Campaigns{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="13"
                  viewBox="0 0 38 13"
                  fill="none"
                >
                  <path
                    d="M37.3166 6.89032C37.622 6.58485 37.622 6.08959 37.3166 5.78412L32.3387 0.80622C32.0332 0.500751 31.5379 0.500751 31.2325 0.80622C30.927 1.11169 30.927 1.60695 31.2325 1.91242L35.6573 6.33722L31.2325 10.762C30.927 11.0675 30.927 11.5627 31.2325 11.8682C31.5379 12.1737 32.0332 12.1737 32.3387 11.8682L37.3166 6.89032ZM0 7.11942H36.7635V5.55502H0V7.11942Z"
                    fill="#113F0D"
                  />
                </svg>
              </a>
              <span style={{ fontSize: "0.8em" }}>
                built with{" "}
                <img
                  width="75px"
                  src="https://bafybeidjn55zafhjyhbierxichdt5ca5s5x2pl6iyjjuynzgpza5b2wafy.ipfs.w3s.link/logo.png"
                ></img>
              </span>
            </div>
            <div className="text-center col">
              <img
                src="https://bafybeiecmpwrncojjrvt6hmll5qieea3yee3ushuzdeocovo7erq4d3g6a.ipfs.w3s.link/landing_hero.png"
                style={{
                  borderRadius: "84px",
                  width: "100%",
                  marginTop: "-15%",
                  marginLeft: "10%",
                }}
              ></img>
            </div>
          </div>

          <div
            className="text-left row p-5"
            style={{ minHeight: "80vh", marginTop: "5%" }}
          >
            <div className="col">
              <h5>mint with</h5>
              <h1>Proof of Verification</h1>
              <p>
                Refound’s mission is part of the Regenerative Finance (ReFi)
                movement, specifically to leverage blockchain technology to help
                journalists and photographers directly sell their content to the
                public and news media at higher margins and with greater
                financial control, helping regenerate their economic cycle.{" "}
              </p>
            </div>
            <div className="col">
              <img
                src="https://bafybeihafilg264onmncqyp5zmkmut46dwcce6byuu7fxzelur4ljf4ode.ipfs.w3s.link/map.jpg"
                style={{ height: "auto", width: "100%", borderRadius: "222px" }}
              ></img>
              <p
                style={{
                  fontSize: "0.8em",
                  marginTop: "2%",
                  marginLeft: "20%",
                  width: "60%",
                  textAlign: "center",
                }}
              >
                Our decentralized application provides journalists a platform to
                share their content, monetize it, and maintain anonymity and
                safety by using a wallet sign-in.
              </p>
            </div>
          </div>
        </div>
        <div
          className="text-left row bg-white"
          style={{ minHeight: "100vh", paddingTop: "15%" }}
        >
          <div className="col">
            <div style={{ width: "100%", paddingBottom: "20%" }}>
              <h3>Who Are We</h3>
              <h3>
                <b>Building</b> for?
              </h3>
            </div>
            <div
              style={{
                border: "2px solid #50493F",
                borderRadius: "45px",
                padding: "20% 20px",
              }}
            >
              <div>
                <h3 style={{ fontWeight: "700" }}>
                  Citizen and Freelance Journalists
                </h3>
                <br></br>
                <p style={{ fontWeight: "400", fontSize: "14px" }}>
                  Our publishing platform allows journalists and photographers
                  to share first person, creative content from the frontlines
                  swiftly, raise awareness, and sell directly to businesses.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              style={{
                border: "2px solid #50493F",
                borderRadius: "45px",
                padding: "20% 20px",
                marginTop: "10%",
              }}
            >
              <h3 style={{ fontWeight: "700" }}>Humanitarian Organizations</h3>
              <br></br>
              <p style={{ fontWeight: "400" }}>
                Eye Witnesses, NGOs, and Humanitarian Organizations can verify
                content, and create funding campaigns; helping build trust and
                community between journalists and the public.{" "}
              </p>
            </div>
          </div>
          <div className="col">
            <br></br>
            <div
              style={{
                border: "2px solid #50493F",
                borderRadius: "45px",
                padding: "20% 20px",
                marginTop: "25%",
              }}
            >
              <h3 style={{ fontWeight: "700" }}>The Media/Publications</h3>
              <br></br>
              <p style={{ fontWeight: "400" }}>
                A platform to curate and purchase licenses for direct, and
                verified frontline content.{" "}
              </p>
            </div>
          </div>
          <div className="col">
            <br></br>
            <div
              style={{
                border: "2px solid #50493F",
                borderRadius: "45px",
                padding: "40% 20px",
                marginTop: "15%",
              }}
            >
              <h3 style={{ fontWeight: "700" }}>News Consumers</h3>
              <br></br>
              <p style={{ fontWeight: "400" }}>
                Consumers of our platform can curate their News feed and
                directly support Journalists.
              </p>
            </div>
          </div>
        </div>

        <div
          className="text-left"
          style={{
            minHeight: "100vh",
            marginTop: "25%",
            backgroundColor: "#060A2D",
            color: "#2E34B2",
          }}
        >
          <div style={{ height: "auto" }}>
            <img
              style={{ width: "100%", marginTop: "-28%" }}
              src="https://bafybeibf3ugbmmmjzuadb3c3vnxg663hhahkydzi4qqju2rfere2ro7zv4.ipfs.w3s.link/seperator.png
         "
            ></img>
          </div>
          <div className="row" style={{ marginTop: "15%", padding: "5%" }}>
            <div className="col">
              <h3>
                <b>Use Cases</b>
              </h3>
              <div style={{ padding: "20px" }}>
                <img
                  style={{
                    maxHeight: "300px",
                    borderRadius: "25px",
                    marginBottom: "20px",
                  }}
                  src="https://bafybeig6lxrqfbbep5r6bwnqtvx3udveoeo35uu7y52df2okmmzbfupcm4.ipfs.w3s.link/usecase1.png"
                ></img>
                <h3 style={{ fontWeight: "700" }}>Verified Journalism</h3>
                <br></br>
                <p style={{ fontWeight: "400", fontSize: "14px" }}>
                  Our publishing platform allows journalists and photographers
                  to share first person, creative content from the frontlines
                  swiftly, raise awareness, and sell directly to businesses.
                </p>
              </div>
            </div>
            <div className="col">
              <div style={{ padding: "20px" }}>
                <img
                  style={{
                    maxHeight: "300px",
                    borderRadius: "25px",
                    marginBottom: "20px",
                  }}
                  src="https://bafybeid7ooxaaw7yijn5wrmk6s76lhv6kh22mnsmshbiu3gdkgcdwpqpky.ipfs.w3s.link/usecase2.png"
                ></img>
                <h3 style={{ fontWeight: "700" }}>War Crimes Documentation</h3>
                <br></br>
                <p style={{ fontWeight: "400" }}>
                  Eye Witnesses, NGOs, and Humanitarian Organizations can verify
                  content, and create funding campaigns; helping build trust and
                  community between journalists and the public.{" "}
                </p>
              </div>
            </div>
            <div className="col">
              <br></br>
              <div style={{ padding: "20px" }}>
                <img
                  style={{
                    maxHeight: "300px",
                    borderRadius: "25px",
                    marginBottom: "20px",
                  }}
                  src="https://bafybeidah4cbctcoovdrpmekjatmdiwp5p2fx2gdcmosbzzwwqnictvu3i.ipfs.w3s.link/usecase3.png"
                ></img>
                <h3 style={{ fontWeight: "700" }}>Humanitarian Aid</h3>
                <br></br>
                <p style={{ fontWeight: "400" }}>
                  A platform to donate to direct causes that may be reported on.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-white text-center" style={{ padding: "20% 5%" }}>
          <div className="col p-5">
            <p>
              Amplify your daily moments of courage through photography, and
              join our supportive community to get funded by the collective
              spirit of like-minded enthusiasts.
            </p>
          </div>
          <div className="col p-5">
            <a href="https://near.org/refoundonbos.near/widget/home">
              <button
                style={{
                  backgroundColor: "#616161",
                  borderColor: "#616161",
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
            </a>
          </div>
        </div>
      </div>
    }
  </div>
);
