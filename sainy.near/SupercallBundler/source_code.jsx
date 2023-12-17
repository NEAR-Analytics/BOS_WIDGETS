function handleAddCall() {
  State.update({ calls: [...state.calls, ""] });
}

function handleChangeCall(index, value) {
  State.update({
    calls: state.calls.map((call, idx) => (index === idx ? value : call)),
  });
}

function computeCalls() {
  const abicoder = new ethers.utils.AbiCoder();

  try {
    const calls = state.calls.map((c, index) => {
      const payload = Storage.get(`callPayload:${index}`, c);
      const obj = {
        target: payload.target,
        callData: payload.calldata,
      };
      const encodedCall = abicoder.encode(
        ["tuple(address target, bytes callData)"],
        [obj]
      );
      return encodedCall;
    });

    Storage.set("calls", calls);
  } catch (e) {}
}

State.init({
  calls: [],
});

computeCalls();

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
                <Widget src={call} props={{ callId: index.toString() }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleAddCall}>+</button>
      </div>
    </div>
  </div>
);
