const Card = styled.div`
display: flex;
padding: 24px;
flex-direction: column;
align-items: flex-start;
gap: 32px;
align-self: stretch;
border-radius: 6px;
border: 1px solid var(--sand-light-6, #E3E3E0);
background: var(--sand-light-1, #FDFDFC);
`;

const Header = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 10px;
align-self: stretch; 
`;

const Title = styled.div`
font: var(--text-base);
font-weight: 600;
line-height: 130%;
`;

const Text = styled.div`
color: var(--sand-light-11, var(--sand-light-11, #706F6C));
font: var(--text-s);
ont-weight: 450;
line-height: 150%;
`;

const Button = styled.div``;

const showTurnOnModal = () => {
  //   show Notifications Turn On modal
};

return (
  <Card>
    <Header>
      <Title>Enable push notifications</Title>
      <Text>
        To receive push notifications, you'll first need to enable them in your
        browser settings.
      </Text>
    </Header>
    <Button>
      <Widget
        src="near/widget/DIG.Button"
        props={{
          label: "Learn More",
          variant: "secondary",
          // fill: "",
          onClick: showTurnOnModal,
          style: { width: "100%" },
        }}
      />
    </Button>
  </Card>
);
