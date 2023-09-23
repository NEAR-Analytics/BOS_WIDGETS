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

if (context.public_token) {
  return <p>Bank connected</p>;
}

return (
  <div>
    <p>{location}</p>
    <a href={`http://localhost:3000?${location}`}>Connect bank</a>
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
