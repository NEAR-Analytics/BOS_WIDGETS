const accountId = context.accountId;
const Owner = "dropcast.near";
const CLIENT_ID = "1206878767633534976";
const CLIENT_SECRET = "GhYxHW-FZyo0pqK26xx7BVgwTa5VCLn6";
const BASE_URL = "https://near.org/dropcast.near/widget/";
const OAuthScope = ["identify", "guilds"].join(" ");
const API_URL = "https://dropcast.nearverselabs.com";
// const API_URL = "http://localhost:2402";
const discordCode = props.code || "";

let TOKEN = Storage.get("token", `${Owner}/widget/discord`);
let USER = Storage.get("user", `${Owner}/widget/discord`);

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
  State.update({ ...state, loaded: true });
  if (TOKEN) return;
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
          body: convertObject({ ...data.body, wallet: accountId }),
        }).then((res) => {
          const result = res.body;

          if (result.token) {
            Storage.set("token", result.token);
            Storage.set("user", result.user);
            State.update({
              ...state,
              token: result.token,
              user: result.user,
            });
          } else if (result.error)
            State.update({ ...state, error: result.error });
          setTimeout(() => {
            State.update({ ...state, go_login: true });
          }, 10000);
        });
      } else {
        if (!TOKEN) State.update({ ...state, go_login: true });
        return;
      }
    })
    .catch((error) => {
      if (!TOKEN) State.update({ ...state, go_login: true });
    });
};

const Logout = () => {
  Storage.set("token", null);
  Storage.set("user", null);
};

if (state.token || TOKEN)
  return (
    <Widget
      src={`${Owner}/widget/main`}
      props={{
        API_URL,
        USER: state.user || USER,
        TOKEN: state.token || TOKEN,
        Logout,
        transactionHashes: props.transactionHashes,
      }}
    />
  );

if (!discordCode || !accountId || state.go_login)
  return <Widget src={`${Owner}/widget/login`} />;
else if (!state.loaded && !state.token) fetchData();

return <div>{state.error || `Loading`}</div>;
