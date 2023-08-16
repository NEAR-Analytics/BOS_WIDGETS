const dependencies = props.dependencies || ["No dependencies"];
const routesNavigator = props.routesNavigator;

return (
  <>
    <h1>Module C</h1>
    <h2>{JSON.stringify(dependencies)}</h2>
    <button onClick={routesNavigator.moduleD}>Go to the next module</button>
  </>
);
