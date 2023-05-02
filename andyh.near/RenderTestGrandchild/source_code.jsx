State.init({ k: 0 });
return (
  <div>
    root: {props.i} child: {props.j} grandchild: {state.k}
    <button
      onClick={() => {
        State.update({ k: state.k + 1 });
      }}
    >
      age me
    </button>
  </div>
);
