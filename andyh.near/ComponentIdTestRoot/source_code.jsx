State.init({
  a: { id: "a", value: 0 },
  b: { id: "b", value: 0 },
  c: { id: "c", value: 0 },
});

return (
  <>
    {[state.a, state.b, state.c].map(({ id, value }) => (
      <Widget
        src="andyh.near/widget/ComponentITestChild"
        id={id}
        props={{ value, id }}
      />
    ))}
  </>
);
