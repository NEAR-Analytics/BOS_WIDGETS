const PLAID_API = "http://localhost:3000";
State.init({
  accessToken: Storage.privateGet("plaidAccessToken"),
  origin: "",
});

// Connected!
if (state.accessToken) {
  const response = fetch("https://sandbox.plaid.com/transactions/get", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "650ec5e216ecbb001b12ca1d",
      secret: "3618a4c3bb886629ad11e32c2e139b",
      access_token: state.accessToken,
      start_date: "2018-01-01",
      end_date: "2018-02-01",
      options: {
        count: 250,
        offset: 100,
        include_personal_finance_category: true,
      },
    }),
  });

  console.log(response);

  return <p>Bank connected {state.accessToken}</p>;
}

// Connecting bank
if (props.public_token) {
  const response = fetch(`${PLAID_API}/exchange-public-token`, {
    body: JSON.stringify({ public_token: props.public_token }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

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
