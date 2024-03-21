State.init({
  mentorPhoto: "",
  mentorName: "Mentor Name",
  mentorPoints: 0,
  studentsCounter: 0,
  students: [],
  studentRequests: [],
  currentAppThemeMode: "lightMode",
  currentRoute: "myinfoPage",
  myInfo: {
    titleAndExperience: "",
    skills: "",
    description: "",
  },
  mentor: [],
  myStudents: [],
  idFindStudent: "",
  verifyOurStudent: "",
  addStudentToMyList: "",
  ifAddStudentToMyList: true,
  studentArray: [],
});

function findStudentByID(idaccount) {
  const isOurStudent = Social.get(`maierr.near/myStudentsForFind/${idaccount}`);
  if (isOurStudent == "true") {
    State.update({
      verifyOurStudent: idaccount,
    });
  } else {
    State.update({
      verifyOurStudent: "",
    });
  }
}

const onInputChange = (newValue) => {
  State.update({
    addNewStudent: newValue,
  });
  findStudentByID(newValue);
};

function saveMyInfo(titleAndExperience, skills, description) {
  const currentState = State.get();
  if (
    titleAndExperience !== currentState.myInfo.titleAndExperience ||
    skills !== currentState.myInfo.skills ||
    description !== currentState.myInfo.description
  ) {
    const updatedInfo = {
      titleAndExperience,
      skills,
      description,
    };
    State.update({ myInfo: updatedInfo });
  }
}

function addStudentToMyList(newStudentID, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  let studentArray = [];
  let arreyWhitIndexForAddStudent = [];
  let deleteStudent = {};

  for (let i = startIndex; i < endIndex; i++) {
    const student = Social.get(`maierr.near/mystudents/${i}`);
    if (student) {
      studentArray.push(student);
      deleteStudent[student] = i;
    } else {
      arreyWhitIndexForAddStudent.push(i);
    }
  }

  State.update({
    studentArray: studentArray,
    arreyWhitIndexForAddStudent: arreyWhitIndexForAddStudent,
    heashForDeletnumb: deleteStudent,
  });

  updatedStudents(newStudentID);
}

function updatedStudents(student) {
  Near.call([
    {
      contractName: "social.near",
      methodName: "set",
      args: {
        data: {
          [student]: {
            profile: {},
          },
        },
      },
      deposit: 1,
      gas: Big(10).pow(12).mul(50),
    },
  ]);
}

function deleteStudent(studentID) {
  const currentState = State.get();
  const updatedStudents = currentState.myStudents.filter(
    (s) => s.id !== studentID
  );
  State.update({ myStudents: updatedStudents });
}

const StudentIcon = ({ student }) => {
  return (
    <div className="StudentIcon">
      <Widget
        src="near/widget/AccountProfile"
        props={{ accountId: State.get().vrifyOurStudent }}
      />
    </div>
  );
};

const MentorInfoCard = () => {
  const myInfo = State.get().myInfo;

  return (
    <div>
      <h3>{myInfo.titleAndExperience}</h3>
      <p>Skills: {myInfo.skills}</p>
      <p>Description: {myInfo.description}</p>
    </div>
  );
};

