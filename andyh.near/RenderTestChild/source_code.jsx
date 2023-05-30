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
          console.log("incrementing child");
          State.update({ j: state.j + 1 });
        },
        setchildincrement: (cb0, number, cb1) => {
          console.log(
            "incrementing grandchild by " + number + " from its parent scope"
          );
          cb0(number, /xyz/gi);
          incrementChild = cb0;
        },
      }}
    />
  </div>
);
