const accountId = props.accountId ?? context.accountId;
const url = "https://near.org";
const MainContainer = styled.div`
  width:100%;
  height: 100vh;
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
`;

const NavListItem = styled.li`
  display: inline;
  list-style-type: none;
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

const GradientText = styled.h4`
  font-weight: 800;
  margin: 0 0 0 20px;
  color: linear-gradient(to right, rgb(255, 217, 0), rgb(255, 217, 0), rgb(255, 217, 0) 10%, rgb(230, 54, 97), rgb(157, 0, 253), rgb(230, 54, 97), rgb(255, 217, 0) 90%, rgb(255, 217, 0), rgb(255, 217, 0));
  display: inline;
`;

const HeaderBtn = styled.button`
  position: relative;
  border: none;
  font-size: 14px;
  font-family: inherit;
  color: black;
  width: 7em;
  height: 2.5em;
  line-height: 2em;
  text-align: center;
  background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);

  display: inline;
  background-size: 300%;
  border-radius: 30px;
  z-index: 1;
  cursor: pointer;

  &:hover {
    animation: ani 8s linear infinite;
    border: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);


  display: inline;
    background-size: 400%;
    border-radius: 35px;
    transition: 1s;
  }

  &:hover::before {
    filter: blur(20px);
  }

  &:active {
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);

  display: inline;
  }

  @keyframes ani {
    0% {
      background-position: 0%;
    }

    100% {
      background-position: 400%;
    }
  }
`;

const AcountID = styled.p`
  height:35px;
  position: relative;
  border: none;
  font-size: 14px;
  font-family: inherit;
  color: black;
  width: 9em;
  height: 3em;
  line-height: 2em;
  text-align: center;
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);

  display: inline;
  background-size: 300%;
  border-radius: 30px;
  z-index: 1;
  cursor: pointer;

  &:hover {
    animation: ani 8s linear infinite;
    border: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);

  display: inline;
    background-size: 400%;
    border-radius: 35px;
    transition: 1s;
  }

  &:hover::before {
    filter: blur(20px);
  }

  &:active {
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);

  display: inline;
  }

  @keyframes ani {
    0% {
      background-position: 0%;
    }

    100% {
      background-position: 400%;
    }
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

if (!accountId) {
  return "Please sign in with NEAR wallet to save this UI";
}

return (
  <>
    <GlobalStyle />
    <MainContainer className="main">
      <NavList>
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
