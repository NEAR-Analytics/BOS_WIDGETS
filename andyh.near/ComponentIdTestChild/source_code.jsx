State.init({ value: props.value || 0, n: 0, id: props.id });
State.update({ id: props.id + "_state" });

return (
  <div>
    Hello {state.id}
    <button
      className="btn btn-info btn-sm"
      type="button"
      onClick={() => {
        const newValue = state.value + 1;
        State.update({ value: newValue });
        props.update(newValue);
      }}
    >
      increment {state.value}
    </button>
    <Widget
      src="andyh.near/widget/ComponentIdTestChild"
      id={`${state.id}_child`}
      props={{ id: `${state.id}_child`, value: 0, update: (newValue) => {} }}
    />
  </div>
);
