function handleAddCall() {
  State.update({ calls: [...state.calls, ""] });
}

function handleChangeCall(index, value) {
  State.update({
    calls: state.calls.map((call, idx) => (index === idx ? value : call)),
  });
}

State.init({
  calls: [],
});

console.log(state.calls);

return (
  <div>
    <div>Call</div>
    <div>
      <div className="p-2 rounded border border-1">Start</div>
      <div>
        {state.calls.map((call, index) => (
          <div key={index}>
            <div
              className="border-1 border"
              style={{ height: 20, width: 1, marginLeft: 20 }}
            ></div>
            <div className="border-1 border p-2">
              <div>
                <input
                  placeholder="supercall widget"
                  onChange={(e) => handleChangeCall(index, e.target.value)}
                />
              </div>
              <div>
                <Widget src={call} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleAddCall}>+</button>
      </div>
      <div>
        <button>Call</button>
      </div>
    </div>
  </div>
);
