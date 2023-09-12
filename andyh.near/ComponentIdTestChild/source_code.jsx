console.log(`RENDERING ${props.id}`, { ...props });
State.init({ value: props.value || 0 });
return (
  <div>
    Hello {props.id}
    <button
      onClick={() => {
        State.update({ value: state.value + 1 });
        props.update();
      }}
    >
      increment {state.value}
    </button>
  </div>
);
