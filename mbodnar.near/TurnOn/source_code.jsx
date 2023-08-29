const Check = styled.span`
  color: blue;
  cursor: pointer;
`;

const handleTurnOn = props?.handleTurnOn;
const isNotificationSupported = props?.isNotificationSupported;
const isPushManagerSupported = props?.isPushManagerSupported;
const isPermisionGranted = props?.isPermisionGranted;

State.init({
  notificationSupported: isNotificationSupported().toString(),
  pushManagerSupported: isPushManagerSupported().toString(),
  permisionGranted: isPermisionGranted().toString(),
});

const checkState = () =>
  State.update({
    notificationSupported: isNotificationSupported().toString(),
    pushManagerSupported: isPushManagerSupported().toString(),
    permisionGranted: isPermisionGranted().toString(),
  });

const turnOn = () =>
  handleTurnOn().then(() => {
    checkState();
  });

return (
  <div>
    <button onClick={turnOn}>Turn On</button>
    <br />
    state: (<Check onClick={checkState}>check</Check>)
    <br />
    <span>Notifications supported: {state.notificationSupported}</span>
    <br />
    <span>PushManager supported: {state.pushManagerSupported}</span>
    <br />
    <span>Permision granted: {state.permisionGranted}</span>
  </div>
);
