State.init({ k: 0 });
return (
  <div>
    root: {props.i} child: {props.j} grandchild: {state.k}
    <br />
    <button
      onClick={() => {
        State.update({ k: state.k + 1 });
      }}
    >
      k + 1
    </button>
    <button onClick={() => props.incrementParent()}>j + 1</button>
  </div>
);
