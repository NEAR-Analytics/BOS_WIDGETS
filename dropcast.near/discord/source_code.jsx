const accountId = context.accountId;
const Owner = "dropcast.near";
const CLIENT_ID = "1206878767633534976";
const CLIENT_SECRET = "GhYxHW-FZyo0pqK26xx7BVgwTa5VCLn6";
const BASE_URL = "https://near.org/dropcast.near/widget/";
const OAuthScope = ["identify", "guilds"].join(" ");
// const API_URL = "https://dropcast.nearverselabs.com";
const API_URL = "http://localhost:2402";

const discordCode = props.code || "";

State.init({
  loaded: false,
  error: "",
  token: "",
  user: {},
});

const convertObject = (params) => {
  return Object.keys(params)
    .map((param) => `${param}=${params[param]}`)
    .join("&");
};

const fetchData = () => {
  State.update({
    loaded: true,
  });

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
          console.log(result, "==>reusult");
          if (result.token)
            State.update({ token: result.token, user: result.user });
          else if (result.error) State.update({ error: result.error });
        });
      } else {
        return <Widget src={`${Owner}/widget/login`} />;
      }
    })
    .catch((error) => {
      console.log(error);
      <Widget src={`${Owner}/widget/login`} />;
    });
};

if (!discordCode || !accountId) return <Widget src={`${Owner}/widget/login`} />;
else if (!state.loaded) fetchData();

if (state.token)
  return (
    <Widget
      src={`${Owner}/widget/main`}
      props={{ TOKEN: state.token, USER: state.user }}
    />
  );
return <div>{result.error || `Loading`}</div>;
