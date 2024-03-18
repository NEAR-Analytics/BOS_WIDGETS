const tools = VM.require("microchipgnu.near/widget/Tools");

return (
  <div className="d-flex flex-column gap-4">
    <Widget
      src="microchipgnu.near/widget/Agent"
      props={{
        role: "Developer",
        tools: tools,
      }}
    />
    <Widget
      src="microchipgnu.near/widget/Agent"
      props={{
        role: "Designer",
        tools: tools,
      }}
    />
  </div>
);
