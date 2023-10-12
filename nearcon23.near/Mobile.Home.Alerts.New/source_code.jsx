const ownerId = "nearcon23.near";
const prefix = props.prefix || "/mobile";

const theme = props.theme;
const apiUrl = "http://localhost:8080";

const Container = styled.div`
    width: 100%;
        padding: 0 20px;
`;
const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
const Header = styled.div`
    width: 100%;
    padding: 20px 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Button = styled.button`
    width: 100%;
    height: 48px;
    padding: 10px;
    margin: 0px 0 0 0;
    border-radius: 100px;
    border-width: 0px;
    font-size: 16px;
    font-weight: 600;
    background-color: #000000;
    display:flex;
    justify-content: center;
    align-items: center;
    gap:16px;

    color: #FFFFFF;
    :hover {
      background-color: #000000dd;
    }
    :active {
      background-color: #000000aa;
    }
`;
const GridToggle = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    gap:16px;
    width: fit-content !important;
    @media only screen and (max-width: 600px) {
      font-size:12px;
      p {
        transform: translateY(9px);
      }
    }
`;

State.init({
  message: "",
  showButton: true,
  buttonLabel: "",
  url: "",
  recipients: "allTracks",
  accountId: context.accountId,
  loading: false,
});

const ShowHideView = styled.div`
  // display: inline-block;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 170px;
  }
`;

// const isValid = () => {
//   return (
//     state.message &&
//     state.messageError === "" &&
//     state.showButton &&
//     state.showButtonError === "" &&
//     state.buttonLabel &&
//     state.buttonLabelError === "" &&
//     state.url &&
//     state.urlError === "" &&
//     state.recipients &&
//     state.recipientsError === ""
//   );
// };

const handleSubmit = async () => {
  State.update({ loading: true });

  const data = {
    message: state.message,
    showButton: state.showButton,
    buttonLabel: state.buttonLabel,
    url: state.url,
    recipients: state.recipients,
  };

  // const res =
  asyncFetch(`${apiUrl}/createNotification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);

      State.update({
        message: "",
        showButton: "",
        buttonLabel: "",
        url: "",
        recipients: "allTracks",
        accountId: context.accountId,
        loading: false,
      });
    })
    .catch((err) => {
      console.log(err);
      State.update({ loading: false });
    });
};

return (
  <Container>
    <Header>
      <h5>New Alert</h5>

      <Link
        to={`${prefix}/${ownerId}/widget/Mobile.Home`}
        style={{ color: theme.textColor }}
      >
        <p>Back</p>
      </Link>
    </Header>
    <Content>
      <Widget
        src={`${ownerId}/widget/Inputs.TextArea`}
        props={{
          label: "Message",
          value: state.message,
          error: state.messageError,
          placeholder: "",
          onChange: (message) => State.update({ message }),
          // validate: () => {
          //   if (state.message.length < 3) {
          //     State.update({
          //       messageError: "message must be at least 3 characters",
          //     });
          //     return;
          //   }

          //   if (state.goal.length > 500) {
          //     State.update({
          //       goalError: "Goal must be less than 500 characters",
          //     });
          //     return;
          //   }

          //   State.update({ goalError: "" });
          // },
        }}
      />

      <GridToggle>
        <Widget
          src={`${ownerId}/widget/Inputs.Toggle`}
          props={{
            value: state.showButton,
            onChange: (showButton) => State.update({ showButton }),
          }}
        />
        <p style={{ color: theme.textColor, width: "100%", margin: 0 }}>
          Include Call to Action
        </p>
      </GridToggle>

      <ShowHideView className={state.showButton ? "show" : ""}>
        <Widget
          src={`${ownerId}/widget/Inputs.Text`}
          props={{
            label: "Button Label",
            value: state.buttonLabel,
            error: state.buttonLabelError,
            placeholder: "Enter Button Label",
            onChange: (buttonLabel) => State.update({ buttonLabel }),
            // validate: () => {
            //   if (state.buttonLabel.length < 3) {
            //     State.update({
            //       buttonLabelError:
            //         "Button Label must be at least 3 characters",
            //     });
            //     return;
            //   }

            //   if (state.buttonLabel.length > 100) {
            //     State.update({
            //       buttonLabelError:
            //         "Button Label must be less than 100 characters",
            //     });
            //     return;
            //   }

            //   State.update({ buttonLabelError: "" });
            // },
          }}
        />

        <div style={{ marginTop: 16 }} />

        <Widget
          src={`${ownerId}/widget/Inputs.Text`}
          props={{
            label: "URL",
            value: state.url,
            error: state.urlError,
            placeholder: "Enter URL Name",
            onChange: (url) => State.update({ url }),
            // validate: () => {
            //   if (state.url.length < 3) {
            //     State.update({
            //       urlError: "URL name must be at least 3 characters",
            //     });
            //     return;
            //   }

            //   if (state.url.length > 100) {
            //     State.update({
            //       urlError: "URL name must be less than 100 characters",
            //     });
            //     return;
            //   }

            //   State.update({ urlError: "" });
            // },
          }}
        />
      </ShowHideView>
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Recipients",
          value: state.persona,
          error: state.personaError,
          placeholder: "Choose...",
          options: [
            { value: "allTracks", text: "All Tracks" },
            { value: "developers", text: "Developers" },
            { value: "entrepreneurs", text: "Entrepreneurs" },
            { value: "creators", text: "Creators" },
            { value: "regulators", text: "Regulators" },
          ],
          onChange: (persona) => State.update({ persona }),
          // validate: () => {
          //   if (!state.persona) {
          //     State.update({
          //       personaError: "Please select a persona",
          //     });
          //     return;
          //   }

          //   State.update({ personaError: "" });
          // },
        }}
      />
      <p style={{ fontSize: 12, fontWeight: 400, color: theme.textColor2 }}>
        By default every NEARCON attendee will receive alerts. You can send
        alerts to a subset based on track preference.
      </p>
      <Button onClick={() => handleSubmit()}>
        {state.loading && (
          <div
            class="spinner-border"
            role="status"
            style={{ height: 24, width: 24 }}
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
        Send
        <i class="bi bi-arrow-up-right"></i>
      </Button>
    </Content>
  </Container>
);
