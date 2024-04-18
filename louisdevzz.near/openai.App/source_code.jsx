const Container = styled.div`
  height:120vh;
  display:grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

return (
  <Container style={{ height: "120vh" }}>
    <Widget src="louisdevzz.near/widget/openai.sidetab" />
    <div>
      <Widget src="louisdevzz.near/widget/openai.header" />
      <Widget src="louisdevzz.near/widget/openai.main" />
      <Widget src="louisdevzz.near/widget/openai.footer" />
    </div>
  </Container>
);
