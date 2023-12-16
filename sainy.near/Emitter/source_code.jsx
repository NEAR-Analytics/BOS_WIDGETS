function emitMessage(msg) {
  Storage.set("message", msg);
}

emitMessage(props.message);

return <div>I have emitted this message: {props.message}</div>;
