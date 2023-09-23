const { tokens, onSelectToken, sender, onClose } = props;
const CloseIconWrapper = styled.div`
  font-size: 30;
  font-weight: 700;
  text-align: right;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px;
`;

const CloseIcon = styled.div`
  cursor: pointer;
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  width: 400px;
  position: fixed;
  background-color: white;
  top: 1/2;
  left: 1/2;

  border: 1px solid black;

  border-radius: 12px;

  z-index: 100;

  .list-container {
    width: 100%;

    max-height: 50%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    cursor: pointer;
  }
`;

return (
  <ListWrapper>
    <CloseIconWrapper className="">
      <div> Select token </div>
      <CloseIcon onClick={onClose}>X</CloseIcon>
    </CloseIconWrapper>

    <div className="list-container">
      {tokens.map((token) => (
        <Widget
          src="weige.near/widget/TokenItem"
          props={{
            ...props,
            ...state,
            token,
          }}
        />
      ))}
    </div>
  </ListWrapper>
);
