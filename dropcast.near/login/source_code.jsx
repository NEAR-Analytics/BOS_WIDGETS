const accountId = context.accountId;
const Owner = "dropcast.near";
const CLIENT_ID = "1206878767633534976";
const BASE_URL = "https://near.org/dropcast.near/widget/";
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
      src="https://dropcast.nearverselabs.com/logo.png"
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
          viewBox="0 0 56 56"
        >
          <path
            fill="currentColor"
            d="M28 51.906c13.055 0 23.906-10.851 23.906-23.906c0-13.078-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.922 4.095 28c0 13.055 10.828 23.906 23.906 23.906m10.406-34.804c2.906 2.882 2.649 6.445-.703 9.773l-4.031 4.055c.328-1.125.305-2.438-.07-3.328l2.367-2.368c2.297-2.25 2.554-4.617.726-6.422c-1.804-1.78-4.172-1.5-6.422.75l-3.351 3.305c-2.32 2.344-2.625 4.735-.797 6.516c.539.562 1.336.914 2.367 1.101c-.352.75-1.078 1.618-1.758 2.086c-.703-.117-1.594-.68-2.344-1.453c-2.906-2.883-2.601-6.492.797-9.914l3.422-3.398c3.352-3.352 6.914-3.586 9.797-.703M16.75 38.758c-2.906-2.883-2.649-6.446.727-9.774l4.03-4.054c-.35 1.125-.327 2.437.048 3.328l-2.368 2.367c-2.297 2.227-2.554 4.617-.726 6.422c1.805 1.781 4.195 1.5 6.422-.75l3.351-3.305c2.32-2.344 2.625-4.734.797-6.515c-.539-.563-1.336-.915-2.367-1.102c.351-.75 1.078-1.617 1.758-2.086c.703.117 1.593.68 2.367 1.453c2.883 2.883 2.578 6.469-.82 9.89l-3.422 3.423c-3.352 3.351-6.914 3.586-9.797.703"
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
