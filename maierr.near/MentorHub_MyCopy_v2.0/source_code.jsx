State.init({
  profileName: "",
  profileDiscription: "",
  creatProfileName: "",
  creatProfileDiscription: "",
});

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

const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const props_accountId = props.accountId;
const context_accountId = context.accountId;

var profile = Social.getr(`${accountId}/profile`);

const InitPossibilities = {
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
};

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
`;
if (!props_accountId || props_accountId == context_accountId) {
  if (!profile.name && !profile.discription) {
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
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>Mentor HUB</h1>
          <h3>Make the world around you the better place</h3>
          <h4>
            You don't have a profile, if you want to continue, you have to
            create a profile
          </h4>
          <h3>Input your name:</h3>
          <div>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                State.update({ creatProfileName: e.target.value })
              }
            />
          </div>
          <h5>Hello, {state.creatProfileName}</h5>
          <h4>Input your discription</h4>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              State.update({ creatProfileDiscription: e.target.value })
            }
          />
          <h5>Your discriprional: {state.creatProfileDiscription}</h5>
          <div
            style={{
              display: flex,
              margin: "0px 10px",
              alignItems: center,
            }}
          >
            <Button
              style={{ width: "100px" }}
              onClick={InitPossibilities.initProfile}
            >
              Save change
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile.name) {
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
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>Mentor HUB</h1>
          <h3>Make the world around you the better place</h3>
          <h4>
            You don't have a name of profile, if you want to continue, you have
            to create a name.
          </h4>
          <h4>Input your name:</h4>
          <div>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                State.update({ creatProfileName: e.target.value })
              }
            />
          </div>
          <h5>Hello, {state.creatProfileName}</h5>
          <div
            style={{
              display: flex,
              margin: "0px 10px",
              alignItems: center,
            }}
          >
            <Button
              style={{ width: "100px" }}
              onClick={InitPossibilities.initNameProfile}
            >
              Save change
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile.discription) {
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
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>Mentor HUB</h1>
          <h3>Make the world around you the better place</h3>
          <h4>
            You don't have a description, if you want to continue, you have to
            create a description
          </h4>
          <h4>Input your discription</h4>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              State.update({ creatProfileDiscription: e.target.value })
            }
          />
          <h5>Your discriprional: {state.creatProfileDiscription}</h5>
          <div
            style={{
              display: flex,
              margin: "0px 10px",
              alignItems: center,
            }}
          >
            <Button
              style={{ width: "100px" }}
              onClick={InitPossibilities.initDiscriptionProfile}
            >
              Save change
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

return (
  <>
    <Widget src="kirrruuusha.near/widget/New-Draft-0" props={{ accountId }} />;
  </>
);
