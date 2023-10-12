const ownerId = "nearcon23.near";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 500px;
    background-color: #00EC97;
    height:100vh;
    div {
      width: 100%;
    }
`;
const SubmitButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1.5em;
  margin-bottom: 20px;
  gap: 0.5em;
  background: #161615;
  border-radius: 50px;
  border: none;
  color: #ffffff;
  width: 100%;
  height: 48px;

  &.disabled {
    background: #717069 !important;
  }

  &:hover,
  &:focus,
  &:active {
    background: #161615;
    text-decoration: none;
    color: #ffffff;
  }
`;

State.init({
  username: "",
  usernameError: "",
  lastName: "",
  lastNameError: "",
  email: "",
  emailError: "",
  persona: null,
  personaError: "",
  accountId: context.accountId,
  jobTitle: "",
  jobTitleError: "",
  projectOrCompany: "",
  projectOrCompanyError: "",
  country: null,
  countryError: "",
  age: null,
  ageError: "",
  goal: "",
  goalError: "",
  twitter: "",
  twitterError: "",
  telegram: "",
  telegramError: "",
  referral: "",
  referralError: "",
});

const isValid = () => {
  return state.username && state.usernameError === "";
};

return (
  <Container>
    <Content>
      <div style={{ zIndex: 2, padding: "0 20px", backgroundColor: "#ffffff" }}>
        <Widget
          src={`${ownerId}/widget/Navbar`}
          props={{ hideLocation: true }}
        />
      </div>

      <div
        style={{
          display: "flex",
          position: "absolute",
          justifyContnet: "center",
          alignItems: "center",
        }}
      >
        <Widget src={`${ownerId}/widget/Icons.FadedRightArrow`} />
      </div>

      <div
        style={{
          flex: 1,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",

          margin: 20,
          width: "calc(100% - 40px)",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 42,
              fontWeight: 400,
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            Send NCON
          </h1>
        </div>

        <div style={{ marginBottom: 50 }}>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Send To",
              value: state.username,
              error: state.usernameError,
              placeholder: "jondow.nearcon23",
              onChange: (username) => State.update({ username }),
              validate: () => {
                if (state.username.length < 3) {
                  State.update({
                    usernameError: "First name must be at least 3 characters",
                  });
                  return;
                }

                if (state.username.length > 100) {
                  State.update({
                    usernameError:
                      "First name must be less than 100 characters",
                  });
                  return;
                }

                State.update({ usernameError: "" });
              },
            }}
          />
          <div style={{ marginTop: 8 }}>
            <SubmitButton
              href={`/${ownerId}/widget/Mobile.Home.Send?receiverId=${state.username}`}
              className={isValid() ? "" : "disabled"}
            >
              Continue
            </SubmitButton>
            <SubmitButton
              href={`/${ownerId}/widget/Mobile.Home.Profile`}
              style={{ backgroundColor: "transparent", color: "black" }}
            >
              Cancel
            </SubmitButton>
          </div>
        </div>
        <div />
      </div>
    </Content>
  </Container>
);