//UI Kit Theme
const appTheme = {
  colors: () => {
    const currentThemeMode = State.get().currentAppThemeMode;
    const colors =
      currentThemeMode === "lightMode"
        ? {
            standartText: "#000000",
            backgroundColor:
              "linear-gradient(-45deg, #5F8AFA, #FFFFFF, #FFFFFF, #FFFFFF, #A463B0)",
            primary: "#000000",
            secondary: "#FFFFFF",
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
    h1: "1.5em",
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
  width: 100px;
  border: none;
  border-radius: ${appTheme.borderRadius.medium};
  align-self: center;
`;

const GlobalContainer = styled.div`
  font-family: 'Manrope', sans-serif;
  height: 100vh; 
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
  height: 800px;
  background-color: ${appTheme.colors().backgroundColor};
  align-items: center; 
`;
const NavigationBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  padding : ${appTheme.paddings.large};
  background-color: transparent; 
`;

const NavButton = styled(Button)`
  margin: 0 10px; 
  position: relative; 
`;

const GapCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${appTheme.colors().primary};
  margin: 0 5px; 
`;

const ProfileTab = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${appTheme.colors().backgroundColor};
  justify-content: center;
  align-items: center; 
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormButton = styled(Button)`
  width: 150px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TaskIcon = styled.div`
  width: 250px;
  height: 180px;
  border-radius: 20px;
  background-color: ${appTheme.colors().primary};
  margin: 20px;
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
  MentorPage: () => navigateToModule("mentorPage"),
  StudentPage: () => navigateToModule("studentPage"),
  TaskPage: () => navigateToModule("taskPage"),
  MyinfoPage: () => navigateToModule("myinfoPage"),
};

function getModuleDependencies(moduleRoute) {
  if (moduleRoute === "MentorPage") {
    return ["mentorPage"];
  } else if (moduleRoute === "studentPage") {
    return ["studentPage"];
  } else if (moduleRoute === "taskPage") {
    return ["taskPage"];
  } else if (moduleRoute === "myinfoPage") {
    return ["myinfoPage"];
  }
}

const dependencies = getModuleDependencies(State.get().currentRoute);

const accountId = context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = Social.getr(`${accountId}/profile`);
const name = profile.name || "No-name profile";

//Pages
const pages = {
  mentorPage: (
    <ProfileTab>
      <h1>Mentor</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {State.get().mentor.map((mentor, index) => (
          <MentorIcon key={index} mentor={mentor} />
        ))}
      </div>
    </ProfileTab>
  ),
  studentPage: (
    <ProfileTab>
      <h1>Students</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {}
        {State.get().myStudents.map((student, index) => (
          <StudentIcon key={index} student={student} />
        ))}
      </div>
    </ProfileTab>
  ),
  taskPage: (
    <ProfileTab>
      <h1>Task</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {[...Array(4)].map((_, index) => (
          <TaskIcon key={index} />
        ))}
      </div>
    </ProfileTab>
  ),
  myinfoPage: (
    <ProfileTab>
      <h1>My information</h1>
      <input
        type="text"
        placeholder="Title and Experience"
        value={State.get().myInfo.titleAndExperience}
        onChange={(e) =>
          saveMyInfo(
            e.target.value,
            State.get().myInfo.skills,
            State.get().myInfo.description
          )
        }
      />
      <br />
      <input
        type="text"
        placeholder="Skills"
        value={State.get().myInfo.skills}
        onChange={(e) =>
          saveMyInfo(
            State.get().myInfo.titleAndExperience,
            e.target.value,
            State.get().myInfo.description
          )
        }
      />
      <br />
      <input
        type="text"
        placeholder="Short Description of Yourself"
        value={State.get().myInfo.description}
        onChange={(e) =>
          saveMyInfo(
            State.get().myInfo.titleAndExperience,
            State.get().myInfo.skills,
            e.target.value
          )
        }
      />
      <br />
      <FormButton>Confirm</FormButton>
      <br />
      <input
        type="text"
        placeholder="Add Student"
        value={State.get().addNewStudent}
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={() => {
            deleteStudent(State.get().addNewStudent);
          }}
        >
          Delete
        </Button>

        <Button
          onClick={() => {
            const newStudentID = State.get().addNewStudent;
            addStudentToMyList(newStudentID);
          }}
        >
          Add
        </Button>
      </div>
      {State.get().verifyOurStudent && (
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
              props={{ accountId: State.get().verifyOurStudent }}
            />
          </div>
        </div>
      )}
    </ProfileTab>
  ),
};
//

return (
  <GlobalContainer>
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
      <NavigationBar>
        <NavButton onClick={routesNavigator.MyinfoPage}>My info</NavButton>
        <GapCircle /> {}
        <NavButton onClick={routesNavigator.MentorPage}>Mentor</NavButton>
        <GapCircle /> {}
        <NavButton onClick={routesNavigator.StudentPage}>Student</NavButton>
        <GapCircle /> {}
        <NavButton onClick={routesNavigator.TaskPage}>Task</NavButton>
      </NavigationBar>
      {pages[state.currentRoute]}
    </uiKitComponents.body>
  </GlobalContainer>
);
