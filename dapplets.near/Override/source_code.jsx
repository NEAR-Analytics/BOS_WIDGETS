const Wrapper = styled.div`
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;

    border-radius: 4px;
    background: #D60000;
`;

const Label = styled.div`
    color: #fff;
    font-size: 14px;
    font-weight: 800;
`;

return (
  <Wrapper>
    <Label>Override</Label>
  </Wrapper>
);
