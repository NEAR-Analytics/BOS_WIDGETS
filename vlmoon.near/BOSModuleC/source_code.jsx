const dependencies = props.dependencies || {};

return (
  <>
    <h1>Module C</h1>
    <h2>{JSON.stringify(dependencies.routes) ?? "no routes"}</h2>
    <button onClick={dependencies.routesNavigator.moduleD}>
      Go to the next module
    </button>
  </>
);
