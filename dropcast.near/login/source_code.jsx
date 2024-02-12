const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = "http://localhost:3000";

//Styles
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  color: #d4d4d4;
  position: relative;
  align-items: center;
  background: #171717;
  justify-content: center;
  flex-direction: column;
`;

const LogoIcon = styled.img`
    width: 192px; 
    height: 192px; 
`;

const Title = styled.h1`
    fontSize: 36px;
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(to bottom right, #facc15, #fb923c, #db2777, rgb(251 146 60 / 0));
`;

return (
  <Wrapper className="root">
    <LogoIcon
      src="https://vulcanapp.io/_next/static/media/logo.24108d07.svg"
      decoding="async"
      data-nimg="fill"
    />
    <Title>Mercury</Title>
    <p style={{ fontSize: 12 }}>Powered by Blocksmith Labs</p>
    <button className="btn btn-primary mt-4" style={{ padding: "6px 24px" }}>
      Login with Discord
    </button>
  </Wrapper>
);
