State.init({
  a: { id: "a", value: 0 },
  b: { id: "b", value: 0 },
  c: { id: "c", value: 0 },
  x: 1,
});

// console.log({ ComponentState });
const components = [state.a, state.b, state.c];
return (
  <>
    <h4>{props.title}</h4>
    <button onClick={() => State.update({ x: state.x + 1 })}>
      increment parent {state.x}
    </button>
    {/*
    <Widget
      src="andyh.near/widget/ComponentIdTestChild"
      id={"a"}
      props={{
        value: state.a.value,
        id: state.a.id,
        update: (componentId) => {
          console.log(`updating ${componentId}`);
          State.update({
            [componentId]: { id: componentId, value: value + 1 },
          });
          // console.log({ ...state });
        },
      }}
    />
    <Widget
      src="andyh.near/widget/ComponentIdTestChild"
      id={"b"}
      props={{
        value: state.b.value,
        id: state.b.id,
        update: (componentId) => {
          console.log(`updating ${componentId}`);
          State.update({
            [componentId]: { id: componentId, value: value + 1 },
          });
          // console.log({ ...state });
        },
      }}
    />*/}
    {components.map(({ id, value }) => (
      <Widget
        src="andyh.near/widget/ComponentIdTestChild"
        id={id}
        props={{
          value,
          id,
          update: (newValue) => {
            console.log(`updating ${id} to ${newValue}`);
            State.update({
              [id]: { id, value: newValue },
            });
            // console.log({ ...state });
          },
        }}
      />
    ))}
  </>
);
