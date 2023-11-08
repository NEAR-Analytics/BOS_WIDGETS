import styled from "styled-components";

// Theme colors based on your specifications
const theme = {
  primary: "#8261CF", // Slate Blue
  secondary: "#7551CA", // Darker Slate Blue
  accent: "#CFC2EC", // Periwinkle
  neutralBg: "#E5DEF4", // Lavender Web
  white: "#FFFFFF", // White
  textDarkGrey: "#4A4A4A", // A dark grey for readability
  // Define other colors for success, error, and warning as needed
};

// Styled components with new theme colors
const Heading = styled.h1`
  margin-top: 50px;
  text-align: center;
  color: ${theme.primary};
`;

const SubHeading = styled.h2`
  color: ${theme.textDarkGrey};
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
  background-color: ${theme.neutralBg};
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${theme.primary};
  color: ${theme.white};
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
  color: ${theme.accent};
  background-color: ${theme.secondary}; // Assuming you want the footer to have the secondary color background
`;

const HorizontalLine = styled.hr`
  width: 80%;
  border: none;
  border-top: 1px solid ${theme.primary};
  margin-bottom: 10px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: ${theme.white};
`;

// Your React component
const LoginComponent = () => {
  return (
    <LoginContainer>
      <Heading>Contract Management Enterprise</Heading>
      <HorizontalLine />
      <SubHeading>Please log in to see this page!</SubHeading>
      <ButtonContainer>
        <Button>Connect with wallet</Button>
      </ButtonContainer>
      <Footer>{/* Footer content here */}</Footer>
    </LoginContainer>
  );
};

export default LoginComponent;
