const path = props.path;
const blockHeight = props.blockHeight;

const thing = Social.get(path, blockHeight) || "{}";
// const type = thing.type;

return (
  <Widget
    src={"efiz.near/widget/MonacoEditor"}
    props={{
      path,
      code: thing,
      language: "json",
    }}
  />
);
