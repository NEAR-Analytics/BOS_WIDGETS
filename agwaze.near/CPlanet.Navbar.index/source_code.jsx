const NavContainer = styled.div`
  background: white;
  height: 100px;
  padding: 20px 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  color: black;
  h2 {
    color: #000;
font-family: Helvetica Neue;
font-size: 32px;
font-style: italic;
font-weight: 300;
line-height: normal;
  }
  h1 {
    color: #000;
font-family: Helvetica Neue;
font-size: 32px;
font-style: normal;
font-weight: 500;
line-height: normal;
  }
`;
const Routes = styled.div`
    display: flex;
    gap: 0.7rem;
    h1 {
      color: black;
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
    color: black
  }
  button:last-child {
    display: flex;
    width: 155px;
    height: 40px;
    padding: 8px 15px 8px 14px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    background: #FFF;
    border: 1px solid black;
    color: black;
  }
  button:last-child:hover {
    background: transparent;
  }
  div {
    background: black;
    border: 1px solid black;
    margin: 0 10px 0 0;
  }
`;

return (
  <NavContainer>
    <Logo>
      <h2>C</h2><h1>Planet</h1>
    </Logo>
    <Routes>
      <h1>NFTs</h1>
      <h1>Communities</h1>
      <h1>Funding</h1>
    </Routes>
    <Join>
      <button>Sign up</button>
      <div />
      <button>Connect Wallet</button>
    </Join>
  </NavContainer>
);
