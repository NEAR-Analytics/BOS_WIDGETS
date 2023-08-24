State.init({ count: 0 });

let increaseCount = () => {
  State.update({ count: state.count + 1 });
};

let decreaseCount = () => {
  State.update({ count: state.count - 1 });
};

let resetCount = () => {
  State.update({ count: (state.count = 0) });
};

return (
  <div
    class="container-fluid d-flex justify-content-center align-items-center"
    style={{
      backgroundImage: "linear-gradient(to right, #FF61D2, #FE9090)",
      height: "100vh",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "#fff" }}>Simple Counter App</h2>
      <p style={{ fontSize: "4rem", color: "grey" }}>{state.count}</p>
      <button onClick={decreaseCount}>Decrease</button>
      <button onClick={increaseCount}>Increase</button>
      <button onClick={resetCount} class="btn btn-secondary">
        Reset
      </button>
    </div>
  </div>
);
