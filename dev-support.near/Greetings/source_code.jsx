const greeting = props.greeting;

State.init({ name: "Guille" });

return (
  <>
    <h1>
      {greeting} {state.name}
    </h1>

    <div class="container">We are so happy that you are here</div>

    <input
      type="text"
      onChange={(e) => State.update({ name: e.target.value })}
    />
  </>
);
