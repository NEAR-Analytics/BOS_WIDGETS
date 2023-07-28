const path = props.path;
const code = props.code;
const language = props.language;
const Container = styled.div`
    height: 500px;
`;

State.init({
  code,
});

console.log(path);

function onChange(code) {
  State.update({
    code,
  });
}

return (
  <Container>
    <MonacoEditor
      path={path}
      language={language}
      value={state.code}
      onChange={onChange}
    />
  </Container>
);
