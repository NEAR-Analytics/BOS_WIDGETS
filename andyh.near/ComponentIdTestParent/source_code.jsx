State.init({
  a: { id: "a", value: 0 },
  b: { id: "b", value: 0 },
  c: { id: "c", value: 0 },
  x: 1,
});

const components = [state.a, state.b, state.c];
return (
  <>
    {components.map(({ id, value }) => (
      <Widget
        src="andyh.near/widget/ComponentIdTestChild"
        id={id}
        props={{
          value,
          id,
          update: () => {
            console.log(`updating ${id}`);
            // State.update({ [id]: { id, value: value + 1 } });
            // console.log({ ...state });
          },
        }}
      />
    ))}
  </>
);
