const components = [
  "nearefi.near/widget/ReFi.Requests",
  "nearefi.near/widget/ReFI.DevHub",
  "nearefi.near/widget/ReFI.Regen.sbtHolders",
  "nearefi.near/widget/SupportReFi",
  "nearefi.near/widget/ReFi.Alliance",
  "nearefi.near/widget/ReFi.Home",
];
return (
  <div>
    {components.map((component) => (
      <Widget
        src="nearefi.near/widget/ReFi.Common.componentCard"
        props={{ src: component }}
      />
    ))}
  </div>
);
