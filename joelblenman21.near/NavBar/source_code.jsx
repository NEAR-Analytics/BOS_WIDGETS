const RouterLink = props.RouterLink;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 18px;
  background-color: #f2f2f2;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const Branding = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  cursor: pointer;

  svg {
    width: auto;
    height: 1em;
    vertical-align: middle;
  }
`;

const MainText = styled.span`
  font-size: 3em;
  font-weight: bold;
  margin-right: 8px;
`;

const SubText = styled.span`
  font-size: 0.8em;
  color: grey;
  margin-left: 4px;
`;

const Button = styled.button`
  height: 100%;
`;

return (
  <Header className="classic">
    <Branding>
      <MainText>ThePeoplesPlace</MainText>

      <SubText>powered by</SubText>
    </Branding>
    <ButtonRow>
      <Button>Component Library</Button>

      <Button>Browse</Button>

      <Button>Create</Button>
    </ButtonRow>
  </Header>
);
