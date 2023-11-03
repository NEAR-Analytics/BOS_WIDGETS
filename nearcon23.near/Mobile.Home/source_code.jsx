const theme = props.theme;
const accountId = props.accountId || context.accountId;
const ownerId = "nearcon23.near";
const apiUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";

const [selectedButton, setSelectedButton] = useState("profile");

// initState({});
State.init({
  redirectToHome: "loading",
});

const Container = styled.div`  
  max-height: 100svh;
  height: 100%;
`;
const Content = styled.div`
  height: calc(100% - 105px);
  flex: 1;
  flex-direction: column;
  overflow: auto;
  position: relative;
`;

const { secretkey } = props;

const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);
const fetchData = () => {
  const key = secretkey ? secretkey : storedSecretKey;

  asyncFetch(`${apiUrl}/accounts/auth/${key}`).then(({ body }) => {
    if (body?._id) {
      // if (!!storedSecretKey === false) { }
      State.update({
        userData: body,
        redirectToHome: "",
      });
    } else {
      State.update({
        redirectToHome: "redirect",
      });
    }
  });
};

const fetchTransaction = () => {
  if (state?.userData?.nearconId) {
    const apiURL = `${apiUrl}/transactions/${state.userData.nearconId}`;
    asyncFetch(apiURL).then(({ body }) => {
      State.update({ transactions: body });
    });
  }
};

useEffect(() => {
  fetchData();
  fetchTransaction();
}, [secretkey, storedSecretKey, state.userData]);

if (state.redirectToHome === "loading") {
  return <Widget src={`${ownerId}/widget/Components.LoadingOverlay`} />;
}

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
          <Widget
            src={`${ownerId}/widget/Mobile.Home.Alerts`}
            props={{
              isAdmin: state?.userData?.isSuper,
            }}
          />
        </>
      )}
      {selectedButton === "profile" && (
        <Widget
          src={`${ownerId}/widget/Mobile.Home.Profile`}
          props={{ theme, userData: state?.userData }}
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
