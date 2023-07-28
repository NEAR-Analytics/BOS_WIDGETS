const path = props.path;
const blockHeight = props.blockHeight || "final";

const jThing = Social.get(path, blockHeight);

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
  // case "TYPE": {
  //   language = "json";
  //   const thing = JSON.parse(jThing);
  //   path = thing.type;
  //   code = Social.get(path, "final");
  //   break;
  // }
  case "WIDGET": {
    language = "javascript";
    const thing = JSON.parse(jThing);
    path = thing.template.src;
    code = Social.get(path, "final");
    break;
  }
}

if (!code || !path || !language) {
  return <></>;
}

// <Button onClick={() => State.update({ view: "TYPE" })}>type</Button>

return (
  <div>
    <div>
      <Button onClick={() => State.update({ view: "THING" })}>thing</Button>
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
