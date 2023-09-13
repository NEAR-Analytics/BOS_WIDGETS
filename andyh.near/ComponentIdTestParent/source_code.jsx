State.init({
  a: { id: "a", value: 0 },
  b: { id: "b", value: 0 },
  c: { id: "c", value: 0 },
  x: 1,
});

const components = [state.a, state.b, state.c];
return (
  <>
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
    */}
    {components.map(({ id, value }) => (
      <Widget
        src="andyh.near/widget/ComponentIdTestChild"
        id={id}
        props={{
          value,
          id,
          update: (componentId) => {
            console.log(`updating ${componentId}`);
            State.update({
              [componentId]: { id: componentId, value: value + 1 },
            });
            // console.log({ ...state });
          },
        }}
      />
    ))}
  </>
);
