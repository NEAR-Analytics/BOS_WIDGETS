const pre = state.value;
State.init({ value: -1 });
const mid = state.value;
State.update({ value: props.value });
const fin = state.value;

return (
  <h1>
    {pre} {"->"} {mid} {"->"} {fin}
  </h1>
);
