const Wrapper = styled.div`
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;

    border-radius: 4px;
    background: #E2FFE1;
`;

const Label = styled.div`
    color: #092;
    font-size: 14px;
    font-weight: 400;
`;

return (
  <Wrapper>
    <Label>dapplets.near/widget/LevelTwo</Label>
    <Widget src="dapplets.near/widget/LevelThree" />
  </Wrapper>
);
