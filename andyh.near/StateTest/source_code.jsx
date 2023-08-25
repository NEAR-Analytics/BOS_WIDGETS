State.init({ x: -1, y: -1, z: -1 });

return (
  <>
    <span>x: ${state.x}</span>{" "}
    <button onClick={() => State.update({ x: state.x + 1 })}>
      increment x
    </button>
    <br />
    <span>x: ${state.y}</span>{" "}
    <button onClick={() => State.update({ y: state.y + 1 })}>
      increment y
    </button>
    <br />
    <span>x: ${state.z}</span>{" "}
    <button onClick={() => State.update({ z: state.z + 1 })}>
      increment z
    </button>
    <br />
  </>
);
