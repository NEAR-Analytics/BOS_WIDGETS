const cb = useComponentCallback(props.renderComponent, ["spaghetti"]);
console.log({ cb });
return <div>{cb() || "nothing..."}</div>;
