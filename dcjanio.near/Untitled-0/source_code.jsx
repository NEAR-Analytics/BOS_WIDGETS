import React from "react";
import styled from "styled-components";
// Ensure you import Web3Connect if it's a separate component.

// Here are your styled components using the new theme colors
const theme = {
  primary: "#8261CF", // Slate Blue
  secondary: "#7551CA", // Darker Slate Blue
  accent: "#CFC2EC", // Periwinkle
  neutralBg: "#E5DEF4", // Lavender Web
  white: "#FFFFFF", // White
  textDarkGrey: "#4A4A4A", // A dark grey for readability
};

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

const HorizontalLine = styled.hr`
  width: 80%;
  border: none;
  border-top: 1px solid ${theme.primary};
  margin-bottom: 10px;
`;

// Now, define your React component that will use these styled components
const LoginComponent = () => {
  return (
    <LoginContainer>
      <Heading>Contract Management Enterprise</Heading>
      <HorizontalLine />
      <SubHeading>Please log in to see this page!</SubHeading>
      <Button>Connect with wallet</Button>
      {/* Add other components and elements as needed */}
    </LoginContainer>
  );
};

export default LoginComponent;
