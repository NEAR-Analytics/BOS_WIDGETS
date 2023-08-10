const HeaderContainer = styled.div`
    display: flex;
    transform: ${(props) => (props.scaleDown ? "scale(0.8)" : "")};
    padding-top: 10px;
    justify-content: space-between;
    background-color:transparent;
`;

const LinkButton = styled.button`
    background-color:transparent;
    border-width:0px;
    padding:10px;
`;

const AccountButton = styled.button`
  padding: 10px 20px;
  background-color: #fff;
  font-size: 16px;
  border-radius: 12px;
border: 2px solid var(--blue-400-focus-ring, #30C9F3);
box-shadow: 0px 1px 2px 0px rgba(14, 74, 110, 0.05);
`;

console.log(props);

return (
  <>
    <HeaderContainer>
      <div>
        <Widget src="nearcon23.near/widget/Register.KeypomLogo" />
      </div>
      <div>
        <LinkButton>Docs</LinkButton>
        <LinkButton>Get In Touch</LinkButton>
        <LinkButton>My Drops</LinkButton>
        <AccountButton>harrydhillon.near</AccountButton>
      </div>
    </HeaderContainer>
  </>
);
