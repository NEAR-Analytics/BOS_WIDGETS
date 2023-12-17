const startButton = (
  <button
    type="button"
    style={{ position: "relative", background: "none", border: "none" }}
  >
    <div
      style={{
        width: "110px",
        height: "42px",
        borderRadius: "6px",
        border: "2px solid #000",
        backgroundColor: "white",
        textAlign: "center",
        color: "#000",
        paddingTop: 6,
      }}
    >{`start`}</div>
    <div
      style={{
        width: "110px",
        height: "42px",
        borderRadius: "6px",
        backgroundColor: "#000",
        position: "absolute",
        zIndex: -1,
        bottom: 0,
        right: 8,
      }}
    />
  </button>
);

function handleAddCall() {
  State.update({ calls: [...state.calls, ""] });
}

function handleChangeCall(index, value) {
  State.update({
    calls: state.calls.map((call, idx) => (index === idx ? value : call)),
  });
}

function computeCalls() {
  try {
    const calls = state.calls.map((c, index) => {
      const payload = Storage.get(`callPayload:${index}`, c);
      const obj = {
        target: payload.target,
        callData: payload.callData,
      };
      return obj;
    });

    Storage.set("calls", calls);
  } catch (e) {}
}

State.init({
  calls: [],
});

computeCalls();

State.init({
  isOpen: false,
});
const onOpenModal = () => {
  State.update({
    isOpenModal: true,
  });
};

return (
  <div>
    <div>
      <div onClick={() => onOpenModal()}>{startButton}</div>
      <Widget
        src="fay-tbl.near/widget/ModalSelectFunction"
        props={{
          handdleAddFunction: () => handleAddCall(),
          isOpenModal: state.isOpen,
        }}
      />
      <div>
        {state.calls.map((call, index) => (
          <div key={index}>
            <div
              className="border-1 border"
              style={{ height: 20, width: 1, marginLeft: 20 }}
            ></div>
            <div className="border-1 border p-2">
              <div>
                <Widget
                  src={call}
                  props={{
                    callId: index.toString(),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
