if (!props.updatedWidget) return "send updatedWidget in props";

const newCode = Social.get(`${props.updatedWidget}`);

if (newCode === null) return "Loading...";

if (!props.widgetPath) return "send widgetPath in props";

const baseCode = Social.get(`${props.widgetPath}`);

if (baseCode === null) return "Loading...";

return (
  <Widget
    src="bozon.near/widget/CodeDiff"
    props={{ currentCode: newCode, prevCode: baseCode, ...props }}
  />
);
