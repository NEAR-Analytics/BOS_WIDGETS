const cb = useComponentCallback(props.renderComponent, ["spaghetti"]);
return <div>{cb()}</div>;
