const Card = styled.div`
  display: flex;
  width: 506px;
  padding: 24px 0px;
  align-items: flex-start;
  gap: 64px; 

  border-top: 1px solid var(--sand-light-6, #E3E3E0);
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0; 
`;

const Icon = styled.div`
  width: 40px;
  justify-content: center;
  align-items: center;
  gap: 8px; 
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0; 

  & > div:nth-of-type(1) {
    font: var(--text-base);
    color: var(--sand-light-12, #1B1B18); 
    font-weight: 600; 
    line-height: 150%;
  }
  & > div:nth-of-type(2) {
    font: var(--text-s);
    color: var(--sand-light-11, #706F6C); 
    font-weight: 450; 
    line-height: 150%;
  }
`;

const Switch = styled.div`
  display: flex;
  width: 40px;
  height: 16px;
  align-items: center;
  gap: 8px; 
`;

return (
  <Card>
    <Content>
      <Icon>{props.icon}</Icon>
      <Text>
        <div>{props.title}</div>
        {props.text && <div>{props.text}</div>}
      </Text>
    </Content>
    <Switch>S</Switch>
  </Card>
);
