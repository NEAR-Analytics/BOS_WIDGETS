State.init({
  seedkey: [],
  number: 0,
  getkey: "123",
  display: "none",
});

return (
  <div>
    <div>
      <h4>12key</h4>
      <input
        onChange={(e) => {
          State.update({ seedkey: e.target.value.split(" ") });
        }}
        type="text"
        style={{ width: 600 }}
      />
    </div>
    <div>
      <h4>Number</h4>
      <input
        value={state.number}
        onChange={(e) => {
          State.update({ number: e.target.value });
          State.update({ getkey: state.seedkey[e.target.value - 1] });
        }}
        type="number"
        style={{ width: 200 }}
      />
    </div>
    <button
      onClick={() => {
        State.update({ display: "block" });
        State.update({ number: 0 });
      }}
      style={{ margin: 40, background: "green" }}
    >
      GET KEY
    </button>
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        onClick={(e) => {
          clipboard.writeText(state.getkey);
        }}
        style={{
          display: state.display,
          margin: 20,
          padding: 20,
          background: "green",
          width: 200,
        }}
      >
        {state.getkey}
      </div>
      <button
        onClick={() => {
          State.update({ display: "none" });
        }}
        style={{
          display: state.display,
          margin: 20,

          background: "red",
        }}
      >
        X
      </button>
    </div>
  </div>
);
