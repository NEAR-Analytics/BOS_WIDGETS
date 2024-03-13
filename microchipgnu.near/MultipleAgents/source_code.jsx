const tools = VM.require("microchipgnu.near/widget/Tools");

return (
  <div className="d-flex gap-4">
    <Widget
      src="microchipgnu.near/widget/Agent"
      props={{
        tools: tools,
      }}
    />
    <Widget
      src="microchipgnu.near/widget/Agent"
      props={{
        tools: tools,
      }}
    />
  </div>
);
