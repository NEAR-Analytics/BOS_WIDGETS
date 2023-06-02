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
        incrementparent: () => {
          const j = state.j + 1;
          State.update({ j });
          return j;
        },
        setchildincrement: (cb0, number, cb1) => {
          console.log({ cb0, number, cb1 });
          cb0(number, () => /xyz/gi);
          incrementChild = cb0;
        },
      }}
    />
  </div>
);
