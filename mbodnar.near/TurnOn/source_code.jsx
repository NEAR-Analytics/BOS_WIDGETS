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

const turnOn = async () => {
  console.log("XXXXXXXXXXXXXXXX");
  await handleTurnOn();

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
    <span>
      PushManager supported: {isPushManagerSupported() ? "true" : "false"}
    </span>
    <br />
    <span>permision granted: {isPermisionGranted() ? "true" : "false"}</span>
  </div>
);
