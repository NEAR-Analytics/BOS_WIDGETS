State.init({
  currentRoute: "moduleA",
  currentAppThemeMode: "lightMode",
});

const appTheme = {
  colors: () => {
    const currentThemeMode = state.currentAppThemeMode;
    const colors =
      currentThemeMode === "lightMode"
        ? {
            primary: "#5F8AFA",
            secondary: "#FFFFFF",
            textBlack: "#000000",
            textWhite: "#FFFFFF",
            backgroundColor: "#FFFFFF",
          }
        : {
            primary: "#5F8AFA",
            secondary: "#FFFFFF",
            textBlack: "#000000",
            textWhite: "#FFFFFF",
            backgroundColor: "#333333",
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

function getModuleDependencies(moduleRoute) {
  if (moduleRoute.toLowerCase() === "moduleA".toLowerCase()) {
    return ["moduleA"];
  } else if (moduleRoute.toLowerCase() === "moduleB".toLowerCase()) {
    return ["moduleB"];
  } else if (moduleRoute.toLowerCase() === "moduleC".toLowerCase()) {
    return ["moduleC"];
  } else if (moduleRoute.toLowerCase() === "moduleD".toLowerCase()) {
    return ["moduleD"];
  }
}

const dependencies = getModuleDependencies(state.currentRoute);

return (
  <>
    <Body>
      <NavigationBar>
        <Button onClick={routesNavigator.moduleA}>Swap Page to module A</Button>
        <Button onClick={routesNavigator.moduleB}>Swap Page to module B</Button>
        <Button onClick={routesNavigator.moduleC}>Swap Page to module C</Button>
        <Button onClick={routesNavigator.moduleD}>Swap Page to module D</Button>
      </NavigationBar>
      <Widget
        src={routes[state.currentRoute]}
        props={{ dependencies, routesNavigator, appThemeService }}
      />
    </Body>
  </>
);
