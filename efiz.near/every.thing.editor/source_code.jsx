const path = props.path;
const blockHeight = props.blockHeight || "final";

const jThing = Social.get(path, blockHeight);

if (!jThing) {
  return <></>;
}

State.init({
  view: "THING",
  code: jThing,
  path,
  language: "json",
});

const Button = styled.button``;

let language;

switch (state.view) {
  case "THING": {
    State.update({ code: jThing, path: props.path, language: "json" });
    break;
  }
  case "TYPE": {
    const thing = JSON.parse(jThing);
    path = thing.type;
    const jType = Social.get(path, "final");
    State.update({ code: jType, path, language: "json" });
    break;
  }
  case "WIDGET": {
    const thing = JSON.parse(jThing);
    path = thing.template.src;
    const jWidget = Social.get(path, "final");
    State.update({ code: jWidget, path, language: "javascript" });
    break;
  }
}

if (!state.code) {
  return <></>;
}

const Container = styled.div`
    height: 500px;
`;

function onChange(code) {
  State.update({
    code,
  });
}

return (
  <div>
    <div>
      <Button onClick={() => State.update({ view: "THING" })}>thing</Button>
      <Button onClick={() => State.update({ view: "TYPE" })}>type</Button>
      <Button onClick={() => State.update({ view: "WIDGET" })}>widget</Button>
    </div>
    <Container>
      <MonacoEditor
        path={state.path}
        language={state.language}
        value={state.code}
        onChange={onChange}
      />
    </Container>
  </div>
);
