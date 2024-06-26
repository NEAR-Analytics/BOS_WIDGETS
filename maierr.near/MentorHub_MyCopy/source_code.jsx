State.init({
  accountId: "",
  mentorPhoto: "",
  mentorName: "Mentor Name",
  mentorPoints: 0,
  studentsCounter: 0,
  students: [],
  studentRequests: [],
  currentAppThemeMode: "lightMode",
  currentRoute: "studentsPage",
  profileName: "",
  profileDiscription: "",
  creatProfileName: "",
  creatProfileDiscription: "",
  addNewStudent: "",
  editDescription: "",
  ifAddStudent: true,
  studentArray: [],
  arreyWhitIndexForAddStudent: [],
  heashForDeletnumb: {},
  flagForFindStdudentByID: false,
  idFindStudent: "",
  vrifyOurStudent: "",
});

const TecherPossibilities = {
  init: () => {
    const accountId = context.accountId;
    if (!accountId) {
      return "No account ID";
    }
    const profile = Social.getr(`${state.accountId}/profile`);
    State.update({
      accountId: accountId,
      profileName: profile.name,
      profileDiscription: profile.discription,
    });
  },
  initProfile: () => {
    Social.set({
      profile: {
        name: state.creatProfileName,
        discription: state.creatProfileDiscription,
      },
    });
  },
  initNameProfile: () => {
    Social.set({
      profile: {
        name: state.creatProfileName,
      },
    });
  },
  initDiscriptionProfile: () => {
    Social.set({
      profile: {
        discription: state.creatProfileDiscription,
      },
    });
  },
  getStudent: (pageNumber, pageSize) => {
    // Рассчитываем начальный и конечный индексы для пагинации
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    let studentArray = [];
    let arreyWhitIndexForAddStudent = [];
    let heashForDeletnumb = {};

    for (let i = startIndex; i < endIndex; i++) {
      const student = Social.get(`${state.accountId}/mystudents/${i}`);
      if (student) {
        studentArray.push(student);
        heashForDeletnumb[student] = i;
      } else {
        arreyWhitIndexForAddStudent.push(i);
      }
    }

    State.update({
      studentArray: studentArray,
      arreyWhitIndexForAddStudent: arreyWhitIndexForAddStudent,
      heashForDeletnumb: heashForDeletnumb,
    });
  },
  updateDiscription: (student) => {
    Social.set({
      profile: {
        discriptionsStudent: {
          [student]: state.editDescription,
        },
      },
    });
  },
  deleteStudent: (student) => {
    const indexForDeleteNumb = state.heashForDeletnumb[student];
    Social.set({
      mystudents: {
        [indexForDeleteNumb]: null,
      },
      myStudentsForFind: {
        [student]: false,
      },
    });
  },
  addStudent: () => {
    const newStudent = state.addNewStudent;
    const ifAlreadyHaveStudent = Social.get(
      `${state.accountId}/myStudentsForFind/${newStudent}`
    );
    const sliceForVerification = newStudent.slice(
      newStudent.length - 5,
      newStudent.length
    );
    if (sliceForVerification == ".near" && ifAlreadyHaveStudent != `true`) {
      let indexForAddStudent = 0;
      if (
        state.studentArray.length > 0 &&
        state.arreyWhitIndexForAddStudent.length > 0
      ) {
        indexForAddStudent = state.arreyWhitIndexForAddStudent[0];
      } else if (
        state.studentArray.length > 0 &&
        state.arreyWhitIndexForAddStudent.length == 0
      ) {
        while (state.arreyWhitIndexForAddStudent.length == 0) {
          const student = Social.get(
            `${state.accountId}/mystudents/${indexForAddStudent}`
          );
          if (!student) {
            State.update({
              arreyWhitIndexForAddStudent: student,
            });
            break;
          }
          indexForAddStudent++;
        }
      } else if (
        state.studentArray.length == 0 &&
        !state.arreyWhitIndexForAddStudent.length == 0
      ) {
        indexForAddStudent = 0;
      }
      Social.set({
        mystudents: {
          [indexForAddStudent]: state.addNewStudent,
        },
        myStudentsForFind: {
          [newStudent]: true,
        },
      });
      State.update({
        ifAddStudent: true,
      });
    } else {
      State.update({
        ifAddStudent: false,
      });
    }
  },
  findStudentByID: (idaccound) => {
    const isOurStudent = Social.get(
      `${state.accountId}/myStudentsForFind/${idaccound}`
    );
    if (isOurStudent == `true`) {
      State.update({
        vrifyOurStudent: idaccound,
      });
    } else {
      State.update({
        vrifyOurStudent: "",
      });
    }
  },
};

