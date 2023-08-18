State.init({
  seedkey: [],
  number: 0,
  getkey: "undefine",
  display: "none",
  seed: "",
  listseed: [],
  listname: ["undefine"],
  name: 0,
});

return (
  <div>
    <div>
      <h4>Nhập danh sách tên ví</h4>
      <input
        type="text"
        style={{ width: 600 }}
        onChange={(e) => {
          State.update({ listname: e.target.value.split(" ") });
        }}
      />
      <h4>Tên ví hiện tại :</h4>
      <div
        style={{
          margin: 20,
          padding: 20,
          background: "green",
          width: 200,
        }}
        onClick={(e) => {
          clipboard.writeText(state.listname[state.name]);
        }}
      >
        {state.listname[state.name]}
      </div>
    </div>

    <div>
      <h4>12key</h4>
      <input
        placeholder="Nhập key vào đây"
        onChange={(e) => {
          State.update({ seed: e.target.value });
          State.update({ seedkey: e.target.value.split(" ") });
        }}
        type="text"
        style={{ width: 600 }}
      />
    </div>
    <div>
      <h4>Number</h4>
      <input
        placeholder="Nhập số vào đây"
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

        if (state.listseed[state.listseed.length - 1] != state.seed) {
          State.update({ listseed: [...state.listseed, state.seed] });
        } else {
        }

        State.update({
          name: state.name + 1,
        });
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
    <div
      style={{
        display: "flex",
      }}
    >
      <div>
        {state.listname.map((na, index) => {
          return <li>{na}</li>;
        })}
      </div>
      <div>
        {state.listseed.map((sp, index) => {
          return <li id={index}>{sp}</li>;
        })}
      </div>
    </div>
  </div>
);
