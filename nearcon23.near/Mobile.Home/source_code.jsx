const theme = props.theme;
const accountId = props.accountId || context.accountId;
const ownerId = "nearcon23.near";
const [selectedButton, setSelectedButton] = useState("profile");

const Container = styled.div`
  height:100%;
  max-height: 100dvh;
`;
const Content = styled.div`
  height: calc(100dvh - 106px);
  flex: 1;
  flex-direction: column;
  overflow: auto;
  position: relative;
`;

return (
  <Container>
    <Content>
      <Widget src={`${ownerId}/widget/Navbar`} />
      <Widget
        src={`${ownerId}/widget/Mobile.TitleBar`}
        props={{
          label: "@" + accountId,
        }}
      />
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
          props={{ theme }}
        />
      )}
      {selectedButton === "map" && (
        <Widget src={`${ownerId}/widget/Map.Page`} props={{ theme }} />
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
