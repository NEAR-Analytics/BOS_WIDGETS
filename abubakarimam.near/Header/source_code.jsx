const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem 1.5rem 1rem;
  padding: 8px 0;
   @media and (max-width: 768px){
  margin: 0;
`;

const LoginBtn = styled.button`
  color: #000;
  background: #fff;
  box-shadow: 0 4px 4px 0 #90EE90 inset, 0 4px 4px 0 #90EE90;
  padding: 0.5rem 1.25rem;
  border: rgb(59 130 246 0.5)
  border-width: 1px;
  border-radius: 0.5rem;
  cursor: pointer;
  
`;
const Logo = styled.div`
 display: flex;
  align-items: center;
`;
const Text = styled.h4`
color: #4caf50;
@media (max-width: 768px){
  display: none;
`;

const logo =
  "https://res-console.cloudinary.com/dzl44lobc/media_explorer_thumbnails/4c3906da87454bcf4ce6adbd08160067/detailed";

return (
  <Nav>
    <Logo>
      <img src={logo} width="120px" />
      <Text>DisposeToEarn</Text>
    </Logo>

    <LoginBtn>
      {context.accountId ? (
        context.accountId
      ) : (
        <a href="near.org/signin">Login</a>
      )}
    </LoginBtn>
  </Nav>
);
