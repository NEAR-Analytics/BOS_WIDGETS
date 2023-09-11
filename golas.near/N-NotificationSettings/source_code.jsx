const Card = styled.div`
  max-width: 592px;
  margin: 0 auto;
`;

return (
  <Card>
    <Widget
      src="golas.near/widget/N-NotificationsSettingsHeader"
      props={{
        title: "Notification Settings",
        text: "Configure your notifications for activity on near.org",
      }}
    />
    <Widget
      src="golas.near/widget/N-NotificationsSettingsTurnOn"
      props={{
        title: "Push notifications",
        text: "Push notifications are delivered in real-time to your enabled browser or device.",
        // temporary
        icon: "X",
      }}
    />
    // <Widget
    //   src="golas.near/widget/N-NotificationsSettingsListItem"
    //   props={{
    //     title: "Push notifications",
    //     text: "Push notifications are delivered in real-time to your enabled browser or device.",
    //     // temporary
    //     icon: "X",
    //   }}
    // />
  </Card>
);
