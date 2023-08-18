return (
  <>
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
  </>
);
