const Header = styled.div`
    display: flex;
    padding: 56px 0px 48px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px; 
`;

const Title = styled.div`
    font: var(--text-xl);
    color: var(--sand-light-12, #1B1B18); 
    font-weight: 500;
`;

const Text = styled.div`
    font: var(--text-base);
    color: var(--sand-light-11, #706F6C); 
    font-weight: 450; 
`;

return (
  <Header>
    <Title>Notification Settings</Title>
    <Text>Configure your notifications for activity on near.org</Text>
  </Header>
);
