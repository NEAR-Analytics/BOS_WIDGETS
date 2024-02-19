const accountId = context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = Social.getr(`${accountId}/profile`);
const name = profile.name;
const discription = profile.discription;

const student = Social.getr(`${accountId}/mystudents`);
let numb = "";
let studentArray = [];
let arreyWhitKeysForStufent = [];
let heash = {};
if (student) {
  studentArray = Object.values(student);
  arreyWhitKeysForStufent = Object.keys(student);
  for (const i = 0; i < arreyWhitKeysForStufent.length; i++) {
    heash[studentArray[i]] = [arreyWhitKeysForStufent[i]];
  }
}
if (arreyWhitKeysForStufent) {
  numb =
    parseInt(arreyWhitKeysForStufent[arreyWhitKeysForStufent.length - 1]) + 1;
} else {
  numb = 0;
}

function descriptionForStudent(account_id) {
  const discriprionalIN = Social.getr(`${account_id}/profile`);
  return discriprionalIN.discription;
}
let index = 0;
function deleteNumb(student) {
  index = heash[student];
}

State.init({
  mentorPhoto: "",
  mentorName: "Mentor Name",
  mentorPoints: 0,
  studentsCounter: 0,
  students: [],
  studentRequests: [],
  currentAppThemeMode: "lightMode",
  currentRoute: "studentsPage",
  profileName: name || "",
  profileDiscription: discription || "",
  addNewStudent: "",
  editDescription: "",
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
  studentsPage: () => navigateToModule("studentsPage"),
  myTeachersPage: () => navigateToModule("myTeachersPage"),
  myEventsPage: () => navigateToModule("myEventsPage"),
  myTasksPage: () => navigateToModule("myTasksPage"),
};

function getModuleDependencies(moduleRoute) {
  if (moduleRoute === "studentsPage") {
    return ["studentsPage"];
  } else if (moduleRoute === "myTeachersPage") {
    return ["myTeachersPage"];
  } else if (moduleRoute === "myEventsPage") {
    return ["myEventsPage"];
  } else if (moduleRoute === "myTasksPage") {
    return ["myTasksPage"];
  }
}
const dependencies = getModuleDependencies(state.currentRoute);

//Pages
const pages = {
  studentsPage: (
    <>
      <h1>My Students</h1>
      <h3>For add, input account_ID student(for exemple: exemple.near):</h3>
      <div
        style={{
          display: "flex",
          marginRight: "30em",
          height: "3em",
          width: "29em",
        }}
      >
        <input
          type="text"
          className="form-control"
          style={{
            backgroundColor: "black",
            color: "white",
          }}
          placeholder="Input for edit description"
          onBlur={(e) => State.update({ description: e.target.value })}
        />
        <CommitButton
          data={{
            mystudents: {
              [numb]: state.addNewStudent,
            },
          }}
        >
          Add
        </CommitButton>
      </div>
      <div
        style={{
          margin: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            margin: "15px",
            justifyContent: "space-around",
          }}
        >
          <div>
            <h4>Column profile</h4>
          </div>
          <div>
            <h4>Column description</h4>
          </div>
          <div>
            <h4>Column for delete & edit</h4>
          </div>
        </div>
        {studentArray.map((student) => (
          <div
            key={student}
            style={{
              display: "flex",
              margin: "15px",
              justifyContent: "space-around",
            }}
          >
            <div>
              <Widget
                src="near/widget/AccountProfile"
                props={{ accountId: student }}
              />
            </div>
            <input
              type="text"
              className="form-control"
              style={{
                backgroundColor: "white",
                color: "black",
                height: "3em",
                width: "11em",
              }}
              placeholder="Input for edit description"
              onBlur={(e) => State.update({ editDescription: e.target.value })}
            />
            <div>
              <h4>{descriptionForStudent(student)}</h4>
            </div>
            <div>
              <CommitButton
                onClick={deleteNumb(student)}
                data={{
                  mystudents: {
                    [index]: null,
                  },
                }}
                style={{
                  backgroundColor: "red",
                }}
              >
                Delete
              </CommitButton>
              <CommitButton
                data={{
                  profile: {
                    discription: state.editDescription,
                  },
                }}
                style={{
                  backgroundColor: "blue",
                }}
              >
                Edit
              </CommitButton>
            </div>
          </div>
        ))}
      </div>
    </>
  ),
  myTeachersPage: (
    <>
      <h1>My Teachers</h1>
    </>
  ),
  myEventsPage: (
    <>
      <h1>My Events</h1>
    </>
  ),
  myTasksPage: (
    <>
      <h1>My Tasks</h1>
    </>
  ),
};
//

if (!profile) {
  return (
    <>
      <uiKitComponents.body>
        <h1>Mentor HUB</h1>
        <h2>
          You don't have a profile, if you want to continue, you have to create
          a profile
        </h2>
        <h3>Input your name:</h3>
        <div
          style={{
            marginRight: "30em",
          }}
        >
          <input
            type="text"
            className="form-control"
            style={{
              backgroundColor: "black",
              color: "white",
            }}
            onBlur={(e) => State.update({ profileName: e.target.value })}
          />
        </div>
        <h2>Hello, {state.profileName}</h2>
        <h3>Input your discription</h3>
        <input
          type="text"
          className="form-control"
          style={{
            backgroundColor: "black",
            color: "white",
            marginRight: "100em",
            paddingsRight: "100px",
          }}
          onBlur={(e) => State.update({ profileDiscription: e.target.value })}
        />
        <h2>Your discriprional: {state.profileDiscription}</h2>
        <div
          style={{
            display: flex,
            margin: "0px 10px",
            alignItems: center,
          }}
        >
          <CommitButton
            data={{
              profile: {
                name: state.profileName,
                discription: state.profileDiscription,
              },
            }}
          >
            Save change
          </CommitButton>
        </div>
      </uiKitComponents.body>
    </>
  );
}

if (!name) {
  <>
    <uiKitComponents.body>
      <h1>Mentor HUB</h1>
      <h2>
        You don't have a name of profile, if you want to continue, you have to
        create a name.
      </h2>
      <h3>Input your name:</h3>
      <div
        style={{
          marginRight: "30em",
        }}
      >
        <input
          type="text"
          className="form-control"
          style={{
            backgroundColor: "black",
            color: "white",
          }}
          onBlur={(e) => State.update({ profileName: e.target.value })}
        />
      </div>
      <h2>Hello, {state.profileName}</h2>
      <div
        style={{
          display: flex,
          margin: "0px 10px",
          alignItems: center,
        }}
      >
        <CommitButton
          data={{
            profile: {
              name: state.profileName,
            },
          }}
        >
          Save change
        </CommitButton>
      </div>
    </uiKitComponents.body>
  </>;
}

if (!discription) {
  return (
    <>
      <uiKitComponents.body>
        <h1>Mentor HUB</h1>
        <h2>
          You don't have a description, if you want to continue, you have to
          create a description
        </h2>
        <h3>Input your discription</h3>
        <input
          type="text"
          className="form-control"
          style={{
            backgroundColor: "black",
            color: "white",
            marginRight: "100em",
            paddingsRight: "100px",
          }}
          onBlur={(e) => State.update({ profileDiscription: e.target.value })}
        />
        <h2>Your discriprional: {state.profileDiscription}</h2>
        <div
          style={{
            display: flex,
            margin: "0px 10px",
            alignItems: center,
          }}
        >
          <CommitButton
            data={{
              profile: {
                discription: state.profileDiscription,
              },
            }}
          >
            Save change
          </CommitButton>
        </div>
      </uiKitComponents.body>
    </>
  );
}

return (
  <>
    <uiKitComponents.profileTab>
      <h3>Mentor HUB</h3>
      <h4>Hey, {name}</h4>
      <h4>Make the world around you the better place</h4>
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId,
          style: { width: "7rem", height: "7rem" },
          className: "mb-2",
          imageClassName: "rounded-circle w-100 h-100 img-thumbnail d-block",
          thumbnail: false,
        }}
      />
    </uiKitComponents.profileTab>
    <uiKitComponents.button onClick={() => alert("Test")}>
      Test
    </uiKitComponents.button>

    <uiKitComponents.body>
      <uiKitComponents.navigationBar>
        <uiKitComponents.button onClick={routesNavigator.studentsPage}>
          My Students
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.myTeachersPage}>
          My Teachers
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.myEventsPage}>
          My Events
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.myTasksPage}>
          My Tasks
        </uiKitComponents.button>
      </uiKitComponents.navigationBar>
      {pages[state.currentRoute]}
    </uiKitComponents.body>
  </>
);
