const accountId = context.accountId;
const Owner = "dropcast.near";
const CLIENT_ID = "1206878767633534976";
const BASE_URL = "https://near.org/dropcast.near/widget/";
const OAuthScope = ["identify", "guilds"].join(" ");
Storage.set("token", null, `${Owner}/widget/discord`);
Storage.set("user", null, `${Owner}/widget/discord`);
console.log(Storage.get("token", `${Owner}/widget/discord`), "==>");
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
    background-image: linear-gradient(to bottom right, #facc15, #fb923c, #db2777);
`;

const LoginButton = styled.a`
    padding: 6px 24px;
`;

const params = {
  client_id: CLIENT_ID,
  redirect_uri: `${BASE_URL}discord`,
  scope: OAuthScope,
  response_type: "code",
};

const OAuthData = Object.keys(params)
  .map((param) => `${param}=${params[param]}`)
  .join("&");

return (
  <Wrapper className="root">
    <LogoIcon
      src="https://dropcast.nearverselabs.com/logo.png"
      decoding="async"
      data-nimg="fill"
    />
    <Title>Dropcast</Title>
    <p style={{ fontSize: 12 }}>Powered by Blocksmith Labs</p>
    <LoginButton
      className="btn btn-primary mt-4"
      href={`https://discordapp.com/oauth2/authorize?${OAuthData}`}
    >
      Login with Discord
    </LoginButton>
  </Wrapper>
);
