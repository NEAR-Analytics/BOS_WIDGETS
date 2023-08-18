const Frame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px; 
`;

const Notification = styled.div``;

const Application = styled.div``;

const applicationNotificationsTypes = [
  {
    icon: "A",
    title: "{ApplicationName}",
    text: "",
    state: 1,
  },
  {
    icon: "B",
    title: "{ApplicationName}",
    text: "",
    state: 1,
  },
  {
    icon: "C",
    title: "{ApplicationName}",
    text: "",
    state: 0,
  },
  {
    icon: "D",
    title: "{ApplicationName}",
    text: "",
    state: 0,
  },
];

return (
  <Frame>
    <Notification>
      <Widget
        src="golas.near/widget/N-NotificationsSettingsHeader"
        props={{
          title: "Notification Settings",
          text: "Configure your notifications for activity on near.org",
        }}
      />
      <Widget
        src="golas.near/widget/N-NotificationsSettingsListItem"
        props={{
          title: "Push notifications",
          text: "Push notifications are delivered in real-time to your enabled browser or device.",
          // temporary
          icon: "X",
        }}
      />
    </Notification>
    <Application>
      <Widget
        src="golas.near/widget/N-NotificationsSettingsHeader"
        props={{
          title: "Application Notifications",
          text: "Turn notifications on or off for specific applications. New applications you’ve connected to will have notifications turned on by default.",
        }}
      />
      {applicationNotificationsTypes.map((type) => (
        <Widget
          src="golas.near/widget/N-NotificationsSettingsListItem"
          props={type}
        />
      ))}
    </Application>
  </Frame>
);
