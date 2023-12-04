const code = props.code;
delete props["code"];

return <Widget code={code} props={props} />;
