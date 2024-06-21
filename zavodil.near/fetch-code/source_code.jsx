if (!props.codeUrl) return "";
const code = fetch(props.codeUrl);
if (!code.ok) return "";
return <Widget code={code.body} props={props} />;
