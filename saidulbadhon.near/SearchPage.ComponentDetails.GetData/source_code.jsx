const src = props.src || "saidulbadhon.near/widget/Linktree";

const historyBlocksRequest = Social.keys(`${src}`, "final", {
  return_type: "History",
});

props.history = historyBlocksRequest;

return <div />;
