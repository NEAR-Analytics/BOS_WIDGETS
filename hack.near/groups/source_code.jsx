const groups = Social.index("every", "group", { limit: 10 });

return <div>{JSON.stringify(groups)}</div>;
