const handleTurnOn = props?.handleTurnOn;
const isNotificationSupported = props?.isNotificationSupported;
const isPushManagerSupported = props?.isPushManagerSupported;
const isPermisionGranted = props?.isPermisionGranted;

State.init({
  notificationSupported: isNotificationSupported().toString(),
  pushManagerSupported: isPushManagerSupported().toString(),
  permisionGranted: isPermisionGranted().toString(),
});

const turnOn = () => {
  handleTurnOn().then(() => {
    State.update({
      notificationSupported: isNotificationSupported().toString(),
      pushManagerSupported: isPushManagerSupported().toString(),
      permisionGranted: isPermisionGranted().toString(),
    });
  });
};

return (
  <div>
    <button onClick={turnOn}>Turn On</button>
    <br />
    <span>Notifications supported: {state.notificationSupported}</span>
    <br />
    <span>PushManager supported: {state.pushManagerSupported}</span>
    <br />
    <span>permision granted: {state.permisionGranted}</span>
  </div>
);
