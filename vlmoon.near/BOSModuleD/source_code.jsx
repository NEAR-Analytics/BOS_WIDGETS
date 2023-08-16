const dependencies = props.dependencies || {};

return (
  <>
    <h1>Module B</h1>
    <h2>{JSON.stringify(dependencies.routes) ?? "no routes"}</h2>
    <button onClick={dependencies.routesNavigator.moduleA}>
      Go to the next module
    </button>
  </>
);
