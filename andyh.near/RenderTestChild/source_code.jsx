State.init({ j: 0 });
return (
  <div>
    root: {props.i} child: {state.j}
    <button
      onClick={() => {
        State.update({ j: state.j + 1 });
      }}
    >
      j + 1
    </button>
    <Widget
      src="andyh.near/widget/RenderTestGrandchild"
      props={{ i: props.i, j: state.j }}
    />
  </div>
);
