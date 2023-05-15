State.init({ k: 0 });
const incK = () => {
  State.update({ k: state.k + 1 });
};
return (
  <div>
    root: {props.i} child: {props.j} grandchild: {state.k}
    <br />
    <button
      onClick={() => {
        State.update({ k: state.k + 1 });
      }}
    >
      grandchild + 1
    </button>
    <br />
    <button onClick={() => props.incrementparent()}>child + 1</button>
    <button onClick={() => props.incrementself(incK)}>
      grandchild + 1 (grandchild callback)
    </button>
  </div>
);
