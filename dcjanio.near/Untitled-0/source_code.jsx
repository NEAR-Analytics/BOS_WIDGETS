const ProjectContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;
  color: #8261CF; // Primary color for the text
  border-style: solid;
  border-color: #7551CA; // Secondary color for the border
  background-color: #E5DEF4; // Neutral background color
`;

const Button = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  font-weight: 500;

  a{
    color: #FFFFFF; // Base elements color for text to ensure readability
    font-size: 16px;
    background-color: #8261CF; // Primary color for button background
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none; // Removes underline from links
    border: 2px solid #7551CA; // Secondary color for border to add depth
    transition: background-color 0.3s ease; // Smooth background color transition on hover

    &:hover {
      background-color: #7551CA; // Darker shade on hover for interactive feedback
    }
  }
`;
const Heading = styled.h1`
  margin-top: 50px; // Adjust the margin as needed
  text-align: center;
  color: black; // Color changed to black
`;

const SubHeading = styled.h2`
  color: grey; // Color adjusted to a light grey 
  margin-top: 10px; // Reduced margin-top
  text-align: center;
  font-size: 18px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; // Changed to center 
  align-items: center;
  height: 80vh;
  background-color: white; // Background color changed to white
`;

const ButtonContainer = styled.div`
  margin-top: 40px; // Adjusted margin-top 
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const Button = styled.button`
  // Styles for the button 
  background-color: #90EE90; // Light green background
  color: white; // White text
  border: none; // No border
  border-radius: 5px; // Slightly rounded corners
  padding: 10px 20px; // Padding to increase button size
  font-size: 16px; // Font size increased for visibility
  cursor: pointer; // Cursor to pointer to indicate it's clickable
  outline: none; // No outline on focus
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  color: black; // Changed text color to black
`;

const HorizontalLine = styled.hr`
  width: 80%; // Adjusted width 
  border: none;
  border-top: 1px solid black; // Border color changed to black
  margin-bottom: 10px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: black; // Changed text color to black
`;

return (
  <LoginContainer>
    <Heading>Contract Management Enterprise</Heading> {/* Text changed  */}
    <HorizontalLine /> {/* Moved line  */}
    <SubHeading>please log in to see this page !</SubHeading>{" "}
    {/* Text changed */}
    <ButtonContainer>
      <Web3Connect className="Button" connectLabel="Connect with wallet" />{" "}
      {/* Using the new Button styled component */}
    </ButtonContainer>
    <Footer>{/* Horizontal line and footer text removed */}</Footer>
  </LoginContainer>
);
