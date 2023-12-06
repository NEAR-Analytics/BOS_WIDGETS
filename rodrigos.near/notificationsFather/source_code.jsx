State.init({});

if (state.notifications.getNotificationData) {
  const data = state.notifications.getNotificationData(
    "mention",
    ["uno", "dos"],
    "www"
  );
  console.log(data);
}
return (
  <>
    <Widget
      src={
        "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/lib.notifications"
      }
      props={{
        stateUpdate: State.update,
        fatherState: State,
        imports: ["getNotificationData"],
      }}
    />
    {state.notifications.getNotificationData && (
      <button
        onClick={() => {
          const resp = state.notifications.getNotificationData(
            "mention",
            ["uno", "dos"],
            "www"
          );
          console.log(JSON.parse(resp.post.main));
          console.log(JSON.parse(resp.index.notify));
        }}
      >
        aca
      </button>
    )}
  </>
);
