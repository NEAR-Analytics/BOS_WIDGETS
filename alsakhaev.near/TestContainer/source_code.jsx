const Container = styled.div`
    border: 1px solid #f00;
    padding: 10px;
`;

return (
  <Container>
    <Widget
      src="alsakhaev.near/widget/TestContainer"
      props={{ children: props.children }}
    />
  </Container>
);
