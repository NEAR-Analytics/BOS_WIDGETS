State.init({
  origin: "",
});

const location = `${state.origin}/${context.widgetSrc}`;
const src = `
<script>
const origin = document.location.ancestorOrigins[0];
window.top.postMessage(origin, "*")
</script>
`;

if (props.public_token) {
  const { access_token } = fetch("/exchange-public-token", {
    headers: { "Content-Type": "application/json" },
    body: { public_token },
    method: "POST",
  });

  console.log(access_token);
  return <p>Bank connected {props.public_token}</p>;
}

return (
  <div>
    <p>{location}</p>
    <a href={`http://localhost:3000?return_url=${location}`}>Connect bank</a>
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
