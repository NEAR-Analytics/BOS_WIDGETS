const dependencies = props.dependencies || {};

return (
  <>
    <h1>Module A</h1>
    <h2>{JSON.stringify(dependencies.routes) ?? "no routes"}</h2>
  </>
);
