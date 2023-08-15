const Button = styled.button`
  background: green;
  color: white;
  font-size: 0.8em;
  margin: 1em;
  align: center;
  padding: 0.5em;
  width: 100px;
  border: none;
  border-radius: 10px;
  align-self: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const NavigationBar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-around;
`;

const routes = {
  moduleA: "vlmoon.near/widget/BOSModuleA",
  moduleB: "vlmoon.near/widget/BOSModuleB",
  moduleC: "vlmoon.near/widget/BOSModuleC",
  moduleD: "vlmoon.near/widget/BOSModuleD",
};

const routesNavigator = {
  moduleA: () => navigateToModule("moduleA"),
  moduleB: () => navigateToModule("moduleB"),
  moduleC: () => navigateToModule("moduleC"),
  moduleD: () => navigateToModule("moduleD"),
};

//Define Routes and route delegator
function navigateToModule(moduleRoute) {
  State.update({
    currentRoute: moduleRoute,
    dependencies: getModuleDependencies(moduleRoute),
  });
}

//Define Dependencies for module
function getModuleDependencies(moduleRoute) {
  return { routesNavigator, routes };
}

State.init({
  currentRoute: "moduleA",
});

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
      <Widget src={routes[state.currentRoute]} props={dependencies} />
    </Body>
  </>
);
