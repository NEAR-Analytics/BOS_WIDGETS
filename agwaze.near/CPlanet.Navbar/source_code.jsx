const NavContainer = styled.div`
  background: black;
  height: 100px;
  padding: 20px 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const Logo = styled.div`
  
`;
const Routes = styled.div`
    display: flex;
    gap: 0.7rem;
    h1 {
      color: #FFF;
      font-family: Helvetica Neue;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
`;

const Join = styled.div`
  display: flex;
  button:first-child {
    background: transparent;
    border: none;
  }
  button:last-child {
    display: flex;
    width: 112px;
    height: 40px;
    padding: 8px 15px 8px 14px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    background: #FFF;
    color: black;
    border-color: white;
  }
  button:last-child:hover {
    color: white;
    background: transparent;
  }
  div {
    background: white;
    border: 1px solid white;
    margin: 0 10px 0 0;
  }
`;

return (
  <NavContainer>
    <Logo>
      <h1>Logo</h1>
    </Logo>
    <Routes>
      <h1>Contact us</h1>
      <h1>Products</h1>
      <h1>About us</h1>
    </Routes>
    <Join>
      <button>Get Started</button>
      <div />
      <button>Join</button>
    </Join>
  </NavContainer>
);
