const path = props.path;
const blockHeight = props.blockHeight || "final";

const jThing = Social.get(path, blockHeight);

if (!jThing) {
  return <></>;
}

console.log(jThing);

State.init({
  view: "WIDGET",
});

const Button = styled.button``;

let language;
let code;

switch (state.view) {
  case "THING": {
    language = "json";
    code = jThing;
    break;
  }
  case "TYPE": {
    language = "json";
    const thing = JSON.parse(jThing);
    path = thing.type;
    code = Social.get(path, "final");
    break;
  }
  case "WIDGET": {
    language = "javascript";
    const thing = JSON.parse(jThing);
    path = thing.template.src;
    code = Social.get(path, "final");
    break;
  }
}

console.log(code);

return (
  <div>
    <div>
      <Button onClick={() => State.update({ view: "THING" })}>thing</Button>
      <Button onClick={() => State.update({ view: "TYPE" })}>type</Button>
      <Button onClick={() => State.update({ view: "WIDGET" })}>widget</Button>
    </div>
    <Widget
      src={"efiz.near/widget/MonacoEditor"}
      props={{
        path,
        code,
        language,
      }}
    />
  </div>
);
