const Wrapper = styled.div`
Width: 100%;
`;

const Container = styled.div`
background-color: #4caf50;
`;
return (
  <Wrapper>
    <Widget src="abubakarimam.near/widget/Header" />
    <Container>
      <Widget src="abubakarimam.near/widget/Hero" />
      <Widget src="abubakarimam.near/widget/IntroSection" />
      <Widget src="abubakarimam.near/widget/HowITWorkSection" />
      <Widget src="abubakarimam.near/widget/BlockchainComponent" />
    </Container>
  </Wrapper>
);
