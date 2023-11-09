import styled from "styled-components";
// ... other imports if necessary

const Heading = styled.h1`
  margin-top: 50px;
  text-align: center;
  color: darkseagreen; // Closest to #6B9080
`;

const SubHeading = styled.h2`
  color: lightgrey; // Closest to #A4C3B2
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
  background-color: white; // There is no CSS color for #EAF4F4, white is used instead
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: darkseagreen; // Closest to #6B9080
  color: white; // Closest to #F6FFF8
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
  color: lightgrey; // Closest to #CCE3DE
`;

const HorizontalLine = styled.hr`
  width: 80%;
  border: none;
  border-top: 1px solid lightgrey; // Closest to #A4C3B2
  margin-bottom: 10px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: lightgrey; // Closest to #CCE3DE
`;

return (
  <LoginContainer>
    <Heading>Contract Management Enterprise</Heading> {/* Text changed  */}
    <HorizontalLine /> {/* Moved line  */}
    <SubHeading>please log in to see this page !</SubHeading>{" "}
    {/* Text changed */}
    <ButtonContainer>
      <Web3Connect
        className="Button"
        connectLabel="Connect Web3 Wallet"
        disconnectLabel="Disconnect Web3 Wallet"
        connectingLabel="Connecting..."
      />{" "}
      /> {/* Using the new Button styled component */}
    </ButtonContainer>
    <Footer>{/* Horizontal line and footer text removed */}</Footer>
  </LoginContainer>
);
