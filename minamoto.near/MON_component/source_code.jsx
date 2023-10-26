let greeting = "THIS is bullshit";

State.init({ name: "MONSHO_state" });

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>{state.name} </h1>

      <p> {greeting} </p>

      <input
        type="text"
        onChange={(e) => State.update({ name: e.target.value })}
      />
    </div>
  </>
);
