const { Confetti } = VM.require(
  `memelol.near/widget/lol.Components.Confetti`
);

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  position: absolute;
  z-index: 102;
  background-color: white;
  width: 90%;
  max-width: 500px;
  padding: 1rem;
  border-radius: 10px;
`;

const ModalTitle = styled.h3`
  margin-bottom: 10px;
`;
const ConfettiContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 101;
`;

const Button = styled.button``;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay />

      <ModalContent>
        <div className="d-flex align-items-center justify-content-end">
          <div role="button" onClick={onClose}>
            <i className="bi bi-x" />
          </div>
        </div>
        {children}
      </ModalContent>
      <ConfettiContainer>
        <Confetti />
      </ConfettiContainer>
    </>
  );
};

return { Modal };
