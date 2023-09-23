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

console.log({ props, context });

if (props.public_token) {
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
