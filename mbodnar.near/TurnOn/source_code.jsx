const handleTurnOn = props.handleTurnOn;
const isNotificationSupported = props.isNotificationSupported;
const isPushManagerSupported = props.isPushManagerSupported;
const isPermisionGranted = props.isPermisionGranted;

console.log("xxx");

return (
  <div>
    <button onClick={handleTurnOn}>Turn On</button>
    <br />
    <span>Notifications supported: {isNotificationSupported()}</span>
    <br />
    <span>PushManager supported: {isPushManagerSupported()}</span>
    <br />
    <span>permision granted: {isPermisionGranted()}</span>
  </div>
);
