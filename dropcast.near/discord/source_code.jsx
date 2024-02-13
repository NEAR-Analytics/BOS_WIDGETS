const accountId = context.accountId;
const Owner = "dropcast.near";
const CLIENT_ID = "1206878767633534976";
const CLIENT_SECRET = "GhYxHW-FZyo0pqK26xx7BVgwTa5VCLn6";
const BASE_URL = "https://near.org/dropcast.near/widget/";
const OAuthScope = ["identify", "guilds"].join(" ");

const discordCode = props.code || "";

if (!discordCode || !accountId) return <Widget src={`${Owner}/widget/login`} />;
else fetchData();

const fetchData = () => {
  const params = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code: discordCode,
    redirect_uri: `${BASE_URL}discord`,
    scope: OAuthScope,
  };

  const urlSearchParams = Object.keys(params)
    .map((param) => `${param}=${params[param]}`)
    .join("&");

  let promise = asyncFetch(`https://discordapp.com/api/v9/oauth2/token`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: urlSearchParams,
  });

  promise.then((data) => {
    if (data.status === 200) {
      return console.log(data, "===>data");
      return <Widget src={`${Owner}/widget/main`} />;
    } else {
      return <Widget src={`${Owner}/widget/login`} />;
    }
  });
};
