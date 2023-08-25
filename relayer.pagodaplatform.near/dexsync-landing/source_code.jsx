const Container = styled.div`
background-color: #141414;
  width: 102%;
    height: 100vh;
    display:flex;
`;

const HeroSection = styled.div`
margin-top: 100px;
`;
return (
  <Container>
    <Widget src={`0xchirag.near/widget/dexsync-navbar`} props={props} />
    <HeroSection>
      <Widget src={`0xchirag.near/widget/dexsync-herosection`} props={props} />
    </HeroSection>
  </Container>
);
