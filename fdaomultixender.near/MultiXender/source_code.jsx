// used for the Mainpage styling
const Mainpage = styled.div`
background-color: #fefefe;
height: auto;
margin: 0; 
padding: 0;
font-family: 'Lato', sans-serif;

`;

// used for the header container
const HeaderContainer = styled.div`
  height: 80px;
  background-color:#FCFEFE;
  display: flex;
  justify-content:; space-between;
  align-items: center;
  position: sticky;
  width: 100%;
  position: flex;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow for depth */
`;

//used for the logo
const Logo = styled.img`
width: 60px;
height: 60px;
object-fit: ;
margin: 12px 0px 12px 10px; 
cursor: pointer;
border-radius: 20px;
`;

//used for the multisender written
const H1 = styled.h1`
  color: #082654;
  padding: 15px;

  & > span {
    color: #ff0000; /* Red color for the 'X' */
  }
`;
// used for the styling of menu items
const MenuItem = styled.button`
  width: 100%; /* Adjust width as needed */
  padding: 10px;
  border: none;
  background-color: transparent;
  color: #5E6C7E;
  cursor: pointer;
  border-radius: 15px;
  margin-right: 20px;
  transition: background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease;

  /* Centering within the parent container */
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    // background-color: #ADB0FD; /* Adjust hover background color as needed */
    color: #F99E36;
    font-weight: bold;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #fff;
    margin-right: 10px;
    border-radius: 10px;
    text-align: center;
  }
`;

const DrawXAnimation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #22252are;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: enlargeAndFadeX 3s ease-in-out;

  @keyframes enlargeAndFadeX {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(2);
      opacity: 0.5;
    }
    100% {
      transform: scale(30);
      opacity: 0;
    }
  }
`;

const FinalX = styled.p`
  font-size: 8rem;
  font-weight: bold;
  color: #ff0000;
`;

function InitialLoadingAnimation() {
  return (
    <DrawXAnimation>
      <FinalX>X</FinalX>
    </DrawXAnimation>
  );
}

// used for styling of send token
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh; /* Adjust as needed */
`;

const SendToken = styled.div`
  background-clip: padding-box;
  background-color: #F8931F;
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #000;
  cursor: pointer;
  height: 48px,
  width: 158px,
  display: inline-flex;
  font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  align-items: center; /* Center content vertically and horizontally */
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

  &:hover,
  &:focus {
    background-color: #FCA900;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #c85000;
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }

  p {
    margin: 0; /* Remove default margin */
  }
`;

const user = "fdaomultixender.near";
const Content3 = () => (
  <div>
    <Widget src={`${user}/widget/MultiXender_main`} />
  </div>

  // add send component in this
);

const Content4 = () => (
  <div>
    <Widget src={`${user}/widget/MultiXender`} />
  </div>

  // add home component in this
);

const Content5 = () => (
  <div>
    <Widget src={`${user}/widget/MultiXender_FAQ`} />
  </div>

  // add qna component in this
);

const Header_main = ({ onMenuItemClick }) => {
  const [activeContent, setActiveContent] = useState(null);

  const handleMenuItemClick = (content) => {
    setActiveContent(content);
  };

  return (
    <>
      <HeaderContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Logo
            src="https://i.postimg.cc/RZHcz0KV/ed8660f1-affd-4806-aeed-6bd05d0eb8a5.jpg"
            alt="logo"
          />
          <H1>
            Multi<span>X</span>ender
          </H1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick("Content4")}>
            Home
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Content5")}>
            FAQ
          </MenuItem>
        </div>
      </HeaderContainer>
    </>
  );
};

const Banner = styled.img` 
width: 100%;
margin-top: 0;
@media screen and (min-width: 768px) {
max-width: 100%;
height: 50vh;
}
 
  @media screen and (min-width: 1400px) {
    max-width: 100%; /* Adjust the max-width value for min-width 1400px */
    height: 70vh;
  }
  }
`;

const BannerText = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate (-50%, -50%)
text-align: center;
color: #fff;
`;

function Adding_banner() {
  return (
    <Banner
      src="https://i.postimg.cc/pTNGtWZV/20240413-164307.jpg"
      alt="Banner Image"
    />
  );
}

const Text_style = styled.p`
  color: #072754; /* Set text color */
  margin-top: 50px; /* Set top margin */
  font-weight: bold; /* Set font weight to bold */
  display: flex; /* Set display to flex */
  justify-content: center; /* Center align horizontally */
  font-family: 'Lato', sans-serif; /* Set font family */
  font-size: 48px; /* Set font size */

  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 768px){
    font-size: 2rem;
  }
  @media screen and (max-width: 1400px){
    font-size: 3rem;
  }
  span {
    color: #ff0000; /* Red color for the 'X' */
  }
