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
      <Widget src="golas.near/widget/N-NotificationsSettingsPush" props={{}} />
    </Notification>
    <Application>
      <Widget
        src="golas.near/widget/N-NotificationsSettingsApplications"
        props={{
          applicationNotificationsTypes,
        }}
      />
    </Application>
  </Frame>
);
