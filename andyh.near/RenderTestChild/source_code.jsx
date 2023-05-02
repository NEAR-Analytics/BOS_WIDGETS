State.init({ i: 0 });
return (
  <div>
    I am a child! I am {state.i} yars older
    <button
      onClick={() => {
        console.log("updating state " + state.i);
        State.update({ i: state.i + 1 });
      }}
    >
      age me
    </button>
    <Widget
      src="andyh.near/widget/RenderTestGrandchild"
      props={{ age: state.i }}
    />
  </div>
);
