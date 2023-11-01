const theme = props.theme;
const accountId = props.accountId || context.accountId;
const ownerId = "nearcon23.near";
const [selectedButton, setSelectedButton] = useState("profile");

initState({
  ticketScanningMode: false,
});

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
const Button = styled.button`
  width: calc(100% - 40px);
  height: 48px;

  background-color: #000;
  color: #FFF;
  border-radius: 24px;
  border: none;

  margin:  20px 20px 0 20px;

  :hover {
    background-color: #000000cc;
  }

`;

if (state.ticketScanningMode) {
  return (
    <Widget
      src={`${ownerId}/widget/Admin.ScannedTicket`}
      props={{
        closeScannedTicket: () => {
          State.update({ ticketScanningMode: false });
        },
      }}
    />
  );
}

return (
  <Container>
    <Content>
      <Widget src={`${ownerId}/widget/Navbar`} />
      <Widget
        src={`${ownerId}/widget/Mobile.TitleBar`}
        props={{
          label: (
            <span style={{ fontSize: 22 }}>
              @philsoutsude
              <span style={{ fontWeight: "300", fontSize: 15, marginLeft: -5 }}>
                .nearcon23.near
              </span>
            </span>
          ),
          onChange: () => {
            State.update({ ticketScanningMode: true });
          },
          admin: true,
        }}
      />

      <Link to={`${ownerId}/widget/Admin.LanyardScreen`}>
        <Button>Scan a Ticket</Button>
      </Link>
      <Link to={`${ownerId}/widget/Mobile.Home.Alerts.New`}>
        <Button>Send a Push Notification</Button>
      </Link>
    </Content>
  </Container>
);
