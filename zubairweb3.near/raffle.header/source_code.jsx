const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem 3rem 1rem;
  padding: 8px 0;
`;

const LoginBtn = styled.button`
  color: #000;
  background: #fff;
  
`;

const logo =
  "https://res.cloudinary.com/zbsoft/image/upload/v1700148751/raffle/logo.svg";

return (
  <Nav>
    <img src={logo} width="120px" />
    <LoginBtn>Login</LoginBtn>
  </Nav>
);
