import React from "react";
import styled from "styled-components";
import { login } from "./near"; // This should be a function that handles NEAR login logic.

// Styled components
const LoginContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 16px;
  max-width: 400px;
  text-align: center;
  border: 1px solid #eceef0;
  border-radius: 8px;
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const LoginButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 15px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const LoginPrompt = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

// React component
const NearLogin = () => {
  const handleLogin = () => {
    // This function should initiate the NEAR login process.
    login();
  };

  return (
    <LoginContainer>
      <Title>Contract Management Enterprise</Title>
      <LoginPrompt>Please log in to see this page!</LoginPrompt>
      <LoginButton onClick={handleLogin}>Login with NEAR</LoginButton>
    </LoginContainer>
  );
};

export default NearLogin;
