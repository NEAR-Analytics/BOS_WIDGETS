State.init({ k: 0, isInitialized: false });
const incK = () => {
  console.log("incrementing k");
  State.update({ k: state.k + 1 });
};

if (!state.isInitialized) {
  props.setchildincrement(incK, () => console.log("I'm the *other* callback"));
  State.update({ isInitialized: true });
}

return (
  <div>
    root: {props.i} child: {props.j} grandchild: {state.k}
    <br />
    <button
      onClick={() => {
        incK();
      }}
    >
      grandchild + 1
    </button>
    <br />
    <button onClick={() => props.incrementparent()}>child + 1</button>
  </div>
);
