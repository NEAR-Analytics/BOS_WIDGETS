const dependencies = props.dependencies || ["No dependencies"];
const routesNavigator = props.routesNavigator;

return (
  <>
    <h1>Module C</h1>
    <button onClick={routesNavigator.moduleD}>Go to the next module</button>
  </>
);
