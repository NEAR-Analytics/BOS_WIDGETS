console.log(`RENDERING ${props.id}`);
State.init({ value: props.value });
return (
  <div>
    Hello {props.id}
    <button onClick={() => State.update({ value: state.value + 1 })}>
      increment {state.value}
    </button>
  </div>
);
