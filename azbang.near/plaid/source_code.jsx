State.init({
  origin: "",
});

const PLAID_API = "http://localhost:3000";
const location = `${state.origin}/${context.widgetSrc}`;
const src = `
<script>
const origin = document.location.ancestorOrigins[0];
window.top.postMessage(origin, "*")
</script>
`;

if (props.public_token) {
  let accessToken = Storage.privateGet("plaidAccessToken");
  if (accessToken == null) {
    const { access_token } = fetch(`${PLAID_API}/exchange-public-token`, {
      body: JSON.stringify({ public_token: props.public_token }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (access_token == null) {
      return <p>Bank connecting</p>;
    }

    Storage.privateSet("plaidAccessToken", access_token);
    accessToken = access_token;
  }

  return <p>Bank connected {accessToken}</p>;
}

return (
  <div>
    <a href={`${PLAID_API}?return_url=${location}`}>Connect bank</a>
    <iframe
      style={{ display: "none" }}
      onMessage={(origin) => {
        console.log(origin);
        State.update({ origin });
      }}
      srcDoc={src}
    ></iframe>
  </div>
);
