State.init({ value: props.value || 0, n: 0, id: props.id });
State.update({ id: props.id + "_state" });

return (
  <div>
    Hello {state.id}
    <button
      className="btn btn-info"
      type="button"
      onClick={() => {
        const newValue = state.value + 1;
        State.update({ value: newValue });
        props.update(newValue);
      }}
    >
      increment {state.value}
    </button>
  </div>
);
