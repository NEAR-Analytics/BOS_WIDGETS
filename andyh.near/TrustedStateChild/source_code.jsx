State.init({ value: -1 });
State.update({ value: props.value });

return <h1>{state.value}</h1>;
