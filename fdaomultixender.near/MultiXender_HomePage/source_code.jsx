// used for the Mainpage styling
const Mainpage = styled.div`
background-color: #22252a;
height: 1600pxpx;
margin: 0; 
padding: 0;
`;

// used for the header container
const HeaderContainer = styled.div`
  height: 80px;
  background-color: #22252a; /* Change to black color */
  display: flex;
  justify-content: space-between; 
  position: flex;
  align-items: center;
  width: 100%; /* Set to 100% to span the full width */
  margin-top: 0;
  z-index: 1001;
`;

//used for the logo
const Logo = styled.img`
width: 60px;
height: 60px;
object-fit: cover;
margin: 12px 10px 12px 0;
border: 1px solid #fff;  
cursor: pointer;
border: 1px solid #fff;
border-radius: 20px;
`;

//used for the multisender written
const H1 = styled.h1`
  color: #fff;
  padding: 15px;
  margin-left: 5px;

  span {
    color: #ff0000; /* Red color for the 'X' */
  }
`;
// used for the styling of menu items
const MenuItem = styled.button`
  width: 150px; 
  padding: 10px; 
  border: none;
  background-color: transparent;
  color: #fff; 
  cursor: pointer;
  border-bottom: 1px solid #fff;
  border-radius: 15px;
  margin-right: 20px;
  transition: background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease;
  
  &:hover {
    background-color: #fff; // Change to your desired hover background color
    color: #22252a;
    font-weight: 1.2rem;
  }
`;

const DrawXAnimation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #22252a;
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
const Send_token = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #22252a;
  margin-left: auto;
  margin-right: auto;
  height: 80px;
  margin-top: 10px;
  border: 1px solid #fff;
  border-radius: 10px;
  width: 200px;
  color: #fff;
  position: sticky;
  margin-top: 50px; 
  cursor: pointer;
  transition: transform 0.2s ease-in-out, background 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1); /* Scale the button on hover */
    background: #fff; /* Replace with your desired hover background color */
    color: #22252a;
    p{
    font-size: 1.5rem;
    font-weight: bold;
    }
  }
  p {
  margin-top: 12px;
  font-size: 1.5rem;
  font-weight: bold;
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
    <Widget src={`${user}/widget/MultiXender_HomePage`} />
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
        <div style={{ display: "flex", alignItems: "center" }}>
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
      src="https://i.postimg.cc/CKYYC4jp/Untitled-design-9.png"
      alt="Banner Image"
    />
  );
}

const Text_style = styled.div`
  color: #fff;
  margin-top : 50px;
  font-weight : bold;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 414px) {
    font-size: 20px;
    }
  @media screen and (min-width: 768px){
    font-size: 30px;
  }
  @media screen and (min-width: 1400px){
    font-size: 40px;
  }
  span {
    color: #ff0000; /* Red color for the 'X' */
  }
`;

const Second_p = styled.div`
  display: flex;
  justify-content: center;
  padding-left:10px; 
  color: #fff;
  margin-top : 10px;
  margin-left: 20px;
  font-weight: normal;

  @media screen and (min-width: 414px) {
    font-size: 17px;
    }
  @media screen and (min-width: 768px){
    font-size: 25px;
  }
  @media screen and (min-width: 1400px){
    font-size: 30px;
  }
`;

function text() {
  return (
    <Text_style>
      <p>
        Multi<span>X</span>ender
      </p>
    </Text_style>
  );
}

function text1() {
  return (
    <Second_p>
      <p>Send Near to Multiple Addresses</p>
    </Second_p>
  );
}
function text2() {
  return (
    <Second_p>
      <p>An frictionless multisender powerd by Freelancer DAO</p>
    </Second_p>
  );
}

function Send({ onSendButtonClick }) {
  return (
    <Send_token onClick={onSendButtonClick}>
      <p>Send Token</p>
    </Send_token>
  );
}

const Container = styled.div`
 flex: 1;
 margin: 35px;
 height: 100px;
 width: 100px;
 background-color: #22252a;
 border: 1px solid #fff;
 padding: 20px;
 border-radius: 8px;
 box-shadow: 0 0 10px rgba(0,0,0,0.1);
 transition: transform 0.3s ease-in-out;

 &:hover {
   transform: scale(1.1);
 }
`;

const PermanentText = styled.p`
 display: flex;
 justify-content: center;
 font-size: 19px;
 color: #fff;
 margin-top: -18px;

`;

const Dynamic_text = styled.p`
 display: flex;
 justify-content: center;
 font-size: 2.5rem;
 color: #fff; 
 margin-top: -10px;
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
color: #fff;
display: flex;
align-items: center;
justify-content: center;

p{
font-size: 1.5rem;
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

// New styled component for the additional text with animation
const AnimatedText = styled.p`
  font-size: 1.5rem;
  // font-weight: bold;
  color: #fff;
  margin-top: 10px; 
  animation: fadeInUp 3s ease-in-out; 

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const GridContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #22252a;
  margin-top: 200px;
  overflow: hidden;
 
  /* Define keyframes for the animation */
  @keyframes slideAnimation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  /* Apply the keyframes animation to the grid */
  > div {
    animation: slideAnimation 5s linear infinite; /* Adjust the duration and easing here */
  }
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
                  src="https://i.postimg.cc/rsM8zDRC/fdao.jpg"
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
