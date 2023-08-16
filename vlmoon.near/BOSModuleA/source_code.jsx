const dependencies = props.dependencies || ["No dependencies"];
const routesNavigator = props.routesNavigator;
const appThemeService = props.appThemeService;
const appTheme = appThemeService.getTheme();

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  wifth : 300px;
  self-align: center;
  background-color: ${appTheme.colors().backgroundColor};
`;

return (
  <Body>
    <h1>Module A</h1>
    <h2>{JSON.stringify(dependencies)}</h2>
    <button onClick={routesNavigator.moduleB}>Go to the next module</button>
    <button onClick={appThemeService.switchToLightTheme}>
      Change App Theme Mode To Light
    </button>
    <button onClick={appThemeService.switchToDarkTheme}>
      Change App Theme Mode To Dark
    </button>
  </Body>
);
