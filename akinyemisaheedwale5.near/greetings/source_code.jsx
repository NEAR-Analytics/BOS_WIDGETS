const greeting = props.greeting;

State.init({ name: "Zainab" });

return (
  <>
    <h2>
      {greeting} {state.name}
    </h2>

    <div class="container">am happy that you arer here</div>

    <input
      type="text"
      onChange={(e) => State.update({ name: e.target.value })}
    />
  </>
);
