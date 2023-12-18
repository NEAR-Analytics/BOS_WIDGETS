const { isOpen, onSubmit } = props;

State.init({
  isOpen: props.isOpen,
});

function onClose() {
  State.update({ isOpen: false });
}

const ModalOverlay = styled.div`
  background-color: rgba(12, 12, 12, 0.4);
  position: fixed;
  inset: 0;
  z-index: 1049;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow:
    0px 4px 8px 0px var(--blackA3),
    0px 0px 0px 1px var(--blackA4);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 484px;
  max-height: 85vh;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1054;
  outline: none;
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

const Modal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <>
      <ModalOverlay />
      <Content>
        <ModalHeader>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: 600 }}>
              {"Select function"}
            </h1>
            <h3 style={{ fontSize: "14px", fontWeight: 400, color: "#A3A3A3" }}>
              {"Create unlimited DeFi function in one transaction"}
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
          <h6 style={{ color: "#656973" }}>Function</h6>
          <StyledInput>
            <input type="number" class="w-full px-3 py-2 rounded-lg border" />
          </StyledInput>
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
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            Confirm
          </button>
        </ModalFooter>
      </Content>
    </>
  );
};

return (
  <>
    <button
      onClick={() => {
        State.update({ isOpen: true });
      }}
    >
      Test
    </button>
    <Modal
      onClose={() => props.onClose()}
      onSubmit={() => props.handdleAddFunction()}
      isOpen={props.isOpenModal}
    />
  </>
);
