const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
`;

const ModalTitle = styled.h3`
  margin-bottom: 10px;
`;

const Button = styled.button`
`;

return (
  <ModalOverlay>
    <ModalContent>
      <Button onClick={props.onClose}>X</Button>
      <ModalTitle>Profile</ModalTitle>
      123123
    </ModalContent>
  </ModalOverlay>
);
