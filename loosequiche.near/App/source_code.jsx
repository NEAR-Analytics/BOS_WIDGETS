const App = () => {
  const [activeContent, setActiveContent] = useState("Content1");

  const user = "loosequiche.near";

  const Content1 = () => (
    <div>
      <Widget src={`${user}/widget/Home`} />
    </div>
  );

  const Applications = () => (
    <div>
      <Widget src="devhub.jass.near/widget/devhub.page.blog" />
    </div>
  );

  const Content3 = () => (
    <div>
      <Widget src={`contribut3.near/widget/Learn.Page`} />
    </div>
  );

  const Content4 = () => (
    <div>
      <Widget src={`${user}/widget/FAQ`} />
    </div>
  );
  const Content5 = () => (
    <div>
      <Widget src={`mintbase.near/widget/nft-marketplace`} />
    </div>
  );

  const contentComponents = {
    Content1: <Content1 />,
    Applications: <Applications />,
    Content3: <Content3 />,
    Content4: <Content4 />,
    Content5: <Content5 />,
  };

  const handleButtonClick = () => {
    setActiveContent("Content1");
  };

  const handleButtonClick2 = () => {
    setActiveContent("Applications");
  };

  const handleButtonClick3 = () => {
    setActiveContent("Content3");
  };
  const handleButtonClick4 = () => {
    setActiveContent("Content4");
  };
  const handleButtonClick5 = () => {
    setActiveContent("Content5");
  };

  const SearchStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;

  @media only screen and (max-width: 750px) {
    flex-direction: column;
    gap: 30px;
  }
`;
  const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the wrapper takes at least the full viewport height */
`;

  const NavbarWrapper = styled.div`
  background-color: #99BC85;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

  const FooterWrapper = styled.div`
  background-color: #99BC85;
  color: white;
  padding: 20px 0;
  text-align: center;
  bottom: 0;
`;

  const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

  const LogoLink = styled.a`
  margin: 0 10px;
  img {
    width: 40px; 
    height: auto;
  }
`;

  function Footer() {
    return (
      <FooterWrapper>
        <LogoContainer>
          <LogoLink
            href="https://near.org/near/widget/ProfilePage?accountId=near-india.near"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://res.cloudinary.com/dzl44lobc/image/upload/v1702305812/oca2zyuhvgmafqx7sspj.jpg"
              alt="Near Protocol"
            />
          </LogoLink>
          <LogoLink
            href="https://twitter.com/NearIndia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://res.cloudinary.com/dzl44lobc/image/upload/v1702305527/gi40ee5fzrqxeqq8yzsu.jpg"
              alt="Twitter"
            />
          </LogoLink>
        </LogoContainer>
        <p>&copy; Human. All rights reserved.</p>
      </FooterWrapper>
    );
  }

  return (
    <>
      <Wrapper>
        <div class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a
              class="navbar-brand"
              href="#"
              style={
                activeContent === "Content1"
                  ? { ...styles.button, ...styles.buttonHover }
                  : styles.button
              }
              onClick={handleButtonClick}
            >
              <img
                src="https://res.cloudinary.com/dglhc1pfj/image/upload/f_auto,q_auto/v1/samples/lhoetmcicrxlihdcdpou"
                alt=""
                width="50px"
                height="50px"
              />
              Near India
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    aria-current="page"
                    href="#"
                    style={
                      activeContent === "Content1"
                        ? { ...styles.button, ...styles.buttonHover }
                        : styles.button
                    }
                    onClick={handleButtonClick}
                  >
                    Home
                  </a>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Discover
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        style={
                          activeContent === "Content5"
                            ? { ...styles.button, ...styles.buttonHover }
                            : styles.button
                        }
                        onClick={handleButtonClick5}
                      >
                        NFT
                      </a>
                    </li>
                    <hr class="dropdown-divider" />
                    <li>
                      <a
                        class="dropdown-item"
                        style={
                          activeContent === "Content2"
                            ? { ...styles.button, ...styles.buttonHover }
                            : styles.button
                        }
                        onClick={handleButtonClick2}
                        href="#"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        style={
                          activeContent === "Content3"
                            ? { ...styles.button, ...styles.buttonHover }
                            : styles.button
                        }
                        onClick={handleButtonClick3}
                      >
                        Learning
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    class="nav-link"
                    aria-current="page"
                    href="#"
                    style={
                      activeContent === "Content4"
                        ? { ...styles.button, ...styles.buttonHover }
                        : styles.button
                    }
                    onClick={handleButtonClick4}
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {contentComponents[activeContent] && (
            <div style={styles.content}>{contentComponents[activeContent]}</div>
          )}
        </div>
        <Footer />
      </Wrapper>
    </>
  );
};
return <App />;
