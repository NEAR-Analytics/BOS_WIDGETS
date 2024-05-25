const accountId = context.accountId;
const Owner = "dropcast.near";
const CLIENT_ID = "1206878767633534976";
const BASE_URL = "https://dev.near.org/dropcast.near/widget/";
const OAuthScope = ["identify", "guilds"].join(" ");

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
      src="https://ipfs.near.social/ipfs/bafkreihlvxcsjmvptzkn5way4ffun3njuebgrmjcolnxvz37gro7h54r5e"
      decoding="async"
      data-nimg="fill"
    />
    <Title>Dropcast</Title>
    <p style={{ fontSize: 12, textAlign: "center" }}>
      Allowlist Management Platform <br />
      Powered by Nearverse Labs
    </p>
    <LoginButton
      className={`btn btn-primary mt-4 ${accountId && "grey-1"}`}
      href={accountId && `https://discordapp.com/oauth2/authorize?${OAuthData}`}
    >
      Login with Discord
    </LoginButton>
    {!accountId && (
      <p
        className="mt-4 w-50 text-center"
        style={{ color: "red" }}
      >{`Please sign into BOS with your wallet before connecting your discord.`}</p>
    )}
    <div className="d-flex mt-3 gap-2">
      <a href="https://twitter.com/NearverseLabs" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07l-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
          />
        </svg>
      </a>
      <a href="https://www.nearverselabs.com/" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M5.78 8.75a9.64 9.64 0 0 0 1.363 4.177c.255.426.542.832.857 1.215c.245-.296.551-.705.857-1.215A9.64 9.64 0 0 0 10.22 8.75Zm4.44-1.5a9.64 9.64 0 0 0-1.363-4.177c-.307-.51-.612-.919-.857-1.215a9.927 9.927 0 0 0-.857 1.215A9.64 9.64 0 0 0 5.78 7.25Zm-5.944 1.5H1.543a6.507 6.507 0 0 0 4.666 5.5c-.123-.181-.24-.365-.352-.552c-.715-1.192-1.437-2.874-1.581-4.948m-2.733-1.5h2.733c.144-2.074.866-3.756 1.58-4.948c.12-.197.237-.381.353-.552a6.507 6.507 0 0 0-4.666 5.5m10.181 1.5c-.144 2.074-.866 3.756-1.58 4.948c-.12.197-.237.381-.353.552a6.507 6.507 0 0 0 4.666-5.5Zm2.733-1.5a6.507 6.507 0 0 0-4.666-5.5c.123.181.24.365.353.552c.714 1.192 1.436 2.874 1.58 4.948Z"
          />
        </svg>
      </a>
      <a href="https://dropcast-user-guide.nearverselabs.com/" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M224 48h-56a32 32 0 0 0-32 32v88a8 8 0 0 1-16 0V80a32 32 0 0 0-32-32H32a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h64a24 24 0 0 1 24 24a8 8 0 0 0 16 0a24 24 0 0 1 24-24h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16m-16 120h-40a8 8 0 0 1 0-16h40a8 8 0 0 1 0 16m0-32h-40a8 8 0 0 1 0-16h40a8 8 0 0 1 0 16m0-32h-40a8 8 0 0 1 0-16h40a8 8 0 0 1 0 16"
          />
        </svg>
      </a>
    </div>
  </Wrapper>
);
