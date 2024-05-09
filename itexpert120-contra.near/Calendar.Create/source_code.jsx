const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const accountId = context.accountId;

if (!accountId) {
  return <div>No Account Id</div>;
}

const [appName, setAppName] = useState("every");
const [thingName, setThingName] = useState("event");

const handleOnClick = () => {
  Social.set({
    widget: {
      EventCalendar: {
        "": `return <Widget src="buildhub.near/widget/events.Calendar" props={{app: "${appName}", thing: "${thingName}", }} />`,
      },
    },
  });
};

return (
  <div>
    <h1>Event Calendar Creator</h1>
    <div className="form-group mb-3">
      <label>App Name</label>
      <input
        className="form-control"
        type="text"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
    </div>
    <div className="form-group mb-3">
      <label>Thing Name</label>
      <input
        className="form-control"
        type="text"
        value={thingName}
        onChange={(e) => setThingName(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <Button onClick={handleOnClick} variant="primary">
        Launch
      </Button>
    </div>
    <div>
      <h2>Preview</h2>
      <Widget
        src="buildhub.near/widget/events.Calendar"
        props={{
          app: appName,
          thing: thingName,
        }}
      />
    </div>
  </div>
);