`;

const Second_p = styled.p`
  display: flex;
  justify-content: center;
  padding-left:10px; 
  color: #122644;
  font-family: 'Lato', sans-serif;
  margin-top : 10px;
  margin-left: 20px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300;
  font-weight: bold;

  @media screen and (max-width: 414px) {
    font-size: 1rem;
    }
`;

function text() {
  return (
    <Text_style>
      Multi<span>X</span>ender
    </Text_style>
  );
}

function text1() {
  return <Second_p>Send Near to Multiple Addresses</Second_p>;
}
function text2() {
  return (
    <Second_p>A frictionless multisender powerd by Freelancer DAO</Second_p>
  );
}

function Send({ onSendButtonClick }) {
  return (
    <CenteredContainer>
      <SendToken onClick={onSendButtonClick}>
        <p>Send Token</p>
      </SendToken>
    </CenteredContainer>
  );
}

const Container = styled.div`
 flex: 1;
 margin: 25px;
 height: 100px;
 width: 100px;
 font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  transition: all 250ms;
  
 background-color: #F8931F;
 border: 1px solid #fff;
 padding: 20px;
 border-radius: 8px;
 box-shadow: 0 0 10px rgba(0,0,0,0.1);


 &:hover,
  &:focus {
    background-color: #FCA900;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #c85000;
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }

  p {
    margin: 0; /* Remove default margin */
  }
`;

const PermanentText = styled.p`
 text-align: center;
 font-size:  16px;
 color: #000;
 margin-top: -18px;

 @media screen and (max-width: 414px) {
 margin-top: 5px;
  }

`;

const Dynamic_text = styled.p`
 text-align: center;
 font-size: 1.5rem;
 color: #000; 
 margin-top: 10px;

 @media screen and (max-width: 414px) {
     font-size: 1.5rem;
  }
`;

const DailyTradesContainer = () => {
  return (
    <Container>
      <PermanentText>Daily Trasanctions</PermanentText>
      <Dynamic_text>5+</Dynamic_text>
    </Container>
  );
};

const TotalTradesContainer = () => {
  return (
    <Container>
      <PermanentText>Total Transactions</PermanentText>
      <Dynamic_text>200+</Dynamic_text>
    </Container>
  );
};

const WeeklyTradesContainer = () => {
  return (
    <Container>
      <PermanentText>Weekly Transactions</PermanentText>
      <Dynamic_text>50+</Dynamic_text>
    </Container>
  );
};

const MonthlyTradesContainer = () => {
  return (
    <Container>
      <PermanentText>Monthly Transactions</PermanentText>
      <Dynamic_text>-</Dynamic_text>
    </Container>
  );
};

function token() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "100px" }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <DailyTradesContainer />
        <TotalTradesContainer />
      </div>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <WeeklyTradesContainer />
        <MonthlyTradesContainer />
      </div>
    </div>
  );
}

const FooterContainer = styled.div`
  height: 80px;
  margin-top: 200px;
  color: #000;
  background-color: #fefefe; 
  display: flex;
  align-items: center;
  margin-bottom: -50px;
  justify-content: center;
  font-family: Arial, sans-serif; 

  p {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 500px) {
    height: 120px; 
    margin-top: 100px; 
    padding: 20px; 
    text-align: center; 
    p{ 
    font-size: 1rem;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 MultiXender All rights reserved</p>
    </FooterContainer>
  );
};

const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

// New styled component for the logo
const LogoImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 1px solid #fff;
  border-radius: 40px;
  margin-top: 10px; // Adjust as needed
`;

function Multisender() {
  const [activeContent, setActiveContent] = useState(null);
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);

  useEffect(() => {
    // Simulate an async operation, e.g., fetching data or performing initialization
    const delay = setTimeout(() => {
      setInitialAnimationComplete(true);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(delay);
  }, []);

  const handleMenuItemClick = (content) => {
    setActiveContent(content);
  };

  const handleSendButtonClick = () => {
    setActiveContent("SendToken");
  };

  return (
    <>
      {/* Commenting out the X animation code */}
      {!initialAnimationComplete && <InitialLoadingAnimation />}
      {initialAnimationComplete && (
        <Mainpage>
          {/* Render Header_main and Adding_banner only when active content is not Content4 */}
          {activeContent !== "Content4" && (
            <>
              <Header_main onMenuItemClick={handleMenuItemClick} />
            </>
          )}

          {activeContent === null && (
            <>
              {Adding_banner()}
              {text()}
              {text1()}
              {text2()}
              <AdditionalInfo>
                <LogoImage
                  src="https://i.ibb.co/qCrtcwY/Screenshot-2024-04-11-205325.png"
                  alt="Logo"
                />
              </AdditionalInfo>
              <Send onSendButtonClick={handleSendButtonClick} />
              {token()}
              <Footer />;
            </>
          )}

          {activeContent === "Content4" && <Content4 />}
          {activeContent === "Content5" && <Content5 />}
          {activeContent === "SendToken" && <Content3 />}
        </Mainpage>
      )}
    </>
  );
}

return <Multisender />;
