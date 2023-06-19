State.init({ name: "Edi" });

return (
  <div>
    <h1>
      {props.greet} {state.name}
      <input onChange={(e) => State.update({ name: e.target.value })} />
    </h1>
  </div>
);
