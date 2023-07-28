const path = props.path;
const blockHeight = props.blockHeight || "final";

const jThing = Social.get(path, blockHeight);
const thing = JSON.parse(jThing);

const jType = Social.get(thing.type, "final");
const jWidget = Social.get(thing.template.src, "final");

if (!jThing || !jType || !jWidget) {
  return <></>;
}

State.init({
  view: "THING",
});

const Button = styled.button``;

const files = {
  THING: {
    path: props.path,
    language: "json",
    code: jThing,
  },
  TYPE: {
    path: thing.type,
    language: "json",
    code: jType,
  },
  WIDGET: {
    path: thing.template.src,
    language: "javascript",
    code: jWidget,
  },
};

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
        path: files[state.view].path,
        language: files[state.view].language,
        code: files[state.view].code,
      }}
    />
  </div>
);
