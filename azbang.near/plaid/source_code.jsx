const PLAID_API = "http://localhost:3000";
State.init({
  publicToken: props.public_token,
  accessToken: Storage.privateGet("plaidAccessToken"),
  origin: "",
});

// Connected!
if (state.accessToken) {
  const response = fetch(
    `${PLAID_API}/transactions?token=${state.accessToken}`
  );
  console.log(response);
  return <p>Bank connected {state.accessToken}</p>;
}

// Connecting bank
if (state.publicToken) {
  const response = fetch(`${PLAID_API}/exchange-public-token`, {
    body: JSON.stringify({ public_token: state.publicToken }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    State.update({ publicToken: null });
    return null;
  }

  Storage.privateSet("plaidAccessToken", response.body.access_token);
  State.update({ accessToken: response.body.access_token });
  return <p>Bank connecting...</p>;
}

const location = `${state.origin}/${context.widgetSrc}`;
const src = `
<script>
const origin = document.location.ancestorOrigins[0];
window.top.postMessage(origin, "*")
</script>
`;

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
