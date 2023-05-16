State.init({ k: 0 });
const incK = () => {
  console.log("incrementing k");
  State.update({ k: state.k + 1 });
};
props.setchildincrement(incK);
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
