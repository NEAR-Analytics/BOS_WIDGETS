const theme = props.theme;
const accountId = props.accountId || context.accountId;
const ownerId = "nearcon23.near";
const [selectedButton, setSelectedButton] = useState("profile");

initState({});

const Container = styled.div`
  height:100%;
  max-height: 100vh;
`;
const Content = styled.div`
  height: calc(100dvh - 106px);
  flex: 1;
  flex-direction: column;
  overflow: auto;
  position: relative;
`;

const { secretkey, selectedtab } = props;

const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

const fetchData = () => {
  const key = secretkey ? secretkey : storedSecretKey;
  asyncFetch(
    `https://21mqgszhf3.execute-api.us-east-1.amazonaws.com/testnet/api/v1/accounts/auth/${key}`
  ).then(({ body }) => {
    if (!key) {
      State.update({
        redirectToHome: "redirect",
      });
    }
    State.update({
      userData: body,
    });
  });
};

const fetchTransaction = () => {
  if (state?.userData?.nearconId) {
    const apiURL = `https://21mqgszhf3.execute-api.us-east-1.amazonaws.com/testnet/api/v1/transactions/${state.userData.nearconId}`;
    asyncFetch(apiURL).then(({ body }) => {
      State.update({ transactions: body });
    });
  }
};

useEffect(() => {
  fetchData();
  fetchTransaction();
}, [secretkey, storedSecretKey, state.userData]);

useEffect(() => {
  if (selectedtab) {
    setSelectedButton(selectedtab);
  }
}, [selectedtab]);

if (state.redirectToHome === "redirect") {
  return <Redirect to="/" />;
}

function capitalizeFirstLetter(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

return (
  <Container>
    <Content>
      <Widget
        props={{
          nearconId: state.userData.nearconId,
          cid: state.userData.cid,
        }}
        src={`${ownerId}/widget/Navbar`}
      />
      {selectedButton !== "map" && (
        <Widget
          src={`${ownerId}/widget/Mobile.TitleBar`}
          props={{
            label:
              selectedButton !== "profile" &&
              capitalizeFirstLetter(selectedButton),
            ...state.userData,
          }}
        />
      )}
      {selectedButton === "schedule" && (
        <>
          <Widget src={`${ownerId}/widget/Schedule.Content`} />
        </>
      )}
      {selectedButton === "alerts" && (
        <>
          <Widget src={`${ownerId}/widget/Mobile.Home.Alerts`} />
        </>
      )}
      {selectedButton === "profile" && (
        <Widget
          src={`${ownerId}/widget/Mobile.Home.Profile`}
          props={{ theme, state }}
        />
      )}
      {selectedButton === "map" && (
        <Widget src={`${ownerId}/widget/Map.Page`} props={{ theme }} />
      )}
      {selectedButton === "help" && (
        <Widget src={`${ownerId}/widget/Help`} props={{ theme }} />
      )}
    </Content>
    <Widget
      src={`${ownerId}/widget/Mobile.Navbar`}
      props={{
        selectedButton: selectedButton,
        setSelectedButton: setSelectedButton,
      }}
    />
  </Container>
);
