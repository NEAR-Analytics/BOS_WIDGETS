const ownerId = "nearcon23.near";
const apiUrl = "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";

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
    overflow:hidden;
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

const SubmitDiv = styled.a`
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

const SubmitComponent = SubmitButton;

if (state.redirectToSend) {
  return (
    <Redirect
      to={`/${ownerId}/widget/Mobile.Home.Send?receiverId=${state.username}.ncon-factory.keypom.testnet`}
    />
  );
}

const valid = (username, cb) => {
  const apiURL = `${ownerId}/accounts/${username}/exists`;
  asyncFetch(apiURL).then(({ body }) => {
    cb(!!body?.block_hash);
  });
};

const validateInput = () => {
  function isValid(str) {
    const regex = /\.ncon-factory\.keypom\.testnet$/;
    return regex.test(str);
  }
  if (state.username.length < 3) {
    State.update({
      usernameError: "First name must be at least 3 characters",
    });
    return;
  }

  if (state.username.length > 100) {
    State.update({
      usernameError: "First name must be less than 100 characters",
    });
    return;
  }

  if (!state.usernameExists) {
    State.update({ usernameError: "" });
  }
};

const { secretkey } = props;
const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);
const key = secretkey ? secretkey : storedSecretKey;
const fetchData = () => {
  asyncFetch(
    `https://21mqgszhf3.execute-api.us-east-1.amazonaws.com/testnet/api/v1/accounts/auth/${key}`
  ).then(({ body }) => {
    State.update({ userData: body });
  });
};

useEffect(() => {
  fetchData();
}, [secretkey, storedSecretKey]);

return (
  <>
    <Widget
      props={{
        nearconId: state.userData.nearconId,
        cid: state.userData.cid,
      }}
      src={`${ownerId}/widget/Navbar`}
    />
    <Container>
      <Content>
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
            zIndex: 1,
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
                fontWeight: 500,
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
                success: state.username && !state.usernameError,
                placeholder: "johndoe",
                onChange: (username) => {
                  State.update({ username });

                  valid(`${username}.ncon-factory.keypom.testnet`, (d) => {
                    const inputValid = validateInput();
                    if (d) {
                      State.update({
                        usernameError: "",
                        usernameExists: false,
                      });
                    } else {
                      State.update({
                        usernameError: "Whoops, this username doesn’t exist",
                        usernameExists: true,
                      });
                    }
                    validateInput();
                  });
                },
                validate: validateInput,
              }}
            />
            {!!state.username && (
              <p>{state.username}.ncon-factory.keypom.testnet</p>
            )}
            <div style={{ marginTop: 8 }}>
              <SubmitComponent
                onClick={() => {
                  if (isValid()) {
                    valid(
                      `${state.username}.ncon-factory.keypom.testnet`,
                      (d) => {
                        if (d) {
                          State.update({
                            usernameError: "",
                            usernameExists: false,
                            redirectToSend: true,
                          });
                        } else {
                          State.update({
                            usernameError: "Username is invalid",
                            usernameExists: true,
                          });
                        }
                        validateInput();
                      }
                    );
                  }
                }}
                className={isValid() ? "" : "disabled"}
              >
                Continue
              </SubmitComponent>
              <SubmitButton
                href={`/mobile`}
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
  </>
);
