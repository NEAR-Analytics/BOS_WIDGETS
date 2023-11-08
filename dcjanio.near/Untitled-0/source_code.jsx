import React from "react";
import styled from "styled-components";

const Heading = styled.h1`
  margin-top: 50px;
  text-align: center;
  color: black;
`;

const SubHeading = styled.h2`
  color: grey;
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
  background-color: white;
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HorizontalLine = styled.hr`
  width: 80%;
  border: none;
  border-top: 1px solid black;
  margin-bottom: 10px;
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
  color: black;
`;

// The LoginForm component
const LoginForm = () => {
  return (
    <LoginContainer>
      <Heading>Contract Management Enterprise</Heading>
      <HorizontalLine />
      <SubHeading>Please log in to see this page!</SubHeading>
      <ButtonContainer>
        <Web3Connect connectLabel="Connect with wallet" />{" "}
        {/* Assuming Web3Connect accepts a 'connectLabel' prop */}
      </ButtonContainer>
      <Footer>{/* Content for Footer here if needed */}</Footer>
    </LoginContainer>
  );
};

export default LoginForm;
