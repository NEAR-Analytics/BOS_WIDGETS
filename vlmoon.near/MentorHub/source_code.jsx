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
  const addStudentAndCloseModal = () => {
    TecherPossibilities.addStudent();
    closeModal();
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h5 style={{ textTransform: "uppercase" }}>Add new student</h5>
        <h6 style={{ textTransform: "uppercase" }}>
          write account_id you want add
        </h6>
        <input
          type="text"
          className="form-control"
          onBlur={(e) => State.update({ addNewStudent: e.target.value })}
          placeholder="Input for add student"
        />
        <Button style={{ width: "100px" }} onClick={addStudentAndCloseModal}>
          Add
        </Button>
        {!state.ifAddStudent && <h3>Some gone wrong. Not add</h3>}
        <Button style={{ width: "100px" }} onClick={closeModal}>
          Close
        </Button>
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
    h1: "2em",
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
  height: 100%;
  width: 100%;
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
  //myTeachersPage: () => navigateToModule("myTeachersPage"),
  //myEventsPage: () => navigateToModule("myEventsPage"),
  //myTasksPage: () => navigateToModule("myTasksPage"),
};

function getModuleDependencies(moduleRoute) {
  if (moduleRoute === "myInfoPage") {
    return ["myInfoPage"];
  } else if (moduleRoute === "studentsPage") {
    return ["studentsPage"];
  } //else if (moduleRoute === "myTeachersPage") {
  // return ["myTeachersPage"];
  //} else if (moduleRoute === "myEventsPage") {
  //return ["myEventsPage"];
  //} else if (moduleRoute === "myTasksPage") {
  //return ["myTasksPage"];
  //}
}
const dependencies = getModuleDependencies(state.currentRoute);
const [currentRoute, setCurrentRoute] = useState("myInfoPage");

//Pages
const MyInfoPage = () => (
  <uiKitComponents.body>
    <h3>My Information</h3>
    <Card>
      <Widget src="near/widget/AccountProfile" />
    </Card>
  </uiKitComponents.body>
);

const StudentsPage = () => (
  <uiKitComponents.body>
    <h5>Find Student By Account_ID</h5>
    <div
      style={{
        display: "flex",
        height: "3em",
        width: "29em",
      }}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Input for find my student"
        onBlur={(e) => State.update({ idFindStudent: e.target.value })}
      />
      <Button
        style={{ width: "100px" }}
        onClick={() => {
          TecherPossibilities.findStudentByID(state.idFindStudent);
        }}
      >
        Find
      </Button>
    </div>
    {state.vrifyOurStudent && (
      <Card
        style={{ display: "flex", margin: "15px", flexDirection: "column" }}
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
            height: "3em",
          }}
          placeholder="Input for edit description"
          onBlur={(e) => State.update({ editDescription: e.target.value })}
        />
        <div>
          <h4>{descriptionForStudent(state.vrifyOurStudent)}</h4>
        </div>
        <div>
          <Button
            style={{ width: "100px" }}
            onClick={() => {
              TecherPossibilities.updateDiscription(state.vrifyOurStudent);
            }}
          >
            Edit
          </Button>
          <Button
            style={{ width: "100px" }}
            onClick={() => {
              TecherPossibilities.deleteStudent(state.vrifyOurStudent);
            }}
          >
            Delete
          </Button>
          <Button
            style={{ width: "100px" }}
            onClick={() => {
              State.update({ vrifyOurStudent: null });
            }}
          >
            Close
          </Button>
        </div>
      </Card>
    )}
    <div
      style={{
        margin: "15px",
      }}
    >
      <h3>My Students</h3>
    </div>

    <div
      style={{
        display: "flex",
        margin: "15px",
        flexDirection: "column",
      }}
    >
      {state.studentArray.map((student) => (
        <Card key={student} style={{ marginBottom: "10px" }}>
          <div>
            <Widget
              src="near/widget/AccountProfile"
              props={{ accountId: student }}
            />

            <div>
              <h4>{descriptionForStudent(student)}</h4>
            </div>
            <div>
              <h4>{ourDescriptionForStudent(student)}</h4>
            </div>
          </div>
          {state.selectedStudent === student ? (
            <div>
              <input
                type="text"
                className="form-control"
                style={{
                  height: "3em",
                }}
                placeholder="Input for edit description"
                onBlur={(e) =>
                  State.update({ editDescription: e.target.value })
                }
              />
              <div>
                <Button
                  style={{ width: "100px" }}
                  onClick={() => {
                    TecherPossibilities.updateDiscription(student);
                  }}
                >
                  Edit
                </Button>
                <Button
                  style={{ width: "100px" }}
                  onClick={() => {
                    TecherPossibilities.deleteStudent(student);
                  }}
                >
                  Delete
                </Button>
              </div>
              <Button
                style={{ width: "100px" }}
                onClick={() => State.update({ selectedStudent: null })}
              >
                Close
              </Button>
            </div>
          ) : (
            <Button
              style={{ width: "100px" }}
              onClick={() => State.update({ selectedStudent: student })}
            >
              More Info
            </Button>
          )}
        </Card>
      ))}
    </div>
    <div style={{ alignSelf: "end" }}>
      <FloatingActionButton onClick={openModal} />

      {state.isModalOpen && (
        <Modal closeModal={() => State.update({ isModalOpen: false })} />
      )}
    </div>
  </uiKitComponents.body>
);

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
  <GlobalContainer>
    <uiKitComponents.profileTab>
      <h1
        props={{
          style: { fontWeight: "bold" },
        }}
      >
        Mentor HUB
      </h1>

      <h3>Make the world around you the better place</h3>
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
          className={currentRoute === "myInfoPage" ? "active" : ""}
          onClick={() => setCurrentRoute("myInfoPage")}
        >
          My Info
        </uiKitComponents.button>
        <uiKitComponents.button
          className={currentRoute === "studentsPage" ? "active" : ""}
          onClick={() => setCurrentRoute("studentsPage")}
        >
          Students
        </uiKitComponents.button>
      </uiKitComponents.navigationBar>

      {currentRoute === "myInfoPage" ? (
        <MyInfoPage />
      ) : currentRoute === "studentsPage" ? (
        <StudentsPage />
      ) : null}
    </uiKitComponents.body>
  </GlobalContainer>
);
