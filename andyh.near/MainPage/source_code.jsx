// console.log(`RENDERING ${props.id}`, { ...props });
State.init({ value: props.value || 0 });

return (
  <div>
    Hello {props.id}
    <button
      onClick={() => {
        // console.log(componentInstanceId, typeof __bweMeta);
        State.update({ value: state.value + 1 });
        props.update(props.id);
      }}
    >
      increment {state.value}
    </button>
  </div>
);
