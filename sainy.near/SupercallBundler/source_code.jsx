const StyledAddButton = styled.button`
  width: 78px;
  height: 32px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #dde1e8;
  background-color: #fff4;
  background: var(#fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  align-items: center;
`;

const closeIcon = (
  <svg
    class="cursor-pointer"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 18L18 6M6 6L18 18"
      stroke="#808080"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const startButton = (
  <button
    type="button"
    style={{
      position: "relative",
      background: "none",
      border: "none",
      zIndex: 1,
    }}
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
        zIndex: 1,
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

function handleAddCall(widget) {
  State.update({ calls: [...state.calls, widget] });
}

function handleDelCall(index) {
  state.calls.splice(index, 1);
  State.update();
}

function handleChangeCall(index, value) {
  State.update({
    calls: state.calls.map((call, idx) => (index === idx ? value : call)),
  });
}

function computeCalls() {
  console.log("compute");

  try {
    const calls = state.calls.flatMap((c, index) => {
      const payload = Storage.get(`callPayload:${index}`, c);
      if (Array.isArray(payload)) {
        return payload;
      } else {
        return [payload];
      }
    });
    console.log(calls);
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
    isOpen: true,
  });
};
const onCloseModal = () => {
  State.update({
    isOpen: false,
  });
};

return (
  <div>
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div onClick={() => onOpenModal()}>{startButton}</div>
      <Widget
        src="sainy.near/widget/ModalSelectFunction"
        props={{
          onSubmit: (value) => handleAddCall(value),
          onClose: () => onCloseModal(),
          isOpen: state.isOpen,
        }}
      />
    </div>
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {state.calls.map((call, index) => (
        <div key={index}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                height: 20,
                width: 1,
                border: "1px dashed #FF94A0",
                margin: "auto",
              }}
            />
          </div>
          <div style={{ display: "flex", position: "relative" }}>
            <div
              style={{
                cursor: "pointer",
                position: "absolute",
                left: "58.5%",
                top: 14,
              }}
              onClick={() => handleDelCall(index)}
            >
              {closeIcon}
            </div>
            <div
              style={{
                margin: "auto",
              }}
            >
              <Widget src={call} props={{ ...props, callId: index }} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                height: 20,
                width: 1,
                border: "1px dashed #FF94A0",
                margin: "auto",
              }}
            />
          </div>
        </div>
      ))}
    </div>
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {state.calls.length > 0 && (
        <StyledAddButton onClick={() => onOpenModal()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9 6.75V11.25M11.25 9H6.75M15.75 9C15.75 9.88642 15.5754 10.7642 15.2362 11.5831C14.897 12.4021 14.3998 13.1462 13.773 13.773C13.1462 14.3998 12.4021 14.897 11.5831 15.2362C10.7642 15.5754 9.88642 15.75 9 15.75C8.11358 15.75 7.23583 15.5754 6.41689 15.2362C5.59794 14.897 4.85382 14.3998 4.22703 13.773C3.60023 13.1462 3.10303 12.4021 2.76381 11.5831C2.42459 10.7642 2.25 9.88642 2.25 9C2.25 7.20979 2.96116 5.4929 4.22703 4.22703C5.4929 2.96116 7.20979 2.25 9 2.25C10.7902 2.25 12.5071 2.96116 13.773 4.22703C15.0388 5.4929 15.75 7.20979 15.75 9Z"
              stroke="#FF0420"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span style={{ fontSize: "14px", fontWeight: 600, marginLeft: 1 }}>
            Add
          </span>
        </StyledAddButton>
      )}
    </div>
  </div>
);
