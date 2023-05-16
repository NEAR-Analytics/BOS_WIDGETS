State.init({ j: 0 });
let incrementChild = () => {
  console.log("not initialized!");
};
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
    <br />
    <button onClick={incrementChild}>grandchild + 1</button>
    <Widget
      src="andyh.near/widget/RenderTestGrandchild"
      props={{
        i: props.i,
        j: state.j,
        incrementparent: () => State.update({ j: state.j + 1 }),
        setchildincrement: (cb) => {
          console.log("incrementing on set");
          cb();
          incrementChild = cb;
        },
      }}
    />
  </div>
);
