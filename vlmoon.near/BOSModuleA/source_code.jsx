const dependencies = props.dependencies || ["No dependencies"];
const routesNavigator = props.routesNavigator;
const appThemeService = props.appThemeService;
const appTheme = appThemeService.getTheme();

const H6Text = styled.h6`
  margin: 0;
`;

return (
  <>
    <h1>Module A</h1>
    <h2>{JSON.stringify(dependencies)}</h2>
    <button onClick={routesNavigator.moduleB}>Go to the next module</button>
    <H6Text>Current Colors : {JSON.stringify(appTheme.colors())}</H6Text>
    <button onClick={appThemeService.switchToLightTheme}>
      Change App Theme Mode To Light
    </button>
    <button onClick={appThemeService.switchToDarkTheme}>
      Change App Theme Mode To Dark
    </button>
  </>
);
