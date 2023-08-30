const Wrapper = styled.div`
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;

    border-radius: 4px;
    background: #FFE3E3;
`;

const Label = styled.div`
    color: #D60000;
    font-size: 14px;
    font-weight: 400;
`;

return (
  <Wrapper>
    <Label>dapplets.near/widget/LevelOne</Label>
    <Widget src="dapplets.near/widget/LevelTwo" />
  </Wrapper>
);
