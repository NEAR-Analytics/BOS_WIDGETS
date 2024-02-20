const accountId = context.accountId;
const Owner = "dropcast.near";
const CLIENT_ID = "1206878767633534976";
const CLIENT_SECRET = "GhYxHW-FZyo0pqK26xx7BVgwTa5VCLn6";
const BASE_URL = "https://near.org/dropcast.near/widget/";
const OAuthScope = ["identify", "guilds"].join(" ");
// const API_URL = "https://dropcast.nearverselabs.com";
const API_URL = "http://localhost:2402";

const discordCode = props.code || "";

const TOKEN = Storage.get("token", `${Owner}/widget/discord`);
const USER = Storage.get("user", `${Owner}/widget/discord`);

State.init({
  error: "",
  loaded: false,
  go_login: false,
  token: TOKEN,
  user: USER,
});

const convertObject = (params) => {
  return Object.keys(params)
    .map((param) => `${param}=${params[param]}`)
    .join("&");
};

const fetchData = () => {
  const params = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code: discordCode,
    redirect_uri: `${BASE_URL}discord`,
    scope: OAuthScope,
  };

  const urlSearchParams = convertObject(params);

  let promise = asyncFetch(`https://discordapp.com/api/v9/oauth2/token`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: urlSearchParams,
  });

  promise
    .then((data) => {
      if (data.status === 200) {
        asyncFetch(`${API_URL}/api/auth/discord`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
          body: convertObject(data.body),
        }).then((res) => {
          const result = res.body;

          if (result.token) {
            Storage.set("token", result.token);
            Storage.set("user", result.user);
            State.update({
              token: result.token,
              user: result.user,
              loaded: true,
            });
          } else if (result.error)
            State.update({ error: result.error, loaded: true, go_login: true });
        });
      } else {
        return State.update({ go_login: true, loaded: true });
      }
    })
    .catch((error) => {
      console.log(error, { TOKEN });
      if (!TOKEN) State.update({ go_login: true, loaded: true });
    });
};

const Logout = () => {
  Storage.set("token", null);
  Storage.set("user", null);
};

console.log(state, "==>state");

if (state.token)
  return (
    <Widget
      src={`${Owner}/widget/main`}
      props={{ API_URL, TOKEN: state.token, USER: state.user, Logout }}
    />
  );

if (!discordCode || !accountId || state.go_login)
  return <Widget src={`${Owner}/widget/login`} />;
else if (!state.loaded && !state.token) fetchData();

return <div>{result.error || `Loading`}</div>;
