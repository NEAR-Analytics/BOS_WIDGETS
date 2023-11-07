let strength = props.strength ?? "0.15";
let isOpen = props.isOpen ?? false;
let onClose = props.onClose;

const handleClickInsideModal = (e) => {
  e.stopPropagation();
};

const Modal = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  background: rgba(0,0,0,${strength});
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

return (
  <>
    {isOpen && (
      <Modal onClick={onClose}>
        <div onClick={handleClickInsideModal}>{props.children}</div>
      </Modal>
    )}
  </>
);
