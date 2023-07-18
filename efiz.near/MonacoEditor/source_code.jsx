const Container = styled.div`
    height: 500px;
`;

function onChange(code) {
  State.update({
    code,
  });
}

return (
  <Container>
    <p>{code}</p>
    <MonacoEditor path={"test"} language={"json"} onChange={onChange} />
  </Container>
);
