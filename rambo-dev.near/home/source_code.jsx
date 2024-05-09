const defaultGreeting = "Hello test!";

State.init({
  greeting: defaultGreeting,
  inputValue: "",
});

function onChangeGreeting(greeting) {
  State.update({
    greeting,
  });
}

return (
  <div>
    <h1>{state.greeting}</h1>

    <div class="d-grid gap-1">
      <label>Change your greeting</label>
      <input
        value={inputValue}
        onChange={(e) => {
          State.update({
            inputValue: e.target.value,
          });

          console.log(state.inputValue);
        }}
      />
      <button
        onClick={() => {
          onChangeGreeting(state.inputValue);
        }}
      >
        Change
      </button>
    </div>
  </div>
);
