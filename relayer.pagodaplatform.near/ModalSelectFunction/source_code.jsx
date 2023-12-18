const ModalOverlay = styled.div`
  background-color: rgba(12, 12, 12, 0.4);
  position: fixed;
  inset: 0;
  z-index: 1049;
`;

const StyledInput = styled.div`
  position: relative;
  input {
  width: 100%;
  border-radius: 8px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    cursor: pointer;
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ModalHeader = styled.div`
display:flex;
width:100%;
justify-content:space-between;
padding: 26px 34px 26px 34px;
`;

const ModalBody = styled.div`
display:flex;
width:100%;
flex-direction: column;
padding: 26px 34px 26px 34px;
`;
const ModalFooter = styled.div`
display:flex;
width:100%;
justify-content:space-between;
padding: 26px 34px 26px 34px;
`;

State.init({
  widget: "",
  isReady: false,
});

const handleChangeInput = (value) => {
  State.update({ widget: value, isReady: false });
};

const disabled = !state.isReady || state.widget === "";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <div
        style={{
          width: "484px",
          borderRadius: "12px",
        }}
        class="bg-white"
      >
        <ModalHeader>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: 600 }}>
              {"Select function"}
            </h1>
            <h3 style={{ fontSize: "14px", fontWeight: 400, color: "#A3A3A3" }}>
              {"Send unlimited blockchain functions in one transaction"}
            </h3>
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => onClose()}>
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
          </div>
        </ModalHeader>
        <div style={{ borderBottom: "1px solid #E5E7EB" }} />
        <ModalBody>
          <h6 style={{ color: "#656973" }}>Supercall Widget</h6>
          <StyledInput>
            <input
              class="w-full px-3 py-2 rounded-lg border"
              onChange={(e) => handleChangeInput(e.target.value)}
            />
          </StyledInput>
          {!state.isReady ? (
            <div style={{ color: "red", marginTop: 6, fontSize: 12 }}>
              Please select a valid supercall widget
            </div>
          ) : (
            <div style={{ color: "green", marginTop: 6, fontSize: 12 }}>
              The selected widget is valid
            </div>
          )}
          <div style={{ display: "none" }}>
            <Widget
              src={state.widget}
              props={{
                onLoadSuccess: () => {
                  State.update({ isReady: true });
                },
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            style={{
              background: "none",
              color: "#262930",
              fontWeight: 600,
              width: "49%",
              border: "1px solid #D0D5DD",
              borderRadius: "8px",
            }}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            style={{
              background: "#262930",
              color: "#fff",
              fontWeight: 600,
              width: "49%",
              border: "none",
              borderRadius: "8px",
            }}
            disabled={disabled}
            onClick={() => {
              onSubmit(state.widget);
              onClose();
              State.update({ isReady: false });
            }}
          >
            Confirm
          </button>
        </ModalFooter>
      </div>
    </ModalOverlay>
  );
};

return (
  <>
    <Modal
      isOpen={props.isOpen}
      onClose={() => props.onClose && props.onClose()}
      onSubmit={(value) => props.onSubmit && props.onSubmit(value)}
    />
  </>
);
