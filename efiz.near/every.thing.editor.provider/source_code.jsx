const path = props.path;
const blockHeight = props.blockHeight || "final";

const jThing = Social.get(path, blockHeight);
const thing = JSON.parse(jThing);

const jType = Social.get(thing.type, "final");

const jWidget = Social.get(thing.template.src, "final");

if (!jThing || !jType || !jWidget) {
  return <></>;
}

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
  <Widget
    src={"efiz.near/widget/every.thing.editor"}
    props={{
      files: files,
    }}
  />
);
