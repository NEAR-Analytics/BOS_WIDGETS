State.init({ i: 0 });
return (
  <div>
    I am a grandchild!! I am {state.i} yars old
    <button
      onClick={() => {
        console.log("updating state " + state.i);
        State.update({ i: state.i + 1 });
      }}
    >
      age me
    </button>
  </div>
);
