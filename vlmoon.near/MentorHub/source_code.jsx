// Mentor data
State.init({
  mentorPhoto: "",
  mentorName: "Mentor Name",
  mentorPoints: 0,
  studentsCounter: 0,
  students: [],
  studentRequests: [],
  currentAppThemeMode: "lightMode",
  currentRoute: "moduleA",
});

const fetchData = async () => {
  const mentorData = {};
  const students = [];
  const studentRequests = [];

  //   State.update({
  //     mentorPhoto: mentorData.photo || "",
  //     mentorName: mentorData.name || "Mentor Name",
  //     mentorPoints: mentorData.points || 0,
  //     studentsCounter: students.length || 0,
  //     students,
  //     studentRequests,
  //     currentAppThemeMode: "lightMode",
  //   });
};

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
  align-items: center; 
  padding : ${appTheme.paddings.large};
  background-color: ${appTheme.colors().backgroundColor};
  justify-content: center;
`;

const ProfileTab = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${appTheme.colors().backgroundColor};
  justify-content: center;
  align-items: center; 
`;

const uiKitComponents = {
  button: Button,
  body: Body,
  navigationBar: NavigationBar,
  profileTab: ProfileTab,
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

const accountId = context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = Social.getr(`${accountId}/profile`);
const name = profile.name || "No-name profile";
const nameHeader = <h4 className="mt-0 mb-0 text-truncate">{name}</h4>;

return (
  <>
    <uiKitComponents.profileTab>
      <h3>Mentor HUB</h3>
      <h4>Make the world around you the better place</h4>
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          profile,
          fast,
          accountId,
          style: { width: "7rem", height: "7rem" },
          className: "mb-2",
          imageClassName: "rounded-circle w-100 h-100 img-thumbnail d-block",
          thumbnail: false,
        }}
      />
      <h4 className="mt-0 mb-0 text-truncate">{name}</h4>
    </uiKitComponents.profileTab>
    <uiKitComponents.body>
      <uiKitComponents.navigationBar>
        <uiKitComponents.button onClick={routesNavigator.moduleA}>
          My Students
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.moduleB}>
          My Teachers
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.moduleC}>
          My Events
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.moduleD}>
          My Tasks
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
// <uiKitComponents.body>
//   <uiKitComponents.navigationBar>
//     <uiKitComponents.button onClick={routesNavigator.moduleA}>
//       Swap Page to module A
//     </uiKitComponents.button>
//     <uiKitComponents.button onClick={routesNavigator.moduleB}>
//       Swap Page to module B
//     </uiKitComponents.button>
//     <uiKitComponents.button onClick={routesNavigator.moduleC}>
//       Swap Page to module C
//     </uiKitComponents.button>
//     <uiKitComponents.button onClick={routesNavigator.moduleD}>
//       Swap Page to module D
//     </uiKitComponents.button>
//   </uiKitComponents.navigationBar>
//   <Widget
//     src={routes[state.currentRoute]}
//     props={{
//       dependencies,
//       routesNavigator,
//       appThemeService,
//       uiKitComponents,
//     }}
//   />
// </uiKitComponents.body>
