const ownerId = "nearcon23.near";
const apiUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";

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
    max-width: 700px;
    background-color: #00EC97;
    height: 100%;
    min-height: 836px;
    div {
      width: 100%;
    }
`;

const SubmitButton = styled.button`
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
});

const isValid = () => {
  return state.username && state.usernameError === "";
};

const createAccount = () => {
  State.update({ loading: true });

  asyncFetch(`${apiUrl}/accounts/createAccount`, {
    body: JSON.stringify({
      secretKey: props?.secretKey,
      accountId: `${state.username}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((res) => {
    const { body } = res;
    const { newPrivateKey, newPublicKey, accountId } = body;
    Storage.set("newPrivateKey", newPrivateKey);
    Storage.set("newPublicKey", newPublicKey);
    Storage.set("accountId", accountId);

    State.update({ loading: false, redirectToHome: newPrivateKey });
  });
};

const valid = (username, cb) => {
  const apiURL = `${apiUrl}/accounts/${username}/exists`;
  asyncFetch(apiURL).then(({ body }) => {
    cb(!!body?.block_hash);
  });
};

if (state.redirectToHome) {
  return <Redirect to={`/mobile?secretkey=${state.redirectToHome}`} />;
}

const validateInput = () => {
  if (state.username.length < 3) {
    State.update({
      usernameError: "First name must be at least 3 characters",
    });
    return false;
  }
  if (state.username.length > 100) {
    State.update({
      usernameError: "First name must be less than 100 characters",
    });
    return false;
  }
  return true;
};

return (
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
            Choose your <br /> username
          </h1>
          <p
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            Choose wisely, you can <br /> only pick once.
          </p>
        </div>

        <div style={{ marginBottom: 50 }}>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              label: "Username",
              value: state.username,
              error: state.usernameError,
              placeholder: "johndoe",
              success: state.username && !state.usernameError,
              onChange: (username) => {
                State.update({ username: username?.toLowerCase().trim() });
                const data = valid(
                  `${username}.ncon-factory.keypom.testnet`,
                  (d) => {
                    const inputValid = validateInput();
                    if (d) {
                      State.update({
                        usernameError: "Username is already taken",
                        usernameExists: true,
                      });
                    } else {
                      if (inputValid) {
                        State.update({
                          usernameError: "",
                          usernameExists: false,
                        });
                      }
                    }
                    validateInput();
                  }
                );
                validateInput();
              },
              validate: () => {
                validateInput();
              },
            }}
          />
          <p style={{ marginLeft: 2 }}>
            {state.username ? `${state.username}.nearcon23.near` : ""}
          </p>
        </div>
        <SubmitButton
          onClick={() => {
            valid(`${state.username}.nearcon23.near`, (d) => {
              if (!d && validateInput() === true) {
                createAccount();
              } else {
                if (d) {
                  State.update({
                    usernameError: "Username is already taken",
                    usernameExists: true,
                  });
                }
              }
            });
          }}
          className={isValid() ? "" : "disabled"}
        >
          {state.loading ? (
            <div
              style={{ height: 20, width: 40, transform: "translateY(-10px)" }}
            >
              <svg
                version="1.1"
                id="L9"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enableBackground="new 0 0 0 0"
              >
                <path
                  fill="#fff"
                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                >
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="1s"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
          ) : (
            "Submit"
          )}
        </SubmitButton>
      </div>
    </Content>
  </Container>
);
