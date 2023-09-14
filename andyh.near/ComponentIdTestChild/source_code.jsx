// console.log(`RENDERING ${props.id} - ${componentInstanceId}`, { ...props });
State.init({ value: props.value || 0, n: 0 });
State.update({ n: state.value + 1 || 0 });

return (
  <div>
    Hello {props.id}
    <button
      onClick={() => {
        console.log("sent from " + componentInstanceId);
        State.update({ value: state.value + 1 });
        // props.update(props.id);
      }}
    >
      increment {state.value}
    </button>
  </div>
);
