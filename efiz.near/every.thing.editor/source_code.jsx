const path = props.path;
const blockHeight = props.blockHeight || "final";

const jThing = Social.get(path, blockHeight);
const thing = JSON.parse(jThing);

const typePath = thing.type;
const jType = Social.get(typePath, "final");

const widgetPath = thing.template.src;
const jWidget = Social.get(widgetPath, "final");

if (!jThing) {
  return <></>;
}

State.init({
  view: "THING",
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
    path = typePath;
    code = jType;
    break;
  }
  case "WIDGET": {
    language = "javascript";
    path = widgetPath;
    code = jWidget;
    break;
  }
}

if (!code || !path || !language) {
  return <></>;
}

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
