const handleTurnOn = props?.handleTurnOn;
const isNotificationSupported = props?.isNotificationSupported;
const isPushManagerSupported = props?.isPushManagerSupported;
const isPermisionGranted = props?.isPermisionGranted;

console.log("xxx");
console.log("isNotificationSupported", isNotificationSupported);

return (
  <div>
    <button onClick={handleTurnOn}>Turn On</button>
    <br />
    <span>
      Notifications supported:{" "}
      {isNotificationSupported && isNotificationSupported()}
    </span>
    <br />
    <span>
      PushManager supported:{" "}
      {isPushManagerSupported && isPushManagerSupported()}
    </span>
    <br />
    <span>permision granted: {isPermisionGranted && isPermisionGranted()}</span>
  </div>
);
