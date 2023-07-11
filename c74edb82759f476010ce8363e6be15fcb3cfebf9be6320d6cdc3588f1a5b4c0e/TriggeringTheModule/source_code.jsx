State.init({
  counter: 0,
});

return (
  <div
    className="btn btn-primary"
    onClick={() => State.update({ counter: state.counter + 1 })}
  >
    <Widget
      src="c74edb82759f476010ce8363e6be15fcb3cfebf9be6320d6cdc3588f1a5b4c0e/widget/Untitled-0"
      props={{
        thingToLog: "my birdie has click",
        counterTrigger: state.counter + 1,
        production: true,
      }}
    />
    Click me to log
  </div>
);
