const React = require("react");
const styled = require("styled-components").default;

// Your styled components remain the same
const Heading = styled.h1`...`;
const SubHeading = styled.h2`...`;
// ... other styled components

// Define your React component
function LoginComponent() {
  // The JSX remains the same as well
  return (
    <LoginContainer>
      <Heading>Contract Management Enterprise</Heading>
      <HorizontalLine />
      <SubHeading>please log in to see this page!</SubHeading>
      <ButtonContainer>
        <Web3Connect className="Button" connectLabel="Connect with wallet" />
      </ButtonContainer>
      <Footer></Footer>
    </LoginContainer>
  );
}

module.exports = LoginComponent;
