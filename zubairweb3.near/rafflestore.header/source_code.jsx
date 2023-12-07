const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem 3rem 1rem;
  padding: 8px 0;
`;

const LoginBtn = styled.a`
  color: #000;
  background: #fff;
  box-shadow: 0 4px 4px 0 #003C8C inset, 0 4px 4px 0 #003C8C;
  padding: 0.5rem 1.25rem;
  border: rgb(59 130 246 0.5)
  border-width: 1px;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover{
    text-decoration: none;
  }
  
`;

const logo =
  "https://res.cloudinary.com/zbsoft/image/upload/v1700148751/raffle/logo.svg";

return (
  <Nav>
    <img src={logo} width="120px" />
    <LoginBtn href="near.org/signin">Login</LoginBtn>
  </Nav>
);
