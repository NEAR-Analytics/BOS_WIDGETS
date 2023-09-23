const PLAID_API = "http://localhost:3000";
State.init({ origin: null });

const accessToken = state.accessToken || Storage.privateGet("plaidAccessToken");
if (accessToken === null) {
  return <p>Loading</p>;
}

if (accessToken) {
  const response = fetch(`${PLAID_API}/transactions?token=${accessToken}`);
  console.log(response);
  return (
    <div>
      <p>Bank connected {accessToken}</p>
      {response.body.add.map((tx) => (
        <div>
          <p>{tx.name}</p>
          <p>
            {tx.amount} {tx.iso_currency_code}
          </p>
        </div>
      ))}
    </div>
  );
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
const src = `
<script>
const origin = document.location.ancestorOrigins[0];
window.top.postMessage(origin, "*")
</script>
`;

return (
  <div>
    <a href={`${PLAID_API}?return_url=${location}`}>Connect bank</a>{" "}
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
