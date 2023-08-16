const dependencies = props.dependencies || ["No dependencies"];
const routesNavigator = props.routesNavigator;
const appThemeService = props.appThemeService;
const appTheme = appThemeService.getTheme();

return (
  <>
    <h1>Module A</h1>
    <h2>{JSON.stringify(dependencies)}</h2>
    <button onClick={routesNavigator.moduleB}>Go to the next module</button>
    <h6>Current Colors : {appTheme.colors()}</h6>
    <button onClick={appThemeService.switchToLightTheme}>
      Change App Theme Mode To Light
    </button>
    <button onClick={appThemeService.switchToDarkTheme}>
      Change App Theme Mode To Dark
    </button>
  </>
);
