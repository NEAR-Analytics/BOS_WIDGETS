const Card = styled.div`
  display: flex;
  width: 506px;
  padding: 32px 0px;
  align-items: flex-start;
  gap: 64px; 
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0; 
`;

const Icon = styled.div`
  width: 40px;
  height: 40px; 
  justify-content: center;
  align-items: center;
  gap: 8px; 
`;

const Text = styled.div`
  justify-content: start;
  align-items: center;
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
      <Icon>X</Icon>
      <Text>
        <div>Push notifications</div>
        <div>
          Push notifications are delivered in real-time to your enabled browser
          or device.
        </div>
      </Text>
    </Content>
    <Switch>S</Switch>
  </Card>
);
