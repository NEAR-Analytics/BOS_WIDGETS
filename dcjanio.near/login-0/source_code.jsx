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
    <Heading>Calimocho Attestation Service</Heading>
    <HorizontalLine /> {/* Moved line  */}
    <SubHeading>please log in to see this page !</SubHeading>{" "}
    <ButtonContainer>
      <Web3Connect
        className="Button"
        connectLabel="Connect Web3 Wallet"
        disconnectLabel="Disconnect Web3 Wallet"
        connectingLabel="Connecting..."
      />{" "}
    </ButtonContainer>
    <Footer>{/* Horizontal line and footer text removed */}</Footer>
  </LoginContainer>
);
