// console.log(`RENDERING ${props.id} - ${componentInstanceId}`, { ...props });
State.init({ value: props.value || 0, n: 0, id: props.id });
State.update({ id: props.id + "_state" });

return (
  <div>
    Hello {state.id}
    <button
      onClick={() => {
        console.log("sent from " + componentInstanceId);
        const newValue = state.value + 1;
        State.update({ value: newValue });
        props.update(newValue);
      }}
    >
      increment {state.value}
    </button>
  </div>
);
