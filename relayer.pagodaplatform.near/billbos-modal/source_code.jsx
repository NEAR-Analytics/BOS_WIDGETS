const { btnName, btnClass, body, height, width, isOpenDefault } = props;
const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(12, 12, 12, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const StyledInput = styled.div`
  position: relative;
  width: 100%;
  input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    cursor: pointer;
  }
`;

const StyledSelect = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    cursor: pointer;
  }

  &:after {
    content: '⌄';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const EndContent = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

State.init({
  isOpenModal: isOpenDefault || true,
});

const onOpen = () => {
  State.update({
    isOpenModal: true,
  });
};

const onClose = () => {
  State.update({
    isOpenModal: false,
  });
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <div
        style={{
          width: width || "484px",
          height: height || "484px",
        }}
        class="bg-white rounded-xl pt-4 relative"
      >
        <div class="absolute top-2 right-2">
          <svg
            class="cursor-pointer"
            onClick={() => onClose()}
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
        <div className="">{body || <div></div>}</div>
      </div>
    </ModalOverlay>
  );
};

const content = (
  <div>
    <button className={btnClass} onClick={onOpen}>
      {btnName || "Open Modal"}
    </button>
    <Modal isOpen={state.isOpenModal} onClose={onClose} children={modalBody} />
  </div>
);

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{
      children: content,
    }}
  />
);
