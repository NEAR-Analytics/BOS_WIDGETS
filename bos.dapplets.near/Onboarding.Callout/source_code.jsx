const Callout = styled.div`
  display: flex;
  width: 320px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #02193a;
  background: #fffffe;
  position: relative;
  left: 19px;
`;

const CalloutTitle = styled.div`
  color: #02193a;
  font-family: sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 149%; /* 26.82px */
`;

const CalloutDescription = styled.div`
  color: #7a818b;
  text-align: center;
  font-family: sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 149%; /* 17.88px */
`;

const ActionsGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
`;

const ActionButton = styled.div`
    display: flex;
    height: 42px;
    padding: 0px 20px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 90px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border: ${(props) => (props.$primary ? "initial" : "1px solid #E2E2E5")};
    background: ${(props) => (props.$primary ? "#02193A" : "initial")};
    color: ${(props) => (props.$primary ? "#fff" : "initial")};

    &:hover {
        background: ${(props) => (props.$primary ? "#1c3559" : "#eee")};
    }

    &:active {
        background: ${(props) => (props.$primary ? "#020c19" : "#ddd")};
    }
`;

const handleBackClick = () => {};

const handleNextClick = () => {};

const { link } = props;

return (
  <Callout>
    <CalloutTitle>It's a sandbox story first</CalloutTitle>
    <CalloutDescription>
      We are now in a sandbox mutation. Through it, we can suspendisse mattis
      interdum auctor volutpat nisl quis. Scelerisque morbi eget volutpat
      aliquet vitae curabitur non. LinkId: {link.id}
    </CalloutDescription>
    <ActionsGroup>
      <ActionButton onClick={handleBackClick}>Back</ActionButton>
      <ActionButton $primary={true} onClick={handleNextClick}>
        Next
      </ActionButton>
    </ActionsGroup>
  </Callout>
);
