const dependencies = props.dependencies || ["No dependencies"];
const routesNavigator = props.routesNavigator;

return (
  <>
    <h1>Module A</h1>
    <button onClick={routesNavigator.moduleB}>Go to the next module</button>
  </>
);
