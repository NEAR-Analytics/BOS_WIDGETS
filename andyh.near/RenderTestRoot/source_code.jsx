State.init({ i: 0 });
return (
  <div>
    root: {state.i}
    <button
      onClick={() => {
        State.update({ i: state.i + 1 });
      }}
    >
      i + 1
    </button>
    <Widget src="andyh.near/widget/RenderTestChild" props={{ i: state.i }} />
  </div>
);
