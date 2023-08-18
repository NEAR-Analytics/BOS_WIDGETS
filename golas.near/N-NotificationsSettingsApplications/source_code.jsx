const applicationNotificationsTypes = props.applicationNotificationsTypes || [];

return (
  <>
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
  </>
);
