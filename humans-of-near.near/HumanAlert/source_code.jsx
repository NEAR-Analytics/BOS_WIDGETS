const { onClose } = props;

const ModalOverlay = styled.div`
  position: absolute;
  background-color: #191a1a;
  border-radius: 12px;
  border: 1px solid rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  width: 400px;
`;

const ModalContent = styled.div`
  padding: 20px;
  width: 100%;
  color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap:15px;
`;

const ModalAction = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const ModalTitle = styled.h4`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 22px;
  background-color:white;
  color: #191a1a;
  border-radius: 6px;
  &:hover {
    background-color: grey;
    color: #191a1a;
  }
  &:active {
    background-color: grey;
    color: #191a1a;
  }
`;

const TextField = styled.input`
padding: 10px 15px;
font-size: 16px;
border-radius: 6px;
border: 2px solid rgb(255, 255, 255);
background-color: #191a1a;
color: white;
`;

return (
  <ModalOverlay>
    <ModalAction>
      <Button className="btn" onClick={saveMyProfile}>{`Save`}</Button>
    </ModalAction>
    <ModalContent>
      <button
        style={{
          width: 40,
          position: "absolute",
          right: 25,
          background: "unset",
        }}
        onClick={onClose}
      >
        X
      </button>
      <ModalTitle>{`Your Profile`}</ModalTitle>
      <p>{`Be careful with your public data.`}</p>
      <h5>{`Display Name`}</h5>
    </ModalContent>
  </ModalOverlay>
);
