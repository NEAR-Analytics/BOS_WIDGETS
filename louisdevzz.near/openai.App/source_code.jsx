const Container = styled.div`
  height:120vh;
  display:grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  .left{
    grid-column: span 1 / span 1;
  }
  .right{
    grid-column: span 2 / span 2;
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
