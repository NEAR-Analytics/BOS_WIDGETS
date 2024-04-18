const Container = styled.div`
  height:120vh;
  display:flex;
  flex-direction:row;
  .right{
    width:100%;
  }
`;

return (
  <Container style={{ height: "120vh" }}>
    <div class="left">
      <Widget src="louisdevzz.near/widget/openai.sidetab" />
    </div>
    <div class="right">
      <Widget src="louisdevzz.near/widget/openai.header" />
      <Widget src="louisdevzz.near/widget/openai.main" />
      <Widget src="louisdevzz.near/widget/openai.footer" />
    </div>
  </Container>
);
