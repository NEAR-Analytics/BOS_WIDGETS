const ownerId = "nearcon23.near";
const prefix = props.prefix || "/mobile";

const theme = props.theme;
const apiUrl = "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";
const socketUrl =
  "wss://7nnjul56if.execute-api.us-east-1.amazonaws.com/testnet";

const Container = styled.div`
    width: 100%;
    padding: 0 0px;
`;
const HeaderStyle = styled.div`
 height: 64px;
  display: flex;
  align-items: flex-end;
  padding:15px;
  background: url("https://ipfs.near.social/ipfs/bafkreigmwev6i2ivgz5ampkihov2ub7yenn7hohs34erheclixz2dopwru");
  
  // margin-top:-15px;

  background-repeat: no-repeat;
  background-size: cover;
  background-position:center;
  p {
    margin-bottom: 0px;
    font-size:22px;
    font-weight: 700;
    color: black;
  }
`;
const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding:10px 20px;
`;
const NavLink = styled.div`
  * {
      color: #000000;
  }
  a:hover {
    text-decoration:none;
  }
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
  showButton: false,
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
    height: 176px;
  }
`;

const [socket, setSocket] = useState(null);

useEffect(() => {
  const newSocket = new WebSocket(socketUrl);

  newSocket.onopen = () => {
    console.log("WebSocket connection opened");
  };

  newSocket.onmessage = (event) => {
    console.log("Received a message:", event.data);
  };

  newSocket.onclose = (event) => {
    console.log("WebSocket connection closed", event.code, event.reason);
  };

  setSocket(newSocket);

  return () => {
    newSocket.close();
  };
}, []);

const handleSubmit = async () => {
  State.update({ loading: true });

  const data = {
    message: state.message,
    showButton: state.showButton,
    buttonLabel: state.buttonLabel,
    url: state.url,
    recipients: state.recipients,
    createdAt: Date.now(),
  };

  console.log("data : ", data);

  socket.send(JSON.stringify(data));

  State.update({
    message: "",
    showButton: false,
    buttonLabel: "",
    url: "",
    recipients: "allTracks",
    accountId: context.accountId,
    loading: false,
  });
  State.update({ redirect: true });
};

const { secretkey } = props;

const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

const fetchData = () => {
  const key = secretkey ? secretkey : storedSecretKey;
  asyncFetch(
    `${apiUrl}/accounts/auth/${key}`
  ).then(({ body }) => {
    if (!!storedSecretKey === false) {
      State.update({
        redirectToHome: "redirect",
      });
    }
    State.update({
      userData: body,
    });
  });
};

useEffect(() => {
  fetchData();
}, [secretkey, storedSecretKey]);

if (state.redirect) {
  return <Redirect to="/admin" />;
}

return (
  <Container>
    <Widget
      props={{
        nearconId: state.userData.nearconId,
        cid: state.userData.cid,
      }}
      src={`${ownerId}/widget/Navbar`}
    />
    <HeaderStyle>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <p>New Alert</p>

        <NavLink>
          <Link to="/mobile">
            <Widget
              src={`${ownerId}/widget/Inputs.Toggle2`}
              props={{
                rightLabel: "Home",
                value: true,
                onChange: () => {
                  props?.closeScannedTicket?.();
                },
              }}
            />
          </Link>
        </NavLink>
      </div>
    </HeaderStyle>
    <Content>
      <Widget
        src={`${ownerId}/widget/Inputs.TextArea`}
        props={{
          label: "Message",
          value: state.message,
          error: state.messageError,
          placeholder: "",
          onChange: (message) => State.update({ message }),
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
          }}
        />

        <Widget
          src={`${ownerId}/widget/Inputs.Text`}
          props={{
            label: "URL",
            value: state.url,
            error: state.urlError,
            placeholder: "Enter URL Name",
            onChange: (url) => State.update({ url }),
          }}
        />
      </ShowHideView>
      {/*
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
        }}
      />
      */}
      <p style={{ fontSize: 12, fontWeight: 400, color: theme.textColor2 }}>
        By default every NEARCON attendee will receive alerts. You can send
        alerts to a subset based on track preference.
      </p>
      <Button
        disabled={state.message === ""}
        style={{ opacity: state.message === "" ? 0.6 : 1 }}
        onClick={() => handleSubmit()}
      >
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
