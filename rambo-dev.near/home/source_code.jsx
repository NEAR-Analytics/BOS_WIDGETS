const defaultGreeting = "Hello test!";

State.init({
  greeting: defaultGreeting,
  inputValue: "",
});

function onChangeGreeting() {
  if (state.greeting === defaultGreeting) {
    State.update({
      greeting: "Hello dev!",
    });
  } else {
    State.update({
      greeting: defaultGreeting,
    });
  }
}

return (
  <div>
    <h1>{state.greeting}</h1>

    <button onClick={onChangeGreeting}>Boring greeting, change it!</button>

    <input
      value={inputValue}
      onChange={(e) => {
        State.update({
          inputValue: e.target.value,
        });

        console.log(state.inputValue);
      }}
    />
  </div>
);
