const showNavbar = props.showNavbar ?? true;

const NavContainer = styled.div`
  background: ${() => (props.isHome ? "transparent" : "white")};
  height: 100px;
  padding: 20px 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin-bottom: 30px;
`;

const Logo = styled.a`
  display: flex;
  color: ${() => (props.isHome ? "white" : "#000")};
  h2 {
    color: ${() => (props.isHome ? "white" : "#000")};
font-family: Helvetica Neue;
font-size: 32px;
font-style: italic;
font-weight: 300;
line-height: normal;
  }
  h1 {
    color: ${() => (props.isHome ? "white" : "#000")};
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
    margin-top: 10px;
    a {
      color: ${() => (props.isHome ? "white" : "#000")};
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
    color: ${() => (props.isHome ? "white" : "#000")};
  }
  button:last-child {
    display: flex;
    width: 155px;
    height: 40px;
    padding: 8px 15px 8px 14px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    background: ${() => (props.isHome ? "white" : "#000")};
    border: 1px solid ${() => (props.isHome ? "white" : "#000")};
    color: ${() => (props.isHome ? "black" : "white")};;
  }
  button:last-child:hover {
    background: ${() => (props.isHome ? "#000" : "white")};
    color: black;
  }
  div {
    background: ${() => (props.isHome ? "white" : "#000")};
    border: 1px solid ${() => (props.isHome ? "white" : "#000")};
    margin: 0 10px 0 0;
  }
`;

return (
  <NavContainer>
    {showNavbar && (
      <>
        <Logo
          href="#/agwaze.near/widget/CPlanet.index?tab=home"
         onClick={() => props.update({ tab: "home" })}>
          <h2>C</h2>
          <h1>PLANET</h1>
        </Logo>
        <Routes>
          <a
            href={`#/agwaze.near/widget/CPlanet.index?tab=explore`}
            onClick={() => props.update({ tab: "explore" })}
          >
            NFTs
          </a>
          <a
            href={`#/agwaze.near/widget/CPlanet.index?tab=community`}
            onClick={() => props.update({ tab: "community" })}
          >
            Communities
          </a>
          <a href={`#/agwaze.near/widget/CPlanet.index?tab=funding`}>Funding</a>
        </Routes>
      </>
    )}

    <Join>
      <button>Connect Wallet</button>
    </Join>
  </NavContainer>
);
