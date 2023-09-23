const PLAID_API = "http://localhost:3000";
State.init({
  origin: null,
});

const renderApp = () => {
  // Connected!
  const accessToken =
    state.accessToken || Storage.privateGet("plaidAccessToken");
  console.log({ accessToken });

  if (accessToken) {
    const response = fetch(`${PLAID_API}/transactions?token=${accessToken}`);
    console.log(response);
    return <p>Bank connected {accessToken}</p>;
  }

  // Connecting bank
  if (props.public_token) {
    const response = fetch(`${PLAID_API}/exchange-public-token`, {
      body: JSON.stringify({ public_token: props.public_token }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (response.ok) {
      Storage.privateSet("plaidAccessToken", response.body.access_token);
      State.update({ accessToken: response.body.access_token });
      return <p>Bank connecting...</p>;
    }
  }

  const location = `${state.origin}/${context.widgetSrc}`;
  return <a href={`${PLAID_API}?return_url=${location}`}>Connect bank</a>;
};

const src = `
<script>
const origin = document.location.ancestorOrigins[0];
window.top.postMessage(origin, "*")
</script>
`;

return (
  <div>
    {state.origin != null && renderApp()}
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
