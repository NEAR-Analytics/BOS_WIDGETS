const Heading = styled.h1`
  margin-top: 50px; 
  text-align: center;
  color: #8261CF; // Primary Color: Slate Blue
`;

const SubHeading = styled.h2`
  color: #7551CA; // Secondary Color: Slate Blue, slightly darker shade
  margin-top: 10px;
  text-align: center;
  font-size: 18px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  height: 80vh;
  background-color: #E5DEF4; // Neutral Background: Lavender Web
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: #8261CF; // Using Primary Color: Slate Blue
  color: #FFFFFF; // Base Elements: White
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
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
  color: #8261CF; // Primary Color: Slate Blue
`;

const HorizontalLine = styled.hr`
  width: 80%;
  border: none;
  border-top: 1px solid #8261CF; // Primary Color: Slate Blue
  margin-bottom: 10px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #8261CF; // Primary Color: Slate Blue
`;

// Assuming Web3Connect is a styled component that you've previously defined
const Web3Connect = styled(Button)`
  // Additional styles for Web3Connect if needed
`;

return (
  <LoginContainer>
    <Heading>Contract Management Enterprise</Heading>
    <HorizontalLine />
    <SubHeading>Please log in to see this page!</SubHeading>
    <ButtonContainer>
      <Web3Connect connectLabel="Connect with wallet" />
    </ButtonContainer>
    <Footer>
      {/* If you want to add footer text */}
      <FooterText>© 2023 Contract Management Enterprise</FooterText>
    </Footer>
  </LoginContainer>
);
