const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const youtickLogo = "https://www.youtick.net/youtick-logo.png";

const StyledBody = styled.div`
  height: 100vh; // viewport height
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

const Logo = styled.img`
  width: 600px;
  margin-bottom: 30px;
`;

const WelcomeMessage = styled.div`
  font-size: 2em;
  margin-bottom: 10px;
`;

const SubMessage = styled.div`
  font-size: 1em;
  margin-bottom: 20px;
`;

const ConstructionInfo = styled.div`
  font-size: 0.9em;
  color: #aaa;
`;

return (
  <StyledBody>
    <Container>
      <Logo src={youtickLogo} alt="Youtick Logo" />
      <WelcomeMessage>Welcome to Youtick!</WelcomeMessage>
      <SubMessage>Website is currently being crafted.</SubMessage>
      <ConstructionInfo>Please check back soon.</ConstructionInfo>
    </Container>
  </StyledBody>
);
