State.init({
  currentRoute: "moduleA",
  currentAppThemeMode: "lightMode",
});

//UI Kit Theme
const appTheme = {
  colors: () => {
    const currentThemeMode = state.currentAppThemeMode;
    const colors =
      currentThemeMode === "lightMode"
        ? {
            standartText: "#000000",
            backgroundColor: "#FFFFFF",
            primary: "#5F8AFA",
            secondary: "#FFFFFF",
            textBlack: "#000000",
            textWhite: "#FFFFFF",
          }
        : {
            standartText: "#FFFFFF",
            backgroundColor: "#333333",
            primary: "#5F8AFA",
            secondary: "#FFFFFF",
            textBlack: "#000000",
            textWhite: "#FFFFFF",
          };

    return colors;
  },
  fontSizes: {
    h1: "2.5em",
    h2: "2em",
    h3: "1.75em",
    h4: "1.5em",
    h5: "1.25em",
    h6: "1em",
    body: "1em",
    b1: "1em",
    b2: "0.9em",
    b3: "0.8em",
  },
  margins: {
    small: "0.25em",
    medium: "0.5em",
    large: "1em",
    xlarge: "2em",
  },
  paddings: {
    small: "0.25em",
    medium: "0.5em",
    large: "1em",
    xlarge: "2em",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
    circle: "50%",
  },
};
const appThemeService = {
  switchToLightTheme: () =>
    State.update({
      currentAppThemeMode: "lightMode",
    }),
  switchToDarkTheme: () =>
    State.update({
      currentAppThemeMode: "darkMode",
    }),
  getTheme: () => appTheme,
};
//UI Kit Theme

//UI Kit Widgets
const Button = styled.button`
  background: ${appTheme.colors().primary};
  color: ${appTheme.colors().textWhite};
  font-size: ${appTheme.fontSizes.b2};
  margin: ${appTheme.margins.small};
  padding: ${appTheme.paddings.medium};
  width: 100px;
  border: none;
  border-radius: ${appTheme.borderRadius.medium};
  align-self: center;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  background-color: ${appTheme.colors().backgroundColor};
`;
const NavigationBar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${appTheme.colors().backgroundColor};
  justify-content: space-around;
`;

const uiKitComponents = {
  button: Button,
  body: Body,
  navigationBar: NavigationBar,
};
//UI Kit Widgets

//Router
const routes = {
  moduleA: "vlmoon.near/widget/BOSModuleA",
  moduleB: "vlmoon.near/widget/BOSModuleB",
  moduleC: "vlmoon.near/widget/BOSModuleC",
  moduleD: "vlmoon.near/widget/BOSModuleD",
};

function navigateToModule(moduleRoute) {
  State.update({
    currentRoute: moduleRoute,
  });
}

const routesNavigator = {
  moduleA: () => navigateToModule("moduleA"),
  moduleB: () => navigateToModule("moduleB"),
  moduleC: () => navigateToModule("moduleC"),
  moduleD: () => navigateToModule("moduleD"),
};
//Router

//Dependencies Injections
function getModuleDependencies(moduleRoute) {
  if (moduleRoute === "moduleA") {
    return ["moduleA"];
  } else if (moduleRoute === "moduleB") {
    return ["moduleB"];
  } else if (moduleRoute === "moduleC") {
    return ["moduleC"];
  } else if (moduleRoute === "moduleD") {
    return ["moduleD"];
  }
}
const dependencies = getModuleDependencies(state.currentRoute);
//Dependencies Injections

//Data Layer
//Servre data will be fetched there from the url and smart contracts
//Data Layer

//Service Layer
//App Logic willl execute there
//Service Layer

return (
  <>
    <uiKitComponents.body>
      <uiKitComponents.navigationBar>
        <uiKitComponents.button onClick={routesNavigator.moduleA}>
          Swap Page to module A
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.moduleB}>
          Swap Page to module B
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.moduleC}>
          Swap Page to module C
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.moduleD}>
          Swap Page to module D
        </uiKitComponents.button>
      </uiKitComponents.navigationBar>
      <Widget
        src={routes[state.currentRoute]}
        props={{
          dependencies,
          routesNavigator,
          appThemeService,
          uiKitComponents,
        }}
      />
    </uiKitComponents.body>
  </>
);
