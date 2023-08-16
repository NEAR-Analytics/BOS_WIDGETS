const dependencies = props.dependencies || ["No dependencies"];
const routesNavigator = props.routesNavigator;

return (
  <>
    <h1>Module B</h1>
    <button onClick={routesNavigator.moduleC}>Go to the next module</button>
  </>
);
