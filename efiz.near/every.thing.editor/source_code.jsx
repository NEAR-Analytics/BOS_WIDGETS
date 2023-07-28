const path = props.path;
const blockHeight = props.blockHeight || "final";

const thing = Social.get(path, blockHeight) || "{}";
// const type = thing.type;

if (!thing) {
  return <></>;
}

return (
  <Widget
    src={"efiz.near/widget/MonacoEditor"}
    props={{
      path,
      code: thing,
      language: "javascript",
    }}
  />
);
