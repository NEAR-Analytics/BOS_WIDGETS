const accountId = props.accountId ?? context.accountId;
const url = "https://near.org";
const MainContainer = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 5px solid #ff10d9;
  border-top: 5px solid #ff10d9;
  background-color: #ffd840;
  position: relative;
`;

const NavListItem = styled.li`
  display: inline;
  
`;

const NavLink = styled.a`
  text-decoration: none;
  font-size: 20px;
  text-transform: capitalize;
  font-family: var(--font), Arial;
  font-weight: 700;
  margin-right: 1em;
  color: black;
  position: relative;
  border-bottom: 2px solid #000;

  &:hover {
    color:#ed43c3;
    top: -0.16em;
    transition: padding 0.5s, top 0.35s, box-shadow 0.4s;
    box-shadow: 0 0.4rem 0 -0.2rem #ff10d9;
  }
`;

const GlobalStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --font: 'Kalam', 'Source Code Pro', monospace;
  }
`;

const Svg = styled.svg`
  font-family: 'Russo One', sans-serif;
  width: 100%;
  height: 100%;
  margin-right: auto;
  margin-left: 0; 
  
`;

const SvgText = styled.text`
  animation: stroke 5s infinite alternate;
  stroke-width: 1;
  stroke: #ed43c3;
  font-size: 20px;
  color:#ed43c3;
  background:#ff10d9;
  @keyframes stroke {
    0% {
      fill: rgba(72, 138, 204, 0);
      stroke: rgba (255, 132, 8, 1);
      stroke-dashoffset: 25%;
      stroke-dasharray: 0 50%;
      stroke-width: 1;
    }
    70% {
      fill: rgba(72, 138, 204, 0);
      stroke: rgba (255, 132, 8, 1);
    }
    80% {
      fill: rgba(72, 138, 204, 0);
      stroke: rgba (255, 132, 8, 1);
      stroke-width: 2;
    }
    100% {
      fill: rgba (255, 84, 0, 1);
      stroke: rgba (255, 132, 8, 1);
      stroke-dashoffset: -25%;
      stroke-dasharray: 50% 0;
      stroke-width: 0;
    }
  }
  
`;

const Blink = styled.div`
  &::before {
    content: "✨"; 
    font-size: 24px;
    position: absolute;
    top: 50%;
  left: 20%;
    transform: translate(-50%, -50%);
    opacity: 0;
    animation: sparkle 1s infinite;
  }

  @keyframes sparkle {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

`;

if (!accountId) {
  return "Please sign in with NEAR wallet to save this UI";
}

return (
  <>
    <GlobalStyle />
    <MainContainer className="main">
      <NavList>
        <Blink></Blink>

        <NavListItem>
          <Svg>
            <SvgText x="60%" y="50%" dy=".35em" text-anchor="middle">
              <a href={`${url}/fastui.near/widget/FastUI`}>FastUI</a>{" "}
            </SvgText>
          </Svg>{" "}
        </NavListItem>
        <NavListItem>
          <NavLink href="#">Docs</NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink href="#">About</NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink href="#">{accountId}</NavLink>
        </NavListItem>
      </NavList>
    </MainContainer>
  </>
);
