State.init({
  accountIdContext: "",
  accountIdProps: "",
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
    const accountIdContext = context.accountId;
    if (!accountIdContext) {
      return "No account ID";
    }
    const accountIdProps = props.accountId;
    const profile = Social.getr(`${state.accountIdContext}/profile`);
    State.update({
      accountIdProps: accountIdProps,
      accountIdContext: accountIdContext,
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
    if (state.accountIdProps) {
      for (let i = startIndex; i < endIndex; i++) {
        const student = Social.get(`${state.accountIdProps}/mystudents/${i}`);
        if (student) {
          studentArray.push(student);
          heashForDeletnumb[student] = i;
        } else {
          arreyWhitIndexForAddStudent.push(i);
        }
      }
    } else {
      for (let i = startIndex; i < endIndex; i++) {
        const student = Social.get(`${state.accountIdContext}/mystudents/${i}`);
        if (student) {
          studentArray.push(student);
          heashForDeletnumb[student] = i;
        } else {
          arreyWhitIndexForAddStudent.push(i);
        }
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
      `${state.accountIdContext}/myStudentsForFind/${newStudent}`
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
            `${state.accountIdContext}/mystudents/${indexForAddStudent}`
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
  findStudentByID: () => {
    const idaccound = state.idFindStudent;
    const isOurStudent = Social.get(
      `${state.accountIdContext}/myStudentsForFind/${idaccound}`
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
    `${state.accountIdContext}/profile/discriptionsStudent/${account_id}`
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
  &:hover{
      background:#333;
  } 
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${appTheme.colors().backgroundColor};
  align-items: center; 
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
};

function getModuleDependencies(moduleRoute) {
  if (moduleRoute === "studentsPage") {
    return ["studentsPage"];
  }
}
const dependencies = getModuleDependencies(state.currentRoute);

//Pages
const pages = {
  studentsPage: <></>,
  myTeachersPage: (
    <>
      <h1>My Teachers</h1>
    </>
  ),
};
//

if (state.accountIdProps != state.accountIdContext || !state.accountIdProps) {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(-45deg, #5F8AFA, #FFFFFF, #FFFFFF, #FFFFFF, #A463B0)",
          width: "100%",
          height: "100%",
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>Mentor HUB</h1>
          <h3>Make the world around you the better place</h3>
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: state.accountIdProps,
              style: { width: "7rem", height: "7rem" },
              className: "mb-2",
              imageClassName:
                "rounded-circle w-100 h-100 img-thumbnail d-block",
              thumbnail: false,
            }}
          />
          <h4
            style={{
              marginTop: "20px",
            }}
          >
            {state.accountIdProps}
          </h4>
          <h5
            style={{
              marginTop: "20px",
            }}
          >
            Find student by account_ID
          </h5>
          <div
            style={{
              display: "flex",
              height: "3em",
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Input for find my student"
              value={state.idFindStudent}
              onChange={(e) => State.update({ idFindStudent: e.target.value })}
            />
            <Button
              style={{
                width: "100px",
              }}
              onClick={TecherPossibilities.findStudentByID}
            >
              Find
            </Button>
          </div>
          {state.vrifyOurStudent && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                margin: "20px",
                borderRadius: "12px",
                background: "#fff",
                border: "1px solid #eceef0",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                overflow: "hidden",
                padding: "16px",
              }}
            >
              <div>
                <Widget
                  src="near/widget/AccountProfile"
                  props={{ accountId: state.vrifyOurStudent }}
                />
              </div>
              <div>
                <h4>{descriptionForStudent(state.vrifyOurStudent)}</h4>
              </div>
            </div>
          )}
          <h3
            style={{
              marginTop: "20px",
            }}
          >
            Students
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "15px",
            }}
          >
            {state.studentArray.map((student) => (
              <div
                key={student}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                  margin: "10px",
                  borderRadius: "12px",
                  background: "#fff",
                  border: "1px solid #eceef0",
                  boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                  overflow: "hidden",
                  padding: "16px",
                }}
              >
                {/* Common elements for each student */}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

return (
  <div
    style={{
      background:
        "linear-gradient(-45deg, #5F8AFA, #FFFFFF, #FFFFFF, #FFFFFF, #A463B0)",
      width: "100%",
      height: "100%",
      padding: "2rem",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <h1 style={{ fontWeight: "bold" }}>Mentor HUB</h1>
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

      <h5
        style={{
          marginTop: "20px",
        }}
      >
        Find student by account_ID
      </h5>
      <div
        style={{
          display: "flex",
          height: "3em",
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Input for find my student"
          value={state.idFindStudent}
          onChange={(e) => State.update({ idFindStudent: e.target.value })}
        />
        <Button
          style={{
            width: "100px",
          }}
          onClick={TecherPossibilities.findStudentByID}
        >
          Find
        </Button>
      </div>
      {state.vrifyOurStudent && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            margin: "20px",
            borderRadius: "12px",
            background: "#fff",
            border: "1px solid #eceef0",
            boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
            overflow: "hidden",
            padding: "16px",
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
        </div>
      )}
      <h3
        style={{
          marginTop: "20px",
        }}
      >
        My Students
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "15px",
        }}
      >
        {state.studentArray.map((student) => (
          <div
            key={student}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              margin: "10px",
              borderRadius: "12px",
              background: "#fff",
              border: "1px solid #eceef0",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              overflow: "hidden",
              padding: "16px",
            }}
          >
            {state.showHiddenContent === student && (
              <div style={{ display: "grid" }}>
                <input
                  type="text"
                  className="form-control"
                  style={{ height: "3em", width: "8.5rem" }}
                  placeholder="Input for edit description"
                  onChange={(e) => {
                    State.update({ editDescription: e.target.value });
                  }}
                />
                <Button
                  onClick={() => {
                    TecherPossibilities.deleteStudent(student);
                  }}
                  style={{ width: "100px", marginLeft: "1rem" }}
                >
                  Delete
                </Button>
                <Button
                  style={{ width: "100px", marginLeft: "1rem" }}
                  onClick={() => {
                    TecherPossibilities.updateDiscription(student);
                  }}
                >
                  Edit
                </Button>
                {/* Button to close hidden content for the student */}
                <Button
                  style={{ width: "100px", marginLeft: "1rem" }}
                  onClick={() => State.update({ showHiddenContent: null })}
                >
                  Hide Info
                </Button>
              </div>
            )}
            {/* Common elements for each student */}
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
            {/* Button to open hidden content for the student */}
            {state.showHiddenContent !== student && (
              <Button
                style={{ width: "100px" }}
                onClick={() => State.update({ showHiddenContent: student })}
              >
                More Info
              </Button>
            )}
          </div>
        ))}
      </div>
      {/* Modal for adding a new student */}
      {state.showAddStudentModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Add New Student</h3>
            <input
              type="text"
              className="form-control"
              style={{ marginTop: "10px" }}
              placeholder="Input for add student"
              value={state.addNewStudent}
              onChange={(e) => State.update({ addNewStudent: e.target.value })}
            />
            {!state.ifAddStudent && <h3>Some gone wrong. Not add</h3>}
            <Button
              onClick={() => {
                TecherPossibilities.addStudent(state.addNewStudent);
                State.update({ showAddStudentModal: false });
              }}
              style={{
                width: "100px",
                marginTop: "10px",
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => State.update({ showAddStudentModal: false })}
              style={{
                width: "100px",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Button to trigger the modal */}
      <Button
        onClick={() => State.update({ showAddStudentModal: true })}
        style={{
          alignSelf: "end",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
        }}
      >
        +
      </Button>
    </div>
  </div>
);
