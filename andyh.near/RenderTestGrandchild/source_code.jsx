State.init({ i: 0 });
return (
  <div>
    I am a grandchild!! I am {state.i} yaars old
    <button onClick={() => State.update({ i: state.i + 1 })}>age me</button>
  </div>
);
