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

let accessToken = Storage.privateGet("plaidAccessToken");
if (accessToken) {
  return <p>Bank connected {accessToken}</p>;
}

if (props.public_token) {
  const { access_token } = fetch(`${PLAID_API}/exchange-public-token`, {
    body: JSON.stringify({ public_token: props.public_token }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  Storage.privateSet("plaidAccessToken", access_token);
  return <p>Bank connecting...</p>;
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
