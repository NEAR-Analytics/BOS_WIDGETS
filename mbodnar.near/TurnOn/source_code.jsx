const handleTurnOn = props?.handleTurnOn;
const isNotificationSupported = props?.isNotificationSupported;
const isPushManagerSupported = props?.isPushManagerSupported;
const isPermisionGranted = props?.isPermisionGranted;

State.init({
  notificationSupported: "x",
  pushManagerSupported: "x",
  permisionGranted: "x",
});

console.log("xxx");
console.log("isNotificationSupported", isNotificationSupported);
console.log("isNotificationSupported()", isNotificationSupported());

const turnOn = () => {
  console.log("XXXXXXXXXXXXXXXX");
  handleTurnOn();

  State.update({
    notificationSupported: isNotificationSupported(),
    pushManagerSupported: isPushManagerSupported(),
    permisionGranted: isPermisionGranted(),
  });
};

return (
  <div>
    <button onClick={turnOn}>Turn On</button>
    <br />
    <span>
      Notifications supported: {isNotificationSupported() ? "true" : "false"}
    </span>
    <br />
    <span>PushManager supported: {state.pushManagerSupported}</span>
    <br />
    <span>permision granted: {state.permisionGranted}</span>
    // <span>Notifications supported: {state.notificationSupported}</span>
    // <br />
    // <span>PushManager supported: {state.pushManagerSupported}</span>
    // <br />
    // <span>permision granted: {state.permisionGranted}</span>
  </div>
);
