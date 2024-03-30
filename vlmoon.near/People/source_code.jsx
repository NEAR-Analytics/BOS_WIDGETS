State.init({
  accountId: "",
  mentorPhoto: "",
  mentorName: "Mentor Name",
  mentorPoints: 0,
  studentsCounter: 0,
  students: [],
  studentRequests: [],
  currentAppThemeMode: "lightMode",
  currentRoute: "myInfoPage",
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
      const student = Social.get(`maierr.near/mystudents/${i}`);
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
    Near.call([
      {
        contractName: "social.near",
        methodName: "set",
        args: {
          data: {
            [student]: {
              profile: {
                discription: state.editDescription,
              },
            },
          },
        },
        deposit: 1,
        gas: Big(10).pow(12).mul(50),
      },
    ]);
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
      `maierr.near/myStudentsForFind/${newStudent}`
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
            `maierr.near/mystudents/${indexForAddStudent}`
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
      `maierr.near/myStudentsForFind/${idaccound}`
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
  const discriprionalIN = Social.getr(`${account_id}/profile`);
  return discriprionalIN.discription;
}

//UI Kit Theme
const appTheme = {
  colors: () => {
    const currentThemeMode = state.currentAppThemeMode;
    const colors =
      currentThemeMode === "lightMode"
        ? {
            standartText: "#000000",
            backgroundColor:
              "linear-gradient(-45deg, #5F8AFA, #FFFFFF, #FFFFFF, #FFFFFF, #A463B0)",
            primary: "#000000",
            secondary: "rgba(255, 0, 0, 0)",
            textBlack: "#000000",
            textWhite: "#FFFFFF",
          }
        : {
            standartText: "#FFFFFF",
            backgroundColor: "#333333",
            primary: "#000000",
            secondary: "#FFFFFF",
            textBlack: "#000000",
            textWhite: "#FFFFFF",
          };

    return colors;
  },
  fontSizes: {
    h1: "1.25em",
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
  background: ${appTheme.colors().secondary};
  color: ${appTheme.colors().primary};
  text-transform: uppercase;
  font-size: ${appTheme.fontSizes.h5};
  margin: ${appTheme.margins.small};
  padding: ${appTheme.paddings.medium};
  width: 100%;
  border: none;
  border-radius: ${appTheme.borderRadius.medium};
  align-self: center;
`;
const GlobalContainer = styled.div`
  font-family: 'Manrope', sans-serif;
  margin: auto;
  padding: 2rem; 
  background: linear-gradient(-45deg, #5F8AFA, #FFFFFF, #FFFFFF, #FFFFFF, #A463B0); /* Лінійний градієнт */
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  padding: ${appTheme.margins.xlarge};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${appTheme.colors().backgroundColor};
  align-items: center; 
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
const TaskIcon = styled.div`
  width: 250px;
  height: 180px;
  border-radius: 20px;
  background-color: ${appTheme.colors().primary};
  margin: 20px;
`;
const EventIcon = styled.div`
  width: 250px;
  height: 180px;
  border-radius: 20px;
  background-color: ${appTheme.colors().primary};
  margin: 20px;
`;
const MyInfoIcon = styled.div`
  width: 450px;
  height: 280px;
  border-radius: 20px;
  background-color: ${appTheme.colors().primary};
  margin: 20px;
`;
const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 50%;
  
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 16px;
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
  myInfoPage: () => navigateToModule("myInfoPage"),
  studentsPage: () => navigateToModule("studentsPage"),
  myTeachersPage: () => navigateToModule("myTeachersPage"),
  myEventsPage: () => navigateToModule("myEventsPage"),
  myTasksPage: () => navigateToModule("myTasksPage"),
};

function getModuleDependencies(moduleRoute) {
  if (moduleRoute === "myInfoPage") {
    return ["myInfoPage"];
  } else if (moduleRoute === "studentsPage") {
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
  myInfoPage: (
    <ProfileTab>
      <h1>My Information</h1>
      <Card>
        <Widget src="near/widget/AccountProfile" />
      </Card>

      <br />
      <div style={{ alignItems: "center" }}>
        <h4>Role: {isTeacher ? "Student" : "Teacher"}</h4>
        <Button onClick={toggleRole}>
          Change role on {isTeacher ? "Teacher" : "Student"}
        </Button>
      </div>
    </ProfileTab>
  ),
  studentsPage: (
    <>
      <h1>My Students</h1>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          className="form-control"
          placeholder="For add, input account_ID student"
          onBlur={(e) => State.update({ addNewStudent: e.target.value })}
        />

        <Button onClick={TecherPossibilities.addStudent}>Add</Button>

        {!state.ifAddStudent && <h3>Some gone wrong. Not add</h3>}

        <input
          type="text"
          className="form-control"
          placeholder="Find student"
          onBlur={(e) => State.update({ idFindStudent: e.target.value })}
        />

        <Button
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
            placeholder="Edit description"
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
            >
              Delete
            </Button>
            <Button
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
          display: "flex",
          margin: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            margin: "15px",
            justifyContent: "space-around",
          }}
        ></div>
        {state.studentArray.map((student) => (
          <div
            key={student}
            style={{
              display: "flex",
              flexDirection: "column",
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
              placeholder="Edit description"
              onBlur={(e) => State.update({ editDescription: e.target.value })}
            />
            <div>
              <h4>{descriptionForStudent(student)}</h4>
            </div>

            <div>
              <Button
                onClick={() => {
                  TecherPossibilities.deleteStudent(student);
                }}
              >
                Delete
              </Button>
              <Button
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
    <ProfileTab>
      <h1>My Events</h1>
    </ProfileTab>
  ),
  myTasksPage: (
    <ProfileTab>
      <h1>My Tasks</h1>
    </ProfileTab>
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
        <div>
          <input
            type="text"
            className="form-control"
            onBlur={(e) => State.update({ creatProfileName: e.target.value })}
          />
        </div>
        <h2>Hello, {state.creatProfileName}</h2>
        <h3>Input your discription</h3>
        <input
          type="text"
          className="form-control"
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
          <Button onClick={TecherPossibilities.initProfile}>Save change</Button>
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
        <div>
          <input
            type="text"
            className="form-control"
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
          <Button onClick={TecherPossibilities.initNameProfile}>
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
        <h3>Write your description</h3>
        <br />

        <input
          type="text"
          className="form-control"
          placeholder="Description"
          onBlur={(e) =>
            State.update({ creatProfileDiscription: e.target.value })
          }
        />
        <br />
        <h2>Description: {state.creatProfileDiscription}</h2>
        <div
          style={{
            display: flex,
            margin: "0px 10px",
            alignItems: center,
          }}
        >
          <Button
            style={{
              backgroundColor: "black",
            }}
            onClick={TecherPossibilities.initDiscriptionProfile}
          >
            Confirm
          </Button>
        </div>
      </uiKitComponents.body>
    </>
  );
}
//if (!state.TecherPossibilities.addStudent) {
//return (
// <>
// <uiKitComponents.body>
//  <h1>Mentor HUB</h1>
//<h2>
//    You have been added to the list of students
//    Please confirm your registration for the training on MentorHub
//</h2>
//  <h3>If you agree, click approve</h3>
//  <br />
//    <Button
//     style={{
//      backgroundColor: "black",
//    }}
//    onClick={}
//   >
//    Approve
//  </Button>
//</uiKitComponents.body>
//</>
//);
//}
return (
  <GlobalContainer>
    <uiKitComponents.profileTab>
      <h3>Mentor HUB</h3>

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
      <h4>Hey, {state.profileName}</h4>
    </uiKitComponents.profileTab>

    <uiKitComponents.body>
      <uiKitComponents.navigationBar>
        <uiKitComponents.button onClick={routesNavigator.myInfoPage}>
          My&Info
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.studentsPage}>
          Student
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.myTeachersPage}>
          Teacher
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.myEventsPage}>
          Event
        </uiKitComponents.button>
        <uiKitComponents.button onClick={routesNavigator.myTasksPage}>
          Task
        </uiKitComponents.button>
      </uiKitComponents.navigationBar>
      {pages[state.currentRoute]}
    </uiKitComponents.body>
  </GlobalContainer>
);
