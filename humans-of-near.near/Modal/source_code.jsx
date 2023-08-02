const ModalOverlay = styled.div`
  position: absolute;
  left: 58px;
  top: 150px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
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
