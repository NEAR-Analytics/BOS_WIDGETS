const Container = styled.div`
    border: 1px solid #f00;
    padding: 10px;
`;

const depth = props.depth ?? 5;

if (depth == 0) {
  return props.children;
}

return (
  <Container>
    <Widget
      src="alsakhaev.near/widget/TestContainer"
      props={{ children: props.children, depth: depth - 1 }}
    />
  </Container>
);
