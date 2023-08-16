const dependencies = props.dependencies || ["No dependencies"];
const routesNavigator = props.routesNavigator;
const appThemeService = props.appThemeService;

return (
  <>
    <h1>Module A</h1>
    <h2>{JSON.stringify(dependencies)}</h2>
    <button onClick={routesNavigator.moduleB}>Go to the next module</button>
    <button onClick={appThemeService.lightTheme}>
      Change App Theme Mode To Light
    </button>
    <button onClick={appThemeService.dartkTheme}>
      Change App Theme Mode To Dark
    </button>
  </>
);
