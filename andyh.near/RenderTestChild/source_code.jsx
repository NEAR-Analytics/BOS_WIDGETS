State.init({ j: 0 });
return (
  <div>
    root: {props.i} child: {state.j}
    <br />
    <button
      onClick={() => {
        State.update({ j: state.j + 1 });
      }}
    >
      child + 1
    </button>
    <Widget
      src="andyh.near/widget/RenderTestGrandchild"
      props={{
        i: props.i,
        j: state.j,
        incrementparent: () => State.update({ j: state.j + 1 }),
        incrementself: (cb) => console.log({ cb: typeof cb }),
      }}
    />
  </div>
);
