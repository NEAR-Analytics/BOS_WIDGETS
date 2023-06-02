State.init({ k: 0, isInitialized: false });
const incK = (n, fn) => {
  fn();
  State.update({ k: state.k + n });
};

if (!state.isInitialized) {
  props.setchildincrement(incK, 5, () =>
    console.log("I'm the *other* callback")
  );
  State.update({ isInitialized: true });
}

return (
  <div>
    root: {props.i} child: {props.j} grandchild: {state.k}
    <br />
    <button
      onClick={() => {
        incK(1, () => {});
      }}
    >
      grandchild + 1
    </button>
    <br />
    <button
      onClick={async () => {
        const result = await props.incrementparent();
        console.log({ result });
      }}
    >
      child + 1
    </button>
  </div>
);
