const HeaderContainer = styled.div`
    display: flex;
    padding-top: 10px;
    align-items:center;
    justify-content: space-between;
    background-color:transparent;
`;

const LinkButton = styled.button`
    background-color:transparent;
    border-width:0px;
    padding: ${(props) => (props?.scaleDown ? "5px" : "10px")};
    font-size: ${(props) => (props.scaleDown ? "10px" : "16px")};
`;

const AccountButton = styled.button`
  padding: ${(props) => (props?.scaleDown ? "5px 10px" : "10px 20px")};
  background-color: #fff;
  font-size: ${(props) => (props.scaleDown ? "10px" : "16px")};
  border-radius: 12px;
border: 2px solid var(--blue-400-focus-ring, #30C9F3);
box-shadow: 0px 1px 2px 0px rgba(14, 74, 110, 0.05);
`;

console.log(props);

const scaledown = props.scaleDown;

return (
  <>
    <HeaderContainer scaleDown={scaledown}>
      <div
        style={
          scaledown
            ? {
                width: 120,
                marginLeft: -20,
                transform: "scale(0.5)",
              }
            : {}
        }
      >
        <Widget src="nearcon23.near/widget/Register.KeypomLogo" />
      </div>
      <div>
        <LinkButton scaleDown={scaledown}>Docs</LinkButton>
        <LinkButton scaleDown={scaledown}>Get In Touch</LinkButton>
        <LinkButton scaleDown={scaledown}>My Drops</LinkButton>
        <AccountButton scaleDown={scaledown}>georgecostanza.near</AccountButton>
      </div>
    </HeaderContainer>
  </>
);