TecherPossibilities.init();
TecherPossibilities.getStudent(1, 10);

function descriptionForStudent(account_id) {
  const discriprionalIN = Social.get(`${account_id}/profile/discription`);
  return discriprionalIN;
}

function ourDescriptionForStudent(account_id) {
  const discriprionalIN = Social.get(
    `${state.accountId}/profile/discriptionsStudent/${account_id}`
  );
  if (discriprionalIN == null) {
    return "no info";
  }
  return discriprionalIN;
}

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
          onBlur={(e) => State.update({ addNewStudent: e.target.value })}
        />
        <Button
          onClick={TecherPossibilities.addStudent}
          style={{ backgroundColor: "green" }}
        >
          Add
        </Button>
      </div>
      {!state.ifAddStudent && <h3>Some gone wrong. Not add</h3>}
      <h3>Find student by account_ID:</h3>
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
          onBlur={(e) => State.update({ idFindStudent: e.target.value })}
        />
        <Button
          style={{ backgroundColor: "blue" }}
          onClick={() => {
            TecherPossibilities.findStudentByID(state.idFindStudent);
          }}
        >
          Find
        </Button>
      </div>
      {state.vrifyOurStudent && (
        <div
          style={{
            display: "flex",
            margin: "15px",
            justifyContent: "space-around",
          }}
        >
          <div>
            <Widget
              src="near/widget/AccountProfile"
              props={{ accountId: state.vrifyOurStudent }}
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
            <h4>{descriptionForStudent(state.vrifyOurStudent)}</h4>
          </div>
          <div>
            <Button
              onClick={() => {
                TecherPossibilities.deleteStudent(state.vrifyOurStudent);
              }}
              style={{
                backgroundColor: "red",
              }}
            >
              Delete
            </Button>
            <Button
              style={{
                backgroundColor: "blue",
              }}
              onClick={() => {
                TecherPossibilities.updateDiscription(state.vrifyOurStudent);
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
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
        {state.studentArray.map((student) => (
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
              <h4>{ourDescriptionForStudent(student)}</h4>
            </div>
            <div>
              <Button
                onClick={() => {
                  TecherPossibilities.deleteStudent(student);
                }}
                style={{
                  backgroundColor: "red",
                }}
              >
                Delete
              </Button>
              <Button
                style={{
                  backgroundColor: "blue",
                }}
                onClick={() => {
                  TecherPossibilities.updateDiscription(student);
                }}
              >
                Edit
              </Button>
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

if (!state.profileName && !state.profileDiscription) {
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
            onBlur={(e) => State.update({ creatProfileName: e.target.value })}
          />
        </div>
        <h2>Hello, {state.creatProfileName}</h2>
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
          onBlur={(e) =>
            State.update({ creatProfileDiscription: e.target.value })
          }
        />
        <h2>Your discriprional: {state.creatProfileDiscription}</h2>
        <div
          style={{
            display: flex,
            margin: "0px 10px",
            alignItems: center,
          }}
        >
          <Button
            style={{
              backgroundColor: "green",
            }}
            onClick={TecherPossibilities.initProfile}
          >
            Save change
          </Button>
        </div>
      </uiKitComponents.body>
    </>
  );
}

if (!state.profileName) {
  return (
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
            onBlur={(e) => State.update({ creatProfileName: e.target.value })}
          />
        </div>
        <h2>Hello, {state.creatProfileName}</h2>
        <div
          style={{
            display: flex,
            margin: "0px 10px",
            alignItems: center,
          }}
        >
          <Button
            style={{
              backgroundColor: "green",
            }}
            onClick={TecherPossibilities.initNameProfile}
          >
            Save change
          </Button>
        </div>
      </uiKitComponents.body>
    </>
  );
}

if (!state.profileDiscription) {
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
          onBlur={(e) =>
            State.update({ creatProfileDiscription: e.target.value })
          }
        />
        <h2>Your discriprional: {state.creatProfileDiscription}</h2>
        <div
          style={{
            display: flex,
            margin: "0px 10px",
            alignItems: center,
          }}
        >
          <Button
            style={{
              backgroundColor: "green",
            }}
            onClick={TecherPossibilities.initDiscriptionProfile}
          >
            Save change
          </Button>
        </div>
      </uiKitComponents.body>
    </>
  );
}

return (
  <>
    <uiKitComponents.profileTab>
      <h3>Mentor HUB</h3>
      <h4>Hey, {state.profileName}</h4>
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
