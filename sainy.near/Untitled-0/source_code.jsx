function readEmittedValue() {
  const message = Storage.get("message", "sainy.near/widget/Emitter");
  return message;
}

function handleChange(value) {
  State.update({ message: value });
}

State.init({
  message: "",
});

return (
  <div>
    <div>This is the message from the widget: {readEmittedValue()}</div>
    <div>
      <span>Update value: </span>
      <input onChange={(e) => handleChange(e.target.value)} />
    </div>
    <div>
      <Widget
        src="sainy.near/widget/Emitter"
        props={{ message: state.message }}
      />
    </div>
  </div>
);
