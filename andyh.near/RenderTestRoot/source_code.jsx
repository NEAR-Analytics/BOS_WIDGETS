State.init({ age: 0 });
return (
  <div>
    I am {state.age} yars old
    <button
      onClick={() => {
        State.update({ age: state.age + 1 });
      }}
    >
      age me
    </button>
    <Widget
      src="andyh.near/widget/RenderTestChild"
      props={{ age: state.age }}
    />
  </div>
);
