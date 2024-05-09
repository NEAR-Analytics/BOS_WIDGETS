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
  originalStudentArray: [],
  arreyWhitIndexForAddStudent: [],
  heashForDeletnumb: {},
  flagForFindStdudentByID: false,
  idFindStudent: "",
  vrifyOurStudent: "",
  isModalOpen: false,
  selectedStudent: null,
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

  addStudent: () => {
    const newStudent = state.addNewStudent;

    const updatedStudentArray = [...state.studentArray, newStudent];
    State.update({
      studentArray: updatedStudentArray,
    });

    Social.set({
      [`${state.accountId}/students/${newStudent}`]: {
        name: newStudent,
      },
    });
  },

  getStudent: () => {
    const myStudents = Social.get(`${state.accountId}/students`);

    State.update({
      studentArray: myStudents || [],
    });
  },

  updateDiscription: (student) => {
    State.update({ updatingDescription: true });

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
    ])
      .then(() => {
        TecherPossibilities.getStudent(1, 10);
        State.update({ updatingDescription: false });
      })
      .catch((error) => {
        console.error("Error updating description:", error);

        State.update({
          updatingDescription: false,
          errorUpdatingDescription: true,
        });
      });
  },

  deleteStudent: (student) => {
    State.update({ deletingStudent: true });

    const indexForDeleteNumb = state.heashForDeletnumb[student];
    Social.set({
      mystudents: {
        [indexForDeleteNumb]: null,
      },
      myStudentsForFind: {
        [student]: false,
      },
    })
      .then(() => {
        TecherPossibilities.getStudent(1, 10);
        State.update({ deletingStudent: false });
      })
      .catch((error) => {
        console.error("Error deleting student:", error);

        State.update({ deletingStudent: false, errorDeletingStudent: true });
      });
  },
};

TecherPossibilities.init();
TecherPossibilities.getStudent(1, 10);

function descriptionForStudent(account_id) {
  const discriprionalIN = Social.getr(`${account_id}/profile`);
  return discriprionalIN.discription;
}

const FloatingActionButton = ({ onClick }) => {
  return (
    <FloatingButton onClick={onClick}>
      <i className="fa fa-plus">+</i>
    </FloatingButton>
  );
};

const openModal = () => {
  State.update({
    isModalOpen: true,
  });
};

const Modal = ({ closeModal }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <input
          type="text"
          className="form-control"
          onBlur={(e) => State.update({ addNewStudent: e.target.value })}
          placeholder="Add student"
        />
        <Button onClick={TecherPossibilities.addStudent}>Add</Button>
        {!state.ifAddStudent && <h3>Some gone wrong. Not add</h3>}
        <Button onClick={closeModal}>Close</Button>
      </ModalContent>
    </ModalContainer>
  );
};

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
    large: "20px",
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
  font-size: ${appTheme.fontSizes.h6};
  margin: ${appTheme.margins.small};
  padding: ${appTheme.paddings.medium};
  width: 100%;
  border: none;
  border-radius: ${appTheme.borderRadius.large};
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

  button {  
    background: ${appTheme.colors().secondary};
    color: ${appTheme.colors().primary};
    font-size: ${appTheme.fontSizes.h5};
    text-transform: uppercase;
  }

  .active {
    background-color: ${appTheme.colors().secondary};
    color: ${appTheme.colors().primary};
    font-weight: bold;
  }
`;

const ProfileTab = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${appTheme.colors().backgroundColor};
  justify-content: center;
  align-items: center; 
`;
const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 16px;
`;
const FloatingButton = styled.button`
  font-family: 'Inter', sans-serif;
  position: fixed;
  bottom: 50px;
  right: 100px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  boxShadow:
    0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
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
  //myEventsPage: () => navigateToModule("myEventsPage"),
  //myTasksPage: () => navigateToModule("myTasksPage"),
};

function getModuleDependencies(moduleRoute) {
  if (moduleRoute === "myInfoPage") {
    return ["myInfoPage"];
  } else if (moduleRoute === "studentsPage") {
    return ["studentsPage"];
  } else if (moduleRoute === "myTeachersPage") {
    return ["myTeachersPage"];
  } //else if (moduleRoute === "myEventsPage") {
  //return ["myEventsPage"];
  //} else if (moduleRoute === "myTasksPage") {
  //return ["myTasksPage"];
  //}
}
const dependencies = getModuleDependencies(state.currentRoute);

function searchStudents(searchTerm, studentArray) {
  const filteredStudents = studentArray.filter((student) => {
    const studentProfile = Social.getr(`${student}/profile`);
    const studentName = studentProfile.name.toLowerCase();
    return studentName.includes(searchTerm.toLowerCase());
  });

  return filteredStudents;
}

const [searchTerm, setSearchTerm] = useState("");
const [filteredStudents, setFilteredStudents] = useState([]);

const handleInputChange = (e) => {
  setSearchTerm(e.target.value);
};

useEffect(() => {
  const filtered = searchStudents(searchTerm, state.studentArray);
  setFilteredStudents(filtered);
}, [searchTerm, state.studentArray]);

//Pages
const pages = {
  myInfoPage: (
    <ProfileTab>
      <h1>My Information</h1>
      <Card>
        <Widget src="near/widget/AccountProfile" />
      </Card>
    </ProfileTab>
  ),
  studentsPage: (
    <ProfileTab>
      <h1>My Students</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search student"
        />
      </div>

      <div style={{ display: "flex", margin: "15px", flexDirection: "column" }}>
        {filteredStudents.map((student) => (
          <Card key={student} style={{ marginBottom: "10px" }}>
            <div>
              <Widget
                src="near/widget/AccountProfile"
                props={{ accountId: student }}
              />
              <h4>{descriptionForStudent(student)}</h4>
            </div>
            <div>
              {state.selectedStudent === student ? (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Edit description"
                    onBlur={(e) =>
                      State.update({ editDescription: e.target.value })
                    }
                  />

                  <div>
                    <Button
                      onClick={() => {
                        TecherPossibilities.updateDiscription(student);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        TecherPossibilities.deleteStudent(student);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  <Button
                    onClick={() => State.update({ selectedStudent: null })}
                  >
                    Back
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => State.update({ selectedStudent: student })}
                >
                  More Info
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
      <FloatingActionButton onClick={openModal} />
      {state.isModalOpen && (
        <Modal closeModal={() => State.update({ isModalOpen: false })} />
      )}
    </ProfileTab>
  ),
  myTeachersPage: (
    <>
      <h1>My Teachers</h1>
    </>
  ),
  //myEventsPage: (
  //<ProfileTab>
  //  <h1>My Events</h1>
  //</ProfileTab>
  //),
  //myTasksPage: (
  //<ProfileTab>
  // <h1>My Tasks</h1>
  //</ProfileTab>
  // ),
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
        <uiKitComponents.button
          className={state.currentRoute === "myInfoPage" ? "active" : ""}
          onClick={routesNavigator.myInfoPage}
        >
          My&Info
        </uiKitComponents.button>
        <uiKitComponents.button
          className={state.currentRoute === "studentsPage" ? "active" : ""}
          onClick={routesNavigator.studentsPage}
        >
          Student
        </uiKitComponents.button>
        <uiKitComponents.button
          className={state.currentRoute === "myTeachersPage" ? "active" : ""}
          onClick={routesNavigator.myTeachersPage}
        >
          Teacher
        </uiKitComponents.button>
      </uiKitComponents.navigationBar>

      {pages[state.currentRoute]}
    </uiKitComponents.body>
  </GlobalContainer>
);
